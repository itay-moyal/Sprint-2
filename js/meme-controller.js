"use strict"

var gCtx
var gElCanvas
var gFilterBy

function onInit() {
  gElCanvas = document.querySelector("canvas")
  gCtx = gElCanvas.getContext("2d")
  gElCanvas.addEventListener("click", onCanvasClick)
  renderGallery()
  gFilterBy = ''
}

//renders an image on the canvas and a line of text on top

function renderMeme() {
  const meme = getMeme()
  const memeImg = getMemeImg(meme.selectedImgId)
  if (!memeImg) return

  const img = new Image()
  img.src = memeImg.url
  img.onload = () => {
    renderImg(img)
    renderTxt()
    renderInputTxt()
  }
}

function renderImg(img) {
  gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function renderTxt() {
  const meme = getMeme()
  const centerX = gElCanvas.width / 2
  const centerY = gElCanvas.height / 2

  meme.lines.forEach((line, idx) => {
    gCtx.font = `${line.size}px Arial`
    gCtx.textAlign = line.align || "center"
    gCtx.fillStyle = line.color
    line.x = centerX
    if (!line.y) {
      if (idx === 0) line.y = line.size + 10 // top
      else if (idx === 1) line.y = gElCanvas.height - 10 // bottom
      else line.y = centerY
    }

    gCtx.fillText(line.txt, line.x, line.y)

    line.width = gCtx.measureText(line.txt).width
    line.height = line.size

    if (idx === gMeme.selectedLineIdx) {
      drawTextFrame(line)
    }
  })
}

function drawTextFrame(line) {
  const padding = 10
  let rectX = line.x
  if (line.align === "center") rectX = rectX - line.width / 2
  if (line.align === "right") rectX = rectX - line.width

  const rectY = line.y - line.height

  gCtx.fillStyle = "rgba(255,255,255,0.3)"
  gCtx.strokeStyle = "white"

  gCtx.fillRect(
    rectX - padding,
    rectY - padding,
    line.width + padding * 2,
    line.height + padding * 2
  )
  gCtx.strokeRect(
    rectX - padding,
    rectY - padding,
    line.width + padding * 2,
    line.height + padding * 2
  )
}

function onSwitchLines() {
  switchLine()
  renderInputTxt()
  renderMeme()
}

function onAddLine() {
  addLine()
  renderInputTxt()
  renderMeme()
}

function renderInputTxt() {
  const textInput = document.querySelector(".user-text")
  const meme = getMeme()

  if (meme.lines.length === 0) {
    textInput.value = ""
    return
  }
  textInput.value = gMeme.lines[gMeme.selectedLineIdx].txt
}

function getMemeImg(imgId) {
  return gImgs.find((img) => img.id === imgId)
}

function onImgSelect(imgId) {
  resetMemeLines()
  setImg(imgId)

  var gallery = document.querySelector(".gallery-container")
  var editor = document.querySelector(".editor-container")
  var galleryActions = document.querySelector(".gallery-actions")
  gallery.classList.add("hidden")
  galleryActions.classList.add("hidden")

  editor.classList.remove("hidden")

  renderMeme()
}

function onSetLineTxt(txt) {
  setLineTxt(txt)
  renderMeme()
}

function onDownloadImg(elLink) {
  var imgContent = gElCanvas.toDataURL()
  elLink.href = imgContent
  // Set a name for the downloaded file
  elLink.download = "my-img"
}

function onSetColor(color) {
  setColor(color)
  renderMeme()
}

function onChangeValue(value) {
  changeValue(value)
  renderMeme()
}

function onCanvasClick(ev) {
  const meme = getMeme()
  const pos = getEvPos(ev)

  const clickedLineIdx = meme.lines.findIndex((line) =>
    isTextClicked(pos, line)
  )

  if (clickedLineIdx === -1) return

  gMeme.selectedLineIdx = clickedLineIdx
  renderInputTxt()
  renderMeme()
}

function onSetAlign(align) {
  const meme = getMeme()
  const line = meme.lines[meme.selectedLineIdx]
  line.align = align
  renderMeme()
}

function onMoveLine(value) {
  moveLine(value)
  renderMeme()
}

function onDeleteLine() {
  deleteLine()
  renderMeme()
}

function onRandomMeme() {
  const randImgId = getRandomIntInclusive(1, 18)
  setRandomMeme(randImgId)
  onImgSelect(randImgId)
}

function onNavClick(section) {
  const gallery = document.querySelector(".gallery-container")
  const galleryActions = document.querySelector(".gallery-actions")
  const savedMemes = document.querySelector(".saved-memes-container")
  const editor = document.querySelector(".editor-container")

  gallery.classList.add("hidden")
  galleryActions.classList.add("hidden")
  savedMemes.classList.add("hidden")
  editor.classList.add("hidden")

  if (section === "gallery") {
    gallery.classList.remove("hidden")
    galleryActions.classList.remove("hidden")
  }
  if (section === "savedMemes") {
    savedMemes.classList.remove("hidden")
    renderSavedMemes()
  }
  onClearFilter()
}


function onUploadImg(ev) {
  ev.preventDefault()
  const canvasData = gElCanvas.toDataURL('image/jpeg')

  // After a succesful upload, allow the user to share on Facebook
  function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    console.log('encodedUploadedImgUrl:', encodedUploadedImgUrl)
    document.querySelector('.share-container').innerHTML = `
            <button class="btn-facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}')">
                Share on Facebook  
            </button>`
  }

  uploadImg(canvasData, onSuccess)
}

async function uploadImg(imgData, onSuccess) {
  const CLOUD_NAME = 'webify'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  const formData = new FormData()
  formData.append('file', imgData)
  formData.append('upload_preset', 'webify')

  try {
    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData
    })
    const data = await res.json()
    console.log('Cloudinary response:', data)
    onSuccess(data.secure_url)

  } catch (err) {
    console.log(err)
  }
}
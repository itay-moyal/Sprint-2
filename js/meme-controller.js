"use strict"

var gCtx
var gElCanvas
var gIsMouseDown = false

function onInit() {
  gElCanvas = document.querySelector("canvas")
  gCtx = gElCanvas.getContext("2d")
  renderGallery()
}
//renders an image on the canvas and a line of text on top

function renderMeme() {
  const memeImg = getMemeImg(gMeme.selectedImgId)
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
  var height = gElCanvas.height / 2
  var width = gElCanvas.width / 2

  gMeme.lines.forEach((memeLine, idx) => {
    gCtx.font = `${memeLine.size}px Arial`
    gCtx.fillStyle = memeLine.color
    gCtx.fillText(memeLine.txt, width, height + idx * 30)
    
    
  })
}

function onSwitchLines(){
  if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
    gMeme.selectedLineIdx = 0
  }else{
    gMeme.selectedLineIdx++
  }
  
  renderInputTxt()
  renderMeme()
}

function onAddLine() {
  gMeme.lines.push({
    txt: "New Text",
    size: 20,
    color: "black",
  })

  gMeme.selectedLineIdx = gMeme.lines.length - 1
  renderInputTxt()
  renderMeme()
}

function renderInputTxt(){
  var textInput = document.querySelector('.user-text')
  textInput.value = gMeme.lines[gMeme.selectedLineIdx].txt
}

function getMemeImg(imgId) {
  return gImgs.find((img) => img.id === imgId)
}

function onImgSelect(imgId) {
  setImg(imgId)

  var gallery = document.querySelector(".gallery-container")
  var editor = document.querySelector(".editor-container")
  gallery.classList.add("hidden")
  editor.classList.remove("hidden")

  renderMeme()
}

function onSetLineTxt(txt) {
  setLineTxt(txt)
  renderMeme()
}

function onDownloadImg(elLink) {
  var imgContent = gElCanvas.toDataURL()
  console.log("imgContent:", imgContent)
  elLink.href = imgContent
  // Set a name for the downloaded file
  elLink.download = "my-img"
}

function onSetColor(color) {
  const memeLine = gMeme.lines[gMeme.selectedLineIdx]
  memeLine.color = color
  renderMeme()
}

function changeValue(value) {
  const memeLine = gMeme.lines[gMeme.selectedLineIdx]
  const fontsize = value + memeLine.size
  memeLine.size = fontsize
  gCtx.font = `${memeLine.size}px Arial`
  renderMeme()
}

// function onSavePic() {
//   const data = gElCanvas.toDataURL()
//   addPic(data)
//   renderPics()
// }

// function renderPics() {
//   const pics = getPics()
//   const strHTMLs = pics.map((pic) => {
//     return `
//         <article>
//             <button onclick="onRemovePic('${pic.id}')">X</button>
//             <img src="${pic.data}" onclick="onSelectPic('${pic.id}')">
//         </article>
//         `
//   })

//   const elPics = document.querySelector(".pic-list")
//   elPics.innerHTML = strHTMLs.join("")
// }

// function onRemovePic(picId) {
//   removePic(picId)
//   renderPics()
// }

// function onSelectPic(picId) {
//   const pic = getPicById(picId)
//   const img = new Image()
//   img.src = pic.data
//   img.onload = () => {
//     renderImg(img)
//   }
// }

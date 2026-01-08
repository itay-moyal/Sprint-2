"use strict"

var gImgs = [
  { id: 1, url: "imgs-square/1.jpg", keywords: ["funny", "cat"] },
  { id: 2, url: "imgs-square/2.jpg", keywords: ["funny", "cat"] },
  { id: 3, url: "imgs-square/3.jpg", keywords: ["funny"] },
  { id: 4, url: "imgs-square/4.jpg", keywords: ["funny" ] },
  { id: 5, url: "imgs-square/5.jpg", keywords: ["funny", "cat"] },
  { id: 6, url: "imgs-square/6.jpg", keywords: ["funny", "cat"] },
  { id: 7, url: "imgs-square/7.jpg", keywords: ["funny" ] },
  { id: 8, url: "imgs-square/8.jpg", keywords: ["funny", "cat"] },
  { id: 9, url: "imgs-square/9.jpg", keywords: [ "cat"] },
  { id: 10, url: "imgs-square/10.jpg", keywords: ["funny", "cat" , "baby"] },
  { id: 11, url: "imgs-square/11.jpg", keywords: ["cat", "baby"] },
  { id: 12, url: "imgs-square/12.jpg", keywords: ["funny", "cat"] },
  { id: 13, url: "imgs-square/13.jpg", keywords: ["funny", "cat"] },
  { id: 14, url: "imgs-square/14.jpg", keywords: ["money", "cat"] },
  { id: 15, url: "imgs-square/15.jpg", keywords: ["funny", "cat"] },
  { id: 16, url: "imgs-square/16.jpg", keywords: ["money", "cat"] },
  { id: 17, url: "imgs-square/17.jpg", keywords: ["money", "cat"] },
  { id: 18, url: "imgs-square/18.jpg", keywords: ["cat"] },
]

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: getRandomText(),
      size: 20,
      color: "red",
      x: 0,
      y: 0,
      align: "center",
    },
    {
      txt: getRandomText(),
      size: 20,
      color: "black",
      x: 0,
      y: 0,
      align: "center",
    },
  ],
}
var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

function getMeme() {
  return gMeme
}

function setLineTxt(txt) {
  const memeLine = gMeme.lines[gMeme.selectedLineIdx]
  memeLine.txt = txt
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
}

function addLine() {
  gMeme.lines.push({
    txt: getRandomText(),
    size: 20,
    color: "black",
    x: gElCanvas.width / 2,
    y: gElCanvas.height / 2,
    align: "center",
  })

  gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function switchLine() {
  if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
    gMeme.selectedLineIdx = 0
  } else {
    gMeme.selectedLineIdx++
  }
}

function changeValue(value) {
  const memeLine = gMeme.lines[gMeme.selectedLineIdx]
  const fontsize = value + memeLine.size
  memeLine.size = fontsize
  gCtx.font = `${memeLine.size}px Arial`
}

function setColor(color) {
  const memeLine = gMeme.lines[gMeme.selectedLineIdx]
  memeLine.color = color
}

function isTextClicked(pos, line) {
  return (
    pos.x >= line.x - line.width / 2 &&
    pos.x <= line.x + line.width / 2 &&
    pos.y >= line.y - line.height &&
    pos.y <= line.y
  )
}

function getEvPos(ev) {
  const TOUCH_EVS = ["touchstart", "touchmove", "touchend"]

  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }

  if (TOUCH_EVS.includes(ev.type)) {
    // Prevent triggering the mouse ev
    ev.preventDefault()
    // Gets the first touch point
    ev = ev.changedTouches[0]
    // Calc the right pos according to the touch screen
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}

function moveLine(value) {
  const meme = getMeme()
  const line = meme.lines[meme.selectedLineIdx]
  line.y += value
}

function deleteLine() {
  const meme = getMeme()
  if (meme.lines.length === 0) return

  meme.lines.splice(meme.selectedLineIdx, 1)
  if (meme.selectedLineIdx > 0) {
    meme.selectedLineIdx--
  }
}

function setRandomMeme(randImgId) {
  gMeme.lines = [
    {
      txt: getRandomText(),
      size: 20,
      color: "white",
      x: 0,
      y: 0,
      align: "center",
    },
    {
      txt: getRandomText(),
      size: 20,
      color: "white",
      x: 0,
      y: 0,
      align: "center",
    },
  ]
  gMeme.selectedLineIdx = 0
}

function resetMemeLines() {
  ;(gMeme.lines = [
    {
      txt: getRandomText(),
      size: 20,
      color: "red",
      x: 0,
      y: 0,
      align: "center",
    },
    {
      txt: getRandomText(),
      size: 20,
      color: "black",
      x: 0,
      y: 0,
      align: "center",
    },
  ]),
    (gMeme.selectedLineIdx = 0)
}

function getRandomText() {
  const texts = [
    "I sometimes eat Falafel",
    "I sometimes don't",
    "Life is fun",
    "Coding is fun",
    "Monday vibes",
    "Just chill",
    "Keep smiling",
    "Coffee first",
  ]
  const idx = getRandomIntInclusive(0, texts.length - 1)
  return texts[idx]
}

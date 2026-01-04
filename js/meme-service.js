"use strict"

var gImgs = [
  { id: 1, url: "imgs-square/1.jpg", keywords: ["funny", "cat"] },
  { id: 2, url: "imgs-square/2.jpg", keywords: ["funny", "cat"] },
  { id: 3, url: "imgs-square/3.jpg", keywords: ["funny", "cat"] },
  { id: 4, url: "imgs-square/4.jpg", keywords: ["funny", "cat"] },
  { id: 5, url: "imgs-square/5.jpg", keywords: ["funny", "cat"] },
  { id: 6, url: "imgs-square/6.jpg", keywords: ["funny", "cat"] },
  { id: 7, url: "imgs-square/7.jpg", keywords: ["funny", "cat"] },
  { id: 8, url: "imgs-square/8.jpg", keywords: ["funny", "cat"] },
  { id: 9, url: "imgs-square/9.jpg", keywords: ["funny", "cat"] },
  { id: 10, url: "imgs-square/10.jpg", keywords: ["funny", "cat"] },
  { id: 11, url: "imgs-square/11.jpg", keywords: ["funny", "cat"] },
  { id: 12, url: "imgs-square/12.jpg", keywords: ["funny", "cat"] },
  { id: 13, url: "imgs-square/13.jpg", keywords: ["funny", "cat"] },
  { id: 14, url: "imgs-square/14.jpg", keywords: ["funny", "cat"] },
  { id: 15, url: "imgs-square/15.jpg", keywords: ["funny", "cat"] },
  { id: 16, url: "imgs-square/16.jpg", keywords: ["funny", "cat"] },
  { id: 17, url: "imgs-square/17.jpg", keywords: ["funny", "cat"] },
  { id: 18, url: "imgs-square/18.jpg", keywords: ["funny", "cat"] },
]

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: "I sometimes eat Falafel",
      size: 20,
      color: "red",
    },
    {
      txt: "I sometimes don't",
      size: 20,
      color: "black",
    },
  ],
}
var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

function getMeme() {
  renderMeme()
}

function setLineTxt(txt) {
  const memeLine = gMeme.lines[gMeme.selectedLineIdx]
  memeLine.txt = txt
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
}

'use strict'

function onSaveMeme() {
  const data = gElCanvas.toDataURL()
  addMeme(data)
  renderSavedMemes()
}

function renderSavedMemes() {
  const memes = getSavedMemes()
  const strHTMLs = memes.map(meme => {
    return `
        <article>
            <button onclick="onRemoveMeme('${meme.id}')">X</button>
            <img src="${meme.data}" onclick="onSelectMeme('${meme.id}')">
        </article>
        `
  })

  const elSavedMemes = document.querySelector('.saved-memes-container')
  elSavedMemes.innerHTML = strHTMLs.join('')
}

function onRemoveMeme(memeId) {
  removeSavedMeme(memeId)
  renderSavedMemes()
}

function onSelectMeme(memeId) {
  const meme = getMemeById(memeId)
  const img = new Image()
  img.src = meme.data
  img.onload = () => {
    renderImg(img)
  }
}

'use strict'

const STORAGE_KEY = 'memeDB'

var gSavedMemes = loadFromStorage(STORAGE_KEY) || []

function getSavedMemes() {
    return gSavedMemes
}

function removeSavedMeme(memeId) {
    const memeIdx = gSavedMemes.findIndex(meme => memeId === meme.id)
    gSavedMemes.splice(memeIdx, 1)
    _saveMemesToStorage()
}

function addMeme(data) {
    const meme = _createMeme(data)
    gSavedMemes.unshift(meme)
    _saveMemesToStorage()
    return meme
}

function getMemeById(memeId) {
    return gSavedMemes.find(meme => memeId === meme.id)
}

function _createMeme(data) {
    return {
        id: makeId(),
        createdAt: Date.now(),
        data
    }
}

function _saveMemesToStorage() {
    saveToStorage(STORAGE_KEY, gSavedMemes)
}

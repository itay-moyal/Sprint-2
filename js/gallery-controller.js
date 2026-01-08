"use strict"

function renderGallery() {
  var gallery = document.querySelector(".gallery-container")
  gallery.innerHTML = ""

  const showImgs = gImgs.filter(img =>{
    if (!gFilterBy) return true
    return img.keywords.some(key => key.toLowerCase().includes(gFilterBy))
  })

  showImgs.forEach((img) => {
    gallery.innerHTML += `
    <div class="image-item">
    <img 
    src="${img.url}" 
    onclick="onImgSelect(${img.id})" />
    </div>`
  })
}


function onFilter(){
  const elInput = document.querySelector('.filter-input')
  gFilterBy = elInput.value.toLowerCase()
  renderGallery()
}

function onClearFilter(){
  const elInput = document.querySelector('.filter-input')
  gFilterBy = ''
  elInput.value = ''
  renderGallery()
}
"use strict"

function renderGallery() {
  var gallery = document.querySelector(".gallery-container")
  gallery.innerHTML = ""
  gImgs.forEach((img) => {
    gallery.innerHTML += `
    <div class="image-item">
    <img 
    src="${img.url}" 
    onclick="onImgSelect(${img.id})" />
    </div>`
  })
}

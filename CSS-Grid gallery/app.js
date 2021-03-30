const gallery = document.getElementById("gallery");
const images = [
  "https://images.unsplash.com/photo-1616415396127-0ae1978ae375?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfEd0ckJTY3YxYjVNfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1607250589107-b8efff3a8d5a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDF8R3RyQlNjdjFiNU18fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1616909905038-c08ffa975610?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8R3RyQlNjdjFiNU18fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1616909687741-794aec8bf1bc?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8R3RyQlNjdjFiNU18fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1531608139434-1912ae0713cd?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8R3RyQlNjdjFiNU18fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1616868126182-14f3003d98dc?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8R3RyQlNjdjFiNU18fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1587395239521-1c5ea7873d63?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDd8R3RyQlNjdjFiNU18fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1616784825100-35870fcf1bf1?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8R3RyQlNjdjFiNU18fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1616774651823-2f4ee843e4e2?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDl8R3RyQlNjdjFiNU18fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1615990531332-e8725ae1e3a3?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfEd0ckJTY3YxYjVNfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1616693139578-f1c17deb0d4f?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDExfEd0ckJTY3YxYjVNfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1580250642511-1660fe42ad58?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1615390265246-72d3198a48b7?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1615479865224-b07bb46a5f56?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8NnNNVmpUTFNrZVF8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1616627577385-5c0c4dab0257?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDR8NnNNVmpUTFNrZVF8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1616795795564-fc2f3b2e9723?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8NnNNVmpUTFNrZVF8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1616860895045-13553f397d64?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8NnNNVmpUTFNrZVF8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1616852048024-432d974cb394?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDd8NnNNVmpUTFNrZVF8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1616852282416-9a41299a1828?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8NnNNVmpUTFNrZVF8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1616899978465-213d4e6058e5?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDl8NnNNVmpUTFNrZVF8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549599273-86affaa16e00?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfDZzTVZqVExTa2VRfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1557360171-c24ee265c27b?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDExfDZzTVZqVExTa2VRfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1558085951-ffa47f4f12b9?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDEyfDZzTVZqVExTa2VRfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1558166833-b59460e5439c?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfDZzTVZqVExTa2VRfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1616889415529-8b9c7a4aef3b?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fDZzTVZqVExTa2VRfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1616528218880-78ce721c72b9?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDE1fDZzTVZqVExTa2VRfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1611883653995-d1b44ad58132?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDE2fDZzTVZqVExTa2VRfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1611883308863-2dd99941c7ee?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDE3fDZzTVZqVExTa2VRfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1613172837551-484eb5f450a5?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fDZzTVZqVExTa2VRfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1616626578044-e5689b3aa390?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDE5fDZzTVZqVExTa2VRfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1601703149866-a33416ff836f?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDIwfDZzTVZqVExTa2VRfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1539400504539-7918aa66f657?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfDZzTVZqVExTa2VRfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
];

addImageToBody();

function addImageToBody() {
  images.forEach((image, index) => {
    gallery.innerHTML += `
          <div class="image">
            <img src="${image}" alt="image${index}">
          </div>
  `;
  });
}

// Showing full image on click
const fullImage = document.querySelectorAll(".image");
let j;
for (let i = 0; i < fullImage.length; i++) {
  fullImage[i].addEventListener("click", function () {
    j = i;
    addFullImage(i);
  });
}

function addFullImage(i) {
  const fullImageEL = document.getElementById("fullImage");
  gallery.classList.add("stop-scrolling");
  fullImageEL.style.display = "block";
  fullImageEL.innerHTML = `
    <button onclick = "exitImage()">
      <i class="fa fa-times-circle fa-2x" aria-hidden="true"></i>
    </button>    
      `;

  if (i != 0) {
    fullImageEL.innerHTML += `
      <button onclick = "prev()">
        <i id="prev" class="fa fa-chevron-left fa-2x" aria-hidden="true"></i>
      </button>
      `;
  }

  fullImageEL.innerHTML += `<img src="${images[i]}" alt="image${i}">`;

  if (i != images.length - 1) {
    fullImageEL.innerHTML += `
    <button onclick = "next()">
      <i id="next" class="fa fa-chevron-right fa-2x" aria-hidden="true"></i>
    </button>
    `;
  }
}

function exitImage() {
  const fullImageEL = document.getElementById("fullImage");
  fullImageEL.style.display = "none";
  gallery.classList.remove("stop-scrolling");
}

function next() {
  if (j != (images.length-1)) {
    addFullImage(++j);
  }
}

function prev() {
  if (j != 0) {
    addFullImage(--j);
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key == "ArrowLeft") {
    prev();
  }
  if (e.key == "ArrowRight") {
    next();
  }
  if (e.key == "Escape") {
    exitImage();
  }
});

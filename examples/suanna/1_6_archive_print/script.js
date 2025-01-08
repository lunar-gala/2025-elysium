document.addEventListener("mousemove", (event) => {
  updateCaption();
});

// Carousel functionality
const carousel = document.querySelector(".carousel");
const images = document.querySelectorAll(".carousel img");
const captionContainer = document.getElementById("carousel-caption");
const titleContainer = document.getElementById("carousel-title");
const prev = document.querySelector(".nav.prev");
const next = document.querySelector(".nav.next");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxClose = document.querySelector(".lightbox-close");

let index = 0;

function showImage(idx) {
  const imageWidth = images[0].clientWidth;
  carousel.style.transform = `translateX(${-idx * imageWidth}px)`;
  updateCaption();
}

function updateCaption() {
  const currentImage = images[index];
  const titleText = currentImage.getAttribute("title");
  const captionText = currentImage.getAttribute("caption");
  titleContainer.textContent = titleText;
  captionContainer.textContent = captionText;
}

prev.addEventListener("click", () => {
  index = index > 0 ? index - 1 : images.length - 1;
  showImage(index);
});

next.addEventListener("click", () => {
  index = index < images.length - 1 ? index + 1 : 0;
  showImage(index);
});

images.forEach((img, idx) => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImage.src = img.src;
  });
});

lightboxClose.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Close lightbox on clicking outside the image
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

// Adjust carousel on window resize
window.addEventListener("resize", () => showImage(index));

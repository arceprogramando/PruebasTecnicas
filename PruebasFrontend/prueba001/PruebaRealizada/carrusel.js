let carousel = document.getElementById('carousel');
let images = Array.from(carousel.getElementsByClassName('carousel-image'));
let index = 0;

function rotateCarousel() {
  carousel.appendChild(images[index]);
  images = Array.from(carousel.getElementsByClassName('carousel-image'));
}

let intervalId = setInterval(rotateCarousel, 2000);

carousel.addEventListener('mouseover', function () {
  clearInterval(intervalId);
});

carousel.addEventListener('mouseout', function () {
  intervalId = setInterval(rotateCarousel, 2000);
});

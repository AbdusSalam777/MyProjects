let currentIndex = 0;
const images = document.querySelectorAll(".images");

function showNextImage() {
    images[currentIndex].classList.remove("show"); // Hide current image
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add("show"); // Show next image
}

// Change image every 3 seconds
setInterval(showNextImage, 3000);

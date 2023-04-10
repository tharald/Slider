const singleImage = document.getElementById('single-image');
const selectedImage = sessionStorage.getItem('selectedImage');

if (selectedImage) {
    singleImage.src = selectedImage;
} else {
    // Handle the case where no image is selected, e.g., navigate back to the gallery page
    window.location.href = 'gallery.html';
}

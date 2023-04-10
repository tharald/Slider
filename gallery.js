document.addEventListener("DOMContentLoaded", function () {
    const galleryItems = document.querySelectorAll(".gallery-item");

    galleryItems.forEach(item => {
        item.addEventListener("click", function () {
            const url = item.getAttribute("data-url");
            window.location.href = url;
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Existing code to handle gallery item clicks

    const uploadButton = document.getElementById("upload-button");
    uploadButton.addEventListener("click", function () {
        alert("This function will be implemented later.");
    });
});

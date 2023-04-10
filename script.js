const slider = document.getElementById('slider');
const after = document.querySelector('.after');
let isDragging = false;

slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    e.preventDefault();
});

slider.addEventListener('touchstart', (e) => {
    isDragging = true;
    window.addEventListener('touchmove', onMouseMove);
    window.addEventListener('touchend', onMouseUp);
    e.preventDefault();
});

function onMouseMove(e) {
    if (!isDragging) return;
    const sliderWidth = slider.clientWidth;
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const x = clientX - slider.parentElement.getBoundingClientRect().left - (sliderWidth / 2);
    const width = slider.parentElement.clientWidth - sliderWidth;
    let percent = (x / width) * 100;

    if (percent < 0) {
        percent = 0;
    } else if (percent > 100 - (sliderWidth * 100 / slider.parentElement.clientWidth)) {
        percent = 100 - (sliderWidth * 100 / slider.parentElement.clientWidth);
    }

    slider.style.left = `${percent}%`;
    after.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
    e.preventDefault();
}

function onMouseUp() {
    isDragging = false;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('touchmove', onMouseMove);
    window.removeEventListener('touchend', onMouseUp);
}

function adjustContainerSize() {
    const image = document.querySelector(".before img");
    const container = document.querySelector(".slider-container");

    const updateContainerSize = () => {
        const padding = 20; // Set padding around the container (in pixels)
        const windowWidth = window.innerWidth - 2 * padding;
        const windowHeight = window.innerHeight - 2 * padding - 60; // Subtract 60 to account for back button and its padding
        const imgAspectRatio = image.naturalWidth / image.naturalHeight;
        const windowAspectRatio = windowWidth / windowHeight;

        let imgWidth, imgHeight;

        if (imgAspectRatio > windowAspectRatio) {
            imgWidth = Math.min(windowWidth, image.naturalWidth);
            imgHeight = imgWidth / imgAspectRatio;
        } else {
            imgHeight = Math.min(windowHeight, image.naturalHeight);
            imgWidth = imgHeight * imgAspectRatio;
        }

        // Prevent container size from exceeding the image's natural dimensions
        imgWidth = Math.min(imgWidth, image.naturalWidth);
        imgHeight = Math.min(imgHeight, image.naturalHeight);

        container.style.width = imgWidth + "px";
        container.style.height = imgHeight + "px";
    };

    if (image.complete) {
        updateContainerSize();
    } else {
        image.addEventListener("load", updateContainerSize);
    }

    // Update container size when the window is resized
    window.addEventListener("resize", updateContainerSize);
}



function updateClipPathOnResize() {
    window.addEventListener('resize', () => {
        const slider = document.getElementById('slider');
        const afterDiv = document.querySelector('.after');
        const container = document.querySelector('.slider-container');
        const containerWidth = container.clientWidth;
        const sliderPosition = slider.offsetLeft;
        const percentage = (sliderPosition / containerWidth) * 100;
        
        afterDiv.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    });
}

adjustContainerSize();
updateClipPathOnResize();

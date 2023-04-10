const slider = document.getElementById('slider');
const after = document.querySelector('.after');
let isDragging = false;

slider.addEventListener('mousedown', (e) => {
    isDragging = true;
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const x = e.pageX - slider.getBoundingClientRect().left;
    const width = slider.parentElement.clientWidth;
    const percent = (x / width) * 100;

    if (percent >= 0 && percent <= 100) {
        slider.style.left = `${percent}%`;
        after.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
    }
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

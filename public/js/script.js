let slideIndex = 0;

function showSlides(slideshowId) {
    let slides = document.querySelectorAll(`#${slideshowId} .slide`);

    slides.forEach(slide => slide.style.display = "none");
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; } 
    slides[slideIndex - 1].style.display = "block";  
}

function plusSlides(n, slideshowId) {
    let slides = document.querySelectorAll(`#${slideshowId} .slide`);

    slides[slideIndex - 1].style.display = "none";

    slideIndex += n;

    if (slideIndex > slides.length) { slideIndex = 1; }  
    if (slideIndex < 1) { slideIndex = slides.length; } 

    slides[slideIndex - 1].style.display = "block";
}


window.onload = function() {
    showSlides('right-box-slideshow');  
}

setInterval(function() {
    showSlides('right-box-slideshow');
}, 3000);

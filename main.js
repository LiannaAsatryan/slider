const slider = $('.slider');
const slides = $('.slide');
const slidesWidth = slides.outerWidth();
const visibleSlides = 3;
const prevBtn = $('#prevBtn');
const nextBtn = $('#nextBtn');
let currentLastIndex = Math.floor(slides.length / 2);

showSlide(currentLastIndex);

function goToNextSlide() {
    if (currentLastIndex + 1 < slides.length) {
        currentLastIndex++;
        showSlide(currentLastIndex);
    }
}

function goToPrevSlide() {
    if (currentLastIndex - visibleSlides + 1 > 0) {
        currentLastIndex--;
        //showSlide(currentLastIndex);

        const leftPosition = -currentLastIndex * slidesWidth;
        slider.stop().animate({
            left: leftPosition
        }, 500, function() {
            showSlide(currentLastIndex)});
    }


}

function showSlide(index) {
    for(let i = 0; i < slides.length; i++) {
        $(slides[i]).hide();
    }

    for(let i = 0; i < visibleSlides; i++) {
        $(slides[Math.floor(index - visibleSlides / 2 + i)]).show();
    }
}


prevBtn.on('click', function() {
    goToPrevSlide();
});

nextBtn.on('click', function () {
    goToNextSlide();
});
const slider = $('.slider');
const slides = $('.slide');
const slidesWidth = slides.outerWidth();
const visibleSlides = 3;
const prevBtn = $('#prevBtn');
const nextBtn = $('#nextBtn');
let currentLastIndex = Math.floor(slides.length / 2);
let gap = parseFloat(slider.css('gap'));
let sliderWidth = parseFloat(slider.css('max-width'));
let currentPosition = 0;




function createPagination() {
    const pagination = $('.pagination');
    for (let i = 0; i < slides.length; i++) {
        const dot = $('<span class="dot"></span>');
        dot.on('click', function() {
            goToSlide(i);
            $(slides[i]).css({
                'backgroundColor': '#F5DDE3',
                'transition': 'background-color 0.3s ease',
            });
            setTimeout(function () {
                $(slides[i]).css({
                    'backgroundColor': '#EABEC3',
                    'transition': 'background-color 0.3s ease',
                });
            }, 600);
        });
        pagination.append(dot);
    }
}

function updatePagination(currentSlideIndex) {
    $('.dot').removeClass('active');
    $('.dot').eq(currentSlideIndex).addClass('active');
}

// Function to go to a specific slide
function goToSlide(slideIndex) {
    if(slideIndex == 0) {
        currentPosition = 0;
    } else if (slideIndex == slides.length - 1) {
        currentPosition = (slides.length - visibleSlides)*(slidesWidth + gap);
    } else {
        currentPosition = (slideIndex - 1) * (slidesWidth + gap);
    }
    $(slides[0]).stop().animate({ marginLeft: -currentPosition }, 'smooth');
    updatePagination(slideIndex);
    index = slideIndex;
}





function goToNextSlide() {

    if (currentPosition < (slides.length - visibleSlides)*(slidesWidth + gap)) {
        currentPosition += slidesWidth + gap;
        $(slides[0]).stop().animate({ marginLeft: -currentPosition }, 'smooth');
    }
}

function goToPrevSlide() {

    if (currentPosition > 0) {
        currentPosition -= (slidesWidth + gap);
        $(slides[0]).stop().animate({ marginLeft: -currentPosition }, 'smooth');
    }
}


prevBtn.on('click', function() {
    goToPrevSlide();
});

nextBtn.on('click', function () {
    goToNextSlide();
});

createPagination();


slides.draggable({
    axis: 'x',
    containment: 'parent',
    cursor: 'move',
    start: function(event, ui) {
        $(this).addClass('dragging');
        ui.helper.css('width', slidesWidth); // Set width to maintain the slide width during drag
        $(this).data('startLeft', ui.position.left);
    },
    drag: function(event, ui) {
        let startLeft = $(this).data('startLeft');
        let mouseDelta = ui.position.left - startLeft;
        let currentIndex = $(this).index();
        goToSlide(currentIndex);
    },
    stop: function() {
        $(this).removeClass('dragging').removeAttr('style');
        slides.removeAttr('style'); // Reset styles after dragging
    }
});
















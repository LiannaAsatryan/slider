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


// Mouse events

/*let isDragging = false;
let startPosition;
let currentInd = 0;
let currentTranslate;
let prevTranslate = 0;
let currentPos = 0;
slider.on('mousedown', e => {
    isDragging = true;
    startPosition = e.clientX;
    slides.css('cursor', 'grabbing');
});

slider.on('mousemove', e => {
    if (isDragging) {
        currentPos = e.clientX;
        currentTranslate = prevTranslate + currentPos - startPosition;
        if (currentTranslate > 0) {
            currentTranslate = 0; // Prevent sliding to the left beyond the start
        } else if (currentTranslate < -(slidesWidth * (slides.length - 2) + gap*(slides.length - 1) - sliderWidth)) {
            currentTranslate = -(slidesWidth * (slides.length - 2) + gap*(slides.length - 1) - sliderWidth); // Prevent sliding to the right beyond the end
        }
        slides.css('transform', `translateX(${currentTranslate}px)`);
    }
});

slider.on('mouseup', () => {

    if (!isDragging) return;
    isDragging = false;
    const dragDistance = currentTranslate - prevTranslate;
    if (dragDistance < -100 && index < slides.length - 1) {
        index++;
    } else if (dragDistance > 100 && index > 0) {
        index--;
    }
    goToSlide(index);

    prevTranslate = currentTranslate;

    slides.css('cursor', 'auto');
});*/


















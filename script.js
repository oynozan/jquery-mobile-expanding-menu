let startPosY = 0;
let endPosY = 0;
let currentPosY = 0;

const sliderContainer = $(".mobile-slider-container");

function slideUp(w, expandDirection = false) {
    if (w < 40) w = 40;
    else if (w > 200) w = 200;

    if (!expandDirection) 
    sliderContainer.css({height: w.toString()+"px"});

    else {
        switch(expandDirection) {
            case 1:
                sliderContainer.animate({height: "200px"}, 250);
                break;
            case -1:
                sliderContainer.animate({height: "40px"}, 250);
                break;
        }
    }
}

let currentH;
sliderContainer.on("touchstart", function(e) {
    startPosY = e.changedTouches[0].screenY;
    currentH = parseInt(sliderContainer.css("height").slice(0, -2));
});

sliderContainer.on("touchmove", function(e) {
    currentPosY = e.changedTouches[0].screenY;

    if (startPosY > currentPosY) slideUp(
        currentH + (startPosY - currentPosY)
    );
    else if (startPosY < currentPosY) slideUp(
        currentH - (currentPosY - startPosY)
    );
});

sliderContainer.on("touchend", function(e) {
    endPosY = e.changedTouches[0].screenY;

    if (startPosY > endPosY) slideUp(0, 1)
    else if (startPosY < endPosY) slideUp(0, -1);
});
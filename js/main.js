$(document).ready(function () {


    $('.fa-bars').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('load scroll', function () {
        $('.fa-bars').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if ($(window).scrollTop() > 30) {
            $('.header').css({ 'background': '#6C5CE7', 'box-shadow': '0 .2rem .5rem rgba(0,0,0,.4)' });
        } else {
            $('.header').css({ 'background': 'none', 'box-shadow': 'none' });
        }
    });


    $('.accordion-header').click(function () {
        $('.accordion .accordion-body').slideUp();
        $(this).next('.accordion-body').slideDown();
        $('.accordion .accordion-header span').text('+');
        $(this).children('span').text('-');
    });
});






const progress = document.getElementById("progress");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const cricles = document.querySelectorAll(".circle");

let currentActive = 1;

next.addEventListener("click", () => {
    if (currentActive < cricles.length) {
        currentActive++;
    }
    update();
});

prev.addEventListener("click", () => {
    if (currentActive > 1) {
        currentActive--;
    }
    update();
});

function update() {
    cricles.forEach((circle, idx) => {
        if (idx < currentActive) {
            circle.classList.add("active");
        } else {
            circle.classList.remove("active");
        }
    });

    progress.style.width =
        ((currentActive - 1) / (cricles.length - 1)) * 100 + "%";

    if (currentActive === 1) {
        prev.disabled = true;
    } else if (currentActive === cricles.length) {
        next.disabled = true;
    } else {
        prev.disabled = false;
        next.disabled = false;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const readMoreButton = document.getElementById("readMoreButton");
    const moreText = document.getElementById("moreText");

    readMoreButton.addEventListener("click", function () {
        if (moreText.style.display === "none" || moreText.style.display === "") {
            moreText.style.display = "inline";
            readMoreButton.innerText = "Read Less";
        } else {
            moreText.style.display = "none";
            readMoreButton.innerText = "Read More";
        }
    });
});

//first page
let lastScrollY = window.scrollY; 
let timeoutID = null; 

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
}

function restartAnimation() {
    const titleElement = document.getElementById('title');
    titleElement.style.animation = 'none'; 
    void titleElement.offsetWidth; 
    titleElement.style.animation = 'digitando 2s steps(12), blink 0.9s infinite'; 
    titleElement.style.opacity = '1'; 
}

window.addEventListener('scroll', function () {
    const titleElement = document.getElementById('title');
    
    if (!isInViewport(titleElement)) {
        titleElement.style.opacity = '0'; 
        titleElement.style.animation = 'none'; 
    } else {
        if (window.scrollY === 0) {
            if (timeoutID) {
                clearTimeout(timeoutID);
            }
            timeoutID = setTimeout(restartAnimation, 100);
        }
    }
    lastScrollY = window.scrollY;
});

//scroll down
window.addEventListener('scroll', function() {
    var rollElement = document.querySelector('.roll');
    if (window.scrollY > 50) { 
        rollElement.style.opacity ='0';
    } else {
        rollElement.style.opacity = '1';
    }
});

//menu hamburguer
$(document).ready(function () {
    $('nav').hide(); 

    $('.menu-hamburger').click(function () {
        $('nav').slideToggle();
    });
});

//seta
document.querySelector('.left-btn').addEventListener('click', function() {
    document.querySelector('.icon-grid').scrollBy({
        left: -100, // Ajuste a distância da rolagem, se necessário
        behavior: 'smooth'
    });
});

document.querySelector('.right-btn').addEventListener('click', function() {
    document.querySelector('.icon-grid').scrollBy({
        left: 100, // Ajuste a distância da rolagem, se necessário
        behavior: 'smooth'
    });
});
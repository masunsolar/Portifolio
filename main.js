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

/*seta que ta indo pra casa do carai >:(
document.addEventListener('DOMContentLoaded', function() {
    const scrollButtons = document.querySelectorAll('.scroll-btn');

    scrollButtons.forEach(button => {
        button.addEventListener('mousedown', function(event) {
            event.preventDefault(); // Impede que o botão receba foco
        });

        button.addEventListener('click', function(event) {
            event.stopPropagation(); // Impede que o evento de clique se propague
            const iconGrid = this.closest('.icon-grid');
            iconGrid.scrollBy({
                left: 100, // Ajuste a quantidade de rolagem conforme necessário
                behavior: 'smooth'
            });
        });
    });
});
*/
document.querySelector('.right-btn').addEventListener('click', function() {
    document.querySelector('.icon-grid').scrollBy({
        left: 100, // Ajuste a distância da rolagem, se necessário
        behavior: 'smooth'
    });
});
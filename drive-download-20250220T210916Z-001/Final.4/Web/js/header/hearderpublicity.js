/*Funcion asociada al slider publicitario de debajo del header*/
let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;

next.onclick = function() {
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}

prev.onclick = function() {
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}

let refreshInterval;
function startInterval() {
    refreshInterval = setInterval(nextSlide, 15000); // Cambio cada 5 segundos (5000ms)
}

function nextSlide() {
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}

function reloadSlider() {
    slider.style.transition = 'left 5s ease'; // Transición fluida
    slider.style.left = -items[active].offsetLeft + 'px';

    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    startInterval();
}

dots.forEach((li, key) => {
    li.addEventListener('click', () => {
        active = key;
        reloadSlider();
    });
});

startInterval(); // Iniciar el intervalo de cambio de imágenes al cargar la página

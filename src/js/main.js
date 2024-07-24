const header__container = document.querySelector(".header__container");
header__container.addEventListener('click', toggleVisibility);

function toggleVisibility(){
    header__container.classList.toggle("active");
}
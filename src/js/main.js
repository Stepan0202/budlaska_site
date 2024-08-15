const header__container = document.querySelector(".header__container");
header__container.addEventListener('click', toggleVisibility);

function toggleVisibility(){
    header__container.classList.toggle("active");
}


//sending form
document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Зупиняє стандартну відправку форми

    // Збираємо дані форми
    let formData = new FormData(this);

    // Відправляємо дані форми за допомогою Fetch API
    fetch('php/index.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        alert("Ваше замовлення було успішно відправлено.");
        // Тут можна додати додаткові дії, наприклад, перенаправлення на іншу сторінку
    })
    .catch(error => {
        console.error('Помилка:', error);
        alert("Виникла помилка при відправці замовлення.");
    });
});
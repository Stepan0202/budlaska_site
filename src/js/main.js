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
function toggleDeliveryOptions() {
    var deliveryService = document.getElementById('deliveryService').value;
    document.getElementById('novaPoshtaOptions').style.display = (deliveryService === 'novaPoshta') ? 'block' : 'none';
    document.getElementById('ukrPoshtaOptions').style.display = (deliveryService === 'ukrPoshta') ? 'block' : 'none';
}

function toggleNovaPoshtaDetails() {
    var deliveryMethod = document.getElementById('novaPoshtaDeliveryMethod').value;
    document.getElementById('novaPoshtaPostamat').style.display = (deliveryMethod === 'postamat') ? 'block' : 'none';
    document.getElementById('novaPoshtaBranch').style.display = (deliveryMethod === 'branch') ? 'block' : 'none';
    document.getElementById('novaPoshtaCourier').style.display = (deliveryMethod === 'courier') ? 'block' : 'none';
}
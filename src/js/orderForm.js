header__container.addEventListener('click', toggleVisibility);

function toggleVisibility(){
    header__container.classList.toggle("active");
}
// Отримуємо всі елементи введення у формі
const inputs = document.querySelectorAll('#orderForm input, #orderForm select, #orderForm textarea');

// Додаємо обробник події keydown для кожного елемента введення
inputs.forEach((input, index) => {
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Зупиняє стандартну дію Enter

            // Знаходимо наступний елемент вводу
            const nextInput = inputs[index + 1];

            // Якщо існує наступний елемент, фокусуємося на ньому
            if (nextInput) {
                nextInput.focus();
            } else {
                // Якщо це останнє поле, фокусуємося на кнопці відправки
                document.querySelector('#orderForm button[type="submit"]').focus();
            }
        }
    });
});

//sending form
document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Зупиняє стандартну відправку форми

    const submitButton = document.activeElement;
    if (submitButton && submitButton.type === "submit") {
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
    }
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

//total block
const quantityField = document.getElementById('quantity');
let quantityValue = quantityField.value;
const total_kitsQuantity = document.querySelector(".orderInfo .kitsQuantity");
const total_kitsFullPrice = document.querySelector(".orderInfo .kitsFullPrice");
const total_kitsDiscount = document.querySelector(".orderInfo .kitsDiscount");
const total_kitsTotalPrice = document.querySelector(".orderInfo .kitsTotalPrice");
const basicPrice = 399;
const oneComplectDiscountPrice = 281;
const twoComplectDiscountPrice = 256;
const threePlusComplectDiscountPrice = 233;
console.log(total_kitsQuantity)
quantity.addEventListener("change", (event) => {
    event.preventDefault();
    quantityValue = quantityField.value;
    total_kitsQuantity.innerHTML = quantityValue;
    updateForm(calculateTotal(quantityValue));
})

function updateForm(infoObj){
    console.log(total_kitsDiscount)
    total_kitsQuantity.innerHTML = infoObj.quantity;
    total_kitsFullPrice.innerHTML = infoObj.full + " грн";
    total_kitsDiscount.innerHTML = infoObj.discount + " грн";
    total_kitsTotalPrice.innerHTML = infoObj.amount + " грн";

}
function calculateTotal(quantity) {
    let full = basicPrice*quantity;
    let discount;
    let amount;
    if (quantity === 1) {
        discount = full - oneComplectDiscountPrice;
        amount = oneComplectDiscountPrice;
    } else if (quantity === 2) {
        discount = full - twoComplectDiscountPrice*quantity;
        amount = twoComplectDiscountPrice*quantity;
    } else {
        discount = full - threePlusComplectDiscountPrice*quantity;
        amount = threePlusComplectDiscountPrice*quantity;
    }
    return {
        "quantity": quantity,
        "full": full,
        "discount": discount,
        "amount": amount
    }
}
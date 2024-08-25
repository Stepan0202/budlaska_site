header__container.addEventListener('click', toggleVisibility);
console.dir(document.activeElement);
console.log(document.activeElement);
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
document.addEventListener("DOMContentLoaded", function() {
    // Regular Order Form submission
    const orderForm = document.getElementById("orderForm");
    if (orderForm) {
        orderForm.addEventListener("submit", function(e) {
            e.preventDefault();
            let formData = new FormData(orderForm);

            fetch('/php/orderForm.php', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.text())
            .then(data => {
                alert("Замовлення успішно відправлено!");
                console.log(data);
            })
            .catch(error => console.error('Помилка:', error));
        });
    }

    // Quick Order Form submission
    const quickOrderForm = document.getElementById("quickOrderForm");
    if (quickOrderForm) {
        quickOrderForm.addEventListener("submit", function(e) {
            e.preventDefault();
            let formData = new FormData(quickOrderForm);

            fetch('/php/quickOrderForm.php', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.text())
            .then(data => {
                alert("Швидке замовлення успішно відправлено!");
            })
            .catch(error => console.error('Помилка:', error));
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
    //prices
const basicPrice = 399;
const oneComplectDiscountPrice = 281;
const twoComplectDiscountPrice = 256;
const threePlusComplectDiscountPrice = 233;
    //total block fields
const quantityField = document.getElementById('quantity');
let quantityValue = quantityField.value;
const total_kitsQuantity = document.querySelector(".orderInfo .kitsQuantity");
const total_kitsFullPrice = document.querySelector(".orderInfo .kitsFullPrice");
const total_kitsDiscount = document.querySelector(".orderInfo .kitsDiscount");
const total_kitsTotalPrice = document.querySelector(".orderInfo .kitsTotalPrice");
    // setting manual values to total block
    total_kitsQuantity.innerHTML = 1;
    total_kitsFullPrice.innerHTML = basicPrice + " грн";
    total_kitsDiscount.innerHTML = basicPrice - oneComplectDiscountPrice  + " грн";
    total_kitsTotalPrice.innerHTML = oneComplectDiscountPrice  + " грн";

    //btns in prices section
const btn_oneKit = document.querySelector("#btn_oneKit");
const btn_twoKit = document.querySelector("#btn_twoKit");
const btn_threeKit = document.querySelector("#btn_threeKit");

btn_oneKit.addEventListener("click", (event) =>{
    event.preventDefault();
    quantityField.value = event.currentTarget.dataset.quantity;
    updateForm(calculateTotal(event.currentTarget.dataset.quantity));
    orderForm.scrollIntoView({ behavior: 'smooth' });
});
btn_twoKit.addEventListener("click", (event) =>{
    event.preventDefault();
    quantityField.value = event.currentTarget.dataset.quantity;
    updateForm(calculateTotal(event.currentTarget.dataset.quantity));
    orderForm.scrollIntoView({ behavior: 'smooth' });
});
btn_threeKit.addEventListener("click", (event) =>{
    event.preventDefault();
    quantityField.value = event.currentTarget.dataset.quantity;
    updateForm(calculateTotal(event.currentTarget.dataset.quantity));
    orderForm.scrollIntoView({ behavior: 'smooth' });
});
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
    quantity = Number.parseInt(quantity);
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
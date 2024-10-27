

//variables
const feedbackData = [
  {
    'sex': "women",
    'title' : "Інна, мама 2 дітей (9 та 11 років)",
    'feedback': "Це крутий продукт! Купила обом дітям (хлопчик - 11 років, дівчинка - 9 років). Раніше мало не щодня були проблеми з походом до школи: не хочу, не буду, сльози, істерики. Тепер малий знає, шо приблизно 2-3 рази на рік може не йти до школи. І в інші дні спокійно собі ходить. Малій більше всього сподобались купони “Їм, що хочу”. Тепер не вередує, що б я не приготувала (ну майже)). Бо знає: іноді може їсти, що хоче. Вона має вибір і сама вирішує, коли їм розпорядитись. А найулюбленіший в обох - це “Купон на “купи”)))"
  },
  {
    'sex': "men",
    'title' : "Олександр, батько хлопчика 6 років",
    'feedback': "Купив сину ці купони, домовились про правила використання. І це дійсно працює! Тепер він точно знає, що в нього є дві можливості: або слідувати правилам, або використати купон. щоб від них відступитись. Завдяки він став більш слухняним і набагато менше сваримось."
  },
  {
    'sex': "women",
    'title' : "Аліна, мати 3 дітей (5, 8, 11 років)",
    'feedback': "Мені більш за все подобається, як діти вчаться розпоряджатися своїм майном. Десь проявляють самодиципліну, кажуть “Ні, зараз цей купон не буду використовувати, краще відкладу його до канікул”. Мені це дуже подобається, бо це каже, що дитина починає мислити трохи наперед. Дуже корисна навичка. Замовлятиму ще."
  },
  {
    'sex': "women",
    'title' : "Тетяна, мати дівчинки 12 років",
    'feedback': "Дитина в захваті. Всім кого не зустрінуть показують ці купони. Ще не використовували наповну, як тільки використаємо, відпишусь. Але сам продукт подобається: якісний, гарний."
  },
  {
    'sex': "women",
    'title' : "Дар’я, мати хлопчика 7 років",
    'feedback': "Подарували з чоловіком сину на день народження. Поки все подобається. Дуже цікаві купони."
  },
  {
    'sex': "women",
    'title' : "Ольга, мати дівчинки 9 років",
    'feedback': "В нас складна ситуація — Орися дуже звикла до маніпуляцій і що все отримає при першій сльозинці. Що сказть, я мамка-тряпка((( Але купони допомагають цю ситуацію виправляти. Тепер я знаю, що в дитини є можливість порушувати правила. І чітко дала собі установку не вестись на істерики. Це працює, не відразу. Перший комплект майже одразу використала. десь за місяць. І знов почалися маніпуляції. Тоді я другий купила, але пояснила, що він на півроку, не менше. Старається, економить. Сльоз і образ стало менше."
  }
]
const slider = document.querySelector("#carouselFeedback");
const sliderInner = slider.querySelector(".carousel-inner");
const leftArrow = document.querySelector('[data-bs-slide="prev"]');
const rightArrow = document.querySelector('[data-bs-slide="next"]');
let screenWidth = window.innerWidth;
let screenDescription = getScreenDescription(screenWidth);
let cardsPerSlide = getCardsPerSlide(screenDescription);
let touchStart = 0;
let touchEnd = 0;

//deleting arrows if screen width less than 1024 px
if (screenWidth < 768){
  leftArrow.style.display = "none";
  rightArrow.style.display = "none";
}

// touchscreenevents
slider.addEventListener("touchstart", (e) => {
  e.preventDefault();
  touchStart = e.touches[0].clientX;
  touchEnd = touchStart;
});
slider.addEventListener("touchmove", (e) => {
  e.preventDefault();
  touchEnd = e.touches[0].clientX;
});
slider.addEventListener("touchend", (e) => {
  e.preventDefault();
  console.log("touchStart: " + touchStart);
  console.log("touchEnd: " + touchEnd);
  console.log(touchEnd < touchStart - 50);
  console.log(touchEnd > touchStart + 50);
  if (touchEnd === touchStart) return;
  if(touchEnd < touchStart - 50) {
    leftArrow.click();
    console.log("left arrow");
  }
  if(touchEnd > touchStart + 50) rightArrow.click();
  touchStart = 0;
  touchEnd = 0;
})

function getScreenDescription(screenWidth){
  if (screenWidth >= 1400) {
    return "xxl";
  } else if (screenWidth >= 1200) {
    return "xl";
  } else if (screenWidth >= 768) {
    return "md";
  } else if (screenWidth >= 576) {
    return "sm";
  } else {
    return "extra small";
  }
}
function getSlidesCount(feedbackArr){
    const feedbackCount = feedbackArr.length;
    const slidesCount = Math.ceil(feedbackCount/cardsPerSlide);
    return slidesCount;
}
function getCardsPerSlide(screenDescription){
  let feedbackPerSlide = 1;
  switch(screenDescription){
    case "xxl":
      feedbackPerSlide = 4;
      break;
    case "xl":
      feedbackPerSlide = 4;
      break;
    case "md":
      feedbackPerSlide = 3;
      break;
    case "sm":
      feedbackPerSlide = 1;
      break;
    case "extra small":
      feedbackPerSlide = 1;
  }
  return feedbackPerSlide;
}

function setFeedBacks(sliderBody, feedbacksArr){
  const cardsArr = createCards(feedbacksArr);
  const slidesCount = getSlidesCount(feedbackData);

  let currentCardToAdd = 0;
  for (let i = 0; i < slidesCount; i++){
    const slide = document.createElement('div');
    slide.classList.add('carousel-item');
    if (i === 0) slide.classList.add('active');
    
    const row = document.createElement("div");
    row.classList.add('row','d-flex', 'align-items-stretch', 'flex-wrap');

    slide.appendChild(row);
    sliderBody.appendChild(slide);
    for(let j = currentCardToAdd; j < cardsPerSlide + currentCardToAdd; j++){
      console.log(cardsArr[j]);
      if(cardsArr[j] !=undefined){
        const col = document.createElement('div');
        col.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-xl-3', 'd-flex');
        col.appendChild(cardsArr[j]);
        row.appendChild(col);
      }

    }
    currentCardToAdd += cardsPerSlide;
  
  }
}
function createCards(cardsDataArr){
  const cardsArray = [];
  console.dir('cardsDataArr: ' + cardsDataArr);
  cardsDataArr.map(element => {
    const card = document.createElement("div");
    card.classList.add('card', 'flex-grow-1', 'd-flex', 'flex-column', 'justify-content-start');
    
    const img = document.createElement("img");
    const imgSrc = "./img/avatar_" + element.sex + ".png";
    img.setAttribute("src", imgSrc);
    img.setAttribute("alt", "Аватар покупця");
    
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerHTML = element.title;
    
    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.innerHTML = element.feedback;

    card.appendChild(img);
    card.appendChild(cardTitle);
    card.appendChild(cardText);

    cardsArray.push(card);
  });
  return cardsArray;
}


setFeedBacks(sliderInner, feedbackData);

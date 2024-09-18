
let days = document.getElementById("timer__days");
let hours = document.getElementById("timer__hours");
let minutes = document.getElementById("timer__minutes");
let seconds = document.getElementById("timer__seconds");
let dateElementsArray = [days, hours, minutes, seconds];
let endDate = new Date('24 Sep 2024 00:00:00 GMT');

let today = new Date();
let timeDifference = endDate - today;
let daysLeft = Math.floor(timeDifference/86400000);
let hoursLeft = Math.floor(timeDifference/3600000 - daysLeft*24);
 let minutesLeft = Math.floor(timeDifference/60000 - daysLeft*24*60 - hoursLeft*60);
let secondsleft = Math.floor(timeDifference/1000 - daysLeft*24*60*60 - hoursLeft*60*60 - minutesLeft*60);

function setTimeOnThePage(timeArray, elementsArray){
    timeArray.forEach((element, index) => {
        elementsArray[index].innerHTML = element;
    });
}
function updateCountdown(){
    today = new Date();
    timeDifference = endDate - today;
    daysLeft = Math.floor(timeDifference/86400000);
    hoursLeft = String(Math.floor(timeDifference/3600000 - daysLeft*24)).padStart(2, '0');
    minutesLeft = String(Math.floor(timeDifference/60000 - daysLeft*24*60 - hoursLeft*60)).padStart(2, '0');
    secondsleft = String(Math.floor(timeDifference/1000 - daysLeft*24*60*60 - hoursLeft*60*60 - minutesLeft*60)).padStart(2, '0');
    let timeLeftArray = [daysLeft, hoursLeft, minutesLeft, secondsleft];
    setTimeOnThePage(timeLeftArray, dateElementsArray);
}
setInterval(updateCountdown, 1000);

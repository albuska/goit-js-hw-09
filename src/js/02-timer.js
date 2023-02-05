import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
inputRef: document.getElementById('datetime-picker'),
btnStartRef: document.querySelector('[data-start]'),
containerMainTimes: document.querySelector('.timer'), 
containerChildrenTimes: document.querySelectorAll('.field'), 
spanValue: document.querySelectorAll('.value'), 
spanLabel: document.querySelectorAll('.label'),
valueDays: document.querySelector('[data-days]'),
valueHours: document.querySelector('[data-hours]'),
valueMinutes: document.querySelector('[data-minutes]'),
valueSeconds: document.querySelector('[data-seconds]'),
}

refs.btnStartRef.disabled = true; 
let timerId = null; 

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
     
      if (selectedDates[0] > options.defaultDate) {
        refs.btnStartRef.disabled = false; 
    refs.btnStartRef.addEventListener('click', () => {
      const startTime = pickr.selectedDates[0];   

      timerId = setInterval(() => {
        const currentTime = Date.now(); 
        const deltaTime = startTime - currentTime; 
        const timeComponents = convertMs(deltaTime); 
        updateClockFace(timeComponents); 
        console.log(timeComponents);  

        if(deltaTime < 1000) {
          clearInterval(timerId); 
        }
      });   
      refs.btnStartRef.disabled = true; 
      refs.inputRef.disabled = true; 
    })
        
      } else {
        Notiflix.Notify.failure('Please choose a date in the future'); 
      } 
    },
  };
  const pickr = flatpickr(refs.inputRef, options); 



  function addLeadingZero(value) {
return String(value).padStart(2, '0'); 
  }

function updateClockFace({days, hours, minutes, seconds}) {
 
    // 1 варіант
    refs.valueDays.textContent = days; 
    refs.valueHours.textContent = hours;
    refs.valueMinutes.textContent = minutes;
    refs.valueSeconds.textContent = seconds;

  // 2 варіант
  // for(let i = 0; i < refs.spanValue.length; i +=1) {
  // refs.spanValue[0].textContent = `${days}`;
  // refs.spanValue[1].textContent = `${hours}`;
  // refs.spanValue[2].textContent = `${minutes}`;
  // refs.spanValue[3].textContent = `${seconds}`;
  // }
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}




// Styles
refs.containerMainTimes.style.display = 'flex'; 
refs.containerMainTimes.style.gap = '15px';

for (let i = 0; i < refs.spanValue.length; i++) {
  refs.spanValue[i].style.fontSize = '30px';   
}

for (let i = 0; i < refs.spanLabel.length; i++) {
  refs.spanLabel[i].style.textTransform = 'uppercase';   
  refs.spanLabel[i].style.fontSize = '13px'; 
}

for (let i = 0; i < refs.containerChildrenTimes.length; i++) {
  refs.containerChildrenTimes[i].style.display = 'flex';  
  refs.containerChildrenTimes[i].style.flexDirection = 'column'; 
  refs.containerChildrenTimes[i].style.alignItems = 'center'; 
}
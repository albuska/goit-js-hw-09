import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
inputRef: document.getElementById('datetime-picker'),
btnStartRef: document.querySelector('[data-start]'),
containerMainTimes: document.querySelector('.timer'), 
containerChildenTimes: document.querySelectorAll('.field'), 
spanValue: document.querySelectorAll('.value'), 
spanLabel: document.querySelectorAll('.label'),
}

console.log(refs.inputRef); 

// refs.inputRef.addEventListener('click', convertMs);
// refs.btnStartRef.addEventListener('click', startTimerClick);

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

for (let i = 0; i < refs.containerChildenTimes.length; i++) {
  refs.containerChildenTimes[i].style.display = 'flex';  
  refs.containerChildenTimes[i].style.flexDirection = 'column'; 
  refs.containerChildenTimes[i].style.alignItems = 'center'; 
}


// refs.containerChildenTimes.style.display = 'flex'; 
// refs.spanValue.style.fontSize = '30px'; 
// refs.containerChildenTimes.style.flexDirection = 'column'; 

flatpickr(refs.inputRef, options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
    },
  }); 


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
const btnStartRef = document.querySelector('button[data-start]');
console.log('🚀 ~ btnStartRef', btnStartRef);

const btnStopRef = document.querySelector('button[data-stop]');
console.log('🚀 ~ btnStopRef', btnStopRef);

let timerId = null;

const handleBtnStart = () => {
//   disabledBtn(true, false);
  btnStartRef.setAttribute("disabled", "disabled");
  btnStopRef.removeAttribute("disabled", "disabled");
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

const handleBtnStop = () => {
//   disabledBtn(false, true);
  btnStopRef.setAttribute("disabled", "disabled");
  btnStartRef.removeAttribute("disabled", "disabled");
  clearInterval(timerId);
};

btnStartRef.addEventListener('click', handleBtnStart);
btnStopRef.addEventListener('click', handleBtnStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function disabledBtn(on, off) {
  btnStartRef.disabled = on;
  btnStopRef.disabled = off;
}

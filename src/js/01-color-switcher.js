import '../css/common.css';

const bodyEl = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

stopBtn.disabled = true;

let timerId = null;

function changeBgColorRandom() {
  bodyEl.style.backgroundColor = `${randomBodyColorGen.getRandomHexColor()}`;
}
const randomBodyColorGen = {

  getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
  },

  interval() {
    intervalId = setInterval(() => {
      changeBgColorRandom();
    }, 1000);
    stopBtn.disabled = false;
  },

  stop() {
    clearInterval(intervalId);
    stopBtn.disabled = true;
    startBtn.disabled = false;
  },

  start() {
    startBtn.addEventListener('click', () => {
      this.interval();
      startBtn.disabled = true;
      stopBtn.disabled = false;
    });
    stopBtn.addEventListener('click', this.stop);
  },


};

randomBodyColorGen.start();

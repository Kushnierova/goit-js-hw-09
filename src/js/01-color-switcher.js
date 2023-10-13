import '../css/common.css';

const bodyEl = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

stopBtn.disabled = true;

let intervalId = null;

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
    stopBtn.addEventListener('click', () => {
      clearInterval(intervalId);
      startBtn.disabled = false;
      stopBtn.disabled = true;
    });
  },

  start() {
    startBtn.addEventListener('click', () => {
      startBtn.disabled = true;
      stopBtn.disabled = false;
      this.interval();
    });
    stopBtn.addEventListener('click', this.stop);
  },
};

randomBodyColorGen.start();

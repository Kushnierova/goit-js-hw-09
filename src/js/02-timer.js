import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      startBtn.disabled = true;
      window.alert('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};

const pickrTime = flatpickr(dateInput, options);

class CountDownTimer {
  constructor({ selector, targetDate }) {
    this.intervalId = null;
    this.targetDate = targetDate;
    this.daysSpan = document.querySelector(`${selector} [data-days]`);
    this.hoursSpan = document.querySelector(`${selector} [data-hours]`);
    this.minutesSpan = document.querySelector(`${selector} [data-minutes]`);
    this.secondsSpan = document.querySelector(`${selector} [data-seconds]`);
  }

  updateMarkup() {
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const delta = this.targetDate - currentTime;
      if (delta < 999) {
        clearInterval(this.intervalId);
      }
      const { days, hours, minutes, seconds } = this.convertMs(delta);

      this.daysSpan.textContent = addLeadingZero(days);
      this.hoursSpan.textContent = addLeadingZero(hours);
      this.minutesSpan.textContent = addLeadingZero(minutes);
      this.secondsSpan.textContent = addLeadingZero(seconds);
      console.log('new interval');
      console.log(delta);
    }, 1000);
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
}

startBtn.addEventListener('click', () => {
  const selectedDate = pickrTime.selectedDates[0];
  const timer = new CountDownTimer({
    selector: '.timer',
    targetDate: selectedDate,
  });
  timer.updateMarkup();
  dateInput.disabled = true;
  startBtn.disabled = true;
});

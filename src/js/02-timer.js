import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedTime = selectedDates[0].getTime();
    const currentTime = Date.now();
    const remainingTime = selectedTime - currentTime;
    if (remainingTime < 0) {
      alert('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};

class CountDownTimer {
  constructor({ selector, targetDate }) {
    this.targetDate = targetDate;
    this.selector - selector;
    this.daysEl = document.querySelector('span[data-days]');
    this.hoursEl = document.querySelector('span[data-hours]');
    this.minutesEl = document.querySelector('span[data-minutes]');
    this.secondsEl = document.querySelector('span[data-seconds]');
  }
  updateMarkup() {
    setInterval(() => {
      const currentTime = Dane.now();
      const delta = this.targetDate - currentTime;n
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
  addLeadingZero(value) {
    return String(value).padStart(2, '0')}
  }
const timer1 = new CountDownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jan 1, 2024'),
});
//   addLeadingZero(value) {
//     return String(value).padStart(2, '0')}

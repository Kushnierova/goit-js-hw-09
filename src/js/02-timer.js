import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysSpan: document.querySelector(`span[data-days]`),
  hoursSpan: document.querySelector(`span[data-hours]`),
  minutesSpan: document.querySelector(`span[data-minutes]`),
  secondsSpan: document.querySelector(`span[data-seconds]`),
};

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
      refs.startBtn.disabled = false;
    }
  },
};

refs.startBtn.disabled = true;
const selectedTime = flatpickr('#datetime-picker', options);

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.onTick = onTick;
  }

  updateMarkup() {
    const selectedTimeStr = selectedTime.selectedDates[0].getTime();

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const remainingTime = selectedTimeStr - currentTime;

      if (remainingTime < 0) {
        const time = this.convertMs(0);
        clearInterval(this.intervalId);
        refs.startBtn.disabled = false;
        this.onTick(time);
      } else {
        const time = this.convertMs(remainingTime);
        refs.startBtn.disabled = true;
        refs.dateInput.disabled = true;
        this.onTick(time);
      }
    }, 1000);
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer({
  onTick: updateClockFace,
});

refs.startBtn.addEventListener('click', timer.updateMarkup.bind(timer));

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.daysSpan.textContent = `${days}`;
  refs.hoursSpan.textContent = `${hours}`;
  refs.minutesSpan.textContent = `${minutes}`;
  refs.secondsSpan.textContent = `${seconds}`;
}

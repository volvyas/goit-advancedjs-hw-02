import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startButtonEl = document.querySelector('button[data-start]');

const daysEl = document.querySelector('[data-days]');
const hrsEl = document.querySelector('[data-hours]');
const minEl = document.querySelector('[data-minutes]');
const secEl = document.querySelector('[data-seconds]');

let intervalId = -1;

let selectedDate = null;

const timerUpdate = dateToCalculate => {
  const diff = dateToCalculate - new Date();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  daysEl.textContent = String(days).padStart(2, '0');
  hrsEl.textContent = String(hours).padStart(2, '0');
  minEl.textContent = String(minutes).padStart(2, '0');
  secEl.textContent = String(seconds).padStart(2, '0');
};

const clearTimerDisplay = () => {
  daysEl.textContent = '00';
  hrsEl.textContent = '00';
  minEl.textContent = '00';
  secEl.textContent = '00';
};

const enableStartButton = isEnable => {
  startButtonEl.disabled = !isEnable;
};

const stopAndClear = () => {
  enableStartButton(false);
  clearInterval(intervalId);
  intervalId = -1;
  clearTimerDisplay();
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (!selectedDates || selectedDates.length === 0) {
      stopAndClear();
      return;
    }
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      window.alert('Please choose a date in the future');
      stopAndClear();
      return;
    }

    enableStartButton(true);
    selectedDate = selectedDates[0];
    timerUpdate(selectedDate);
  },
};

startButtonEl.addEventListener('click', () => {
  if (!selectedDate) return;
  intervalId = setInterval(() => {
    timerUpdate(selectedDate);
  }, 1000);
});

const datetimePickerEl = document.querySelector('#datetime-picker');
flatpickr(datetimePickerEl, options);

window.addEventListener('beforeunload', () => {
  if (intervalId !== -1) {
    clearInterval(intervalId);
  }
});

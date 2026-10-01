import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const successMessage = message => {
  iziToast.success({
    position: 'topRight',
    title: 'Success',
    message: message,
  });
};

const errorMessage = error => {
  iziToast.error({
    position: 'topRight',
    title: 'Error',
    message: error,
  });
};

const createPromise = (isSuccess, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        resolve(`Fulfilled promise in ${delay}ms`);
      } else {
        reject(`Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
};

const buttonEl = document.querySelector('#submit-btn');
const delayEl = document.querySelector('[name="delay"]');
const isSuccessEl = document.querySelector('[name="state"]');

buttonEl.addEventListener('click', event => {
  event.preventDefault();

  if (!delayEl.value) {
    errorMessage('Please enter a delay value');
    return;
  }

  const delay = Number(delayEl.value);
  const isSuccess = isSuccessEl.checked;

  createPromise(isSuccess, delay)
    .then(value => {
      successMessage(value);
    })
    .catch(error => {
      errorMessage(error);
    });
});

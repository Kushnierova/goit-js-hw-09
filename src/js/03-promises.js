const formEl = document.querySelector('.form')

formEl.addEventListener('submit', handleSubmit);
// Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay)
// стільки разів, скільки ввели в поле amount. Під час кожного виклику передай їй номер
// промісу (position), що створюється, і затримку, враховуючи першу затримку (delay),
// введену користувачем, і крок (step).
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
// Доповни код функції createPromise таким чином,
// щоб вона повертала один проміс, який виконується або відхиляється через delay часу.
// Значенням промісу повинен бути об'єкт, в якому будуть властивості position і delay
// зі значеннями однойменних параметрів. Використовуй початковий код функції для вибору того,
//  що потрібно зробити з промісом - виконати або відхилити.
function handleSubmit(event) {
  event.preventDefault();

  const delay = event.target.delay;
  const step = event.target.step;
  const amount = event.target.amount;

  let delayEl = parseInt(delay.value);
  let stepEl = parseInt(step.value);
  let amountEl = parseInt(amount.value);
  if (stepEl < 0||delayEl<0) {

    alert('Please put positive value')
  }
  else {
    for (let i = 0; i < amount.value; i++) {
      createPromise(i+1, delayEl)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
      delayEl += stepEl;
    }
  }
  formEl.reset();
}
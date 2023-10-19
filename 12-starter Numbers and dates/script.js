'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions
const formateidsp = function (acc, num) {
  return new Intl.NumberFormat(acc.locale, {
    style: 'currency',
    currency: acc.currency,
  }).format(num);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    const locate = navigator.language;
    const displaydate = new Intl.DateTimeFormat(locate).format(date);
    // const fixedmovement = new Intl.NumberFormat(acc.locale, {
    //   style: 'currency',
    //   currency: acc.currency,
    // }).format(mov.toFixed(2));
    const fixedmovement = formateidsp(acc, mov.toFixed(2));
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displaydate}</div>
        <div class="movements__value">${fixedmovement}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  // labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
  labelBalance.textContent = formateidsp(acc, acc.balance.toFixed(2));
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  // labelSumIn.textContent = `${incomes.toFixed(2)}€`;
  labelSumIn.textContent = formateidsp(acc, incomes.toFixed(2));
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  // labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;
  labelSumOut.textContent = formateidsp(acc, Math.abs(out).toFixed(2));

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  // labelSumInterest.textContent = `${interest.toFixed(2)}€`;
  labelSumInterest.textContent = new Intl.NumberFormat(acc.locale, {
    style: 'currency',
    currency: acc.currency,
  }).format(interest.toFixed(2));
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////

//experience the the dat eformating

// const now = new Date();
// const option = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'long',
//   year: 'numeric',
//   weekday: 'long',
// };
// const locate = navigator.language;
// labelDate.textContent = new Intl.DateTimeFormat(locate, option).format(now);

///// timer loged out function

const timerLogout = function () {
  //set time to five minute
  let time = 300;
  ///update every second time left
  const functime = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const second = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${second}`;
    ///call the timer every second
    /// for time equal to 0 we need to logout
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'You have to login Again!⌚';
      containerApp.style.opacity = 0;
    }
    time--; //we put it under in order to get out if we reach zero exactly
  };
  functime();
  const timer = setInterval(functime, 1000);
  return timer;

  ///loged out if time reached
};
//experience the the dat eformating
// Event handlers
let currentAccount, timer;
/// fake login

// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // start implement date
    const now = new Date();
    const option = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    };
    // const locate = navigator.language;
    const locate = currentAccount.locale;
    labelDate.textContent = new Intl.DateTimeFormat(locate, option).format(now);
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const hour = now.getHours();
    // const year = now.getFullYear();
    // const minut = now.getMinutes();
    // labelDate.textContent = `${day}/${month}/${year} ,${hour}:${minut}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    // set time out
    if (timer) clearInterval(timer); // this line is for each time user change the timer stop and start again
    timer = timerLogout();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // set new timer becouse activity happen
    clearInterval(timer); // this line is for each time user change the timer stop and start again
    timer = timerLogout();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    setTimeout(function () {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 5000);

    // set new timer becouse activity happen
    clearInterval(timer); // this line is for each time user change the timer stop and start again
    timer = timerLogout();
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES 11 numbers and dates

// //// converting string iinto anumber in javascript

// console.log(+'32');

// ///// javascript error

// console.log(0.1 + 0.2 === 0.3); // this return false but it is true
// console.log(Number.parseFloat('6.867gsfd')); //this can display all number with decimal
// console.log(Number.parseInt('6.867gsfd')); // this display interge number without decimal

// console.log(Number.parseFloat('2hs', 10)); //this 10 mean the base

// //////////////////////// create random value between two numbers
// const random = (max, min) => {
//   return Math.floor(Math.random() * (max - min) + 1) + min; //floor is better than trunc because work with positive and negative
// };
// console.log(random(20, 9));
// //////////////////////// end of create random value between two numbers

///////////////numerical separators

// const number = 290_454_763; //this javascript read it as anumber
// console.log(number);
// console.log(2 ** 510 - 1);
// ///////////////numerical separators

// ///// creating dates
// const today = new Date();
// console.log(today); //this display to day dates
// // other example
// console.log(new Date(0));
// console.log(new Date(3 * 24 * 60 * 60 * 1000)); // three days rater converted into milsecond

// console.log(account1.movementsDates[1]);

// ///// creating dates

/////////////⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️number formating

// const num = 483758403.984;
// const option = {
//   style: 'currency',
//   // unit: 'celsius',
//   currency: 'USD',
//   // useGrouping: false,// this can remove all groung
// };
// console.log(
//   navigator.language,
//   Intl.NumberFormat(navigator.language, option).format(num)
// );

/// settimeout function 👌👌👌👌👌👌👌👌
// setTimeout(() => {
//   console.log('sinjye ubonye mpagera 😒');
// }, 2000);
// console.log('Waiting for timeout...');

// to add the parameter in settimeout is somehow difficult
// const ibindi = ['Fanta oreng', 'chokolate'];
// setTimeout(
//   (g1, g2) => {
//     console.log(`uzane pizza na🍕 na ${g1} hamwe ${g2}`);
//   },
//   2000,
//   ...ibindi
// );
// console.log('waiting...');

///////////////////////// how to clear timer
// const ibindi = ['Fanta oreng', 'chokolate'];
// const food = setTimeout(
//   (g1, g2) => {
//     console.log(`uzane pizza na🍕 na ${g1} hamwe ${g2}`);
//   },
//   2000,
//   ...ibindi
// );
// console.log('waiting...');
// if (ibindi.includes('chokolate')) clearTimeout(food);

/////↗️↗️↗️↗️↗️↗️setInterval function↗️↗️↗️
// const time = setInterval(() => {
//   const now = new Date();
//   return console.log(now);
// }, 1000);
//////////////////////⌚⌚⌚⌚⌚⌚⌚⌚⌚real time
function updateTime() {
  const now = new Date();
  const timeString = new Intl.DateTimeFormat(navigator.language, {
    hour: 'numeric',
    second: 'numeric',
    minute: 'numeric',
    unit: 'hrs',
  }).format(now);
  document.querySelector('.time').innerHTML = timeString;
}

updateTime();

const intervalId = setInterval(updateTime, 1000); //for update our function every second
// //////////////////////⌚⌚⌚⌚⌚⌚⌚⌚⌚real time

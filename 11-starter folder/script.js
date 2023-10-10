'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//// different methode in array

////slice methode
const arr1 = ['a', 'b', 'c', 'd'];
const arr2 = ['d', 'e', 'f', 'g'];

console.log(arr1.slice(1));
console.log(arr1.slice(-2));

///splice methode is the same like slice but different in how it can delete it from orginal array
console.log(arr1.splice(-2));
console.log(arr1); /// as you see it delete from the orginol array

////////////////////////////////////////
//reverse methode
console.log(arr2.reverse()); /// and this olso can affect the orginal array
console.log(arr2); //as you see this array also have reversed

////////////////////////////////////////////////////
//other methode is concat that can merge the two different array

console.log(arr1.concat(arr2));

////////////////////////////////////////////////////////////////////////////////////
///join Methode this work like in object or on string and its combine arr element in the array

console.log(arr1.concat(arr2).join('----'));

//////////////////////////////////////////////////////////////////////////////////////////////////////
///other methode is called indexOf

const arr3 = ['kalisa', 'daniel', 'kalisit', 'karegeya'];
console.log(arr3.indexOf('kalisit')); /// this can give us index location of this name kalisit

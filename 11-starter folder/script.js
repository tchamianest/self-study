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

///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️reduce methode
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const balance = movements.reduce(function (acc, cur, i, array) {
//   console.log(`the index ${i} we have ${cur} and sum ${acc}`);
//   return acc + cur;
// }, 0);
// console.log(balance);
//////////⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️end of reduce methode

/////////⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️ start real application

// start make movement list--------------------------------------------------
const displayMovement = function (acc) {
  containerMovements.innerHTML = '';
  acc.movements.forEach((move, i) => {
    const type = move < 0 ? 'withdrawal' : 'deposit';
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${move}€</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovement(account1.movements);

// End of  make movement list------------------------------------------------------------

///start calcurate movement summary----------------
const movementsummary = function (arr) {
  const income = arr.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.innerHTML = `${income}€`;

  const outcome = arr.movements
    .filter(mov => mov < 0)
    .reduce((arr, cur) => arr + cur, 0);
  labelSumOut.textContent = `${Math.abs(outcome)}€`;

  const interest = arr.movements
    .filter(mov => mov > 0)
    .map(withdraw => (withdraw * arr.interestRate) / 100)
    .filter((cur, i, Arr) => cur >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${Math.abs(interest)}€`;
};
// movementsummary(account1.movements);
///start calcurate movement summary-----------------
//// here we start calcurate the balance of total movement-----------------------------------

const calcdisplaybalanse = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, cur) {
    return acc + cur;
  }, 0);
  labelBalance.innerHTML = '€';
  labelBalance.insertAdjacentHTML('afterbegin', acc.balance);
};
// calcdisplaybalanse(account1.movements);

///////// user name
const user = accs => {
  accs.forEach(fullname => {
    fullname.username = fullname.owner
      .toLowerCase()
      .split(' ')
      .map(nam => nam[0])
      .join('');
  });
};
user(accounts);
// console.log(account2.username);
//// end of user name

////Login------------------------------------------
//update user interface code-------------
const updateui = function (acc) {
  movementsummary(acc);
  //display all
  displayMovement(acc);
  ///calc display
  calcdisplaybalanse(acc);
};

let currentaccount;
btnLogin.addEventListener('click', function (event) {
  event.preventDefault();
  currentaccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentaccount);
  if (currentaccount?.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = 100;
    labelWelcome.style.color = 'black';
    labelWelcome.innerHTML = `Welcome ${currentaccount.owner.split(' ')[0]}`;

    //clear input
    inputLoginUsername.value = inputLoginPin.value = '';

    // movement
    updateui(currentaccount);
  } else {
    containerApp.style.opacity = 0;
    labelWelcome.innerHTML = `Enter the proper data`;
    labelWelcome.style.color = 'red';
  }
});
////End of Login------------------------------------------

//// Transfer money and receive------------------------------------------
btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receivingacc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receivingacc &&
    receivingacc.username !== currentaccount.username &&
    currentaccount.balance >= amount
  ) {
    console.log(receivingacc.movements);
    receivingacc.movements.push(amount);
    currentaccount.movements.push(-amount);
    updateui(currentaccount);
  }
});
////End of Transfer and receive------------------------------------------

//// here we End  calcurate the balance of total movement-----------------------------

///////////////////////////////⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️filter methode
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements);
// //deporsit filter methode function
// const deposit = movements.filter(mov => mov > 0);
// console.log(`-----------deposit------------`);
// console.log(deposit);
// const withdraw = movements.filter(mov => mov < 0);
// console.log(`---------withdraw--------`);
// console.log(withdraw);
///////////////////////////////⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️End filter methode

///////////////example of name  transformation
// const user = accs => {
//   accs.forEach(fullname => {
//     fullname.usernamepat = fullname.owner
//       .toLowerCase()
//       .split(' ')
//       .map(nam => nam[0])
//       .join('');
//   });
// };
// user(accounts);
// console.log(accounts);
///////////////end of example of name  transformation

/////////⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️ end of real application
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// //// different methode in array

// ////slice methode
// const arr1 = ['a', 'b', 'c', 'd'];
// const arr2 = ['d', 'e', 'f', 'g'];

// console.log(arr1.slice(1));
// console.log(arr1.slice(-2));

// ///splice methode is the same like slice but different in how it can delete it from orginal array
// console.log(arr1.splice(-2));
// console.log(arr1); /// as you see it delete from the orginol array

// ////////////////////////////////////////
// //reverse methode
// console.log(arr2.reverse()); /// and this olso can affect the orginal array
// console.log(arr2); //as you see this array also have reversed

// ////////////////////////////////////////////////////
// //other methode is concat that can merge the two different array

// console.log(arr1.concat(arr2));

// ////////////////////////////////////////////////////////////////////////////////////
// ///join Methode this work like in object or on string and its combine arr element in the array

// console.log(arr1.concat(arr2).join('----'));

// //////////////////////////////////////////////////////////////////////////////////////////////////////
// ///other methode is called indexOf

// const arr3 = ['kalisa', 'daniel', 'kalisit', 'karegeya'];
// console.log(arr3.indexOf('kalisit')); /// this can give us index location of this name kalisit

/////////////////////////////////////////////////////////////////////////////
//another methode called at

// const array = [1, 3, 4, 6];
// console.log(array.at(-1));

//⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
//looop the array with for each

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const mov of movements) {
//   if (mov > 0) {
//     console.log(`the money deposit ${mov}`);
//   } else {
//     console.log(`the person have debit of ${Math.abs(mov)}`); ///MAth.abs can remove negative sign
//   }
// }

//////////////use forEach methode
// movements.forEach(function (mov, index, array) {
//   if (mov > 0) {
//     console.log(`${index + 1}) the money deposit ${mov} from ${array}`);
//   } else {
//     console.log(
//       `${index + 1}) the person have debit of ${Math.abs(mov)} from ${array}`
//     ); ///MAth.abs can remove negative sign
//   }
// });

// ///how its work
// //0:function(200)
// //1:function(450)
// //2:function(-400)....etc

// ///// other methode for use entries to get the index of your array

// for (const [i, ind] of movements.entries()) {
//   console.log(`${i}: -----${ind}`);
// }

///the for each in the map and set

///⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️ in Map
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key} :${value}`);
// });

// ///⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️ in set

// const sets = new Set(['USD', 'EUR', 'USD', 'RWF']);
// console.log(sets);

// sets.forEach(function (value) {
//   console.log(value);
// });

////////////////////💥💥💥💥💥💥💥💥💥starting challenge1
// const juliedata = [3, 5, 2, 12, 7];
// const Katedata = [4, 1, 15, 8, 3];

// const checkDogs = function (arr1, arr2) {
//   const arr11 = arr1.slice(1, -2);

//   const arrayboth = arr11.concat(arr2);
//   arrayboth.forEach(function (mov, i) {
//     if (mov > 3) {
//       console.log(`dog ${i + 1} is adult its ${mov} Years old`);
//     } else {
//       console.log(`dog ${i + 1} is puppy ${mov} Years olds`);
//     }
//   });
// };
// checkDogs(juliedata, Katedata);
// ////////////////////💥💥💥💥💥💥💥💥💥end of challenge 1

/////////////////////////////⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️Map Methode⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// //map methode it can take the present array and then create new one from its with some change
// const movementnew = movements.map(mov => mov * 2);
// console.log(movementnew);

// //to make this changes manual
// const arrw = [];
// for (const mov of movements) {
//   arrw.push(mov * 3);
// }
// console.log(arrw);
// /////////////////////////////⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️End of Map Methode⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️

////the reduce methode
// const movements = [200, 450, -400, 3000, -650, -130, 12000, 70, 1300];
// const maximum = movements.reduce((acc, cur) => {
//   return cur > acc ? cur : acc;
// }, movements[0]);
// console.log(maximum);
////end of reduce methode

////////////////////////////challlenge number 2
// const juliedata = [5, 2, 4, 1, 15, 8, 3];
// const Katedata = [16, 6, 10, 5, 6, 1, 4];

// const checkDogs = function (arr1, arr2) {
//   const arr11 = arr1.slice(1, -2);

//   const arrayboth = arr11.concat(arr2);
// arrayboth.forEach(function (mov, i) {
//   if (mov > 3) {
//     console.log(`dog ${i + 1} is adult its ${mov} Years old`);
//   } else {
//     console.log(`dog ${i + 1} is puppy ${mov} Years olds`);
//   }
// });
//   console.log(arrayboth);
//   const humage = arrayboth.reduce(function (acc, cur, i, e) {
//     const human = cur > 2 ? 16 + cur * 4 : 16 * cur;
//     console.log(`dog age ${cur} in human ${human}`);
//     if (human >= 18) {
//       console.log(`Total age ${acc}`);
//       return acc + human;
//     } else {
//       return continue;
//     }
//   }, 0);
//   console.log(
//     `the average age of that human is${humage / (arrayboth.length + 1)}`
//   );
// };
// checkDogs(juliedata, Katedata);
////////////////////////////End of challlenge number 2

//////🚗🚗🚗🚗🚗🚗Magics chaining🚗🚗🚗🚗🚗🚗🚗//// is to combine different methode in one line
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const eur = 1.1;
// // const display = movements
// //   .filter(mov => mov > 0)
// //   .map(mov => mov * eur)
// //   .reduce((acc, cur) => acc + cur, 0);
// // console.log(Math.trunc(display));
// //////🚗🚗🚗🚗🚗🚗End ofMagics chaining🚗🚗🚗🚗🚗🚗🚗
// const check = movements.map((mov, i, cs) => {
//   console.log(mov);
//   return mov;
// });
// console.log(check);

///dilling with find methode⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const firstnegative = movements.find(mov => mov < 0);
// console.log(firstnegative);
// console.log(accounts);
// const findde = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(findde);
///end of  find methode⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️end

///////////////////////////////////////////////////////////////////////

const namea = 'kalisa daniel';
const onene = zin => {
  return zin
    .split(' ')
    .map(ka => ka[0])
    .join('');
};
console.log(onene(account2.owner));

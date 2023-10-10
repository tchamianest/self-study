'use strict';
// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   // This generates [0, 0, 0, 0]. More in the next section 😃
//   answers: new Array(4).fill(0),
//   registerNewAnswer() {
//     const userinput = Number(
//       prompt(`${this.question} \n ${this.options.join(`\n`)}`)
//     );
//     this.answers[userinput] = this.answers[userinput] + 1;
//     // console.log(
//     //   `user input are ${userinput} \n and out put array are${[this.answers]}`
//     // );
//     this.displayREsult();
//   },
//   displayREsult(type = 'array') {
//     if (type === 'array') {
//       console.log(this.answers);
//     } else if (type === 'string') {
//       console.log('this can not work becouse it is tring');
//     }
//   },
// };
// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));
// const array = ['kalisa', 12, 'daniel'];
// console.log(typeof array[0]);

////////////////////////////////////////////imediatery invorkking function

// (function () {
//   console.log('kalisa '); //// this function can be called once
// })();

// //and if you want to hide some information you can use this way
// {
//   const daniel = 'mama we';
//   console.log(daniel);
// }
// // console.log(daniel); // this will be undefined becouse we hide information

/////⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️closure

// we are not able to create closure manual because closure being created based on how program are written and how it work
//example of crosure

// const passenger = function () {
//   let bagenzi = 0;
//   return function () {
//     console.log(`Passenger ${bagenzi++}`);
//   };
// };
// const dani = passenger();
// document.querySelector('.poll').addEventListener('click', dani);

//// exapmle 1 for closure

// let f;
// const josh = function () {
//   const a = 21;
//   f = function () {
//     console.log(`final ${a * 3}`);
//   };
// };

// josh();
// f();
// const kaneza = function () {
//   const a = 29;
//   f = function () {
//     console.log(`final ${a * 3}`);
//   };
// };
// kaneza();
// f();
// console.dir(f);
// console.dir(josh);

//// exapmle 2 for closure
// const board = function (n, second) {
//   const group = n / 4;
//   setTimeout(function () {
//     console.log(`we have ${n} passengers`);
//     console.log(
//       `and they are in groups of  ${group} \nand they are waiting: ${second} seconds`
//     );
//   }, second * 1000);
// };
// const group = 50;
// board(120, 2);

///// lecture challenge

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();

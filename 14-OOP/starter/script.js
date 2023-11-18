// 'use strict';

// //create constructor function always use capital letter
// const Person = function (name, birthyear, sex) {
//   this.fullname = name;
//   this.birthyear = birthyear;
//   this.igitsina = sex;

//   /// dont do this
//   //   this.Calcage = function () {
//   //     console.log(2023 - this.birthyear);
//   //   };
// };

// const kalisa = new Person('kalisa daniel', 1998);

// console.log(kalisa);
// const Maligarita = new Person('maliga ', 1975);
// console.log(Maligarita);

// // how to check the instance where come from
// console.log(kalisa instanceof Person);

// ///⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️  proto type ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️

// // insteady of using it insider use it outside of function like this
// Person.prototype.Calcage = function () {
//   console.log(2023 - this.birthyear);
// };

// kalisa.Calcage();
// const Beza = new Person('Beza Eva', 2007);
// console.log(Beza);
// Beza.Calcage();

// /// how to show the prototype

// // console.log(Person.prototype);
// console.log(Beza.__proto__);

// Person.prototype.igitsina = this.sex;
// console.log(kalisa.igitsina);

// /// to check if it has it own propert
// console.log(kalisa.hasOwnProperty('igitsina'));

// const mafene = new Person('wiclef Dusenge', 1999, 'gabo');
// console.log(mafene.igitsina);

// const test = {
//   name: 'kalisa daniel',
//   age: 30,
//   sex: 'male',
// };
// console.log(test.__proto__);

// const arr = [1, 43, 221, 343];
// console.log(arr.__proto__);
// const srting = 'kalisa daniel';
// console.log(srting.__proto__);

///// FUN THING FOR EXTEND THE PROTO TYPE BUT NOT DO IT IN PRATICAL
// const array1 = [1, 1, 1, 2, 2, 2, 3, 3, 4, 4, 4, 5, 55, 6, 7, 6, 5, 4, 56, 100];
// // ectend array proto type

// Array.prototype.remove = function () {
//   return [...new Set(this)];
// };
// console.log(array1.remove());
// Array.prototype.maximum = function () {
//   let a = 0;
//   this.map(el => {
//     el > a ? (a = el) : a;
//   });
//   return a;
// };

// console.log(array1.maximum());
///⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️End of proto type ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️

/// CODING CHALLENGE #9 LECTURE 14

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  return (this.speed = this.speed + 10);
};
Car.prototype.brake = function () {
  return (this.speed = this.speed - 5);
};

const car1 = new Car('BMW', 120);
const car2 = new Car('Melcedecs', 95);

console.log(car1, car2);
console.log(
  `accererate 1;${car1.accelerate()}  accerarte 2:${car2.accelerate()}`
);
console.log(car1.brake(), car2.brake());
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

/// CLASS IN JAVASCRIPT

class Person {
  constructor(name, birthyear) {
    this.name = name;
    this.birthyear = birthyear;
  }

  calcAge() {
    console.log(2023 - this.birthyear);
  }
}

const bezaeva = new Person('Queen', 2004);

bezaeva.calcAge();

/// or you can extend class using the prototype

Person.prototype.salut = function () {
  console.log(`Hey ${this.name} 😉`);
};
bezaeva.salut();

const ernest = new Person('kalisa erenst', 1999);
ernest.salut();
ernest.calcAge();
console.log(ernest);

// 'use strict';

//create constructor function always use capital letter
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

// //HOW CAN CREATE STATIC VALIABLE
// Person.hey=function(){
//   console.log('hey there')
// }

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

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   return (this.speed = this.speed + 10);
// };
// Car.prototype.brake = function () {
//   return (this.speed = this.speed - 5);
// };

// const car1 = new Car('BMW', 120);
// const car2 = new Car('Melcedecs', 95);

// console.log(car1, car2);
// console.log(
//   `accererate 1;${car1.accelerate()}  accerarte 2:${car2.accelerate()}`
// );
// console.log(car1.brake(), car2.brake());
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////

// /// CLASS IN JAVASCRIPT

// class Person {
//   constructor(fullname, birthyear) {
//     this.fullname = fullname;
//     this.birthyear = birthyear;
//   }

//   /// INSTANCE METHODE

//   calcAge() {
//     console.log(2023 - this.birthyear);
//   }
//   set fullname(nam) {
//     if (nam.includes(' ')) this._fullname = nam;
//     else alert(`the ${nam} is not afull name`);
//   }

//   get fullname() {
//     return this._fullname;
//   }

//   /// CREATE STATIC METHODE

//   static hey() {
//     console.log(' hey there kalisa daniel');
//   }
// }

// Person.hey();
// const bezaeva = new Person('Queen beza', 2004);
// console.log(bezaeva);

// bezaeva.calcAge();

// /// or you can extend class using the prototype

// Person.prototype.salut = function () {
//   console.log(`Hey ${this.name} 😉`);
// };
// bezaeva.salut();

// const ernest = new Person('kalisa erenst', 1999);
// ernest.salut();
// ernest.calcAge();
// console.log(ernest);

////  SETER AND GETER IN JS

// const obje = {
//   name: 'kalisa daniel',
//   age: 21,
//   move: [100, 211, 233, 2123, 21],

//   get latest() {
//     return this.move.slice(-1).pop();
//   },
//   set setter(mov) {
//     return this.move.push(mov);
//   },
// };

// console.log(obje.latest);
// obje.setter = 1000;
// console.log(typeof obje.setter);

// console.log(obje);

///// HOW TO CREATE OBJECT PROGRAMATICAL

// const PersonProt = {
//   calcAge() {
//     console.log(2023 - this.birthyear);
//     return 2023 - this.birthyear;
//   },

/// we can also add the constructor insider for creating the things

//   init(firstname, birthyear) {
//     this.firstname = firstname;
//     this.birthyear = birthyear;
//   },
// };

// const steven = Object.create(PersonProt);
// console.log(steven);

// steven.name = 'kalisa daniel';
// steven.birthyear = 1999;
// steven.age = steven.calcAge();
// console.log(steven);

// ///create new user
// const sarah = Object.create(PersonProt);
// sarah.init('sarah mafene', 1787);
// sarah.calcAge();

// console.log(sarah);

//// /////////////////////////////////////////////////////
/////CODING CHALLENGE  NUMBE #2

// class Carcl {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   accelerate = function () {
//     return (this.speed = this.speed + 10);
//   };
//   brake = function () {
//     return (this.speed = this.speed - 5);
//   };

//   get speedup() {
//     return (this.speed /= 1.6);
//   }

//   set speedup(speed) {
//     return (this.speed = speed * 1.6);
//   }
// }
// const ford = new Carcl('ford races', 120);
// console.log(ford.speed);
// ford.speedup;
// console.log(ford.speed);
// ford.speedup = 121;
// console.log(ford);
// ford.speedup;
// console.log(ford);

//// /////////////////////////////////////////////////////
/////INHERTANCE BETWEEN CLASSES CONSTRUCTOR FUNCTION
// const Person = function (firstname, birthyear) {
//   this.birthyear = birthyear;
//   this.firstname = firstname;
// };

// Person.prototype.calcage = function () {
//   return 2023 - this.birthyear;
// };

// const Student = function (firstname, birthyear, course) {
//   // this.firstname = firstname;
//   // this.birthyear = birthyear;

//   Person.call(this, firstname, birthyear);
//   this.course = course;
// };

// // HOW TO MERG THE INHERTENCE
// Student.prototype = Object.create(Person.prototype);

// const Tchami = new Student(
//   'Iradukunda Ernest',
//   2000,
//   'electronics and telecomunicatio'
// );
// console.log(Tchami);
// console.log(Tchami.calcage());

//// /////////////////////////////////////////////////////////////////
/////CHALLENGE NUMBER #3

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// // Car.prototype.accelerate = function () {
// //   this.speed = this.speed + 20;
// //   this.chargeTo = this.chargeTo - 1;
// //   console.log();
// // };
// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };
// EV.prototype = Object.create(Car.prototype);

// EV.prototype.chargerbatter = function (chargeTo) {
//   return (this.charge = chargeTo);
// };

// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge--;
//   console.log(
//     `${this.make} going at speed of${this.speed}Kmh with charge of${this.charge}`
//   );
// };
// const Tesla = new EV('tesla', 120, 30);
// console.log(Tesla);
// Tesla.accelerate();

//// /////////////////////////////////////////////////////////////////
/////INHERITANCE BETWEEN CLASSES ES6 CLASSES

// class Person {
//   constructor(fullname, birthyear) {
//     this.fullname = fullname;
//     this.birthyear = birthyear;
//   }

//   /// INSTANCE METHODE

//   calcAge() {
//     console.log(2023 - this.birthyear);
//   }
//   set fullname(nam) {
//     if (nam.includes(' ')) this._fullname = nam;
//     else alert(`the ${nam} is not afull name`);
//   }

//   get fullname() {
//     return this._fullname;
//   }
// }

// class Student extends Person {
//   constructor(fullname, birthyear, course) {
//     super(fullname, birthyear);
//     this.course = course;
//   }
//   introduce() {
//     console.log(
//       `My name is ${this._fullname} and i birn in ${this.birthyear} and i study ${this.course}`
//     );
//   }
// }

// const kalisa = new Student('kalisa daniel', 1999);
// kalisa.calcAge();
// kalisa.introduce();

//// /////////////////////////////////////////////////////////////////
/////INHERITANCE BETWEEN CLASSES ES6  Object.CREATE

// const PersonProto = {
//   calcAge() {
//     console.log(2023 - this.birthyear);
//   },

//   init(firstname, birthyear) {
//     this.firstname = firstname;
//     this.birthyear = birthyear;
//   },
// };

// const steven = Object.create(PersonProto);

// //CHAINING THE PROTO

// const StudentProt = Object.create(PersonProto);
// StudentProt.init = function (firstname, birthyear, course) {
//   PersonProto.init.call(this, firstname, birthyear);
//   this.course = course;
// };
// const jay = Object.create(StudentProt);
// jay.init('kalisa daniel', 1998, 'computer science');

// console.log(jay);

// class Account {
//   constructor(owner, curency, pin) {
//     this.owner = owner;
//     this.curency = curency;

//     //simple privacy _
//     this._pin = pin;
//     this._movement = [];
//     this.locale = navigator.language;

//     console.log(`${owner} thank you for using this account in ${this.locale}`);
//   }

//   //create for access mov
//   getmovement() {
//     return this._movement;
//   }

//   ///PUBLIC INTERFACE

//   deposit(val) {
//     this._movement.push(val);
//   }

//   withdrwa(val) {
//     this.deposit(-val);
//   }

//   _approveloan() {
//     return true;
//   }

//   requestloan(val) {
//     if (this._approveloan) {
//       this.deposit(val);
//       console.log(`Loan of ${val} Approved`);
//     }
//   }
// }

// const acc1 = new Account('tchami', 'RWf', 1111111);

// //// istead of do this ude the profession way for creating methode
// // acc1.movement.push(100);
// // acc1.movement.push(-100);

// acc1.deposit(200);
// acc1.withdrwa(1000);

// acc1.requestloan(19000);

// console.log(acc1.getmovement());

// console.log(acc1);

//// to day preparation for interview

// const removervoel = function (string) {
//   const voel = 'iuoaeIUOAE';
//   const answer = string
//     .split('')
//     .filter(el => voel.indexOf(el) === -1)
//     .join('');
//   console.log(answer);
//   return answer;
// };

// removervoel('kalisa ernest');
// console.log(Number.isInteger(-3.65));

// //// repeating word

// const repeatfnc = function (number, word) {
//   //FIRST CHECK IF THE NUMBER IS INTERGER AND GRETER THAN ZERO

//   if (Number.isInteger(number) && number > 0) {
//     const repet = word.repeat(number, word);
//     return repet;
//   } else {
//     console.log('check your input data if it is proper⚠️');
//   }
// };

// console.log(repeatfnc(100, 'Tchami '));

// const array2 = [100, 21, 34, 21, 43, 21, 142];

// const checkarr = function (arr) {
//   return Math.max(...arr);
// };

// console.log(checkarr(array2));

// console.log(array2.__proto__);

////////////////////////////////////////////////////////////////////////////////////////////
////////////ENCAPSULATION PRIVATE CLASSES FIELD AND METHODE

class Account {
  // PUBLIC FIELD
  locale = navigator.language;
  // _movement = [];

  /// to make some thing private
  #movement = [];

  constructor(owner, curency, pin) {
    this.owner = owner;
    this.curency = curency;

    //simple privacy _
    this._pin = pin;
    // this._movement = [];
    // this.locale = navigator.language;

    console.log(`${owner} thank you for using this account in ${this.locale}`);
  }

  //create for access mov
  getmovement() {
    return this.#movement;
  }

  ///PUBLIC INTERFACE

  deposit(val) {
    this.#movement.push(val);
  }

  withdrwa(val) {
    this.deposit(-val);
  }

  _approveloan() {
    return true;
  }

  requestloan(val) {
    if (this._approveloan) {
      this.deposit(val);
      console.log(`Loan of ${val} Approved`);
    }
  }
}

const acc1 = new Account('kalisa ernest', 2000, 36655);
acc1.deposit(1000);
acc1.withdrwa(200);

console.log(acc1.getmovement());

// we can not console movement out siide becouse we set it to private #
// console.log(acc1.#movement);
console.log(acc1._pin);

'use strict';

//create constructor function always use capital letter
const Person = function (name, birthyear) {
  this.fullname = name;
  this.birthyear = birthyear;

  /// dont do this
  this.Calcage = function () {
    console.log(2023 - this.birthyear);
  };
};

const kalisa = new Person('kalisa daniel', 1998);

console.log(kalisa);
const Maligarita = new Person('maliga ', 1975);
console.log(Maligarita);

// how to check the instance where come from
console.log(kalisa instanceof Person);

///⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️  proto type ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️

///⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️End of proto type ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️

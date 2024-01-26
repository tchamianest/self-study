//// EXPORTING MODULES
let data = [];

const name = 'kalisa daniel';
const addition = function (num1, num2) {
  data.push({ num1, num2 });
  console.log(data);
  console.log(num1 + num2);
};

export { addition, name };

// IMPORTING MODULES
// import { addition, name } from './shoppingCart';

// CHANGE NAME OF THINGS THAT YOU IMPORT
// import { addition as add, name as NAme } from './shoppingCart.js';

// add(12, 54);
// console.log(add(7, 8));
// console.log('kalida ');
// console.log('what happen');
// console.log(NAme);

/// HOW TO EXPORT ALL THINGS FROM MODULES
import * as daniel from './shoppingCart.js';
console.log(daniel.name);

daniel.addition(34, 67);

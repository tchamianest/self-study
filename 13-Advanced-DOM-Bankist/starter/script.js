'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////// other new methode for selcting✅✅✅✅Selecting Methode✅✅✅✅

// console.log(document.documentElement); // this can be used to select all Entire pages
// console.log(document.body); // this can be used to select all Body

// const selectall = document.querySelectorAll('.section');
// console.log(selectall);

// const allbtn = document.getElementsByTagName('button');
// console.log(allbtn);

// console.log(document.getElementsByClassName('btn'));

// ///✅✅✅✅✅✅✅✅✅✅Creating and inserting new eleement✅✅✅✅✅✅✅✅✅✅✅

// .insertAdjacentHTML     // best methode for inserting and creating html

// const message = document.createElement('div');
// message.classList.add('cookie-message');

// // console.log(message);
// const head = document.querySelector('.header');
// message.innerHTML = `We are the Kalisas and we need to build and analitics
// <button class='btn btn--close--cookie'>the kalisas</button>`;

// // head.prepend(message); // prepending add element as the first child of header element
// // // head.append(message); // this can move element to last position of headeer
// // head.append(message.cloneNode(true)); // this can create the new copy

// // head.before(message); //this insert before the header section
// // head.after(message.cloneNode(true)); //this insert after the header section and create copy becouse cloneNode(true)
// head.after(message);

// // ///✅✅✅✅✅✅✅✅✅✅Deleting the  eleement✅✅✅✅✅✅✅✅✅✅✅

// document
//   .querySelector('.btn--close--cookie')
//   .addEventListener('click', function () {
//     message.remove();

//or other methode
// message.parentElement.removeChild(message);
// });

/// starting the style
// let change our cookie background

// message.style.background = '#37383d'; // this is the inline  style and we can show it inhtml document
// console.log(getComputedStyle(message).color); // this the methode for showing the styles
// console.log(getComputedStyle(message).height); // this the methode for showing the styles

// const newstyle = Number.parseFloat(getComputedStyle(message).height) + 40;
// message.style.height = `${String(newstyle)}px`;

// // ///✅✅✅✅✅✅✅✅✅✅styling✅✅✅✅✅✅✅✅✅✅✅

// // document.documentElement.style.setProperty('--color-primary', 'blue'); //this change any where in app we use the variable of primary

// /////////////attribute

// const logo = document.querySelector('.nav__logo');
// console.log(logo.src);
// console.log(logo.alt);
// console.log(logo.className);

// ///// non standard  attributes: is the attribute you create which are not stand for html
// console.log(logo.desiner); // this dosen't work because it is not standard

// //how

/////⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️start working on real App⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️

//////  1st implement smothly scrolling
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

btnScroll.addEventListener('click', function (e) {
  const scolbou = section1.getBoundingClientRect(); // show its location
  console.log(scolbou);

  //simple way for getting some cordinate

  console.log(
    'Height/width view',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  /// scrolling we use window scroll methode

  // window.scroll(scolbou.right, scolbou.bottom); // seting the position for where we need to scroll

  // window.scroll(scolbou.left, scolbou.top); //this have some bug error and we need to add the current position height

  // window.scrollTo(
  //   scolbou.left + window.pageXOffset,
  //   scolbou.top + window.pageYOffset
  // );

  // to  make it smothly we  can call its using the object

  // window.scrollTo({
  //   left: scolbou.left + window.pageXOffset,
  //   top: scolbou.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // Modern way for scroll

  section1.scrollIntoView({ behavior: 'smooth' });
});

////⚠️⚠️⚠️⚠️⚠️⚠️⚠️Types of Events and Event Handle⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️

//mouseenter which work like hover
const h1 = document.querySelector('h1');

// h1.addEventListener('mouseenter', function () {
//   //hovering event modern way
//   alert('ok you made it you hover on h1 already');
// });

// /// another way for undestund the event that happen

// h1.onmouseenter = function (e) {
//   /// another way for event listener but is oldschool
//   alert('iyi ni leastener ya 2');
// };

// another way
const alret1 = function () {
  //hovering event modern way
  alert('ok you made it you hover on h1 already');

  /////💀💀💀💀to remove this event
  h1.removeEventListener('mouseenter', alret1);
};
h1.addEventListener('mouseenter', alret1);
////⚠️⚠️⚠️⚠️⚠️⚠️⚠️End of Types of Events and Event Handle⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️

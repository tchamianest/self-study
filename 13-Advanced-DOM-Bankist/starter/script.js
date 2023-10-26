'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabscontainer = document.querySelector('.operations__tab-container');
const contenr = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///↗️↗️↗️↗️↗️↗️↗️↗️↗️↗️Building slider component↗️↗️↗️↗️↗️↗️↗️↗️↗️↗️↗️
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnsliderleft = document.querySelector('.slider__btn--left');
const btnsliderright = document.querySelector('.slider__btn--right');
let currentslide = 0;
const maxslide = slides.length;

/// init the dot

const dotcontainer = document.querySelector('.dots');

//function for creating the dots

const createDots = function () {
  slides.forEach(function (_, i) {
    dotcontainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();
const activatedot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

dotcontainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    gotoslidefunc(slide);
    activatedot(slide);
  }
});
// slider.style.transform = `scale(0.7)`;
// slider.style.overflow = `visible`;

// slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
// console.log(slides);

const gotoslidefunc = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

gotoslidefunc(0);
/// to go to next slide functionality
const nextslide = function () {
  if (currentslide === maxslide - 1) {
    currentslide = 0;
  } else {
    currentslide++;
  }
  gotoslidefunc(currentslide);
  activatedot(currentslide);
};

const prevefunction = function () {
  if (currentslide === 0) {
    currentslide = maxslide - 1;
  } else {
    currentslide--;
  }
  gotoslidefunc(currentslide);
  activatedot(currentslide);
};
btnsliderright.addEventListener('click', nextslide);
btnsliderleft.addEventListener('click', prevefunction);

/// adding slider with allow button

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') {
    nextslide();
  } else if (e.key === 'ArrowLeft') {
    prevefunction();
  }
});
///↗️↗️↗️↗️↗️↗️↗️↗️↗️↗️Building slider component↗️↗️↗️↗️↗️↗️↗️↗️↗️↗️↗️
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///↗️↗️↗️↗️↗️↗️↗️↗️↗️↗️Lazy image↗️↗️↗️↗️↗️↗️↗️↗️↗️↗️↗️

const imgtarget = document.querySelectorAll('img[data-src]');
// console.log(imgtarget);
const loadimg = function (entries, observe) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  /// remove lazy blur if all image are fineshed to load

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observe.unobserve(entry.target);
};

const imgobserve = new IntersectionObserver(loadimg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});
imgtarget.forEach(img => imgobserve.observe(img));

/////↗️↗️↗️↗️↗️↗️↗️↗️↗️↗️Lazy image end sectioon↗️↗️↗️↗️↗️↗️↗️↗️↗️↗️↗️
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///↗️↗️↗️↗️↗️↗️↗️↗️↗️↗️Implement stick navigation↗️↗️↗️↗️↗️↗️↗️↗️↗️↗️↗️
//stick navigation
const boundary = section1.getBoundingClientRect();
window.addEventListener('scroll', function () {
  if (window.scrollY > boundary.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

//// the new better way for implementing it by using intersectio api

//start for learning how its work with api
const observecallback = function (entry, observe) {
  entry.forEach(enter => {
    // console.log(enter);
  });
};

const obseroption = {
  root: null,
  threshold: 0.1,
};

const observe = new IntersectionObserver(observecallback, obseroption);
observe.observe(section1);

///↗️↗️↗️↗️↗️↗️↗️↗️↗️↗️End of Implement stick navigation↗️↗️↗️↗️↗️↗️↗️↗️↗️↗️↗️

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///↗️↗️↗️↗️↗️↗️↗️↗️↗️↗️Menu fade animation↗️↗️↗️↗️↗️↗️↗️↗️↗️↗️↗️
const handelehover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this; //opacity;
    });
    logo.style.opacity = this; //opacity;
  }
};
/// first way to handle that to call event in the functon before
// nav.addEventListener('mouseover', function (e) {
//   handelehover(e, 0.5);
// });
// nav.addEventListener('mouseout', function (e) {
//   handelehover(e, 1);
// });

//bind methode for use function insider other
//parsing argument into handle it difficulrt way
nav.addEventListener('mouseover', handelehover.bind(0.5));
nav.addEventListener('mouseout', handelehover.bind(1));
///↗️↗️↗️↗️↗️↗️↗️↗️↗️↗️End of Menu fade animation↗️↗️↗️↗️↗️↗️↗️↗️↗️↗️↗️

///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

///↗️↗️↗️↗️↗️↗️↗️↗️↗️↗️Tabbed component↗️↗️↗️↗️↗️↗️↗️↗️↗️↗️↗️

//this is to select each tab that we click
// tabs.forEach(tab =>
//   tab.addEventListener('click', function () {
//     console.log('ukanze tab');
//   })
// );

// other methode for identifie the button that we click

tabscontainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab'); // we get the all operation tab if we click it

  //remove null problemm for clik outside

  if (!clicked) return; //this if happen we can do nothing this remove the error of non clik

  console.log(clicked);
  //before add operation tab active we have to remove from others
  tabs.forEach(a => a.classList.remove('operations__tab--active'));

  clicked.classList.add('operations__tab--active');

  // activate the content area
  console.log(clicked.dataset.tab);

  // we have to hidden other and then display other
  contenr.forEach(e => e.classList.remove('operations__content--active'));

  //display based on waht we click
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
///↗️↗️↗️↗️↗️↗️↗️↗️↗️↗️End of Tabbed component↗️↗️↗️↗️↗️↗️↗️↗️↗️↗️↗️

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

///💥💥💥💥💥💥page delegation 💥💥💥💥💥💥💥💥
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    console.log('links');
  });
});

///💥💥💥💥💥💥page delegation 💥💥💥💥💥💥💥💥

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

// // another way
// const alret1 = function () {
//   //hovering event modern way
//   alert('ok you made it you hover on h1 already');

//   /////💀💀💀💀to remove this event
//   h1.removeEventListener('mouseenter', alret1);
// };
// h1.addEventListener('mouseenter', alret1);
// ////⚠️⚠️⚠️⚠️⚠️⚠️⚠️End of Types of Events and Event Handle⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️

////////////////////////////////// event propagation practices
//rgb(255,255,255)

////💥💥💥💥💥how we can handle different event at the same time💥💥💥💥💥💥💥
// const randomint = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

// const randomcolor = () => {
//   return `rgb(${randomint(0, 255)},${randomint(0, 255)},${randomint(0, 255)})`;
// };

// document.querySelector('.nav__link ').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomcolor();
//   console.log('Feature btn', e.target);
// });

// document.querySelector('.nav__links ').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomcolor();
//   console.log('all-container', e.target);
// });

// document.querySelector('.nav ').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomcolor();
//     console.log('Container', e.target);

//     // to stop the propagation at this button
//     // e.stopPropagation(); //but it is not good practise
//   },
//   true // other way for bubling capturing
// );
// document.querySelector('body').style.backgroundColor = randomcolor(); // idont knnow reson why my computer doent ready this rgbb

/// 💀💀💀💀💀event delegation implementing page navigation💀💀💀💀💀💀💀💀

//⚠️⚠️⚠️⚠️⚠️DOM transversing⚠️⚠️⚠️⚠️⚠️

// // const h1 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.highlight'));
// h1.firstElementChild.style.color = 'blue'; // this can change only the color for first child element only
// h1.lastElementChild.style.color = 'white'; // this can change only the color for last child element only

// /// going upward in the parent
// console.log(h1.parentNode);
// h1.closest('.header').style.background = 'var(--gradient-secondary)'; // this code can change all the entire header background color

// // going up: siblings

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

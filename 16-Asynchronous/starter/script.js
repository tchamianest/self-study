'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const inputfiel = document.querySelector('.input');

///////////////////////////////////////////////////////////////////////////////////////////
////RENDERING
const countryRender = function (data, classadd = '') {
  const html = `
        <article class="country ${classadd}">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}M Population</p>
            <p class="country__row"><span>🗣️</span>${data.languages.eng}</p>
            <p class="country__row"><span>💰</span>${data.fifa}</p>
          </div>
        </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const rendererro = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

///END OF RENDERING///////////////////////////////////////////////////////////////////

///////////////////////////////////////

///way for get request

// const getcountry = function (countrie) {
//   const request = new XMLHttpRequest();
//   request.open('Get', `https://restcountries.com/v3.1/name/${countrie}`);

//   //we send  to the server
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//         <article class="country">
//           <img class="country__img" src="${data.flags.svg}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name.common}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)}M Population</p>
//             <p class="country__row"><span>🗣️</span>${data.languages.eng}</p>
//             <p class="country__row"><span>💰</span>${data.fifa}</p>
//           </div>
//         </article>
//   `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };
// getcountry('rwanda');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////// GET COUNTRY WITH NEIGHBOR

/// make function for rendering

/*
const getcountryNeigbour = function (countrie) {
  const request1 = new XMLHttpRequest();
  request1.open('Get', `https://restcountries.com/v3.1/name/${countrie}`);

  //we send  to the server
  request1.send();

  request1.addEventListener('load', function () {
    const [data1] = JSON.parse(this.responseText);
    console.log(data1);

    /// Render country one
    countryRender(data1);

    /// GET NEIGHBOUR COUNTRY
    const [neighbour] = data1.borders;
    console.log(neighbour);

    const request2 = new XMLHttpRequest();
    request2.open('Get', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);

      ///RENDER COUNTRY 2
      countryRender(data2, 'neighbour');
    });
  });
};
getcountryNeigbour('usa');
*/

///////////////////////////////////////////////////////////////////////////////////////////////
///////////// UNSING PROMISES TO FETCH OUR DATA

// const getdatafrom = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);

//       //also this json is Asynchrouns function we have to return it
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       countryRender(data[0]);
//     });
// };

/// simple way with arrow function

///CRETE FUNCTION FOR THE METHODE FOR THE THEN ERROR

/*
const getdatafrom = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      console.log(response);
      if (!response.ok)
        throw new Error(`the country not found ${response.status}`);
      return response.json();
    })
    .then(data => {
      countryRender(data[0]);
      console.log(data[0]);

      const neighbour = data[0].borders[0];
      // console.log(neighbour);
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      countryRender(data[0], 'neighbour');
    })
    .catch(erro => {
      console.log(erro);
      rendererro(`the error happen 😉😉
       ${erro.message} Try Again !`);
    })
    .finally(() => {
      ///use finally for things happens any time if we met erro or when success
      countriesContainer.style.opacity = 1;
    });
};*/

/////////////////////////////////////////////////////////////////////////////////////////
///// factorlise
const getJSON = function (url, errorMsg = '') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
    return response.json();
  });
};

///////////////
// const getdatafrom = function (country) {
//   getJSON(
//     `https://restcountries.com/v3.1/name/${country}`,
//     'the country not found '
//   )
//     .then(data => {
//       countryRender(data[0]);

//       const neighbour = data[0].borders[0];
//       // console.log(neighbour);
//       if (!neighbour) throw new Error('there is no neighbour');

//       //COUNTRY 2
//       return getJSON(
//         `https://restcountries.com/v3.1/alpha/${neighbour}`,
//         'Neighbour Country not found'
//       );
//     })
//     .then(data => countryRender(data[0], 'neighbour'))
//     .catch(erro => {
//       console.log(erro);
//       rendererro(`the error happen 😉😉
//        ${erro.message} Try Again !`);
//     })
//     .finally(() => {
//       ///use finally for things happens any time if we met erro or when success
//       countriesContainer.style.opacity = 1;
//     });
// };
// btn.addEventListener('click', function () {
//   let like = inputfiel.value;
//   getdatafrom(like);
//   countriesContainer.textContent = '';
// });

////////////////////////////////////////////////////////////////////////////////////////////////
///// first coding CHALLENGE

// const whereAmI = function (lat, long) {
//   fetch(`https://geocode.xyz/${lat},${long}?geoit=json`)
//     .then(res => {
//       if (!res.ok) throw new Error('proble to fetch');
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(data.country);
//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error('Country not found');
//       return res.json();
//     })
//     .then(data => countryRender(data[0]))
//     .catch(erro => {
//       console.log(`the error happening 💥${erro}`);
//     });
// };

// whereAmI(52.508, 13.381);

//////COMPARISON FOR MICRO TASK QUEUE TO CALL-BACK HELL QUEUE

// console.log('test for faster');
// setTimeout(() => console.log('timer of zero sec'), 0);
// Promise.resolve('kalisa daniel yakamejeje').then(res => {
//   for (let i = 0; i < 10000000000; i++) {}
//   console.log(res);
// });

// console.log('ariko urasetsa');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////BUILDING A SIMPLE PROMISE

///EX1
/*
const lotteryGame = new Promise(function (resolve, reject) {
  if (Math.random() > 0.5) {
    resolve('You win 👌👌');
  } else {
    reject('you lost 😂😂');
  }
});

lotteryGame.then(dataa => console.log(dataa)).catch(err => console.error(err));
*/

//EX2

// const lotteryGame = new Promise(function (resolve, reject) {
//   console.log('lottery loading');

//   setTimeout(function () {
//     if (Math.random() > 0.5) {
//       resolve('You win 👌👌');
//     } else {
//       reject(new Error('you lost 😂😂'));
//     }
//   }, 2000);
// });

// lotteryGame.then(dataa => console.log(dataa)).catch(err => console.error(err));

////new way

// const wait = function (second) {
//   return new Promise(resolve => {
//     setTimeout(resolve, second * 1000);
//   });
// };

// //// this ican also replace the call back hell

// wait(2)
//   .then(data => {
//     console.log('you wait 2 second');
//     return wait(1);
//   })
//   .then(res => {
//     console.log('you wait 1 second after 2');
//     return wait(3);
//   })
//   .then(ter => console.log('you wait three after four'));

//// GET CURENT LOCATION WITH AWAIT

// const getpotionpromise = function () {
//   return new Promise((resolve, reject) => {
//     // navigator.geolocation.getCurrentPosition(
//     //   function (posi) {
//     //     resolve(posi);
//     //   },
//     //   function (err) {
//     //     reject(err);
//     //   }

//     //use simple methode
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// // getpotionpromise().then(data => console.log(data));

// ////// put where im to next lever

// const whereAmI = function () {
//   getpotionpromise()
//     .then(posi => {
//       const { latitude: lat, longitude: long } = posi.coords;
//       return fetch(`https://geocode.xyz/${lat},${long}?geoit=json`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error('proble to fetch');
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(data.country);
//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error('Country not found');
//       return res.json();
//     })
//     .then(data => countryRender(data[0]))
//     .catch(erro => {
//       console.log(`the error happening 💥${erro}`);
//     });
// };

// btn.addEventListener('click', whereAmI);

/////CHALLENGE 2////////////////////////////////////////////////////
// const wait = function (second) {
//   return new Promise(resolve => {
//     setTimeout(resolve, second * 1000);
//   });
// };

// const imgcontainer = document.querySelector('.images');

// const createImage = function (imagepth) {
//   return new Promise(function (resolve, reject) {
//     const image = document.createElement('img');
//     image.src = imagepth;

//     image.addEventListener('load', function () {
//       imgcontainer.append(image);
//       resolve(image);
//     });

//     image.addEventListener('error', function () {
//       reject(new Error('there  is no image fromthat path'));
//     });
//   });
// };

// // globar variable for hide
// let currentimag;
// createImage('img/img-1.jpg')
//   .then(data => {
//     currentimag = data;
//     return wait(3);
//   })
//   .then(() => {
//     currentimag.style.display = 'none';
//   })
//   .then(() => {
//     return wait(2);
//   })
//   .then(() => {
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentimag = img;
//     return wait(2);
//   })
//   .then(data => {
//     currentimag.style.display = 'none';
//   })
//   .catch(erro => console.log(erro));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// SINK AWAIT this no need for all the then

const whereIam = async function (country) {
  ///fetch info from country API
  const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);

  ////extract the info we receive into json form
  const final = await res.json();
  console.log(final);

  //// after we have to render it
  countryRender(final[0]);
};
whereIam('rwanda');

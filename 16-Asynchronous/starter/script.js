'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

///way for get request

const getcountry = function (countrie) {
  const request = new XMLHttpRequest();
  request.open('Get', `https://restcountries.com/v3.1/name/${countrie}`);

  //we send  to the server
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
        <article class="country">
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
  });
};
getcountry('rwanda');
getcountry('usa');
getcountry('canada');
getcountry('germany');

'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
// const a = Number(prompt('neter first bnumber'));
// const b = Number(prompt('neter second  bnumber'));

/////////////////////////////////
///GETING MY LATITUDE AND LONGITUDE

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(position.coords.latitude);
      console.log(longitude, latitude);
    },
    function () {
      alert('Error You current position not run!');
      const body = document.querySelector('body');
      body.style.color = 'black';
      body.style.textAlign = 'center';
      body.innerHTML = `<h1 > There is error happen</h1>`;
    }
  );

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
let map, mapevent;
// const a = Number(prompt('neter first bnumber'));
// const b = Number(prompt('neter second  bnumber'));

/////////////////////////////////
///GETING MY LATITUDE AND LONGITUDE

/// CLASS OF WOLL APP
class App {
  #map;
  #mapevent;
  constructor() {
    this._getPosition();

    form.addEventListener('submit', this._newWorkout);

    //////INPUT TYPE CHANGE FORM BASED
    inputType.addEventListener('change', function () {
      inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
      inputElevation
        .closest('.form__row')
        .classList.toggle('form__row--hidden');
    });
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMApPositio,
        function () {
          const body = document.querySelector('body');
          body.style.color = 'black';
          body.style.textAlign = 'center';
          body.innerHTML = `<h1 > There is error happen</h1>`;
        }
      );
  }

  _loadMApPositio(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(position.coords.latitude);
    console.log(longitude, latitude);

    const coard = [latitude, longitude];

    this.#map = L.map('map').setView(coard, 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    this.#map.on('click', function (map) {
      this.#mapevent = map;
      form.classList.remove('hidden');
      inputDistance.focus();
    });
  }

  _showForm() {}

  _toggleElevetionField() {}

  _newWorkout(e) {
    e.preventDefault();

    //CLEAR ALL INPUT AFTER SUBMISION
    inputCadence.value =
      inputDistance.value =
      inputDuration.value =
      inputElevation.value =
        ' ';

    /// MAKER HERE
    console.log(mapevent);
    const { lat, lng } = mapevent.latlng;
    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          maxWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('work out')
      .openPopup();
  }
}
const app = new App();

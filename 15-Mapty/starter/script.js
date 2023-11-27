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
class workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  constructor(coard, distance, duration) {
    this.coard = coard; //[LAT,LONG]
    this.distance = distance;
    this.duration = duration;
  }
}

class Runnning extends workout {
  constructor(coard, distance, duration, cadence) {
    super(coard, distance, duration);
    this.cadence = cadence;
    this.calcpace();
  }

  calcpace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class ciclering extends workout {
  constructor(coard, distance, duration, elevationgain) {
    super(coard, distance, duration);
    this.elevationgain = elevationgain;
    this.calcspeed();
  }

  calcspeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

const cilc1 = new ciclering([123, 32], 212, 30, 21);
const cilc2 = new Runnning([123, 32], 212, 30, 21);
console.log(cilc1, cilc2);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////APPLICATION ARCHTECTURE
class App {
  #map;
  #mapevent;
  constructor() {
    this._getPosition();

    form.addEventListener('submit', this._newWorkout.bind(this));

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
        this._loadMApPositio.bind(this),
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
    // console.log(position.coords.latitude);
    // console.log(longitude, latitude);

    const coard = [latitude, longitude];

    this.#map = L.map('map').setView(coard, 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));
  }

  /// thiss remov gidden on our form
  _showForm(mape) {
    this.#mapevent = mape;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevetionField() {}

  _newWorkout(e) {
    e.preventDefault();

    //GET data from form

    const type = inputType.value;
    console.log(`type is :${type}`);

    const distance = +inputDistance.value;
    const duration = +inputDuration.value;

    //Check if data is valid

    //if workout running ,create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;

      //check if input is valied

      if (
        !Number.isFinite(distance) &&
        !Number.isFinite(duration) &&
        !Number.isFinite(cadence)
      )
        return alert('input must be postive number');
    }
    //if workout cycling ,create cycling object

    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !Number.isFinite(distance) &&
        !Number.isFinite(duration) &&
        !Number.isFinite(elevation)
      )
        return alert('input must be postive number');
    }
    //add new work out on map as maker

    // render workout on list

    // Hide form clear input field and

    //CLEAR ALL INPUT AFTER SUBMISION
    inputCadence.value =
      inputDistance.value =
      inputDuration.value =
      inputElevation.value =
        ' ';

    /// MAKER HERE
    console.log(this.#mapevent);
    const { lat, lng } = this.#mapevent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
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

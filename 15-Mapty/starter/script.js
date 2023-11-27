'use strict';

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

  _setdescription() {
    // prettier-ignore
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} On ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Runnning extends workout {
  type = 'running';
  constructor(coard, distance, duration, cadence) {
    super(coard, distance, duration);
    this.cadence = cadence;
    this.calcpace();
    this._setdescription();
  }

  calcpace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class ciclering extends workout {
  type = 'cycling';
  constructor(coard, distance, duration, elevationgain) {
    super(coard, distance, duration);
    this.elevationgain = elevationgain;
    this.calcspeed();
    this._setdescription();
  }

  calcspeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

const cilc1 = new ciclering([123, 32], 212, 30, 21);
const cilc2 = new Runnning([123, 32], 212, 30, 21);
// console.log(cilc1, cilc2);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////APPLICATION ARCHTECTURE
class App {
  #map;
  #mapevent;
  #workouts = [];
  constructor() {
    this._getPosition();

    form.addEventListener('submit', this._newWorkout.bind(this));
    containerWorkouts.addEventListener('click', this._movetomap.bind(this));

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

  _hidenform() {
    inputCadence.value =
      inputDistance.value =
      inputDuration.value =
      inputElevation.value =
        ' ';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevetionField() {}

  _newWorkout(e) {
    e.preventDefault();

    //GET data from form

    const type = inputType.value;

    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapevent.latlng;
    let workout;

    //Check if data is valid

    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));

    const allPostive = (...inputs) => inputs.every(inp => inp > 0);
    //if workout running ,create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;

      //check if input is valied

      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)

        !validInputs(distance, duration, cadence) ||
        !allPostive(distance, duration, cadence)
      )
        return alert('input must be postive number');
      workout = new Runnning([lat, lng], distance, duration, cadence);
    }
    //if workout cycling ,create cycling object

    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !validInputs(distance, duration, elevation) ||
        !allPostive(distance, duration)
      )
        return alert('input must be postive number');
      workout = new ciclering([lat, lng], distance, duration, elevation);
    }
    //add new work out on map as maker
    this.#workouts.push(workout);
    // console.log(workout);
    // render workout on list

    // Hide form clear input field and

    //CLEAR ALL INPUT AFTER SUBMISION
    this._hidenform();
    /// MAKER HERE
    // console.log(this.#mapevent);
    this._Renderworkout(workout);

    //render on the list work out
    this._Renderworkouthml(workout);
  }

  /// rendeling
  _Renderworkout(workout) {
    L.marker(workout.coard)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴'} ${workout.description}`
      )
      .openPopup();
  }

  _Renderworkouthml(workout) {
    let html = `
     <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout__details">
        <span class="workout__icon">${
          workout.type === 'running' ? '🏃‍♂️' : '🚴'
        }</span>
        <span class="workout__value">5.2</span>
        <span class="workout__unit">${workout.distance}km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>`;

    if (workout.type === 'running') {
      html += `
         <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
        `;
    }

    if (workout.type === 'cycling') {
      html += `
         <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationgain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
        `;
    }

    form.insertAdjacentHTML('afterend', html);
  }

  _movetomap(e) {
    const worktl = e.target.closest('.workout');
    console.log(worktl);

    if (!worktl) return;
    const workout = this.#workouts.find(work => work.id === worktl.dataset.id);
    this.#map.setView(workout.coard, 13, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }
}
const app = new App();

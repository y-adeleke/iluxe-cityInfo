import cityview from "./cityview.js";
const mainBox = document.querySelector(".main-box");
const errDisplay = document.querySelector(".error-display");
const spinner = document.querySelector(".gyro");

export let cityState = {
  data: {},
  dataUpdate: {},
  bookmarks: [],
  bookmarksUpdate: [],
};

// Promisifying the Geolocation API
const getPosition = function () {
  if (navigator.geolocation) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, (reject) => {
        errDisplay.style.display = "block";
        errDisplay.textContent = `${reject.message}🧨`;
        mainBox.style.display = "none";

        spinner.style.visibility = "hidden";
      });
    });
  } else {
    alert(
      "your browser doesn't support getting your location, search instead."
    );
  }
};

export const loadBrowserLocation = async function () {
  const getPos = await getPosition();
  const { latitude: lat, longitude: lng } = getPos.coords;
  const loc = `${lat},${lng}`;
  return loc;
};
export const loadCityInfo = async function (inputCity, error) {
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=4e95fd070598460ebb2110205221306&q=${inputCity}&days=1&aqi=yes&alerts=yes`
    );

    if (!res.ok) throw new Error(error);
    let dataCityInfo = await res.json();
    ///fetching country isi code
    const resCountryIso = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${dataCityInfo.location.lat}&lon=${dataCityInfo.location.lon}&appid=3262716e26ad022afb3c61d6f5e11348`
    );
    if (!resCountryIso.ok)
      throw new Error(
        "unable to fetch country code, check your internet connection🧨"
      );
    const dataCountryIso = await resCountryIso.json();
    let accWeather = dataCountryIso.main.temp;
    const isiCode = dataCountryIso.sys.country;

    ///fetching country information
    const resCountry = await fetch(
      `https://restcountries.com/v2/alpha/${isiCode}`
    );
    if (!resCountry.ok)
      throw new Error(
        "unable to fecth country information, check your internet connection🧨"
      );
    const dataCountry = await resCountry.json();
    let { currencies, flag, languages, name, population } = dataCountry;
    let allCountryData = [
      currencies,
      flag,
      languages,
      name,
      population,
      accWeather,
    ];

    cityState.data = {
      current: dataCityInfo.current,
      forecast: dataCityInfo.forecast,
      location: dataCityInfo.location,
      countryInfo: allCountryData,
    };

    if (
      cityState.bookmarks.some(
        (b) =>
          b.location.lat === dataCityInfo.location.lat &&
          b.location.lon === dataCityInfo.location.lon
      )
    ) {
      cityState.data.bookmarked = true;
    } else cityState.data.bookmarked = false;
    mainBox.style.visibility = "visible";
  } catch (error) {
    errDisplay.textContent = `${error.message}🧨`;
    errDisplay.style.display = "block";
    spinner.style.visibility = "hidden";
  }
};

const persistBookmark = function () {
  localStorage.setItem("bookmarks", JSON.stringify(cityState.bookmarks));
};

export const addBookmark = function (city) {
  //add bookmark
  cityState.bookmarks.push(city);

  //mark currrent city as bookmarked
  if (city.location.name === cityState.data.location.name)
    cityState.data.bookmarked = true;
  persistBookmark();
};

export const deleteBookmark = function (cityName) {
  const index = cityState.bookmarks.findIndex(
    (el) => el.location.name === cityName.location.name
  );
  cityState.bookmarks.splice(index, 1);
  if (cityName.location.name === cityState.data.location.name)
    //mark currrent city as not bookmarked
    cityState.data.bookmarked = false;
  persistBookmark();
};

export const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) cityState.bookmarks = JSON.parse(storage);
  document.querySelector(".bookmark-container").innerHTML = "";

  cityState.bookmarks.forEach(async (a) => {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=4e95fd070598460ebb2110205221306&q=${a.location.name}&days=1&aqi=yes&alerts=yes`
    );

    if (!res.ok) throw new Error(error);
    let dataCityInfo = await res.json();
    ///fetching country isi code
    const resCountryIso = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${dataCityInfo.location.lat}&lon=${dataCityInfo.location.lon}&appid=3262716e26ad022afb3c61d6f5e11348`
    );
    if (!resCountryIso.ok)
      throw new Error(
        "unable to fetch country code, check your internet connection🧨"
      );
    const dataCountryIso = await resCountryIso.json();
    let accWeather = dataCountryIso.main.temp;
    const isiCode = dataCountryIso.sys.country;

    ///fetching country information
    const resCountry = await fetch(
      `https://restcountries.com/v2/alpha/${isiCode}`
    );
    if (!resCountry.ok)
      throw new Error(
        "unable to fecth country information, check your internet connection🧨"
      );
    const dataCountry = await resCountry.json();
    let { currencies, flag, languages, name, population } = dataCountry;
    let allCountryData = [
      currencies,
      flag,
      languages,
      name,
      population,
      accWeather,
    ];

    const dataUpdate = {
      current: dataCityInfo.current,
      forecast: dataCityInfo.forecast,
      location: dataCityInfo.location,
      countryInfo: allCountryData,
    };
    cityState.bookmarksUpdate.push(dataUpdate);
    document.querySelector(".bookmark-error").innerHTML = "";
    const weatherCelcius = dataUpdate.countryInfo[5] - 273.15;
    const html = ` <div class="bookmarked-single-box">
    <div class="book-weather-box">
      <h4 class ="bookmark-city">${a.location.name}</h4>
      <h3>${weatherCelcius.toFixed()}<span>℃</span></h3>
      <p>${dataUpdate.current.condition.text}</p>
    </div>
    <div class="book-weather-icon">
    <img
    class ="weather-icon-deg" src="${
      dataUpdate.current.condition.icon
    }" alt=""/>
    </div>
    <div class="book-weather-status">
      <p class="book-humidity"><i class="ph-drop-half-bottom"></i>${
        dataUpdate.current.humidity
      }%</p>
      <p class="book-wind-speed">
        <i class="weather-icons ph-wind"></i>${dataUpdate.current.wind_kph}Km/h
      </p>
      <p class="book-rain-chance">
        <i class="weather-icons ph-cloud-rain"></i>${
          dataUpdate.forecast.forecastday[0].day.daily_chance_of_rain
        }%
      </p>
    </div>
  </div>`;
    document
      .querySelector(".bookmark-container")
      .insertAdjacentHTML("beforeend", html);
  });

  cityState.bookmarks = cityState.bookmarksUpdate;
  if (cityState.bookmarks.length === 0)
    document.querySelector(".bookmark-error").innerHTML = "No bookmark yet!";
};
init();

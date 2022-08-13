class cityView {
  _data;
  markup = document.querySelector(".main-box");
  bookmarkContainer = document.querySelectorAll(".bookmark-click");
  mainBox = document.querySelector(".main-box");
  closeButton = document.querySelector(".close-button");
  favBox = document.querySelector(".favourite-box");
  nextButton = document.querySelector(".next-click");
  errDisplay = document.querySelector(".error-display");
  spinner = document.querySelector(".gyro");
  bookmarkMarkup = document.querySelector(".bookmark-container");
  render(data) {
    this._data = data;
  }
  popFunctionality(peopleStr, pCon) {
    //////factorizing population

    let peopleLengthStr = peopleStr.length;

    const popFactMini = function (start, end, numFig) {
      const ext3 = peopleStr.slice(start, end);
      const extOthers = peopleStr.slice(end);
      const extNum = Number(`${ext3}.${extOthers}`);
      const extConvert = Number(extNum).toFixed(1);
      pCon.textContent = `${extConvert} ${numFig}`;
    };

    if (peopleLengthStr < 13 && peopleLengthStr === 12) {
      popFactMini(0, 3, "B");
    } else if (peopleLengthStr < 13 && peopleLengthStr === 11) {
      popFactMini(0, 2, "B");
    } else if (peopleLengthStr < 13 && peopleLengthStr === 10) {
      popFactMini(0, 1, "B");
    } else if (peopleLengthStr < 13 && peopleLengthStr === 9) {
      popFactMini(0, 3, "M");
    } else if (peopleLengthStr < 13 && peopleLengthStr === 8) {
      popFactMini(0, 2, "M");
    } else if (peopleLengthStr < 13 && peopleLengthStr === 7) {
      popFactMini(0, 1, "M");
    } else if (peopleLengthStr < 13 && peopleLengthStr === 6) {
      popFactMini(0, 3, "K");
    } else if (peopleLengthStr < 13 && peopleLengthStr === 5) {
      popFactMini(0, 2, "K");
    } else if (peopleLengthStr < 13 && peopleLengthStr === 4) {
      popFactMini(0, 1, "K");
    }
  }
  manipulateDesign() {
    const bookmarkContainer = document.querySelectorAll(".bookmark-click");
    const mainBox = document.querySelector(".main-box");
    const closeButton = document.querySelector(".close-button");
    const favBox = document.querySelector(".favourite-box");

    ///////DOM manipulation/////////////////////////////////////////////////////////
    // Bookmark responsive
    bookmarkContainer.forEach((a) =>
      a.addEventListener("click", function () {
        if (window.matchMedia("(min-width: 951px)").matches) {
          mainBox.style.gridColumn = "1 / 7";
          mainBox.style.animation = "moveRight .5s";
          favBox.style.visibility = "visible";
          favBox.style.animation = "moveRight .7s";
        } else if (window.matchMedia("(max-width: 950px)").matches) {
          mainBox.style.visibility = "hidden";
          document.querySelector(".gyro").style.display = "none";
          mainBox.style.animation = "hide .5s";
          favBox.style.visibility = "visible";
          document.querySelector(".error-display").style.display = "none";
          favBox.style.animation = "moveRight .5s";
        }
      })
    );

    closeButton.addEventListener("click", function () {
      if (window.matchMedia("(min-width: 951px)").matches) {
        favBox.style.visibility = "hidden";
        mainBox.style.gridColumn = "2 / span 6";
        mainBox.style.animation = "moveLeft .5s";
        favBox.style.animation = "moveLeft .7s";
      } else if (window.matchMedia("(max-width: 950px)").matches) {
        //document.querySelector(".error-display").style.display = "block";
        mainBox.style.visibility = "visible";
        favBox.style.visibility = "hidden";
        favBox.style.animation = "hide .5s";
        mainBox.style.animation = "moveLeft .5s";
      }
    });
  }

  addHandlerAddBookmark(handler) {
    this.markup.addEventListener("click", function (e) {
      const btn = e.target.closest(".add-bookmark");
      if (!btn) return;
      handler();
    });
  }

  generateMarkUp(data) {
    this.markup.innerHTML = "";
    let hourExtContainer = [];
    hourExtContainer = data.forecast.forecastday[0].hour.map((a) =>
      a.time.slice(11)
    );
    // Extracting Forecast Icon
    let iconContainer = [];
    iconContainer = data.forecast.forecastday[0].hour.map(
      (a) => a.condition.icon
    );
    //Extracting weather degree
    let weatherForecastContsiner = data.forecast.forecastday[0].hour.map((a) =>
      a.temp_c.toFixed(0)
    );
    const allForecastContainer = [
      hourExtContainer,
      iconContainer,
      weatherForecastContsiner,
    ];
    //////

    let [currencies, flag, languages, nativeName, population, accWeather] =
      data.countryInfo;
    const weatherCelcius = accWeather - 273.15;
    const populationFacStr = population.toString();
    //inserting html
    const html = `   
  <div class="weather-box">
  <div class="location-weather">
    <div class="city-name">
      <div class="name-box">
        <ion-icon name="location-outline"></ion-icon><span class="city">${
          data.location.name
        }</span>
      </div>
      <ion-icon class="add-bookmark" name="bookmark${
        data.bookmarked === true ? "" : "-outline"
      }"></ion-icon>
    </div>
    <div class="weather-degree">
    <img
    class ="weather-icon-deg" src="${
      data.current.condition.icon
    }" alt=""/>${weatherCelcius.toFixed()}<span>℃</span>
    </div>
    <div class="weather-status">${data.current.condition.text}</div>
    <div class="date-fig">
      ${data.location.localtime.slice(0, 10)} <span class="time-clock">${
      data.location.localtime.slice(11).length === 4
        ? "0" + data.location.localtime.slice(11)
        : data.location.localtime.slice(11)
    }</span><span class="manual-time-clock"></span>
       <span class="date-status"></span>
    </div>
  </div>

  <div class="weather-favorite">
  <ion-icon class="add-bookmark" name="bookmark${
    data.bookmarked === true ? "" : "-outline"
  }"></ion-icon>
    <div class="humidity">
      <i class="weather-icons ph-drop-half-bottom"
        ><span class="icon-gap">Humidity</span></i
      >
      <span class="weather-digit humidity-percentage">${
        data.current.humidity
      }<span>%</span></span>
    </div>

    <div class="wind-speed">
      <i class="weather-icons ph-wind"
        ><span class="icon-gap">wind speed</span></i
      ><span class="weather-digit wind-speed-percentage">${
        data.current.wind_kph
      }<span>kph</span></span>
    </div>
    <div class="rain-chance">
      <i class="weather-icons ph-cloud-rain"
        ><span class="icon-gap">chances of rain</span></i
      >
      <span class="weather-digit rain-percentage">${
        data.forecast.forecastday[0].day.daily_chance_of_rain
      }<span>%</span></span>
    </div>
  </div>
</div>

<div class="city-info-box">
<div class="image"></div>
<div class="country-info">
  <div><span class="info-title"></span>${nativeName}</div>
  <div class="cur"><span class="cur-icon">💰 </span>${
    currencies[0].code
  } <span class="symbol">${currencies[0].symbol}</span></div>
  <div><span class="info-title"> 🗣</span>${languages[0].name}</div>
  <div><span class="info-title">👫</span> <span class="pop-people">13.4m</span> people</div>
</div>
</div>

<div class="forecast">

</div>
</div>
`;
    this.markup.insertAdjacentHTML("beforeend", html);
    //this.markup.style.visibility = "visible";
    this.spinner.style.visibility = "hidden";
    document.querySelector(".image").style.backgroundImage = `url(${flag})`;
    const peoplePopulation = document.querySelector(".pop-people");
    this.popFunctionality(populationFacStr, peoplePopulation);

    //////////
    const forecastHtml = function (arr) {
      const [hours, icons, weather] = arr;
      hours.forEach((hour, index) => {
        const getIcons = icons[index];
        const getDeg = weather[index];
        const html = `<div class="forecast-single-con">
        <p class="time">${
          document.querySelector(".time-clock").innerHTML.slice(0, 2) ===
          hour.slice(0, 2)
            ? "NOW"
            : hour
        }</p>
        <img src="${getIcons}" alt=""/>
        <p class="deg">${getDeg} <span>℃</span></p>
      </div>
      </div>`;
        document
          .querySelector(".forecast")
          .insertAdjacentHTML("beforeend", html);
      });
    };
    forecastHtml(allForecastContainer);
    this.mainBox.style.display = "block";
  }

  bookmarkRender(data) {
    this.bookmarkMarkup.innerHTML = "";
    document.querySelector(".bookmark-error").innerHTML = "";
    data.map((a) => {
      const weatherCelcius = a.countryInfo[5] - 273.15;
      const html = ` <div class="bookmarked-single-box">
      <div class="book-weather-box">
        <h4 class ="bookmark-city">${a.location.name}</h4>
        <h3>${weatherCelcius.toFixed()}<span>℃</span></h3>
        <p>${a.current.condition.text}</p>
      </div>
      <div class="book-weather-icon">
      <img
      class ="weather-icon-deg" src="${a.current.condition.icon}" alt=""/>
      </div>
      <div class="book-weather-status">
        <p class="book-humidity"><i class="ph-drop-half-bottom"></i>${
          a.current.humidity
        }%</p>
        <p class="book-wind-speed">
          <i class="weather-icons ph-wind"></i>${a.current.wind_kph}Km/h
        </p>
        <p class="book-rain-chance">
          <i class="weather-icons ph-cloud-rain"></i>${
            a.forecast.forecastday[0].day.daily_chance_of_rain
          }%
        </p>
      </div>
    </div>`;
      this.bookmarkMarkup.insertAdjacentHTML("beforeend", html);
    });
  }
}

export default new cityView();

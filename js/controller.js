import * as model from "./model.js";
import cityview from "./cityview.js";
const nextButton = document.querySelector(".next-click");
const spinner = document.querySelector(".gyro");
const mainBox = document.querySelector(".main-box");
const errDisplay = document.querySelector(".error-display");
const bookmarkMarkup = document.querySelector(".bookmark-container");
const favBox = document.querySelector(".favourite-box");

//refresh page one time
window.onload = function () {
  if (!window.location.hash) {
    window.location = window.location + "#loaded";
    window.location.reload();
  }
};
//Dom mmanipulation
cityview.manipulateDesign();

///rendering using lon and lat
const renderLocation = async function () {
  await model.loadCityInfo(
    await model.loadBrowserLocation(),
    "unable to get your browser location🧨"
  );
  cityview.generateMarkUp(model.cityState.data);
  const noBookmark = document.querySelectorAll(".add-bookmark");
  noBookmark.forEach((a) => (a.style.display = "none"));
};
renderLocation();

//search city function
const renderCitySerachedFunc = async function () {
  mainBox.innerHTML = "";
  mainBox.style.visibility = "hidden";
  spinner.style.visibility = "visible";
  errDisplay.style.display = "none";
  const inputCity = document.querySelector(".input").value.toLowerCase();
  await model.loadCityInfo(
    inputCity,
    "this city does not exist, input a valid city🧨"
  );
  document.querySelector(".input").value = "";
  cityview.generateMarkUp(model.cityState.data);
};

////searching city
document.addEventListener(
  "submit",
  async function (e) {
    renderCitySerachedFunc();
    e.preventDefault();
  },
  false
);

nextButton.addEventListener("click", function () {
  renderCitySerachedFunc();
});

///Bookmark functionality
const controlAddBookmark = function () {
  //Add or remove bookmark
  if (!model.cityState.data.bookmarked) {
    model.addBookmark(model.cityState.data);
  } else {
    model.deleteBookmark(model.cityState.data);
  }
  // updating
  cityview.generateMarkUp(model.cityState.data);

  //rendering
  cityview.bookmarkRender(model.cityState.bookmarks);

  //Displaying no bookmark yet
  if (model.cityState.bookmarks.length === 0)
    document.querySelector(".bookmark-error").innerHTML = "No bookmark yet!";
};

cityview.addHandlerAddBookmark(controlAddBookmark);

//render single bookmark when click
bookmarkMarkup.addEventListener("click", async function (e) {
  const btn = e.target.closest(".bookmarked-single-box");
  if (!btn) return;
  const bookmarkCity = btn.children[0].children[0].innerHTML;
  spinner.style.visibility = "visible";
  mainBox.style.visibility = "hidden";
  window.matchMedia("(max-width: 950px)").matches
    ? (favBox.style.visibility = "hidden")
    : (favBox.style.visibility = "visible");
  await model.loadCityInfo(
    bookmarkCity,
    "this city does not exist, input a valid city🧨"
  );
  cityview.generateMarkUp(model.cityState.data);
  spinner.style.visibility = "hidden";
});

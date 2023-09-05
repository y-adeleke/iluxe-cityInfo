# Weather Information Application

## Overview

This is a Weather Information Application that provides real-time weather data based on the user's location or searched location and displays additional information about the user's country. It follows the Model-View-Controller (MVC) design pattern for code organization and also includes bookmark functionality for users to save and access their favorite locations.

## Features

- **Location-based Weather Information:** The application automatically retrieves the user's location using the Geolocation API and displays current weather information, including temperature, condition, humidity, wind speed, and rain chance. User also have the chance to search for a specific city.
- **Country Information:** In addition to weather data, the application fetches country information based on the user's location and provides details such as currency, language, native name, and population.
- **Bookmark Functionality:** Users can add or remove locations from their bookmarks. Bookmarked locations are stored in the browser's local storage for easy access.
- **Responsive Design:** The application is designed to work on both desktop and mobile devices, providing a seamless user experience.

## APIs Used

- **WeatherAPI:** The application fetches weather data using the WeatherAPI to provide real-time weather information.
- **OpenWeatherMap API:** Country information is obtained using the OpenWeatherMap API, which provides data based on latitude and longitude coordinates.
- **Restcountries API:** Additional country details are fetched using the Restcountries API, including currency, language, native name, and population.

## Development

- The application is built using HTML, CSS, and JavaScript, following the MVC design pattern for better code organization. It utilizes asynchronous functions and API requests to fetch and display data dynamically.

## Screenshots

![City Info](/weather-app-screenshot.png)

## Link to the website

- https://iluxecityinfo.netlify.app/

## Acknowledgments

- This project was inspired by the desire to create a user-friendly weather information application.
  Special thanks to the creators of the WeatherAPI, OpenWeatherMap API, and Restcountries API for providing data.

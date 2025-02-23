import "./styles.css";
import { format, fromUnixTime } from "date-fns";
import windIcon from "./imgs/wind.svg";
import searchIcon from "./imgs/search.svg";

async function getweather(location) {
	const APIKEY = "ENTMZQA9EVHW2YTBWGFJYNPDQ";
	try {
		const apiResponse = await fetch(
			`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=us&key=${APIKEY}&contentType=json`,
			{ mode: "cors" },
		);
		if (!apiResponse.ok) {
			throw new Error("api response was not okay.. :(");
		}
		return apiResponse.json();
	} catch (error) {
		console.log(error);
		return null;
	}
}

async function updateWeather(location) {
	const data = await getweather(location);
	return data;
}

function getWindDirection(degrees) {
	const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];
	return directions[Math.round(degrees / 45) % 8];
}

function createCardFuture(data) {
	let card = document.createElement("div");
	card.classList.add("card");

	let day = document.createElement("div");
	day.classList.add("day");
	day.innerHTML = `${format(fromUnixTime(data.datetimeEpoch), "EEEE")}`;
	// use the date libary here to convert the day month year to day of the week

	let tempCard = document.createElement("div");
	tempCard.classList.add("temp-card");

	let currentTemp = document.createElement("div");
	currentTemp.classList.add("current-temp");
	currentTemp.innerHTML = `${Math.round(data.temp)}`;

	let highLowContainer = document.createElement("div");
	highLowContainer.classList.add("high-low-container");

	let high = document.createElement("div");
	high.classList.add("high");
	high.innerHTML = `${Math.round(data.tempmax)}`;

	let low = document.createElement("div");
	low.classList.add("low");
	low.innerHTML = `${Math.round(data.tempmin)}`;

	let windContainer = document.createElement("div");
	windContainer.classList.add("wind-container");

	let windspeedIcon = document.createElement("img");
	windspeedIcon.classList.add("windspeed-icon");
	windspeedIcon.src = windIcon;

	let windspeed = document.createElement("div");
	windspeed.classList.add("windspeed");
	windspeed.innerHTML = `${Math.round(data.windspeed)} ${getWindDirection(data.winddir)}`;

	let conditionsContainer = document.createElement("div");
	conditionsContainer.classList.add("conditions-container");

	let uvContainer = document.createElement("div");
	uvContainer.classList.add("uv-container");

	let uvPlaceholder = document.createElement("div");
	uvPlaceholder.classList.add("uv-placeholder");
	uvPlaceholder.innerHTML = "uv";

	let uv = document.createElement("div");
	uv.classList.add("uv");
	uv.innerHTML = `${data.uvindex}`;

	let icon = document.createElement("div");
	icon.innerHTML = `${data.conditions}`;

	card.appendChild(day);
	card.appendChild(tempCard);
	tempCard.appendChild(currentTemp);
	tempCard.appendChild(highLowContainer);
	highLowContainer.appendChild(high);
	highLowContainer.appendChild(low);
	card.appendChild(windContainer);
	windContainer.appendChild(windspeedIcon);
	windContainer.appendChild(windspeed);
	card.appendChild(conditionsContainer);
	conditionsContainer.appendChild(uvContainer);
	uvContainer.appendChild(uvPlaceholder);
	uvContainer.appendChild(uv);
	conditionsContainer.appendChild(icon);

	return card;
}

function createCardCurrent(data) {
	let card = document.createElement("div");
	card.classList.add("card");

	let day = document.createElement("div");
	day.classList.add("day");
	day.innerHTML = `${format(fromUnixTime(data.days[0].datetimeEpoch), "EEEE")}`;
	// use the date libary here to convert the day month year to day of the week

	let tempCard = document.createElement("div");
	tempCard.classList.add("temp-card");

	let currentTemp = document.createElement("div");
	currentTemp.classList.add("current-temp");
	currentTemp.innerHTML = `${Math.round(data.currentConditions.temp)}`;

	let highLowContainer = document.createElement("div");
	highLowContainer.classList.add("high-low-container");

	let high = document.createElement("div");
	high.classList.add("high");
	high.innerHTML = `${Math.round(data.days[0].tempmax)}`;

	let low = document.createElement("div");
	low.classList.add("low");
	low.innerHTML = `${Math.round(data.days[0].tempmin)}`;

	let windContainer = document.createElement("div");
	windContainer.classList.add("wind-container");

	let windspeedIcon = document.createElement("img");
	windspeedIcon.classList.add("windspeed-icon");
	windspeedIcon.src = windIcon;

	let windspeed = document.createElement("div");
	windspeed.classList.add("windspeed");
	windspeed.innerHTML = `${Math.round(data.days[0].windspeed)} ${getWindDirection(data.days[0].winddir)}`;

	let conditionsContainer = document.createElement("div");
	conditionsContainer.classList.add("conditions-container");

	let uvContainer = document.createElement("div");
	uvContainer.classList.add("uv-container");

	let uvPlaceholder = document.createElement("div");
	uvPlaceholder.classList.add("uv-placeholder");
	uvPlaceholder.innerHTML = "uv";

	let uv = document.createElement("div");
	uv.classList.add("uv");
	uv.innerHTML = `${data.days[0].uvindex}`;

	let icon = document.createElement("div");
	icon.innerHTML = `${data.days[0].conditions}`;

	card.appendChild(day);
	card.appendChild(tempCard);
	tempCard.appendChild(currentTemp);
	tempCard.appendChild(highLowContainer);
	highLowContainer.appendChild(high);
	highLowContainer.appendChild(low);
	card.appendChild(windContainer);
	windContainer.appendChild(windspeedIcon);
	windContainer.appendChild(windspeed);
	card.appendChild(conditionsContainer);
	conditionsContainer.appendChild(uvContainer);
	uvContainer.appendChild(uvPlaceholder);
	uvContainer.appendChild(uv);
	conditionsContainer.appendChild(icon);

	return card;
}

async function createweathercontent(userinput) {
	let data = await updateWeather(userinput);

	const mainContent = document.querySelector(".main-content");
	mainContent.innerHTML = "";
	let weatherContainer = document.createElement("div");

	let title = document.createElement("div");
	title.classList.add("title");
	title.innerHTML = "Weather App";

	let searchbar = document.createElement("div");
	searchbar.classList.add("search-bar");
	let searchbarInput = document.createElement("input");
	searchbarInput.placeholder = "Search";
	let searchbarButton = document.createElement("button");
	let searchbarimg = document.createElement("img");
	searchbarimg.src = searchIcon;
	mainContent.appendChild(title);
	mainContent.appendChild(searchbar);
	searchbar.appendChild(searchbarInput);
	searchbar.appendChild(searchbarButton);
	searchbarButton.appendChild(searchbarimg);

	searchbarInput.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			createweathercontent(searchbarInput.value);
		}
	});

	searchbarButton.addEventListener("click", () => {
		createweathercontent(searchbarInput.value); // currently these event listeners are getting detroyed when i dynamically load the information
	});

	let location = document.createElement("div");
	location.innerHTML = data.resolvedAddress;

	mainContent.appendChild(location);
	weatherContainer.classList.add("weather-content");
	mainContent.appendChild(weatherContainer);
	// <div class="weather-content">
	console.log(data);
	if (data != null) {
		for (let i = 0; i < 7; i++) {
			if (i == 0) {
				weatherContainer.appendChild(createCardCurrent(data));
			} else {
				console.log(data.days[i]);
				weatherContainer.appendChild(createCardFuture(data.days[i]));
			}
		}
	}
}

function runApp() {
	let search = document.querySelector("input");
	let searchButton = document.querySelector("button");

	search.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			createweathercontent(search.value);
		}
	});

	searchButton.addEventListener("click", () => {
		createweathercontent(search.value); // currently these event listeners are getting detroyed when i dynamically load the information
	});
}

runApp();

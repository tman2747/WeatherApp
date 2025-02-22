import "./styles.css";

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
		return error;
	}
}

async function updateWeather(location) {
	const data = await getweather(location);
	return data;
}
function createCard(data) {}

async function runApp() {
	let data = await updateWeather("brighton co");

	console.log(data);

	for (let i = 0; i < 7; i++) {
		console.log(data.days[i]);
	}
}

runApp();

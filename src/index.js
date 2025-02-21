import "./styles.css";



// try {
//     const response = await fetch(
//         `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=us&key=${APIKEY}&contentType=json`,
//         { mode: "cors" },
//     );
//     await new Promise((resolve) => setTimeout(resolve, 2000));
//     if (!response.ok) {
//         throw new Error("something went wrong in the response was not ok :(");
//     }
//     const data = await response.json();
//     return data;
// } catch (error) {
//     console.log(error);
//     return null;
// }

const conversionURL = `http://api.openweathermap.org/geo/1.0/direct`;
const weatherURL = `https://api.openweathermap.org/data/3.0/onecall`;

const searchCity = async (city: string | undefined) => {
    await fetch(`${conversionURL}?q=${city}&appid=93dd60b2443d6fc4a1072752670ba85c`)
        .then(response => response.json())
        .then(data => {
            return fetch(`${weatherURL}?lat=${data[0].lat}&lon=${data[0].lon}&appid=93dd60b2443d6fc4a1072752670ba85c`)
                .then(response => response.json())
                .then(data => data)
        })
        .catch(err => err);
}

const weatherService = { searchCity };

export default weatherService;
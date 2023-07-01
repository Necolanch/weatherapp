import { useRef, useContext } from "react";
import Button from "./Button";
import Result from "./Result";
import { SearchWeatherContext } from "../contexts/weather";

const Search = () => {
    const city = useRef<HTMLInputElement>(null);
    //const [longitude, setLongitude] = useState("");
    //const [latitude, setLatitude] = useState("");
    const context = useContext(SearchWeatherContext);

    const conversionURL = `https://api.openweathermap.org/geo/1.0/direct`;
    const weatherURL = `https://api.openweathermap.org/data/3.0/onecall`;

    const searchCity = async (e: any, city: string | undefined) => {
        e.preventDefault()
        await fetch(`${conversionURL}?q=${city}&appid=93dd60b2443d6fc4a1072752670ba85c`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === "400") {
                    const cityError = document.getElementById("city-error") as HTMLParagraphElement;
                    if (cityError) {
                        cityError.style.display = "none"
                    }
                    const error = document.getElementById("error") as HTMLParagraphElement;
                    return error.style.display = "block";
                } else if (data.length === 0) {
                    const error = document.getElementById("error") as HTMLParagraphElement;
                    if (error) {
                        error.style.display = "none"
                    }
                    const cityError = document.getElementById("city-error") as HTMLParagraphElement;
                    return cityError.style.display = "block";
                }
                const cityError = document.getElementById("city-error") as HTMLParagraphElement;
                const error = document.getElementById("error") as HTMLParagraphElement;
                cityError.style.display = "none"
                error.style.display = "none"
                context?.saveCity(data[0].name);

                fetch(`${weatherURL}?lat=${data[0].lat}&lon=${data[0].lon}&units=imperial&appid=93dd60b2443d6fc4a1072752670ba85c`)
                    .then(response => response.json())
                    .then(data => {
                        context?.saveSearch(data);
                    });

            })
            .catch(err => err);
    }

    if (context?.city !== "") {
        return (
            <>
                <form className="flex flex-col items-center">
                    <input className="p-2 rounded bg-slate-50" ref={city} type="text" required />
                    <Button style={"bg-fuchsia-500 p-2 rounded text-slate-100 mt-2 hover:bg-fuchsia-600"} action={(e: any) => searchCity(e, city.current?.value)} text="Search" />
                    <p id="error" style={{ display: "none" }} className="text-red-800">Please enter a city name</p>
                    <p id="city-error" style={{ display: "none" }} className="text-red-800">Not a valid city</p>
                </form>
                <Result />
            </>
        )
    }

    return (
        <>
            <form id="search-form" className="flex flex-col items-center">
                <input className="p-2 rounded bg-slate-50" ref={city} type="text" required />
                <Button style={"bg-fuchsia-500 p-2 rounded text-slate-100 mt-2 hover:bg-fuchsia-600"} action={(e: any) => searchCity(e, city.current?.value)} text="Search" />
                <p id="error" style={{ display: "none" }} className="text-red-800">Please enter a city name</p>
                <p id="city-error" style={{ display: "none" }} className="text-red-800">Not a valid city</p>
            </form>
        </>
    )
}

export default Search;

import { useContext } from "react";
import { SearchWeatherContext } from "../contexts/weather";
import Button from "./Button";

const CityList = () => {
    const context = useContext(SearchWeatherContext);

    const removeFromCities = (city: { name: string, cityArr: any[] }) => {
        if (city.name === context?.selectCity) {
            context.saveTemps(city);
        }
        return context?.removeFromCities(city);
    }

    const selectCity = (city: { name: string, cityArr: any[] }) => {
        context?.saveSelectCity(city.name)
        context?.saveTemps(city);
        context?.saveLowTemps(city);
    }

    if (context?.cities.length === 0) {
        return (
            <div className="w-3/4 md:w-2/3 lg:w-1/2 m-auto my-8 p-2 bg-slate-100 rounded flex flex-col items-center justify-center">
                <p>No cities added to list</p>
            </div>
        )
    }
    return (
        <div className=" w-3/4 md:w-2/3 lg:w-1/2 m-auto my-8 p-2 bg-slate-100 rounded flex flex-col items-center justify-center">
            <ul className="">
                {
                    context?.cities.map(city => {
                        return (
                            <div className="flex items-center my-4" key={city.name}>
                                <Button style={"bg-fuchsia-500 rounded p-2 w-28 ml-4 text-slate-100 hover:bg-fuchsia-600 md:w-40"} action={() => selectCity(city)} text={`View ${city.name} Weather`} />
                                <Button style={"bg-fuchsia-500 rounded p-2 w-20 ml-4 text-slate-100 hover:bg-fuchsia-600"} action={() => removeFromCities(city)} text="Remove" />
                            </div>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default CityList;
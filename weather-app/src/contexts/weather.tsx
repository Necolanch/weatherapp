import { createContext, useState } from "react";

type WeatherContextProviderProps = {
    children: React.ReactNode
}

interface Result {
    current: { dt: number, feels_like: number, humidity: number, temp: number },
    daily: Array<{ dt: number, feels_like: { day: number }, humidity: number, temp: { min: number, max: number } }>
}

interface CityForecast {
    dt: number, feels_like: { day: number }, humidity: number, temp: { min: number, max: number }
}

interface Cities {
    name: string,
    cityArr: CityForecast[]
}

type GlobalState = {
    result: Result | undefined;
    saveSearch: (result: Result) => void;
    city: string;
    saveCity: (city: string) => void;
    cities: Cities[];
    saveCities: (cityObj: CityForecast[]) => void;
    removeFromCities: (cityObj: Cities) => void;
    selectCity: string;
    saveSelectCity: (city: string) => void;
    temps: number[];
    saveTemps: (cityTemps: Cities) => void;
    lowTemps: number[];
    saveLowTemps: (cityTemps: Cities) => void;
}

export const SearchWeatherContext = createContext<GlobalState | null>(null)

const WeatherContextProvider = ({ children }: WeatherContextProviderProps) => {
    const [result, setResult] = useState<Result | undefined>(undefined);

    const saveSearch = (result: Result) => {
        setResult(result);
    }

    const [city, setCity] = useState("");

    const saveCity = (city: string) => {
        setCity(city);
    }

    const [cities, setCities] = useState<any[]>([]);

    const saveCities = (cityArr: CityForecast[]) => {
        setCities([...cities, { name: city, cityArr }])
    }

    const [selectCity, setSelectCity] = useState("");

    const saveSelectCity = (cityName: string) => {
        setSelectCity(cityName)
    }

    const [temps, setTemps] = useState<number[]>([]);

    const saveTemps = (cityObj: Cities) => {
        let nums = [];
        for (let index: number = 1; index < cityObj.cityArr.length; index++) {
            nums.push(Math.round(cityObj.cityArr[index - 1].temp.max))
        }
        setTemps([...nums]);
    }

    const [lowTemps, setLowTemps] = useState<number[]>([]);

    const saveLowTemps = (cityObj: Cities) => {
        let nums = [];
        for (let index: number = 1; index < cityObj.cityArr.length; index++) {
            nums.push(Math.round(cityObj.cityArr[index - 1].temp.min))
        }
        setLowTemps([...nums]);
    }

    const removeFromCities = (cityObj: Cities) => {
        if (cityObj.name === selectCity) {
            setTemps([]);
            setLowTemps([])
        }
        return setCities(cities.filter(city => city.name !== cityObj.name))
    }

    return <SearchWeatherContext.Provider value={{ result, saveSearch, city, saveCity, cities, saveCities, removeFromCities, selectCity, saveSelectCity, temps, saveTemps, lowTemps, saveLowTemps }}>
        {children}
    </SearchWeatherContext.Provider>
}

export default WeatherContextProvider;
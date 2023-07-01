import { useContext, useEffect } from "react";
import { SearchWeatherContext } from "../contexts/weather";
import Button from "./Button";

const Result = () => {
    const context = useContext(SearchWeatherContext);

    const addToCities = (e: any) => {
        e.preventDefault();
        context?.saveCities(context?.result?.daily!)
        context?.saveCity("");
    }
    return (
        <div className="flex flex-col items-center mt-4 mb-8">
            <div className=" w-72 p-2 hover:bg-neutral-100 hover:text-slate-800 hover:rounded">
                <h4>{context?.city}</h4>
                <div>
                    <span>Current Temperature {Math.round(context?.result?.current.temp!)}</span>
                    <Button style={"bg-fuchsia-500 rounded p-2 w-16 ml-4 text-slate-100 hover:bg-fuchsia-600"} action={addToCities} text="Add" />
                </div>
            </div>
        </div>
    )
}

export default Result;
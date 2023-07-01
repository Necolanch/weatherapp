import { useState, useContext, useEffect } from "react";
import { SearchWeatherContext } from "../contexts/weather";
import Button from "./Button";

const TableForecast = () => {
    const context = useContext(SearchWeatherContext);
    const [threeDay, setThreeDay] = useState(false);

    useEffect(() => {
    }, [context?.cities]);

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    if (threeDay) {
        return (
            <div className="flex flex-col">
                <div>
                    <Button style={"bg-fuchsia-500 p-2 rounded text-slate-100 mt-2 ml-4 hover:bg-fuchsia-600"} action={null} text="3 Day" />
                    <Button style={"bg-fuchsia-500 p-2 rounded text-slate-100 mt-2 ml-4 hover:bg-fuchsia-600"} action={() => setThreeDay(false)} text="7 Day" />
                </div>
                <table className="mt-4 w-screen">
                    <thead>
                        <tr className="flex justify-evenly md:mr-4">
                            <th>City</th>
                            <th>Day</th>
                            <th>High</th>
                            <th>Low</th>
                        </tr>
                    </thead>
                    {
                        context?.cities.map(city => {
                            return (
                                <tbody className="w-screen flex mt-4 items-center justify-center md:ml-16">
                                    <tr className="w-40 -mr-16 ml-2  md:flex md:justify-center">
                                        <td className="">
                                            {city.name}
                                        </td>
                                    </tr>
                                    <div className="w-full">
                                        {
                                            city.cityArr.slice(0, 3).map((day, index) => {
                                                return (
                                                    <tr className="flex justify-evenly">
                                                        <td className="w-12 -ml-4 md:ml-1">
                                                            {days[index]}
                                                        </td>
                                                        <td>
                                                            {Math.round(day.temp.max)}
                                                        </td>
                                                        <td>
                                                            {Math.round(day.temp.min)}
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </div>
                                </tbody>
                            )
                        })
                    }
                </table>
            </div>
        )
    } else {

        return (
            <div className="flex flex-col">
                <div>
                    <Button style={"bg-fuchsia-500 p-2 rounded text-slate-100 mt-2 ml-4 hover:bg-fuchsia-600"} action={() => setThreeDay(true)} text="3 Day" />
                    <Button style={"bg-fuchsia-500 p-2 rounded text-slate-100 mt-2 ml-4 hover:bg-fuchsia-600"} action={null} text="7 Day" />
                </div>
                <table className="mt-4 w-screen">
                    <thead>
                        <tr className="flex justify-evenly">
                            <th>City</th>
                            <th>Day</th>
                            <th>High</th>
                            <th>Low</th>
                        </tr>
                    </thead>
                    {
                        context?.cities.map(city => {
                            return (
                                <tbody className="flex mt-4 items-center">
                                    <tr className="w-40 -mr-16 ml-2">
                                        <td className="">
                                            {city.name}
                                        </td>
                                    </tr>
                                    <tr className="w-full">
                                        {
                                            city.cityArr.slice(0, 7).map((day, index) => {
                                                return (
                                                    <tr className="flex justify-evenly">
                                                        <td className="w-12 -ml-4">
                                                            {days[index]}
                                                        </td>
                                                        <td>
                                                            {Math.round(day.temp.max)}
                                                        </td>
                                                        <td>
                                                            {Math.round(day.temp.min)}
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tr>
                                </tbody>
                            )
                        })
                    }
                </table>
            </div>
        )
    }
}

export default TableForecast;
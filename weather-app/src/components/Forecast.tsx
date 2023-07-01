import Button from "./Button";
import ChartForecast from "./ChartForecast";
import TableForecast from "./TableForecast";
import { useState } from "react";

const Forecast = () => {
    const [table, setTable] = useState(false);

    if (table) {
        return (
            <div>
                <Button style={"bg-fuchsia-500 p-2 rounded text-slate-100 mt-2 ml-4 hover:bg-fuchsia-600"} action={() => setTable(false)} text={"Chart"} />
                <Button style={"bg-fuchsia-500 p-2 rounded text-slate-100 mt-2 ml-4 hover:bg-fuchsia-600"} action={null} text={"Table"} />
                <TableForecast />
            </div>
        )
    } else {
        return (
            <div>
                <Button style={"bg-fuchsia-500 p-2 rounded text-slate-100 mt-2 ml-4 hover:bg-fuchsia-600"} action={null} text={"Chart"} />
                <Button style={"bg-fuchsia-500 p-2 rounded text-slate-100 mt-2 ml-4 hover:bg-fuchsia-600"} action={() => setTable(true)} text={"Table"} />
                <ChartForecast />
            </div>
        )
    }
}

export default Forecast
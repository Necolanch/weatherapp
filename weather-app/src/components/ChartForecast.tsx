import React, { useState, useEffect, useContext } from "react";
import { SearchWeatherContext } from "../contexts/weather";
import Chart from "react-apexcharts";
import Button from "./Button";

const ChartForecast = () => {
    const context = useContext(SearchWeatherContext);
    const [options, setOptions] = useState({
        chart: {
            id: "City Forecast"
        },
        xaxis: {
            categories: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        }
    });

    const [series, setSeries] = useState([{
        name: "series",
        data: [0, 0, 0, 0, 0, 0, 0]
    }]);

    useEffect(() => {

        setOptions({
            chart: {
                id: "City Forecast"
            },
            xaxis: {
                categories: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            }
        })

        setSeries([
            {
                name: "highs",
                data: context?.temps!
            },
            {
                name: "low",
                data: context?.lowTemps!
            }
        ])
    }, [context?.temps, context?.lowTemps]);

    const threeDayView = () => {
        const temps = [...context?.temps!];
        const lowTemps = [...context?.lowTemps!];
        const threeDayForecast = [];
        const lowThreeDay = [];

        for (let index: number = 0; index < 3; index++) {
            threeDayForecast.push(temps[index]);
        };

        for (let index: number = 0; index < 3; index++) {
            lowThreeDay.push(lowTemps[index]);
        };
        setOptions({
            chart: {
                id: "City Forecast"
            },
            xaxis: {
                categories: ["Tomorrow", "The next day", "Day after that"]
            }
        });

        setSeries([
            {
                name: "highs",
                data: threeDayForecast
            },
            {
                name: "lows",
                data: lowThreeDay
            }
        ]);
    }

    const sevenDayView = () => {
        setOptions({
            chart: {
                id: "City Forecast"
            },
            xaxis: {
                categories: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            }
        })

        setSeries([
            {
                name: "highs",
                data: context?.temps!
            },
            {
                name: "lows",
                data: context?.lowTemps!
            }
        ])
    }

    return (
        <>
            <div className="row">
                <Button style={"bg-fuchsia-500 p-2 rounded text-slate-100 mt-2 ml-4 hover:bg-fuchsia-600"} action={threeDayView} text="3 Day" />
                <Button style={"bg-fuchsia-500 p-2 rounded text-slate-100 mt-2 ml-4 hover:bg-fuchsia-600"} action={sevenDayView} text="7 Day" />
                <div className="mixed-chart flex justify-center">
                    <Chart
                        options={options}
                        series={series}
                        type="bar"
                        width="300"
                        height="300"
                    />
                </div>
            </div>
        </>
    )
}

//class ChartForecast extends Component<any, any> {
//    static contextType = SearchWeatherContext;
//    context!: React.ContextType<typeof SearchWeatherContext>
//    constructor(props: any) {
//        super(props);
//        this.state = {
//            options: {
//                chart: {
//                    id: "City Forecast"
//                },
//                xaxis: {
//                    categories: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
//                }
//            },
//            series: [
//                {
//                    name: "series",
//                    data: []
//                }
//            ]
//        }
//    }
//
//    componentDidMount(): void {
//        this.setState({
//            options: {
//                chart: {
//                    id: "City Forecast"
//                },
//                xaxis: {
//                    categories: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
//                }
//            },
//            series: [
//                {
//                    name: "series",
//                    data: this.context?.temps
//                }
//            ]
//        })
//    }
//
//    shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean {
//
//        //if (JSON.stringify(this.context?.temps) !== JSON.stringify(nextState.series[0].data)) {
//        //    console.log("here")
//        //    return true
//        //} else {
//        //    console.log("false")
//        //    return false
//        //}
//        console.log("hi")
//        return true
//    }
//
//
//    render() {
//        return (
//            <>
//                <div className="row">
//                    <Button action={null} text="3 Day" />
//                    <Button action={null} text="7 Day" />
//                    <div className="mixed-chart">
//                        <Chart
//                            options={this.state.options}
//                            series={this.state.series}
//                            type="bar"
//                            width="300"
//                            height="300"
//                        />
//                    </div>
//                </div>
//            </>
//        )
//    }
//}



export default ChartForecast;
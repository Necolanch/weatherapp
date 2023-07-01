import Search from "./components/Search";
import CityList from "./components/CityList";
import ChartForecast from "./components/ChartForecast";
import WeatherContextProvider from "./contexts/weather";
import TableForecast from "./components/TableForecast";
import Forecast from "./components/Forecast";

function App() {
  return (
    <div className="w-screen h-full md:h-screen bg-orange-300">
      <WeatherContextProvider>
        <div className="flex items-center justify-center pt-4 mb-4">
          <img src={require("./images/weather-icon.png")} alt="Weather app logo" width="50" />
          <h1 className="text-3xl font-bold ml-4">Weather</h1>
        </div>
        <Search />
        <CityList />
        <Forecast />
      </WeatherContextProvider>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";

export default function WeatherForecast({ address, startDate, endDate }: { address: string, startDate: Date, endDate: Date }) {
  const [forecastData, setForecastData] = useState([{
    date: "",
    icon: "",
    temp: "",
  }]);
  const [hasWeather, setHasWeather] = useState(true);

  useEffect(() => {
    if (address && startDate && endDate) {
      const startTime = startDate;
      const startTimeDate = new Date(startDate);
      const endTimeDate = new Date(endDate);
      const curTime = new Date();

      const DaysInMs = 24 * 60 * 60 * 1000;
      let res;
      let his = false;
      let time;
      let tempMax;
      let tempMin;
      let condition;
      let img;
      let data;

      const fetchWeather = async () => {
        try {
          if (startTimeDate.getTime() < curTime.getTime() && endTimeDate.getTime() < curTime.getTime()
            || !address || !startDate || !endDate || endTimeDate.getTime() < startTimeDate.getTime()) {
            setHasWeather(false);
            return;
          }
          //Start time is more than 10 dyas in the future
          else if (startTimeDate.getTime() - curTime.getTime() > (10 * DaysInMs)) {
            if (endTimeDate.getTime() - startTimeDate.getTime() < (5 * DaysInMs)) {
              endTimeDate.setDate(endTimeDate.getDate() + 10);
            }
            startTimeDate.setFullYear(startTimeDate.getFullYear() - 1);
            endTimeDate.setFullYear(endTimeDate.getFullYear() - 1);
            const endTimeDateF = endTimeDate.toISOString().split("T")[0];
            const startTimeDateF = startTimeDate.toISOString().split("T")[0];
            res = await fetch(`/api/weather/hist?address=${encodeURIComponent(address)}&start=${startTimeDateF}&end=${endTimeDateF}`);
            //if(!res.ok) throw new Error("Failed to fetch weather data");
            data = await res.json();
            his = true;
          }
          //Start time pass current tiem, but trip is within 10 days
          else if (curTime.getTime() > startTimeDate.getTime() && endTimeDate.getTime() > curTime.getTime()) {
            const curTimeDateF = curTime.toISOString().split("T")[0];
            res = await fetch(`/api/weather?address=${encodeURIComponent(address)}&start=${curTimeDateF}`);
            //if(!res.ok) throw new Error("Failed to fetch weather data");
            data = await res.json();
          }
          else {
            const startTimeDateF = startTimeDate.toISOString().split("T")[0];
            res = await fetch(`/api/weather?address=${encodeURIComponent(address)}&start=${startTimeDateF}`);
            //if(!res.ok) throw new Error("Failed to fetch weather data");
            data = await res.json();
          }
          let forecastData = [];

          if (his == true) {
            for (let i = 0; i < 5; i++) {
              let timeString = new Date(data.weather[i].date);
              let time = formatDate(timeString);
              let tempMax = `${data.weather[i].tmax.toFixed(1)}°F`;
              let tempMin = `${data.weather[i].tmin.toFixed(1)}°F`;

              img = "";

              forecastData.push({
                date: time,
                temp: `${tempMin} - ${tempMax}`
              });
            }
          }
          else {
            for (let i = 0; i < 5; i++) {
              let time = formatDate(data.weather[i].startTime);
              let tempMax = `${data.weather[i].temperatureMax.toFixed(1)}°F`;
              let tempMin = `${data.weather[i].temperatureMin.toFixed(1)}°F`;
              let condition = data.weather[i].weatherCode;

              img = findSymbol(condition)

              forecastData.push({
                date: time,
                icon: `/weather/${img}.svg`,
                temp: `${tempMin} - ${tempMax}`
              });
            }
          }
          his = false;
          setHasWeather(true);

          setForecastData(forecastData);
        }
        catch (err) {
          console.error("Error fetching weather:", err);
        }
      };
      fetchWeather();
    }
    else {
      setHasWeather(false);
      return;
    }
  }, [address, startDate, endDate]);

  const hasIcon = forecastData.some(day => day.icon);

  return (
    <div className="grow basis-0 bg-white p-6 rounded-lg border">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <img
          src="/icons/weather.svg"
          alt="Weather Icon"
          className="w-5 h-5 object-contain"
        />
        {hasIcon ? "Weather Forecast" : "Expected Weather"}
      </h2>
      <div className="mt-4">
        {hasWeather ? (
          <div className="flex">
            <div className="w-min flex flex-col space-y-4">
              {forecastData.map((day, index) => (
                <p key={index} className="whitespace-nowrap text-gray-900">{day.date}</p>
              ))}
            </div>
            <div className="w-full flex flex-col justify-between items-end">
              {forecastData.map((day, index) => (
                <div key={index} className="h-[24px] flex items-center">
                  {day.icon && (
                    <img
                      src={day.icon}
                      alt="Weather"
                      className="min-w-5 w-5 h-5 object-contain filter brightness(80%)"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="w-min pl-2 flex flex-col justify-between">
              {forecastData.map((day, index) => (
                <p key={index} className="text-gray-900 font-semibold whitespace-nowrap">{day.temp}</p>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-40 gap-1">
            <img
              src="/icons/empty-weather.svg"
              alt="No Weather Data"
              className="w-50 h-50"
            />
            <p className="text-sm text-gray-500">No weather information is found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// async function fetWeather(address, startDate, endDate, setForecastData) {
//   const startTime = startDate;
//   const startTimeDate = new Date(startDate);
//   const endTimeDate = new Date(endDate);
//   const curTime = new Date();
//   let his = false;
//   let res;
//   let data;
//   let img;

//   //Calculate 10 Days in Ms for comparison
//   const tenDaysInMs = 10 * 24 * 60 * 60 * 1000;

//   //Start time is > 10 Days (Pulling historical data)
//   try {
//     if(startTimeDate.getTime() - curTime.getTime() > tenDaysInMs) {
//       console.log("Start tiem is more than 10 days in the future");
//       startTimeDate.setFullYear(startTimeDate.getFullYear() - 1);
//       endTimeDate.setFullYear(endTimeDate.getFullYear() - 1);
//       const endTimeDateF = endTimeDate.toISOString().split("T")[0];
//       const startTimeDateF = startTimeDate.toISOString().split("T")[0];
//       res = await fetch(`/api/weather/hist?address=${encodeURIComponent(address)}&start=${startTimeDateF}&end=${endTimeDateF}`);
//       if(!res.ok) throw new Error("Failed to fetch weather data");
//       data = await res.json();
//       his = true;
//     }
//     //Start time is within 10 Days 
//     else {
//       res = await fetch(`/api/weather?address=${encodeURIComponent(address)}&start=${startTime}`);
//       if(!res.ok) throw new Error("Failed to fetch weather data");
//       data = await res.json();
//     }

//     let forecastData = [];

//     //Formating for historical data
//     if(his == true) {
//       for(let i = 0; i < 5; i++){
//         let timeString = new Date(data.weather[i].date);
//         let time = formatDate(timeString);
//         let tempMax = `${data.weather[i].tmax.toFixed(1)}°F`;
//         let tempMin = `${data.weather[i].tmin.toFixed(1)}°F`;

//         img = "";

//         forecastData.push({
//           date: time,
//           temp: `${tempMin} - ${tempMax}`
//         });
//       }
//     }
//     //Formating for weather within 10 days 
//     else {
//       for(let i = 0; i < 5; i++){
//         let time = formatDate(data.weather[i].startTime);
//         let tempMax = `${data.weather[i].temperatureMax.toFixed(1)}°F`;
//         let tempMin = `${data.weather[i].temperatureMin.toFixed(1)}°F`;
//         let condition = data.weather[i].weatherCode;

//         img = findSymbol(condition)

//         forecastData.push({
//           date: time,
//           icon: `/weather/${img}.svg`,
//           temp: `${tempMin} - ${tempMax}`
//         });
//       }
//     }
//     his = false;
//     setForecastData(forecastData);
//   }
//   catch (error) {
//     console.error("Error fetching weather:",  error);
//   }
// }

function formatDate(rawDate) {
  const date = new Date(rawDate);

  const month = date.getMonth() + 1;
  const day = date.getDate();

  const weekday = date.toLocaleString('en-US', { weekday: 'short' });

  return `${month}/${day} (${weekday})`;
}

function findSymbol(status) {
  if (status == '1000') {
    return "clear_day";
  }
  else if (status == '1100') {
    return "mostly_clear_day";
  }
  else if (status == '1101') {
    return "partly_cloudy_day";
  }
  else if (status == '1102') {
    return "mostly_cloudy";
  }
  else if (status == '1001') {
    return "cloudy";
  }
  else if (status == '1103') {
    return "partly_cloudy_day"
  }
  else if (status == '2100') {
    return "fog_light"
  }
  else if (status == '2000') {
    return "fog"
  }
  else if (status == '2101') {
    return "mostly_clear_day"
  }
  else if (status == '4000') {
    return "drizzle"
  }
  else if (status == '4200') {
    return "rain_light"
  }
  else if (status == '4001') {
    return "rain"
  }
  else if (status == '4201') {
    return "rain_heavy"
  }
  else if (status == '5001') {
    return "flurries"
  }
  else if (status == '5100') {
    return "snow_light"
  }
  else if (status == '5000') {
    return "snow"
  }
  else if (status == '5101') {
    return "snow_heavy"
  }
  else if (status == '6000') {
    return "freezing_drizzle"
  }
  else if (status == '6200') {
    return "freezing_rain_light"
  }
  else if (status == '6001') {
    return "freezing_rain"
  }
  else if (status == '6201') {
    return "freezing_rain_heavy"
  }
  else if (status == '7102') {
    return "ice_pellets_light"
  }
  else if (status == '7000') {
    return "ice_pellets"
  }
  else if (status == '7101') {
    return "ice_pellets_heavy"
  }
  else if (status == '8000') {
    return "tstorm"
  }

  return "";

}

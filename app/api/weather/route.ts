import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {

    try {
        const searchParams = req.nextUrl.searchParams;
        const address = searchParams.get('address');
        const start = searchParams.get('start');
        const end = searchParams.get('end');

        const apiKey = process.env.GOOGLE_GEO_SECRET;
        let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`);
        const jsonResponse = await response.json();

        let lat = jsonResponse.results[0].geometry.location.lat;
        let lng = jsonResponse.results[0].geometry.location.lng;
        console.log("Inside weather API");
        let startTime: string = undefined;
        let endTime: string = undefined;
        if (start) {
            const laStartTime = new Date(`${start.trim()}T06:00:00-07:00`);
            startTime = laStartTime.toISOString();
        }
        if (end) {
            const laEndTime = new Date(`${end.trim()}T06:00:00-07:00`);
            endTime = laEndTime.toISOString();
        }

        const weatherParams = {
            location: `${lat},${lng}`,
            fields: 'temperature,temperatureMin,temperatureMax,weatherCode',
            units: 'imperial',
            timesteps: '1d',
            timezone: 'America/Los_Angeles',
            apikey: process.env.WEATHER_SECRET,
            ...(startTime && { startTime }),
            ...(endTime && { endTime }),
        };
        const queryString = new URLSearchParams(weatherParams).toString();
        let apiUrl = `https://api.tomorrow.io/v4/timelines?${queryString}`;
        response = await fetch(apiUrl);

        if (response.status == 200) {
            let weather_data = await response.json();

            let intervals = weather_data.data.timelines[0].intervals.map((interval) => {
                return {
                    "startTime": interval.startTime,
                    "weatherCode": interval.values.weatherCode,
                    "temperatureMax": interval.values.temperatureMax,
                    "temperatureMin": interval.values.temperatureMin,
                };
            });
            
            return NextResponse.json(
                {
                    weather: intervals
                }
            );
        } else {
            let message = (await response.json()).message ?? "Failed to fetch weather data";
            return NextResponse.json(
                { message },
                { status: response.status }
            );
        }
    } catch (error) {
        console.error("Error fetching weather data:", error)
        return NextResponse.json(
            {
                message: "Failed to fetch weather data"
            },
            {
                status: 500
            }
        )
    }
}
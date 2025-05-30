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
        
        let startTime: string = undefined;
        let endTime: string = undefined;

        // console.log(lat,lng);
        // console.log("start: ", start);
        // console.log("end ", end);

        const weatherParams = {
            lat: `${lat}`,
            lon: `${lng}`,
            start: `${start}`,
            end: `${end}`
        };
        const queryString = new URLSearchParams(weatherParams).toString();
        let apiUrl = `https://meteostat.p.rapidapi.com/point/daily?${queryString}`;
        const options = {
            method: 'GET',
            headers: {
              'x-rapidapi-key': process.env.WEATHER_HIST_SECRET,
              'x-rapidapi-host': 'meteostat.p.rapidapi.com'
            }
        }
        response = await fetch(apiUrl, options);

        if (response.status == 200) {
            let weather_data = await response.json();

            const convertCtoF = (c: number | null): number | null => {
                return c !== null ? (c * 9/5) + 32: null;
            }

            const weather_data_mod = weather_data.data.map(entry => ({
                date: entry.date,
                tmin: convertCtoF(entry.tmin),
                tmax: convertCtoF(entry.tmax)
            }));
            
            return NextResponse.json(
                {
                    weather: weather_data_mod
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
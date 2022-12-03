export interface Data {
    base: string
    clouds: Cloud
    cod: number
    coord: Coords
    dt: number
    id: number
    main: Temp
    name: string
    sys: Sys
    timezone: number
    visibility: number
    weather: Weather[]
    wind: Wind

}

interface Cloud {
    all: number
}

interface Coords {
    lon: number,
    lat: number
}

interface Temp {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number
}

interface Sys {
    type: number,
    id: number,
    country: string,
    sunrise: number,
    sunset: number
}

interface Weather {
    id: number,
    main: string,
    description: string
    icon: string
}

interface Wind {
    speed: number, 
    deg: number
}

interface IWeatherCoord {
  lon: number
  lat: number
}

interface IWeatherItem {
  id: number
  main: string
  description: string
  icon: string
}
interface IMain {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
}

interface IWind {
  speed: number
  deg: number
}

interface IClouds {
  all: number
}

interface ISys {
  type: number
  id: number
  country: string
  sunrise: number
  sunset: number
}

export interface IWeather {
  coord: IWeatherCoord
  weather: IWeatherItem[]
  base: string
  main: IMain
  visibility: number
  wind: IWind
  clouds: IClouds
  dt: number
  sys: ISys
  timezone: number
  id: number
  name: string
  cod: number
}

import { IWeatherState } from './WeatherCreators.types'

export const selectWeather = (state: { weatherReducer: IWeatherState }) =>
  state.weatherReducer

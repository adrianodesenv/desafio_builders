import { IWeatherState } from '@/store/Weather/WeatherCreators.types'

export const selectWeather = (state: { weatherReducer: IWeatherState }) =>
  state.weatherReducer

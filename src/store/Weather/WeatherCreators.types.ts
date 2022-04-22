import { IActionStatus } from '@/@types/application/ActionStatus/ActionStatusApplication.types'
import { IWeather } from '@/@types/entities/Weather/WeatherEntity.types'

export enum EWeatherActionTypes {
  WEATHER_REQUEST = '@weather/REQUEST',
  WEATHER_REQUEST_STATUS = '@weather/REQUEST_STATUS',
  WEATHER_SET = '@weather/SET',
}
export interface IWeatherState {
  readonly weather: IWeather | null
  readonly weatherGetStatus: IActionStatus
}

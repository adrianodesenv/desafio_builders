import { Reducer } from 'redux'

import produce from 'immer'

import {
  EWeatherActionTypes,
  IWeatherState,
} from '@/store/Weather/WeatherCreators.types'

import {
  EActionTypeStatus,
  IActionStatus,
} from '@/@types/application/ActionStatus/ActionStatusApplication.types'

import { IWeather } from '@/@types/entities/Weather/WeatherEntity.types'

export const WEATHER_INITIAL_STATE: IWeatherState = {
  weather: null,
  weatherGetStatus: {
    status: EActionTypeStatus.Waiting,
    message: '',
  },
}

const WeatherReducer: Reducer<IWeatherState> = (
  state = WEATHER_INITIAL_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case EWeatherActionTypes.WEATHER_REQUEST: {
        draft.weatherGetStatus = {
          status: EActionTypeStatus.Busy,
        }

        return draft
      }

      case EWeatherActionTypes.WEATHER_REQUEST_STATUS: {
        const { articleRequestStatus } = action.payload

        draft.weatherGetStatus = articleRequestStatus

        return draft
      }

      case EWeatherActionTypes.WEATHER_SET: {
        const { weather } = action.payload

        draft.weather = { ...weather }
        draft.weatherGetStatus = {
          status: EActionTypeStatus.Success,
          message: '',
        }

        return draft
      }
    }
  })
}

export default WeatherReducer

export const weatherRequest = () => ({
  type: EWeatherActionTypes.WEATHER_REQUEST,
})

export const weatherRequestStatus = (weatherRequestStatus: IActionStatus) => ({
  type: EWeatherActionTypes.WEATHER_REQUEST_STATUS,
  payload: { weatherRequestStatus },
})

export const weatherSet = (weather: IWeather) => ({
  type: EWeatherActionTypes.WEATHER_SET,
  payload: { weather },
})

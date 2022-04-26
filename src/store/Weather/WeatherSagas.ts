import { call, put, takeLatest } from 'redux-saga/effects'

import { WeatherService } from '@/services/Weather/WeatherService'
import { ServiceConfig } from '@/services/ServiceConfig'
import { THttpResponse } from '@/services/ServiceConfig.types'
import { weatherRequest, weatherSet } from '@/store/Weather/WeatherCreators'
import { EWeatherActionTypes } from '@/store/Weather/WeatherCreators.types'

import { ISagaDependenciesApplication } from '@/@types/application/SagaDependencies/SagaDependenciesApplication.types'
import { IWeather } from '@/@types/entities/Weather/WeatherEntity.types'

export function* WeatherRequestSaga(
  dependencies: ISagaDependenciesApplication,
  action: ReturnType<typeof weatherRequest>,
) {
  try {
    const { weatherRequest } = action.payload

    const { lat, lon, lang, units, appid } = weatherRequest

    const queryString = `?lat=${lat}&lon=${lon}&lang=${lang}&units=${units}&appid=${appid}`
    const { getWeather } = new WeatherService(dependencies.httpClient)
    const response: THttpResponse<IWeather> = yield call(
      getWeather,
      queryString,
    )

    yield put(weatherSet(response.data))
  } catch {}
}

export default function* () {
  yield takeLatest(EWeatherActionTypes.WEATHER_REQUEST, WeatherRequestSaga, {
    httpClient: new ServiceConfig(),
  })
}

import { call, put, takeLatest } from 'redux-saga/effects'

import { WeatherService } from '@/services/Weather/WeatherService'
import { ServiceConfig } from '@/services/ServiceConfig'
import { THttpResponse } from '@/services/ServiceConfig.types'
import { weatherRequest, weatherSet } from '@/store/Weather/WeatherCreators'
import { EWeatherActionTypes } from '@/store/Weather/WeatherCreators.types'

import { EActionTypeStatus } from '@/@types/application/ActionStatus/ActionStatusApplication.types'
import { ISagaDependenciesApplication } from '@/@types/application/SagaDependencies/SagaDependenciesApplication.types'
import { IWeather } from '@/@types/entities/Weather/WeatherEntity.types'

export function* WeatherRequestSaga(
  dependencies: ISagaDependenciesApplication,
  action: ReturnType<typeof weatherRequest>,
) {
  try {
    // const { situation } = action.payload
    const { getWeather } = new WeatherService(dependencies.httpClient)
    // const queryString = `populate[image][fields][0]=url&filters[situation][$eq]=${situation}&sort[0]=createdAt%3Adesc`
    const response: THttpResponse<IWeather> = yield call(getWeather)

    yield put(weatherSet(response.data))
  } catch {
    console.log('error no servico')
    // yield put(
    //   articleRequestStatus({
    //     status: EActionTypeStatus.Error,
    //     message: 'Houve um erro ao buscar os articos. Tente novamente',
    //   }),
    // )
  }
}

export default function* () {
  yield takeLatest(EWeatherActionTypes.WEATHER_REQUEST, WeatherRequestSaga, {
    httpClient: new ServiceConfig(),
  })
}

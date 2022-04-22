import { spawn, all, call } from 'redux-saga/effects'

import WeatherSagas from '@/store/Weather/WeatherSagas'

const sagas = [WeatherSagas]

export default function* SagaConfig() {
  yield all(
    sagas.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga)
            break
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)
          }
        }
      }),
    ),
  )
}

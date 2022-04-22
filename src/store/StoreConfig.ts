import { Action, combineReducers } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'

import WeatherReducer from '@/store/Weather/WeatherCreators'

import AsyncStorage from '@react-native-async-storage/async-storage'
import SagaConfig from './SagaConfig'
import { ServiceConfig } from '@/services/ServiceConfig'

const PERSIST_CONFIG = {
  key: 'root',
  storage: AsyncStorage,
}

const ReducerConfig = combineReducers({
  weatherReducer: WeatherReducer,
})

export const PersistedReducer = persistReducer(PERSIST_CONFIG, ReducerConfig)

const RootReducer = (state: any, action: Action) => {
  return PersistedReducer(state, action)
}

export const SagaMiddleware = createSagaMiddleware()
const middlewares = [SagaMiddleware]

if (__DEV__ && !process.env.JEST_WORKER_ID) {
  const createDebugger = require('redux-flipper').default
  middlewares.push(createDebugger())
}

const store = configureStore({
  reducer: RootReducer,
  middleware: middlewares,
})

const service = new ServiceConfig()
service.applyInterceptors(store)

SagaMiddleware.run(SagaConfig)

export default () => {
  const persistor = persistStore(store)
  return { store, persistor }
}

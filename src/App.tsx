import React from 'react'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import StoreConfig from '@/store/StoreConfig'

import WeatherScreen from '@/screens/Weather/WeatherScreen'

const { store, persistor } = StoreConfig()

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <WeatherScreen />
      </PersistGate>
    </Provider>
  )
}

export default App

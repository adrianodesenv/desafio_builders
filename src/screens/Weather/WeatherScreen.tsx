import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'

import * as Location from 'expo-location'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '@/services/api'
import ButtonComponent from '@/components/Button/ButtonComponent'
import {
  Container,
  CityText,
  TemperatureText,
  WeatherDescriptionView,
  WeatherIconImage,
  WeatherDescriptionText,
  WeatherTemperatureText,
  ButtonView,
} from '@/screens/Weather/WeatherScreen.styles'
import { weatherRequest } from '@/store/Weather/WeatherCreators'
import { IWeather } from '@/@types/entities/Weather/WeatherEntity.types'
import { selectWeather } from '@/store/Weather/WeatherSelectors'

const WeatherScreen = () => {
  const dispatch = useDispatch()
  const [locationUser, setLocationUser] = useState<Location.LocationObject>()
  const [userLocationStatus, setUserLocationStatus] = useState(
    'Obtendo sua localização...',
  )

  const [weather, setWeather] = useState<IWeather>()

  const weatherSelect = useSelector(selectWeather)
  console.log(weatherSelect.weather)
  // console.log('weather object')
  // console.log(weatherGetStatus)
  // console.log(weather)

  useEffect(() => {
    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setUserLocationStatus('A permissão para acessar o local foi negada')
        return
      }

      const location: Location.LocationObject =
        await Location.getCurrentPositionAsync({})

      setLocationUser(location)
      setUserLocationStatus('Localização obtida com sucesso.')
    })()
  }, [])

  useEffect(() => {
    if (locationUser) {
      dispatch(weatherRequest())

      return
      // const appid = '82fd53f9cad485bfd1ac43f053003fb3'
      // const lat = locationUser.coords.latitude
      // const lon = locationUser.coords.longitude
      // const lang = 'pt_br'
      // const units = 'metric'
      // const queryString = `?lat=${lat}&lon=${lon}&lang=${lang}&units=${units}&appid=${appid}`

      // api.get(queryString).then(function (response) {
      //   setWeather(response.data)
      // })
    }
  }, [locationUser])

  useEffect(() => {
    if (weatherSelect.weather) {
      setWeather(weatherSelect.weather)
    }
  }, [weatherSelect])

  return (
    <Container>
      {!weather && (
        <>
          <Text>Sua localização</Text>
          <Text>{userLocationStatus}</Text>
        </>
      )}

      {weather && (
        <>
          <CityText>{weather.name}</CityText>
          <TemperatureText>{Math.round(weather.main?.temp)}°</TemperatureText>

          <WeatherDescriptionView>
            <WeatherIconImage
              source={{
                uri: `https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`,
              }}
            />
            <WeatherDescriptionText>
              {weather?.weather[0]?.description}
            </WeatherDescriptionText>
          </WeatherDescriptionView>

          <WeatherTemperatureText>
            Máx.:{Math.round(weather.main.temp_max)}° Mín.:
            {Math.round(weather.main.temp_min)}°
          </WeatherTemperatureText>
        </>
      )}

      {locationUser && (
        <ButtonView>
          <ButtonComponent
            title="Atualizar"
            onPress={() => dispatch(weatherRequest())}
          />
        </ButtonView>
      )}
    </Container>
  )
}

export default WeatherScreen

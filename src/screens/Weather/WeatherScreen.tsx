import React, { useCallback, useEffect, useState } from 'react'
import { Text } from 'react-native'

import * as Location from 'expo-location'
import { useDispatch, useSelector } from 'react-redux'

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
import {
  IWeather,
  IWeatherRequest,
} from '@/@types/entities/Weather/WeatherEntity.types'
import { selectWeather } from '@/store/Weather/WeatherSelectors'
import { ILocation } from '@/@types/entities/Location/LocationEntity.types'
import { EActionTypeStatus } from '@/@types/application/ActionStatus/ActionStatusApplication.types'

const WeatherScreen = () => {
  const dispatch = useDispatch()
  const [locationUser, setLocationUser] = useState<ILocation>()
  const [userLocationStatus, setUserLocationStatus] = useState(
    'Obtendo sua localização...',
  )

  const [weather, setWeather] = useState<IWeather>()

  const weatherSelect = useSelector(selectWeather)

  const getWeather = useCallback(() => {
    if (locationUser) {
      const _weatherRequest: IWeatherRequest = {
        appid: '82fd53f9cad485bfd1ac43f053003fb3',
        lat: locationUser.coords.latitude,
        lon: locationUser.coords.longitude,
        lang: 'pt_br',
        units: 'metric',
      }

      dispatch(weatherRequest(_weatherRequest))
    }
  }, [dispatch, locationUser])

  useEffect(() => {
    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setUserLocationStatus('A permissão para acessar o local foi negada')
        return
      }

      const location: ILocation = await Location.getCurrentPositionAsync({})

      setLocationUser(location)
      setUserLocationStatus('Localização obtida com sucesso.')
    })()
  }, [])

  useEffect(() => {
    if (locationUser) {
      getWeather()
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
            onPress={() => getWeather()}
            loading={
              weatherSelect.weatherGetStatus.status === EActionTypeStatus.Busy
            }
          />
        </ButtonView>
      )}
    </Container>
  )
}

export default WeatherScreen

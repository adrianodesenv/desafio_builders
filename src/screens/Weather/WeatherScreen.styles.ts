import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #007fff;

  padding-top: 44px;
`

export const CityText = styled.Text`
  font-size: 40px;
  color: #fff;

  text-align: center;
`

export const TemperatureText = styled.Text`
  font-size: 52px;
  color: #fff;

  text-align: center;
`

export const WeatherDescriptionView = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const WeatherIconImage = styled.Image`
  width: 100px;
  height: 100px;
`

export const WeatherDescriptionText = styled.Text`
  font-size: 16px;
  color: #fff;

  text-align: center;
`

export const WeatherTemperatureText = styled.Text`
  font-size: 22px;
  color: #fff;

  text-align: center;
`

export const ButtonView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;

  padding: 0 20px;
  margin: 0 0 44px 0;

  width: 100%;
`

import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

export const Button = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})``

export const View = styled.View`
  flex-direction: row;
  align-items: center;

  border: solid 1px #fff;
  border-radius: 30px;

  width: 100%;
  height: 56px;
`
export const Text = styled.Text`
  text-align: center;
  padding: 0 10px;
  width: 100%;
  color: #fff;
  font-size: 16px;
`

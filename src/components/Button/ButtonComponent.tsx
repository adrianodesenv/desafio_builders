import React from 'react'
import { GestureResponderEvent, ActivityIndicator } from 'react-native'

import {
  ButtonView,
  Button,
  Text,
} from '@/components/Button/ButtonComponent.styles'

interface IButtonComponentProps {
  title: string
  onPress: (event?: GestureResponderEvent) => void
  disabled?: boolean
  loading?: boolean
}

const ButtonComponent: React.FC<IButtonComponentProps> = ({
  title,
  onPress,
  disabled,
  loading,
}) => {
  return (
    <ButtonView>
      <Button onPress={onPress} disabled={disabled}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text>{title}</Text>}
      </Button>
    </ButtonView>
  )
}

export default ButtonComponent

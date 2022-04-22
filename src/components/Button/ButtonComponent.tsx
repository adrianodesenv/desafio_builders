import React from 'react'
import { GestureResponderEvent, ActivityIndicator } from 'react-native'

import { Button, View, Text } from '@/components/Button/ButtonComponent.styles'

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
    <Button onPress={onPress} disabled={disabled}>
      <View>
        {!loading && <Text>{title}</Text>}

        {loading && <ActivityIndicator color="#fff" />}
      </View>
    </Button>
  )
}

export default ButtonComponent

import React, { useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-paper'

type Input = {
  img: string
  onPress: Function
  isMatched: boolean
  isFlipped: boolean
  color: string
}

const EmojiCard = ({ img, onPress, isMatched, isFlipped, color }: Input) => {
  const handlePress = () => {
    if (!isMatched && !isFlipped) {
      onPress()
    }
  }
  const size = {
    width: 250,
  }
  size.height = size.width
  let backgroundColor = 'white'
  if (isFlipped) backgroundColor = color
  if (isMatched) backgroundColor = 'green'

  return (
    <TouchableOpacity style={size} onPress={handlePress}>
      <Card style={{ backgroundColor, ...size, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
        {isFlipped ? <Text style={{ fontSize: 100 }}>{img}</Text> : null}
      </Card>
    </TouchableOpacity>
  )
}

export default EmojiCard

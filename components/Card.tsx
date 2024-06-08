import React from 'react'
import { Dimensions, Text, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-paper'

type Input = {
  img: string
  onPress: () => void
  isMatched: boolean
  isFlipped: boolean
  faceUp?: boolean
  color: string
}

const EmojiCard = ({ img, onPress, isMatched, isFlipped, color, faceUp = false }: Input) => {
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height

  const size = {
    width: windowWidth / 3 - 50,
    height: windowHeight / 4 - 50,
  }

  let backgroundColor = 'white'
  if (isFlipped) backgroundColor = color
  if (isMatched) backgroundColor = 'green'

  return (
    <TouchableOpacity style={size} onPress={onPress}>
      <Card style={{ backgroundColor, ...size, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
        {isFlipped || (faceUp && !isMatched) ? (
          <Text
            style={{
              fontSize: 100,
            }}
          >
            {img}
          </Text>
        ) : null}
      </Card>
    </TouchableOpacity>
  )
}

export default EmojiCard

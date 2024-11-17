import React, { useRef, useEffect } from 'react'
import { Dimensions, Text, TouchableOpacity, Animated } from 'react-native'
import { Card } from 'react-native-paper'
import { styles } from './styles'

type Input = {
  img: string
  onPress: () => void
  isMatched: boolean
  isFlipped: boolean
  faceUp?: boolean
  color: string
}

const FlipCard = ({ img, onPress, isMatched, isFlipped, color, faceUp = false }: Input) => {
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height

  const size = {
    width: windowWidth / 3 - 50,
    height: windowHeight / 4 - 50,
  }

  let backgroundColor = '#ffffff'
  if (isFlipped) backgroundColor = color

  const flipAnim = useRef(new Animated.Value(0)).current
  const flipToFront = () => {
    Animated.timing(flipAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  const flipToBack = () => {
    Animated.timing(flipAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  useEffect(() => {
    if (isFlipped) {
      flipToFront()
    } else {
      flipToBack()
    }
  }, [isFlipped])

  const backAnimatedStyle_ = {
    transform: [
      {
        rotateY: flipAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  }

  const frontAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  }

  return (
    <TouchableOpacity style={size} onPress={onPress} activeOpacity={0.5} disabled={isFlipped}>
      <Animated.View style={[{ position: 'absolute', backfaceVisibility: 'hidden' }, backAnimatedStyle_, size]}>
        <Card style={[[size, styles.card, isMatched && { visibility: 'hidden' }]]}>
          <Text style={styles.image}>{faceUp && img}</Text>
        </Card>
      </Animated.View>
      <Animated.View style={[{ position: 'absolute', backfaceVisibility: 'hidden' }, frontAnimatedStyle, size]}>
        <Card style={[[size, styles.card, styles.flipped, { backgroundColor: color }]]}>
          <Text style={styles.image}>{img}</Text>
        </Card>
      </Animated.View>
    </TouchableOpacity>
  )
}

export default FlipCard

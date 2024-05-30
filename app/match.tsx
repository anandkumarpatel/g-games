import React, { useState, useEffect } from 'react'
import EmojiCard from './Card'
import { Text } from 'react-native-paper'
import { View } from 'react-native'
import { useNavigation } from 'expo-router'
import { router } from 'expo-router'

type BaseCard = {
  img: string
  backgroundColor: string
}

type Card = {
  id: number
  isMatched: boolean
} & BaseCard

const cardsInfo: BaseCard[] = [
  { img: '😀', backgroundColor: 'red' },
  { img: '🥶', backgroundColor: 'gold' },
  { img: '👁️', backgroundColor: 'blue' },
  { img: '👋🏾', backgroundColor: 'aqua' },
  { img: '🕺🏽', backgroundColor: 'yellow' },
  { img: '💰', backgroundColor: 'purple' },
]
const newCards: Card[] = cardsInfo
  .concat(cardsInfo)
  .sort(() => Math.random() - 0.5)
  .map((cardInfo, index) => ({
    id: index,
    img: cardInfo.img,
    backgroundColor: cardInfo.backgroundColor,
    isMatched: false,
  }))

const GameBoard: React.FC = () => {
  const [cards, setCards] = useState<Card[]>(newCards)
  const [selectedCard1Id, setSelectedCard1] = useState<number | null>(null)
  const [selectedCard2Id, setSelectedCard2] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const nav = useNavigation()
  const handleCardPress = (id: number) => {
    const isPaused = selectedCard1Id !== null && selectedCard2Id !== null
    if (isPaused) return

    if (selectedCard1Id === null) {
      setSelectedCard1(id)
    } else {
      setSelectedCard2(id)
      checkForMatch(id)
    }
  }

  const checkForMatch = (id: number) => {
    // Delay flipping unmatched cards back for a visual cue
    const selectedCard2Id = id
    setTimeout(() => {
      const selectedCard1 = selectedCard1Id !== null ? cards[selectedCard1Id] : null
      const selectedCard2 = selectedCard2Id !== null ? cards[selectedCard2Id] : null

      if (selectedCard1!.img === selectedCard2!.img) {
        setScore(score + 1)

        const updatedCards = cards.map((card) => {
          if (card.id === selectedCard1Id || card.id === selectedCard2Id) {
            return { ...card, isMatched: true }
          }
          return card
        })
        setCards(updatedCards)
      }
      setSelectedCard1(null)
      setSelectedCard2(null)
    }, 1000)
  }
  const isGameComplete = cards.every((card) => card.isMatched)

  useEffect(() => {
    if (isGameComplete) {
      router.replace('/win')
    }
  }, [isGameComplete])
  // Check for game completion (all cards matched)
  return (
    <View style={{ flex: 1 }}>
      <View style={{ justifyContent: 'center', alignContent: 'center', flexDirection: 'column' }}>
        <View
          style={{
            flex: 1,
            padding: 10,
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
            justifyContent: 'space-evenly',
            alignSelf: 'center',
          }}
        >
          {cards.map((card) => (
            <EmojiCard
              color={card.backgroundColor}
              key={card.id}
              img={card.img}
              onPress={() => handleCardPress(card.id)}
              isMatched={card.isMatched}
              isFlipped={selectedCard1Id === card.id || selectedCard2Id === card.id} // Pass isFlipped prop to control card visibility
            />
          ))}
        </View>
      </View>
    </View>
  )
}

export default GameBoard

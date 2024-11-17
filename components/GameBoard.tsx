import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import FlipCard from './Card'
import { styles } from './styles'

export type BaseCard = {
  id: number
  img: string
  backgroundColor: string
}

type Card = {
  isMatched: boolean
} & BaseCard

type GameBoardProps = {
  baseCards: BaseCard[]
  faceUp?: boolean
}
const GameBoard: React.FC<GameBoardProps> = ({ baseCards, faceUp = false }) => {
  const newCards: Card[] = baseCards
    .sort(() => Math.random() - 0.5)
    .map((cardInfo, index) => ({
      id: cardInfo.id,
      img: cardInfo.img,
      backgroundColor: cardInfo.backgroundColor,
      isMatched: false,
    }))

  const [cards, setCards] = useState<Card[]>(newCards)
  const [selectedCard1Index, setSelectedCard1] = useState<number | null>(null)
  const [selectedCard2Index, setSelectedCard2] = useState<number | null>(null)

  const handleCardPress = (index: number) => {
    const isPaused = selectedCard1Index !== null && selectedCard2Index !== null
    if (isPaused) return
    if (index === selectedCard1Index) return
    if (cards[index].isMatched) return

    if (selectedCard1Index === null) {
      setSelectedCard1(index)
    } else {
      checkForMatch(index)
    }
  }

  const checkForMatch = (selectedCard2Index: number) => {
    const selectedCard1 = selectedCard1Index !== null ? cards[selectedCard1Index] : null
    const selectedCard2 = selectedCard2Index !== null ? cards[selectedCard2Index] : null
    if (selectedCard1Index === null) return
    const didMatch = selectedCard1!.id === selectedCard2!.id
    const timeout = didMatch ? 500 : 1000
    setTimeout(() => {
      if (didMatch) {
        const updatedCards = [...cards]
        updatedCards[selectedCard1Index].isMatched = true
        updatedCards[selectedCard2Index].isMatched = true
        setCards(updatedCards)
      }
      setSelectedCard1(null)
      setSelectedCard2(null)
    }, timeout)

    setSelectedCard2(selectedCard2Index)
  }
  const isGameComplete = cards.every((card) => card.isMatched)

  useEffect(() => {
    if (isGameComplete) {
      router.replace('/win')
    }
  }, [isGameComplete])
  // Check for game completion (all cards matched)
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {cards.map((card, index) => (
          <FlipCard
            color={card.backgroundColor}
            key={index}
            img={card.img}
            onPress={() => handleCardPress(index)}
            isMatched={card.isMatched}
            faceUp={faceUp}
            isFlipped={selectedCard1Index === index || selectedCard2Index === index} // Pass isFlipped prop to control card visibility
          />
        ))}
      </View>
    </View>
  )
}

export default GameBoard

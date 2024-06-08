import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import EmojiCard from './Card'

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
          {cards.map((card, index) => (
            <EmojiCard
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
    </View>
  )
}

export default GameBoard

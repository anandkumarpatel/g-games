import GameBoard, { BaseCard } from '@/components/GameBoard'
import React from 'react'

const cardsInfo: BaseCard[] = [
  { id: 1, img: '5 + 1', backgroundColor: 'yellow' },
  { id: 1, img: '8 - 2', backgroundColor: 'yellow' },
  { id: 2, img: '2 * 6', backgroundColor: 'yellow' },
  { id: 2, img: '2 + 3', backgroundColor: 'yellow' },
  { id: 3, img: '36 / 6', backgroundColor: 'yellow' },
  { id: 3, img: '9 - 3', backgroundColor: 'yellow' },
  { id: 4, img: '13 + 18', backgroundColor: 'yellow' },
  { id: 4, img: '27 + 4', backgroundColor: 'yellow' },
  { id: 5, img: '72 / 4', backgroundColor: 'yellow' },
  { id: 5, img: '6 * 3', backgroundColor: 'yellow' },
  { id: 6, img: '7 + 9', backgroundColor: 'yellow' },
  { id: 6, img: '48 / 3', backgroundColor: 'yellow' },
]

const MathMatch: React.FC = () => {
  return <GameBoard baseCards={cardsInfo} faceUp={true} />
}

export default MathMatch

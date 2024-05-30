import { games } from '@/constants/types'
import { Link } from 'expo-router'
import { View } from 'react-native'
import { Button } from 'react-native-paper'

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        gap: 25,
        padding: 10,
        justifyContent: 'center',
      }}
    >
      {games.map((game, index) => (
        <Link key={index} href={{ pathname: game.pathName }} asChild>
          <Button
            style={{
              justifyContent: 'center',
            }}
            labelStyle={{
              fontWeight: 'bold',
            }}
            mode='contained'
          >
            {game.navText}
          </Button>
        </Link>
      ))}
    </View>
  )
}

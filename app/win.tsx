import { Link } from 'expo-router'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>You Won!</Text>
      <Link href={{ pathname: 'match' }} asChild>
        <Button mode='contained'>Play Again</Button>
      </Link>
      <Link asChild href={{ pathname: 'index' }}>
        <Button mode='contained'>Play Different Game</Button>
      </Link>
    </View>
  )
}

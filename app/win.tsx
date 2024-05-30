import { Link } from 'expo-router'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'

export default function Win() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        gap: 10,
        padding: 20,
        flexDirection: 'column',
      }}
    >
      <Text
        style={{
          fontSize: 100,
          alignSelf: 'center',
        }}
      >
        You Won!
      </Text>
      <View>
        <Link href={{ pathname: 'match' }} asChild>
          <Button mode='contained'>Play Again</Button>
        </Link>
      </View>
      <View>
        <Link asChild href={{ pathname: '/' }}>
          <Button mode='contained'>Play Different Game</Button>
        </Link>
      </View>
    </View>
  )
}

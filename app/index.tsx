import { Link, useNavigation } from 'expo-router'
import { View } from 'react-native'
import { Button } from 'react-native-paper'

export default function Index() {
  const nav = useNavigation()
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Link href={{ pathname: 'match' }} asChild>
        <Button mode='contained'>Play Matching Game</Button>
      </Link>
    </View>
  )
}

import { Stack } from 'expo-router'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import CustomNavigationBar from './AppBar'

export default function RootLayout() {
  return (
    <Stack
      initialRouteName='index'
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <Stack.Screen name='index' />
      <Stack.Screen name='match' />
    </Stack>
  )
}

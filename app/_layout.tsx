import { Stack } from 'expo-router'
import CustomNavigationBar from './AppBar'

export default function RootLayout() {
  // return <Stack />
  return (
    <Stack
    // initialRouteName='index'
    // screenOptions={{
    //   header: (props) => <CustomNavigationBar {...props} />,
    // }}
    >
      <Stack.Screen
        options={{
          title: 'Win',
          headerShown: false,
        }}
        name='win'
      />
      <Stack.Screen
        name='index'
        options={{
          title: 'Game List',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='match'
        options={{
          title: 'Matching Game',
        }}
      />
    </Stack>
  )
}

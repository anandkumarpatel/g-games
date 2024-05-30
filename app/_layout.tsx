import { Stack } from 'expo-router'
import CustomNavigationBar from '../components/AppBar'
import { games } from '@/constants/types'

export default function RootLayout() {
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
      {games.map((game, index) => (
        <Stack.Screen
          key={index}
          name={game.pathName}
          options={{
            title: game.title,
          }}
        />
      ))}
    </Stack>
  )
}

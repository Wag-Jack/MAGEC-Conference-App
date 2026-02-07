import {useColorScheme} from 'react-native'
import {Stack} from 'expo-router'
import {Colors} from '../constants/Colors'

const RootLayout = () => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light
    
    return(
        <Stack screenOptions={{
            headerStyle: {backgroundColor: theme.navBackground},
            headerTintColor: theme.title,
        }}>
            <Stack.Screen name="index" options={{headerShown: false}}/>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name="enter_key" options={{title: "Enter Code", headerShown: false}}/>
            <Stack.Screen name="about" options={{title: "About"}}/>
        </Stack>
    )
}

export default RootLayout

import {Tabs} from 'expo-router'
import {useColorScheme} from 'react-native'
import {Colors} from '../../constants/Colors'

const TabsLayout = () => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light

    return (
        <Tabs
            screenOptions={{
                headerStyle: {backgroundColor: theme.navBackground},
                headerTintColor: theme.title,
                tabBarActiveTintColor: theme.iconColorFocused,
                tabBarInactiveTintColor: theme.iconColor,
                tabBarStyle: {backgroundColor: theme.navBackground},
            }}
        >
            <Tabs.Screen name="schedule" options={{title: 'Schedule'}} />
            <Tabs.Screen name="handbook" options={{title: 'Handbook'}} />
            <Tabs.Screen name="account" options={{title: 'Account'}} />
        </Tabs>
    )
}

export default TabsLayout

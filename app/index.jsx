import {useEffect} from 'react'
import {useRouter} from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Index = () => {
    const router = useRouter()
    const ttlMs = 7 * 24 * 60 * 60 * 1000

    useEffect(() => {
        const checkKey = async () => {
            const storedAt = await AsyncStorage.getItem('conference_code_validated_at')
            if (!storedAt) {
                router.replace('/enter_key')
                return
            }
            const age = Date.now() - Number(storedAt)
            if (age > ttlMs) {
                await AsyncStorage.removeItem('conference_code_validated_at')
                router.replace('/enter_key')
                return
            }
            router.replace('/(tabs)/schedule')
        }
        checkKey()
    }, [router, ttlMs])

    return null
}

export default Index

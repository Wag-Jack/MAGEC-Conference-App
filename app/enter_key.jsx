import {useEffect, useState} from 'react'
import {StyleSheet, Text, View, TextInput, Pressable} from 'react-native'
import {useRouter} from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {supabase} from '../lib/supabase'

const enter_key = () => {
    const router = useRouter()
    const [code, setCode] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState('')

    const ttlMs = 7 * 24 * 60 * 60 * 1000

    useEffect(() => {
        const checkExisting = async () => {
            const storedAt = await AsyncStorage.getItem('conference_code_validated_at')
            if (storedAt) {
                const age = Date.now() - Number(storedAt)
                if (age < ttlMs) {
                    router.replace('/(tabs)/schedule')
                }
            }
        }
        checkExisting()
    }, [router, ttlMs])

    const validateCode = async (value) => {
        if (value === "mamun") {
            return true
        }
        return false
    }
    
    /*
    const validateCode = async (value) => {
        const {data, error: rpcError} = await supabase.rpc('validate_conference_code', {code: value})
        if (rpcError) {
            throw rpcError
        }
        return Boolean(data)
    }
    */

    const onSubmit = async () => {
        const trimmed = code.trim()
        if (!trimmed) return
        setIsSaving(true)
        setError('')
        try {
            const isValid = await validateCode(trimmed)
            if (!isValid) {
                setError('Invalid code. Please try again.')
                return
            }
            await AsyncStorage.setItem('conference_code_validated_at', String(Date.now()))
            router.replace('/(tabs)/schedule')
        } finally {
            setIsSaving(false)
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Enter Conference Code</Text>
            <TextInput
                secureTextEntry
                placeholder="Enter conference code"
                value={code}
                onChangeText={setCode}
                autoCapitalize="characters"
                style={styles.input}
                editable={!isSaving}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Pressable style={styles.button} onPress={onSubmit} disabled={isSaving}>
                <Text style={styles.buttonText}>{isSaving ? 'Saving...' : 'Continue'}</Text>
            </Pressable>
        </View>
    )
}

export default enter_key

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        backgroundColor: '#f4f6f8',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#c7cbd1',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: '#fff',
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#4a90e2',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
    error: {
        color: '#cc475a',
        marginBottom: 12,
    },
})

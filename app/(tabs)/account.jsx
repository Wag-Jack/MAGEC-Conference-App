import {useEffect, useState} from 'react'
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native'
import {supabase} from '../../lib/supabase'

const Account = () => {
    const [session, setSession] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [busy, setBusy] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        supabase.auth.getSession().then(({data}) => setSession(data.session))
        const {data: sub} = supabase.auth.onAuthStateChange((_event, nextSession) => {
            setSession(nextSession)
        })
        return () => sub.subscription.unsubscribe()
    }, [])

    const signIn = async () => {
        setBusy(true)
        setError('')
        try {
            const {error: authError} = await supabase.auth.signInWithPassword({email, password})
            if (authError) setError(authError.message)
        } finally {
            setBusy(false)
        }
    }

    const signOut = async () => {
        setBusy(true)
        setError('')
        try {
            await supabase.auth.signOut()
        } finally {
            setBusy(false)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Admin Account</Text>
            {session ? (
                <>
                    <Text style={styles.meta}>Signed in as {session.user.email}</Text>
                    <Pressable style={styles.button} onPress={signOut} disabled={busy}>
                        <Text style={styles.buttonText}>{busy ? 'Signing out...' : 'Sign out'}</Text>
                    </Pressable>
                </>
            ) : (
                <>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        style={styles.input}
                        editable={!busy}
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                        editable={!busy}
                    />
                    {error ? <Text style={styles.error}>{error}</Text> : null}
                    <Pressable style={styles.button} onPress={signIn} disabled={busy}>
                        <Text style={styles.buttonText}>{busy ? 'Signing in...' : 'Sign in'}</Text>
                    </Pressable>
                </>
            )}
        </View>
    )
}

export default Account

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
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
    meta: {
        marginBottom: 12,
        color: '#3c3c3c',
    },
    error: {
        color: '#cc475a',
        marginBottom: 12,
    },
})

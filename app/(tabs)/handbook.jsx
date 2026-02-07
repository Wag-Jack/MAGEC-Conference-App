import {useState} from 'react'
import {Pressable, StyleSheet, Text, View} from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import {Asset} from 'expo-asset'

import HandbookPdf from '../../assets/handbook.pdf'

const Handbook = () => {
    const [opening, setOpening] = useState(false)

    const openPdf = async () => {
        setOpening(true)
        try {
            const asset = Asset.fromModule(HandbookPdf)
            await asset.downloadAsync()
            const uri = asset.localUri ?? asset.uri
            await WebBrowser.openBrowserAsync(uri)
        } finally {
            setOpening(false)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Conference Handbook</Text>
            <Text style={styles.body}>
                Tap below to open the handbook PDF.
            </Text>
            <Pressable style={styles.button} onPress={openPdf} disabled={opening}>
                <Text style={styles.buttonText}>{opening ? 'Opening...' : 'Open PDF'}</Text>
            </Pressable>
        </View>
    )
}

export default Handbook

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    body: {
        color: '#3c3c3c',
        marginBottom: 16,
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
})

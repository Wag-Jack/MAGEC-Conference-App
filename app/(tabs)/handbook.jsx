import {useEffect, useState} from 'react'
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native'
import {Asset} from 'expo-asset'
import {WebView} from 'react-native-webview'

import HandbookPdf from '../../assets/MAMUN Handbook 2025 Final.pdf'

const Handbook = () => {
    const [pdfUri, setPdfUri] = useState(null)
    const [loading, setLoading] = useState(true)

    const loadPdf = async () => {
        try {
            const asset = Asset.fromModule(HandbookPdf)
            await asset.downloadAsync()
            const uri = asset.localUri ?? asset.uri
            setPdfUri(uri)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadPdf()
    }, [])

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator />
                <Text style={styles.body}>Loading handbook...</Text>
            </View>
        )
    }

    if (!pdfUri) {
        return (
            <View style={styles.center}>
                <Text style={styles.body}>Unable to load handbook.</Text>
            </View>
        )
    }

    return <WebView source={{uri: pdfUri}} style={styles.webview} />
}

export default Handbook

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    body: {
        color: '#3c3c3c',
        marginTop: 10,
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    webview: {
        flex: 1,
    },
})

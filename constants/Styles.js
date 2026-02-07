import {StyleSheet} from 'react-native'

export const Styles = {
    home: StyleSheet.create({
        container: {
            backgroundColor: '#e0dfe8',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        title: {
            fontWeight: 'bold',
            fontSize: 18
        },
        subtitle: {
            marginTop: 10,
            marginBottom: 30
        },
        img: {
            marginVertical: 20,
        },
        link: {
            marginVertical: 10,
            borderBottomWidth: 1
        }
    }),
    about: StyleSheet.create({
        container: {
            backgroundColor: '#e0dfe8',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        title: {
            fontWeight: 'bold',
            fontSize: 18
        },
        link: {
            marginVertical: 10,
            borderBottomWidth: 1
        }
    }),
    enterKey: StyleSheet.create({
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
    }),
}
import {StyleSheet, Text, View, Image} from 'react-native'
import {Link} from 'expo-router'
import Logo from '../assets/img/magec.png'

const Home = () => {
    return(
        <View style={styles.container}>
            <Image source={Logo} style={styles.img}/>
            
            <Text style={styles.title}>MAGEC Presents</Text>

            <Text style={{ marginTop: 10, marginBottom: 30 }}>
                MAMUN 2026
            </Text>

            <Link href="/about" styles={styles.link}>About</Link>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
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
    img: {
        marginVertical: 20,
    },
    link: {
        marginVertical: 10,
        borderBottomWidth: 1
    }
})
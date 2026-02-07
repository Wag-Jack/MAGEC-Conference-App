import {useEffect, useState} from 'react'
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from 'react-native'
import {supabase} from '../../lib/supabase'

const Schedule = () => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            try {
                const {data, error} = await supabase
                    .from('schedule')
                    .select('id,title,start_time,end_time,location,description')
                    .order('start_time', {ascending: true})

                if (error) {
                    console.warn(error.message)
                    setItems([])
                    return
                }
                setItems(data ?? [])
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator />
            </View>
        )
    }

    return (
        <FlatList
            contentContainerStyle={styles.list}
            data={items}
            keyExtractor={(item) => String(item.id)}
            renderItem={({item}) => (
                <View style={styles.card}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.meta}>
                        {item.start_time} - {item.end_time}
                    </Text>
                    {item.location ? <Text style={styles.meta}>{item.location}</Text> : null}
                    {item.description ? <Text style={styles.desc}>{item.description}</Text> : null}
                </View>
            )}
            ListEmptyComponent={
                <View style={styles.center}>
                    <Text style={styles.empty}>No schedule items yet.</Text>
                </View>
            }
        />
    )
}

export default Schedule

const styles = StyleSheet.create({
    list: {
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#e1e5ea',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    meta: {
        color: '#3c3c3c',
        fontSize: 13,
    },
    desc: {
        marginTop: 6,
        color: '#3c3c3c',
        fontSize: 14,
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    empty: {
        color: '#3c3c3c',
    },
})

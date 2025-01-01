import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

interface HeadProps {
    title?: string
}

const HeadWithBack = ({ title }: HeadProps) => {
    const navigation = useNavigation()

    return (
        <View style={styles.header}>
            <Ionicons
                name={'arrow-back-outline'}
                size={28}
                color={'black'}
                onPress={() => {
                    navigation.goBack()
                }}
            />
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}
export default HeadWithBack
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        width: '100%',
        height: 60,
        marginTop: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    }
})

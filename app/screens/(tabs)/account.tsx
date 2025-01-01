import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import Colors from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";

const Account = () => {
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <View>
                <Text>Settings</Text>
            </View>
        </View>

    )
}
export default Account
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.dark,
    },
})

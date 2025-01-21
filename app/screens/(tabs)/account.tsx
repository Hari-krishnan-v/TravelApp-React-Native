import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import Colors from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";

const Account = () => {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            {/*profile header banner */}
            <View style={styles.profileHeaderBanner}>

            </View>
        </View>

    )
}
export default Account
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 30,
        backgroundColor: Colors.light.background,
    },
    profileHeaderBanner: {
        width: '100%',
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

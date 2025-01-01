import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from "@expo/vector-icons/Ionicons";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Colors from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import TypeWriter from "@sucho/react-native-typewriter";

// @ts-ignore
const Header = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.header}>
            <View style={styles.userInfo}>
                <TypeWriter
                    textArray={[
                        'Hello User',
                        '🎄 Merry Christmas! 🎁',
                        "See the World",
                        "Adventure Awaits"
                    ]}
                    loop={true}
                    speed={120}
                    delay={1500}
                    textStyle={styles.headerText}
                    cursorStyle={styles.typeWriterCursorText}
                />

            </View>
            <Ionicons onPress={() => {
                // @ts-ignore
                navigation.navigate("settings")
            }} name="person-circle" size={50} color="darkgray" />
        </View>
    )
}
export default Header
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: wp('3%'),
        marginLeft: wp('2%'),
        marginRight: wp('2%'),
        marginTop: hp('5%'),
        borderRadius: 20,
    },
    userInfo: {
        flexDirection: 'column',
    },
    headerText: {
        justifyContent: "flex-start",
        color: '#121212',
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: wp('2%'),

    },
    coins: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginRight: wp('5%'),
        marginTop: hp('1.5%'),
        fontFamily:'Poppins-SemiBold'
    },
    coinsText: {
        marginLeft: wp('2%'),
        fontSize: 14,
        color: '#FFC107',
    },
    typeWriterCursorText: {
        color: '#c2185b',
        fontSize: 28,
    }
})

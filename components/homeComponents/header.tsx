import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from "@expo/vector-icons/Ionicons";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";
import Colors from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/store/authContext";
import Animated, { Easing, FlipInXDown } from "react-native-reanimated";
// @ts-ignore
import backgroundImage from "@/assets/images/backgroundImage.jpg"
import { Image } from 'expo-image';

interface HeadProps {
    title?: string
}
// @ts-ignore
const Header = () => {
    const { location, locationError } = useAuth()
    const [locationName, setLocationName] = useState(null);

    const navigation = useNavigation();
    const handleSettingOpen = () => {
        navigation.navigate("settings")
    }
    return (
            <View style={styles.header}>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Ionicons name="location" size={50} color={Colors.green} />
                    {location ? (
                        <Animated.View style={[styles.locationContainer]}>
                            <Text style={styles.locationText} numberOfLines={1} ellipsizeMode="tail">
                                {location.city}
                            </Text>
                            <Text style={styles.locationSubText} numberOfLines={1} ellipsizeMode="tail">
                                {location.formattedAddress}
                            </Text>
                        </Animated.View>
                    ) : (
                        <Text style={styles.locationText}>Loading location...</Text>
                    )}
                </View>
                <TouchableOpacity onPress={handleSettingOpen}>
                    <Image source={backgroundImage} style={styles.userProfile} />
                </TouchableOpacity>
            </View>

    )
}

export const DefaultHeader = ({ title }: HeadProps) => {
    return (
        <View style={styles.header}>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Ionicons name="menu" size={45} color="darkgray" />

            </View>
            <Text style={styles.headerText}>{title}</Text>
            <Ionicons
                onPress={() => {
                    // @ts-ignore
                    navigation.navigate("settings");
                }}
                name="person-circle-outline"
                size={50}
                color="darkgray"
            />
        </View>
    )
}

export default Header
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 15,

    },
    headerText: {
        fontSize: 22,
        fontWeight: 'semibold',
        color: Colors.light.text.grey,
        fontFamily: 'Poppins-SemiBold',
    },

    locationText: {
        fontSize: 25,
        fontFamily: "Poppins-Bold",
        color: Colors.green,
        marginTop:-5
    },
    locationSubText: {
        fontSize: 14,
        marginTop:-10

    },
    userInfo: {
        flexDirection: 'column',
    },
    userProfile: {
        justifyContent: 'center',
        height: hp('6%'),
        width: wp('12.5%'),
        overflow: "hidden",
        borderRadius: 50,
        borderColor: "white",
        borderWidth: 5,
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.3)',
    },
    locationContainer: {
        display: "flex",
        maxWidth: widthPercentageToDP("50%"),
        flexDirection: "column",
        // justifyContent: "center",
    }

})

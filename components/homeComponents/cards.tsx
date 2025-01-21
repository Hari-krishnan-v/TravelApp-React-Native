import { StyleSheet, Text, View, } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constants/Colors";
import { Pressable } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { Image } from 'expo-image';
// @ts-ignore
import room2 from "../../assets/images/room2.jpg";


interface CardsProps {
    image?: any,
    title?: string
    description?: string
    location?: string
}

const Cards = ({ image, title, description, location }: CardsProps) => {
    const navigation = useNavigation()
    return (
        <Pressable onPress={() => {
            // @ts-ignore
            navigation.navigate('tripDetail', {
                image: image,
                title: title,
                description: description,
                location: location,
            })
        }} style={styles.CardContainer}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: image }}
                    style={{ justifyContent: 'center', height: hp('14%'), width: wp('50%') }}
                />
            </View>
            <View style={{ width: 189, gap: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text style={styles.cardHead}>{title}</Text>
                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                        <Ionicons name="star" size={10} color={Colors.light.icon} />
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 12, color: Colors.light.text.grey }}>4.5</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <Ionicons name="location" size={12} color={Colors.light.icon} />
                    <Text style={styles.cardDescription}>{location}</Text>
                </View>
            </View>

        </Pressable>

    )
}

const HotelCard = () => {
    return (
        <View style={styles.HotelContainer}>
            <Image source={room2}
                style={{ justifyContent: 'center', height: hp('10%'), width: wp('25%'), overflow: "hidden", borderRadius: 13, margin: 10 }} />
            <View style={{ flexDirection: 'column', padding: 10, gap: 5 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#336749', fontFamily: 'Poppins-Medium' }}> Haze and Kites Munnar</Text>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                    <Ionicons name="star" size={13} color="#FFC107" />
                    <Ionicons name="star" size={13} color="#FFC107" />
                    <Ionicons name="star" size={13} color="#FFC107" />
                    <Ionicons name="star" size={13} color="#FFC107" />
                </View>
                <Text style={{ fontSize: 13 }}> PO, Munnar, Munnar, India, 685565 </Text>
            </View>
        </View>
    )
}
export default Cards
export { HotelCard }
const styles = StyleSheet.create({

    CardContainer: {
        width: 213,
        height: 195,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'column',
        borderRadius: 10,
        overflow: 'hidden',
        marginLeft: wp('5%'),
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.3)',
    },
    imageContainer: {
        maxWidth: 197,
        maxHeight: 119,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 13,
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    cardHead: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light.text.black,
        marginTop: hp('1%'),
        fontFamily: 'Poppins-Medium',

    },
    cardDescription: {
        fontSize: 12,
        color: Colors.light.text.grey,
    },
    HotelContainer: {
        flexDirection: 'row',
        width: wp('90%'),
        height: hp("12%"),
        backgroundColor: 'white',
        marginLeft: wp('5%'),
        marginTop: hp('1%'),
        marginBottom: hp('1%'),
        overflow: 'hidden',
        borderRadius: 13,

        // borderWidth:1
    }
})

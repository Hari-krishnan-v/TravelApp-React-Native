import { ImageBackground, StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

// @ts-ignore
import room1 from "../../assets/images/room1.jpg";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constants/Colors";
import { Pressable } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";

interface CardsProps {
    image?: any,
    title?: string
    description?: string
}

const Cards = ({ image, title, description }: CardsProps) => {
    const navigation = useNavigation()
    return (

        <View style={styles.CardContainer}>
            <View style={styles.imageContainer}>
                <ImageBackground
                    source={{ uri: image }}
                    style={{ justifyContent: 'center', height: hp('14%'), width: wp('50%') }}
                />
            </View>
            <View style={{ marginLeft: wp('2%') }}>
                <Text style={styles.cardHead}>{title}</Text>
                <Text style={styles.cardDescription}>{description}</Text>
                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                    <Ionicons name="star" size={10} color="#FFC107" />
                    <Text style={{ fontSize: 10 }}>4.5</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 10 }}>Start from</Text>
                        <Text style={{ fontSize: 12, color: Colors.orange, fontWeight: 'bold' }}>$ 150/paz</Text>
                    </View>
                    <Pressable onPress={() => {
                        // @ts-ignore
                        navigation.navigate('tripDetail', {
                            image: image,
                            title: title,
                        })
                    }} style={{
                        width: 56,
                        height: 24,
                        borderRadius: 16,
                        backgroundColor: Colors.dark,
                        justifyContent: 'center',
                        marginRight: 10
                    }}>
                        <Text style={{
                            fontSize: 12,
                            textAlign: 'center',
                            color: Colors.white
                        }}>Book</Text>
                    </Pressable>
                </View>
            </View>

        </View>

    )
}

const HotelCard = () => {
    return (
        <View style={styles.HotelContainer}>
            <ImageBackground source={room1}
                style={{ justifyContent: 'center', height: hp('10%'), width: wp('35%'), borderRadius: 20 }} />
            <View style={{ flexDirection: 'column', padding: 10, gap: 5 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#336749' }}>Haze and Kites Munnar</Text>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                    <Ionicons name="star" size={10} color="#FFC107" />
                    <Ionicons name="star" size={10} color="#FFC107" />
                    <Ionicons name="star" size={10} color="#FFC107" />
                    <Ionicons name="star" size={10} color="#FFC107" />
                </View>
                <Text style={{ fontSize: 10 }}>PO, Munnar, Munnar, India, 685565 </Text>
            </View>
        </View>
    )
}
export default Cards
export { HotelCard }
const styles = StyleSheet.create({

    CardContainer: {
        width: wp('40%'),
        height: hp('26%'),
        backgroundColor: 'white',
        flexDirection: 'column',
        borderRadius: 10,
        overflow: 'hidden',
        marginLeft: wp('5%'),
        // boxShadow: '0px 0px 30px rgba(0, 0, 0, 10)',
    },
    imageContainer: {
        maxWidth: wp('100%'),
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    cardHead: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#292b2b',
        marginTop: hp('1%'),

    },
    cardDescription: {
        fontSize: 9,
        color: '#292b2b',
    },
    HotelContainer: {
        flexDirection: 'row',
        width: wp('90%'),
        maxHeight: hp('15%'),
        backgroundColor: 'white',
        marginLeft: wp('5%'),
        marginTop: hp('1%'),
        marginBottom: hp('1%'),
        overflow: 'hidden',
        borderRadius: 20,
    }
})

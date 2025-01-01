import {ActivityIndicator, FlatList, ImageBackground, StyleSheet, Text, TextInput, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import HeadWithBack from "@/components/HeadComponets/headComponent";
import { StatusBar } from "expo-status-bar";
import axios from "axios";

const Hotel = () => {
    const [hotelData, setHotelData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchHotelData = async () => {
            try {
                const response = await axios.get('http://192.168.1.2:8000/accommodation/hotel-list/hotels/');
                setHotelData(response.data);
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };
        fetchHotelData();
    },[]);

    if (loading) {
        return (
            <View style={styles.container}>
                <StatusBar style="dark" />
                <HeadWithBack title="Hotel" />
                <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%', }}>
                    <ActivityIndicator style={{ marginLeft: 50, marginRight: 50, marginBottom: 50 }} size={50} color={'blue'} />
                </View>
            </View>
        );
    }
    if (error) {
        return (
            <View style={styles.container}>
                <StatusBar style="dark" />
                <HeadWithBack title="Hotel" />
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <HeadWithBack title={'Hotel'} />

            <FlatList
                data={hotelData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.hotelItem}>
                    <ImageBackground
                        source={{uri:item.hotelImageUrl}}
                        style={styles.hotelImage}
                    />
                        <View style={styles.hotelDetailsContainer}>
                            <Text style={styles.hotelName}>{item.hotelName}</Text>
                            <Text style={styles.hotelDetails}>{item.location}</Text>
                            <Text style={styles.hotelDetails}>{item.contactNumber}</Text>
                        </View>
                    </View>
                )}
                />
        </View>
    )
}
export default Hotel
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        flexDirection: 'column',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    hotelItem: {
        marginBottom: 15,
        flexDirection: 'row',
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ddd',
    },
    hotelImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    hotelDetailsContainer: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    hotelName: {
        fontSize: 18,
        maxWidth: 225,
        fontWeight: 'bold',
        color: '#000',
    },
    hotelDetails: {
        fontSize: 14,
        color: '#555',
    }
})

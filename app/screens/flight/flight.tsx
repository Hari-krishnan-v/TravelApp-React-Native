import {ActivityIndicator, FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import HeadWithBack from "@/components/HeadComponets/headComponent";
import { StatusBar } from "expo-status-bar";
import axios from "axios";

const Flight = () => {
    const [flightData, setFlightData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFlightData = async () => {
            try {
                const response = await axios.get('http://192.168.1.2:8000/transportation/flight-list/flights/');
                setFlightData(response.data);
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };
        fetchFlightData();
    },[])
    if (loading) {
        return (
            <View style={styles.container}>
                <StatusBar style="dark" />
                <HeadWithBack title="Flight" />
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
                <HeadWithBack title="Flight" />
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <HeadWithBack title="Flight" />
            <FlatList
                data={flightData}
                keyExtractor={(item) => item.flight_id.toString()} // Assuming each item has a 'train_id' field
                renderItem={({ item }) => (
                    <View style={styles.flightItem}>
                        <ImageBackground
                            source={{ uri: item.flightImageUrl }}
                            style={styles.flightImage}
                        />
                        <View style={styles.flightDetailsContainer}>
                            <Text style={styles.flightName}>{item.airline}</Text>
                            <Text style={styles.flightDetails}>Departure: {item.departure_time}</Text>
                            <Text style={styles.flightDetails}>Arrival: {item.arrival_time}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

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
    flightItem: {
        marginBottom: 15,
        flexDirection: 'row',
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ddd',
    },
    flightImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    flightDetailsContainer: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    flightName: {
        fontSize: 18,
        maxWidth: 225,
        fontWeight: 'bold',
        color: '#000',
    },
    flightDetails: {
        fontSize: 14,
        color: '#555',
    }
})

export default Flight

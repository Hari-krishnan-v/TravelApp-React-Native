import { ActivityIndicator, FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeadWithBack from "@/components/HeadComponets/headComponent";
import { StatusBar } from "expo-status-bar";
import axios from "axios";

const Bus = () => {
    const [busData, setBusData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBusData = async () => {
            try {
                const response = await axios.get('http://192.168.1.2:8000/transportation/bus-list/buses/');
                setBusData(response.data);
            } catch (error) {
                // @ts-ignore
                setError(error.message);
            }
            setLoading(false);
        };
        fetchBusData();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <StatusBar style="dark" />
                <HeadWithBack title="Bus" />
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
                <HeadWithBack title="Bus" />
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <HeadWithBack title="Bus" />
            <FlatList
                data={busData}
                keyExtractor={(item) => item.bus_id.toString()} // Assuming each item has a 'train_id' field
                renderItem={({ item }) => (
                    <View style={styles.busItem}>
                        <ImageBackground
                            source={{ uri: item.busImageUrl }}
                            style={styles.busImage}
                        />
                        <View style={styles.busDetailsContainer}>
                            <Text style={styles.busName}>{item.company}</Text>
                            <Text style={styles.busDetails}>Departure: {item.departure_time}</Text>
                            <Text style={styles.busDetails}>Arrival: {item.arrival_time}</Text>
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
    busItem: {
        marginBottom: 15,
        flexDirection: 'row',
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ddd',
    },
    busImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    busDetailsContainer: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    busName: {
        fontSize: 18,
        maxWidth: 225,
        fontWeight: 'bold',
        color: '#000',
    },
    busDetails: {
        fontSize: 14,
        color: '#555',
    }
})

export default Bus;
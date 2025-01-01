import { StyleSheet, Text, View, FlatList, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import HeadWithBack from "@/components/HeadComponets/headComponent";
import { StatusBar } from "expo-status-bar";
import axios from "axios";

const Train = () => {
    const [trainData, setTrainData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrainData = async () => {
            try {
                const response = await axios.get('http://192.168.1.2:8000/transportation/train-list/trains/');
                setTrainData(response.data);  // Store the response data
            } catch (error) {
                setError(error.message);  // If an error occurs, store the error message
            }
            setLoading(false);  // Set loading to false once data is fetched or an error occurs
        };

        fetchTrainData();  // Call the function to fetch data
    }, []);  // The empty dependency array ensures this effect runs only once on mount

    // Loading state: show loading message while fetching data
    if (loading) {
        return (
            <View style={styles.container}>
                <StatusBar style="dark" />
                <HeadWithBack title="Train" />
                <Text>Loading...</Text>
            </View>
        );
    }

    // Error state: show error message if fetching fails
    if (error) {
        return (
            <View style={styles.container}>
                <StatusBar style="dark" />
                <HeadWithBack title="Train" />
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    // Render the train data once it's fetched
    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <HeadWithBack title="Train" />
            <FlatList
                data={trainData}
                keyExtractor={(item) => item.train_id.toString()} // Assuming each item has a 'train_id' field
                renderItem={({ item }) => (
                    <View style={styles.trainItem}>
                        {/* Use the correct image URL from the API response */}
                        <ImageBackground
                            source={{ uri: item.trainImageUrl }}
                            style={styles.trainImage}
                        />
                        <View style={styles.trainDetailsContainer}>
                            <Text style={styles.trainName}>{item.train_name}</Text>
                            <Text style={styles.trainDetails}>Departure: {item.departure_time}</Text>
                            <Text style={styles.trainDetails}>Arrival: {item.arrival_time}</Text>
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
    trainItem: {
        marginBottom: 15,
        flexDirection: 'row',
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ddd',
    },
    trainImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    trainDetailsContainer: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    trainName: {
        fontSize: 18,
        maxWidth: 230,
        fontWeight: 'bold',
        color: '#000',
    },
    trainDetails: {
        fontSize: 14,
        color: '#555',
    },
});

export default Train;

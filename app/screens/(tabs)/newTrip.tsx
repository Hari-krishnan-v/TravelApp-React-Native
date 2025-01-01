import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";  // Updated import
import axios from 'axios'
import { StatusBar } from "expo-status-bar";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Colors from '@/constants/Colors'
import Header from "@/components/homeComponents/header";
import SearchComponent from "@/components/search/search";

const TravelPlanForm: React.FC = () => {
    const [query, setQuery] = useState('');
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const GOOGLE_PLACES_API_KEY = '<KEY>';
    if (query) {
        console.log(query)
    }

    return (
        <View style={styles.container}>
            <StatusBar />
            <Header points={0} pointVisible={false} />
            <View style={styles.form}>
                <Text style={styles.label}>Current Location</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter current location"
                    placeholderTextColor="white"
                />

                <Text style={styles.label}>Destination</Text>
                <SearchComponent placeholder={"Enter destination"} />

                <Text style={styles.label}>Budget Type</Text>
                <View style={styles.pickerWrapper}>
                    <Picker dropdownIconColor="Colors.white" >
                        <Picker.Item style={{ color: Colors.white, backgroundColor: Colors.light.background }} label="low" value="low" />
                        <Picker.Item style={{ color: Colors.white, backgroundColor: Colors.light.background }} label="medium" value="medium" />
                        <Picker.Item style={{ color: Colors.white, backgroundColor: Colors.light.background }} label="high" value="high" />

                    </Picker>
                </View>

                <Button title="Submit" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.white,
        paddingLeft: wp('2%'),
        paddingRight: wp('2%'),
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: "Colors.dark",

    },
    input: {

        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        marginBottom: 16,
        borderRadius: 4,
        marginRight: 'auto',
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        marginBottom: 16,
        backgroundColor: Colors.dark,

    }, form: {
        padding: wp('3%'),
        flexDirection: 'column',
    }

});

export default TravelPlanForm;

import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, TextInput, ActivityIndicator } from 'react-native';
import { debounce } from 'lodash';
import axios from 'axios';
import Autocomplete from 'react-native-autocomplete-input';
import { useNavigation } from '@react-navigation/native';
import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Header from "@/components/homeComponents/header";

const TravelPlanForm: React.FC = () => {
    const [queryStart, setQueryStart] = useState('');
    const [queryDestination, setQueryDestination] = useState('');
    const [StartLocation, setStartLocations] = useState([]); // Stores the fetched location data
    const [DestinationLocation, setDestinationLocations] = useState([]); // Stores the fetched location data
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedBudget, setSelectedBudget] = useState('');
    const [numberOfPeoples, setNumberOfoPeoples] = useState('');
    const navigation = useNavigation();


    // Debounced search function to prevent excessive API calls
    const debouncedSearchStart = debounce(async (text: string) => {
        if (text.length > 2) {
            setLoading(true);
            setError('');
            try {
                const resp = await axios.get(`http://192.168.1.2:8000/location/locations/?search=${text}`);
                if (Array.isArray(resp.data)) {
                    setStartLocations(resp.data); // Assuming the response is an array of locations or cities
                } else {
                    setError('Invalid response format.');
                }
            } catch (error) {
                setError('Error fetching data.');
            } finally {
                setLoading(false);
            }
        } else {
            setStartLocations([]);
        }
    }, 500);
    const debouncedSearchDestination = debounce(async (text: string) => {
        if (text.length > 2) {
            setLoading(true);
            setError('');
            try {
                const resp = await axios.get(`http://192.168.1.2:8000/location/locations/?search=${text}`);
                if (Array.isArray(resp.data)) {
                    setDestinationLocations(resp.data); // Assuming the response is an array of locations or cities
                } else {
                    setError('Invalid response format.');
                }
            } catch (error) {
                setError('Error fetching data.');
            } finally {
                setLoading(false);
            }
        } else {
            setDestinationLocations([]);
        }
    }, 500);

    const handleBudgetSelect = (budget: string) => {
        setSelectedBudget(budget);
    };

    const handleNumberOfPeople = (people: string) => {
        setNumberOfoPeoples(people);
    };

    // When user types in the query, call the debounced search
    const handleStartQueryChange = (text: string) => {
        setQueryStart(text);
        debouncedSearchStart(text);
    };

    const handleDestinationQueryChange = (text: string) => {
        setQueryDestination(text);
        debouncedSearchDestination(text);
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            <Header title={"New Tripr"}/>

            <View style={styles.form}>
                {/*.........starting location........*/}
                <View style={styles.formItems}>
                    <Text style={[styles.label,{marginBottom: 35}]}>Starting location</Text>
                    <View style={styles.autocompleteContainer}>
                        <Autocomplete
                            data={StartLocation}
                            defaultValue={queryStart}
                            listContainerStyle={styles.suggestionList}
                            // containerStyle={styles.inputContainer}
                            inputContainerStyle={styles.inputField}
                            style={styles.inputContainer}
                            onChangeText={handleStartQueryChange}
                            flatListProps={{
                                renderItem: ({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setQueryStart(item.city); // Set the selected location
                                            setStartLocations([]); // Clear the suggestions after selecting
                                        }}
                                    >

                                        <Text style={styles.suggestionText}>{item.city}</Text>
                                    </TouchableOpacity>
                                ),
                            }}
                            placeholder="Enter starting location"
                            autoCapitalize="none"
                            autoCorrect={true}
                        />

                    </View>
                </View>
                {/*{loading && <ActivityIndicator size="large" color={Colors.light.icon} style={styles.loadingIndicator} />}*/}

                {/* Destination field with autocomplete */}
                <View style={styles.formItems}>
                    <Text style={[styles.label,{marginBottom: 35}]}>Destination</Text>
                    <View style={styles.autocompleteContainer}>
                        <Autocomplete
                            data={DestinationLocation}
                            defaultValue={queryDestination}
                            listContainerStyle={styles.suggestionList}
                            // containerStyle={styles.inputContainer}
                            inputContainerStyle={styles.inputField}
                            style={styles.inputContainer}
                            onChangeText={handleDestinationQueryChange}
                            flatListProps={{
                                renderItem: ({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            // @ts-ignore
                                            setQueryDestination(item.city); // Set the selected location
                                            setDestinationLocations([]); // Clear the suggestions after selecting
                                        }}
                                    >
                                        <Text style={styles.suggestionText}>{item.city}</Text>
                                    </TouchableOpacity>
                                ),
                            }}
                            // inputContainerStyle={styles.inputField}
                            placeholder="Enter destination"
                            autoCapitalize="none"
                            autoCorrect={true}
                        />
                    </View>
                </View>

                {/* Show Loading Indicator */}

                {/*/!* Error Message *!/*/}
                {/*{error && <Text style={styles.errorText}>{error}</Text>}*/}

                {/* Number of people */}
                <View style={styles.formItems}>
                    <Text style={styles.label}>Number of people</Text>
                    <View style={styles.budgetContainer}>
                        <TouchableOpacity
                            onPress={() => handleNumberOfPeople('single')}
                            style={[styles.budgetCard, numberOfPeoples === 'single' && styles.selectedCard]}
                        >
                            <Text style={styles.cardText}>Single</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleNumberOfPeople('couple')}
                            style={[styles.budgetCard, numberOfPeoples === 'couple' && styles.selectedCard]}
                        >
                            <Text style={styles.cardText}>Couple</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleNumberOfPeople('family')}
                            style={[styles.budgetCard, numberOfPeoples === 'family' && styles.selectedCard]}
                        >
                            <Text style={styles.cardText}>Family</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleNumberOfPeople('college')}
                            style={[styles.budgetCard, numberOfPeoples === 'college' && styles.selectedCard]}
                        >
                            <Text style={styles.cardText}>College</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Budget Type */}
                <View style={styles.formItems}>
                    <Text style={styles.label}>Budget Type</Text>
                    <View style={styles.budgetContainer}>
                        <TouchableOpacity
                            style={[styles.budgetCard, selectedBudget === 'low' && styles.selectedCard]}
                            onPress={() => handleBudgetSelect('low')}
                        >
                            <Text style={styles.cardText}>Low</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.budgetCard, selectedBudget === 'medium' && styles.selectedCard]}
                            onPress={() => handleBudgetSelect('medium')}
                        >
                            <Text style={styles.cardText}>Medium</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.budgetCard, selectedBudget === 'high' && styles.selectedCard]}
                            onPress={() => handleBudgetSelect('high')}
                        >
                            <Text style={styles.cardText}>High</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Button  title="Submit" onPress={() => { /* Handle form submission */ }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
        paddingTop: 30,
    },

    form: {
        padding: 20,
    },
    formItems: {
        marginVertical: 20,
        gap: 10
    },
    label: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 8,
        color: Colors.dark,
    },
    inputContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingLeft: 10


    },
    inputField: {
        flex: 1,
        width: '100%',
        height: 55,
        borderRadius: 13,
        borderWidth: 0,
        // Adjusted to ensure the input box height is sufficient

    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.0)',
        right: 0,
        top: 35,
        // zIndex: 10,
    },
    suggestionText: {
        padding: 10,
        fontSize: 16,
        color: Colors.dark,
    },
    suggestionList: {
        width: '100%',
        maxHeight: 150,
        backgroundColor: '#fff',
        zIndex:100// Ensure the list is visible
    },
    budgetContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    budgetCard: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: Colors.light.background,
        marginHorizontal: 5,
        elevation: 3,
    },
    selectedCard: {
        borderColor: Colors.light.icon,
        backgroundColor: Colors.white,
    },
    cardText: {
        fontSize: 13,
        fontFamily: 'Poppins-Regular',
        color: Colors.light.text.black,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 10,
    },
    loadingIndicator: {
        marginVertical: 20,
    },
});

export default TravelPlanForm;

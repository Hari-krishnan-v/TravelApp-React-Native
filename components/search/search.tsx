import { StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Ionicons from "@expo/vector-icons/Ionicons";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import axios from "axios";
import { debounce } from 'lodash'; // Import lodash debounce function

interface SearchProps {
    placeholder?: string;
}

const SearchComponent = ({ placeholder }: SearchProps) => {
    const [input, setInput] = useState('');
    const [data, setData] = useState<any[]>([]);  // Define data type (could be specific based on response)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Debounced search function
    const debouncedSearch = debounce(async (text: string) => {
        if (text.length > 3) {
            setIsLoading(true);
            try {
                const resp = await axios.get(`http://192.168.1.2:8000/location/locations/?search=${text}`);
                setData(resp.data); // Assuming the response is an array of cities or locations
                setError('');
            } catch (error) {
                setError('Error fetching data.');
            } finally {
                setIsLoading(false);
            }
        } else {
            setData([]);
        }
    }, 500);  // Debounce delay (500ms)

    const handleChangeText = (text: string) => {
        setInput(text);
        debouncedSearch(text);
    };

    // Render each search result
    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            style={styles.suggestionItem}
            onPress={() => setInput(item.city)} // Set the input to the city name when clicked
        >
            <Text style={styles.suggestionText}>{item.city}</Text> {/* Adjust based on your data structure */}
        </TouchableOpacity>
    );

    return (
        <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={24} color="black" />
            <TextInput
                style={styles.searchInput}
                placeholder={placeholder}
                value={input}
                onChangeText={handleChangeText}
            />
            {isLoading && <Text style={styles.loadingText}>Loading...</Text>}
            {error && <Text style={styles.errorText}>{error}</Text>}
            {data.length > 0 && (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item: any) => item.id ? item.id.toString() : item.city}  // Ensure to use a unique key
                    style={styles.suggestionsList}
                    keyboardShouldPersistTaps="handled"  // Ensures that taps on the list items do not dismiss the keyboard
                />
            )}
        </View>
    );
};

export default SearchComponent;

const styles = StyleSheet.create({
    searchContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        width: wp('90%'),
        height: hp('6%'),
        borderRadius: 10,
        padding: wp('2%'),
        marginRight: wp('5%'),
        borderWidth: 1,
        backgroundColor: '#fff',
    },
    searchInput: {
        flex: 1,
        height: hp('100%'),
        marginLeft: wp('2%'),
    },
    loadingText: {
        position: 'absolute',
        top: '100%',
        left: 0,
        fontSize: 12,
        color: 'grey',
    },
    errorText: {
        position: 'absolute',
        top: '100%',
        left: 0,
        fontSize: 12,
        color: 'red',
    },
    suggestionsList: {
        position: 'absolute',
        top: '100%',
        left: 0,
        width: wp('90%'),
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        maxHeight: 200,  // Optional: max height for the suggestions dropdown
        zIndex: 20,
        marginTop: 5,  // Add a little margin to prevent it from sticking directly to the input field
    },
    suggestionItem: {
        padding: wp('2%'),
    },
    suggestionText: {
        fontSize: 14,
        color: 'black',
    },
});

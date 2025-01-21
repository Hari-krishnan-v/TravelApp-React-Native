import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image} from "expo-image";

const Weather = () => {
    const [temperature, setTemperature] = useState(true);
    const [tempIcon, setTempIcon] = useState(null);
    // useEffect(() => {
    //     const fetchWeather = async () => {
    //         const url = `https://api.weatherstack.com/current?access_key=b2f7bd890d69a2775caebd34f2f23d66&query=${location}`; // API endpoint
    //
    //         const options = {
    //             method: 'GET',
    //         };
    //
    //         try {
    //             const response = await fetch(url, options);  // Fetch weather data
    //             const result = await response.json();  // Parse the JSON response
    //             console.log(result);
    //
    //             // Extract the temperature from the result object
    //             const temp = result.current.temperature;
    //             const Icon=result.current.weather_icons[0];
    //             setTempIcon(Icon)
    //             setTemperature(temp);  // Update state with the temperature
    //         } catch (error) {
    //             console.error('Error fetching weather data:', error);  // Handle errors
    //         }
    //     };
    //
    //     fetchWeather();  // Call the function to fetch the weather
    // }, []);  // Empty dependency array to call only once
    return (
        <View style={styles.container}>
            {temperature !== null ? (<>
                    {/*<Text style={styles.temperature}>{temperature}°C</Text>*/}
                    <Text style={styles.temperature}>16°C</Text>
                    {/*<ImageBackground  source={{uri: "https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"}} style={styles.temperatureIcon}/>*/}
                </>
            ) : (
                <Text>Loading...</Text>  // Show a loading message while fetching
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    temperature: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    temperatureIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        overflow: 'hidden',


    }

});

export default Weather;

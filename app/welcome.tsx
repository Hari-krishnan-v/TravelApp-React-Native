import { StyleSheet, Text, View, SafeAreaView, ImageBackground } from 'react-native';
import React, { useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import Animated, { useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useNavigation } from "@react-navigation/native";

// Correct image path assuming the image is in the assets folder
import backgroundImage from '../assets/images/backgroundImage.png'; // Adjust path if needed

const Welcome = () => {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0);
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            scale.value = withSpring(scale.value + 40);
            opacity.value = withSpring(opacity.value + 100);
        }, 100);
        setTimeout(() => navigation.navigate('home'), 2500); // Navigate to the "home" screen after 2.5 seconds
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />

            {/* Using ImageBackground to set the background image */}
            <ImageBackground source={backgroundImage} style={styles.background}>
                <View style={styles.innerContainer}>
                    <Animated.Text
                        style={[
                            styles.welcomeText,
                            {
                                fontSize: scale,  // Dynamically animate fontSize
                                opacity: opacity,  // Apply opacity animation
                            },
                        ]}
                    >
                        TravelIN
                    </Animated.Text>

                    <Animated.Text style={styles.welcomeSubText}>
                        Travel makes one modest
                    </Animated.Text>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1, // Takes up the full screen space
    },
    // Style for the background image
    background: {
        flex: 1, // Ensures the background takes up the full space
        justifyContent: 'center', // Vertically center the content
        alignItems: 'center', // Horizontally center the content
    },
    innerContainer: {
        alignItems: 'center',
    },
    welcomeText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    welcomeSubText: {
        color: '#fff',
        fontSize: 20, // Starting font size
    },
});

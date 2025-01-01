import { StyleSheet, Text, View, SafeAreaView, ImageBackground, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import Animated, { useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useNavigation } from "@react-navigation/native";
// @ts-ignore
import bg1 from "@/assets/images/bg1.jpg";

// Correct image path assuming the image is in the assets folder
// @ts-ignore
import backgroundImage from '../../../assets/images/backgroundImage.jpg';
import Colors from "@/constants/Colors";

const Welcome = () => {
    const navigation = useNavigation()
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0);

    useEffect(() => {
        setTimeout(() => {
            scale.value = withSpring(scale.value + 50);
            opacity.value = withSpring(opacity.value + 100);
        }, 100);
        // @ts-ignore
        setTimeout(() => navigation.navigate('login'), 3000); // Navigate to the "login" screen after 2.5 seconds
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />

            {/* Using ImageBackground to set the background image */}
            <ImageBackground source={bg1} style={styles.background}>
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
                        TravelWithUs
                    </Animated.Text>

                    <Animated.Text style={styles.welcomeSubText}>
                        Travel makes one modest
                    </Animated.Text>
                    <ActivityIndicator size="large" color="#fff" style={{ marginTop: 100 }} />
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
        alignItems: 'center',
        // Horizontally center the content
    },
    innerContainer: {
        alignItems: 'center',
    },
    welcomeText: {
        color: 'rgba(39,45,81,0.93)',
        fontWeight: 'bold',
    },
    welcomeSubText: {
        color: Colors.dark,
        fontSize: 20, // Starting font size
    },
});

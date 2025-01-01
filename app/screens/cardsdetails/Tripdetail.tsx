import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Pressable } from '@react-native-material/core';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import Animated, { Easing, FlipInXDown } from 'react-native-reanimated';

type RouteParams = {
  image: string;
  title: string;
};

const TripDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // Typing the route params
  const { image, title } = route.params as RouteParams;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Animated.View
        entering={FlipInXDown.duration(400).easing(Easing.inOut(Easing.quad))}
        style={styles.imageContainer}
      >
        <ImageBackground
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover" // Ensures the image covers the space appropriately
        >
          {/* Optionally add overlay or content */}
        </ImageBackground>
      </Animated.View>

      <Text style={styles.title}>{title}</Text>

      <Pressable onPress={() => navigation.goBack()} style={styles.goBackButton}>
        <Text style={styles.goBackButtonText}>Go Back</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    // Ensure content is vertically centered
    flex: 1, // Full screen

  },
  image: {
    width: '100%',
    height: 300,
    overflow: 'hidden',
    // Updated opacity
  },

  imageContainer: {
    width: widthPercentageToDP('100%'),
    height: 300,
    overflow: 'hidden',
    boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.4)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center', // Ensure title is centered
    color: '#333', // Text color for better readability
  },
  goBackButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#007BFF',
  },
  goBackButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default TripDetail;

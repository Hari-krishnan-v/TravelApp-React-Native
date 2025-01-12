import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Pressable } from '@react-native-material/core';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import Animated, { Easing, FlipInXDown } from 'react-native-reanimated';
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constants/Colors";
import { TabView, SceneMap } from 'react-native-tab-view';

type RouteParams = {
  image: string;
  title: string;
  location: string;
  description: string;
};

const TripDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { image, title, location } = route.params as RouteParams;

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'about', title: 'About' },
    { key: 'review', title: 'Review' },
    { key: 'photo', title: 'Photo' },
    { key: 'video', title: 'Video' },
  ]);

  const renderScene = SceneMap({
    about: AboutScreen,
    review: ReviewScreen,
    photo: PhotoScreen,
    video: VideoScreen,
  });

  // Custom TabBar
  const renderTabBar = (props: any) => (
      <View style={styles.tabBarContainer}>
        {props.navigationState.routes.map((route: any, index: number) => (
            <Pressable
                key={index}
                onPress={() => props.jumpTo(route.key)}
                style={[
                  styles.tabButton,
                  {
                    backgroundColor: index === props.navigationState.index ? Colors.light.primary : 'transparent',
                  },
                ]}
            >
              <Text
                  style={[
                    styles.tabButtonText,
                    {
                      color: index === props.navigationState.index ? Colors.light.icon : 'black',
                    },
                  ]}
              >
                {route.title}
              </Text>
            </Pressable>
        ))}
      </View>
  );

  return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Animated.View entering={FlipInXDown.duration(400).easing(Easing.inOut(Easing.quad))} style={styles.imageContainer}>
          <ImageBackground source={{ uri: image }} style={styles.image} resizeMode="cover">
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 50 }}>
              <Pressable onPress={() => navigation.goBack()} style={styles.goBackButton}>
                <Ionicons name="chevron-back-circle" size={30} color="white" opacity={0.6} />
              </Pressable>
              <Pressable style={[styles.goBackButton, { backgroundColor: 'white', borderRadius: 100 }]}>
                <Ionicons name="bookmark" size={15} color="#F36D72" />
              </Pressable>
            </View>
          </ImageBackground>
        </Animated.View>

        <View style={styles.subContainer}>
          <View style={{paddingHorizontal:30,paddingTop:30}}>
          <Text style={styles.title}>{title}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 10 }}>
            <Ionicons name="location" size={20} color={Colors.light.icon} />
            <Text style={{ fontSize: 15, color: Colors.light.text.grey }}>{location}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10 }}>
            <Text style={{ fontSize: 15, color: Colors.light.text.grey }}>4.8</Text>
            <Ionicons name="star" size={15} color={Colors.light.icon} />
            <Ionicons name="star" size={15} color={Colors.light.icon} />
            <Ionicons name="star" size={15} color={Colors.light.icon} />
            <Ionicons name="star" size={15} color={Colors.light.icon} />
            <Ionicons name="star" size={15} color={Colors.light.icon} />
          </View>
          </View>
          {/* Tab View Component */}
          <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              style={{ marginTop: 30 }}
              onIndexChange={setIndex}
              initialLayout={{ width: widthPercentageToDP('100%') }}
              renderTabBar={renderTabBar} // Use the custom TabBar here
          />
          <Pressable style={styles.button}>
            <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Bold', color: 'white', fontSize: 18 }}>Save a Trip</Text>
          </Pressable>
        </View>
      </View>
  );
};

// Placeholder screens for each tab
const AboutScreen = () => {
  const route = useRoute();
  const { description } = route.params as RouteParams;
  return (
      <View style={styles.tabContainer}>
        <Text style={styles.tabContentHead}>Description</Text>
        <Text style={styles.tabContent}>{description}</Text>
      </View>
  );
};

const ReviewScreen = () => (
    <View style={styles.tabContainer}>
      <Text style={styles.tabContentHead}>User reviews go here.</Text>
    </View>
);

const PhotoScreen = () => (
    <View style={styles.tabContainer}>
      <Text style={styles.tabContentHead}>Gallery of photos from the trip.</Text>
    </View>
);

const VideoScreen = () => (
    <View style={styles.tabContainer}>
      <Text style={styles.tabContentHead}>Videos related to the trip.</Text>
    </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: '100%',
    height: 400,
  },
  imageContainer: {
    width: widthPercentageToDP('100%'),
    height: 400,
  },
  goBackButton: {
    width: 27,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  subContainer: {
    width: '100%',
    height: heightPercentageToDP('60%'),
    backgroundColor: 'white',
    borderRadius: 35,
    position: 'absolute',
    bottom: -10,
    boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    color: Colors.light.text.black,
  },
  tabContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  tabContentHead: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    color: Colors.light.text.black,
  },
  tabContent: {
    fontSize: 14,
    color: Colors.light.text.grey,
    marginTop: 10,
    lineHeight: 25,
  },
  button: {
    height: 48,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    marginBottom:30,
    marginHorizontal:"auto",
    backgroundColor: '#F36D72',
  },
  // Custom TabBar Styles
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth:0.5,
    borderBottomColor: Colors.light.text.grey,
  },
  tabButton: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TripDetail;

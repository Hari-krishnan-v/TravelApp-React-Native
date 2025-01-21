import {View, StyleSheet, TouchableOpacity, ScrollView, Text} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import React, {useState} from "react";
import Colors from "@/constants/Colors";
import {useRoute} from "@react-navigation/native";
import {Pressable} from "@react-native-material/core";
import {SceneMap, TabView} from "react-native-tab-view";
import {heightPercentageToDP as hp, widthPercentageToDP} from "react-native-responsive-screen";
import {cardData} from "@/cardData";
import Cards from "@/components/homeComponents/cards";

// Custom TabBar Component
const CustomTabBar = ({state, descriptors, navigation}) => {
    return (
        <View style={styles.tabBar}>
            {state.routes.map((route, index) => {
                const {options} = descriptors[route.key];
                const isFocused = state.index === index;

                const iconName = route.name === 'home' ? (isFocused ? 'home' : 'home-outline') :
                    route.name === 'newTrip' ? (isFocused ? 'add-circle' : 'add-circle-outline') :
                        route.name === 'search' ? (isFocused ? 'search' : 'search-outline') :
                            route.name === 'explore' ? (isFocused ? 'compass' : 'compass-outline') :
                                'person-circle-outline'; // Default icon for other tabs

                const handlePress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity key={index} style={styles.tabBarItem} onPress={handlePress}>
                        <Ionicons name={iconName} size={28} color={isFocused ? Colors.white : Colors.white}
                                  opacity={isFocused ? 1 : 0.5}/>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const HomeTabView = () => {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        {key: "all", title: 'All'},
        {key: 'popular', title: 'Popular'},
        {key: 'nearby', title: 'Nearby'},
        {key: 'recommended', title: 'Recommended'},
    ]);

    const renderScene = SceneMap({
        all: allRecommendations,
        popular: PopularRecommendations,
        nearby: NearbyRecommendations,
        recommended: RecommendedRecommendations,
    });

    const renderTabBar = (props: any) => (
        <View style={styles.tabBarContainer}>
            {props.navigationState.routes.map((route: any, index: number) => (
                <Pressable
                    key={index}
                    onPress={() => props.jumpTo(route.key)}
                    pressEffect={"none"}
                    style={[
                        styles.tabButton,
                        index === props.navigationState.index
                        ,
                    ]}
                >
                    <Text
                        style={[styles.tabButtonText, {color: index === props.navigationState.index ? Colors.light.icon : 'black',},]}>
                        {route.title}
                    </Text>
                    <View
                        style={[styles.divider, {backgroundColor: index === props.navigationState.index ? Colors.light.icon : 'none',},]}/>

                </Pressable>
            ))}
            {/* Add the divider here based on selected index */}

        </View>
    );

    return (
        <View style={{height: hp("30%")}}>
            <TabView
                navigationState={{index, routes}}
                renderScene={renderScene}
                style={{marginTop: 30, flex: 1, backgroundColor: 'transparent'}}
                onIndexChange={setIndex}
                initialLayout={{width: widthPercentageToDP('100%')}}
                renderTabBar={renderTabBar} // Use the custom TabBar here
            />
        </View>
    );
};

const allRecommendations = () => (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.cardContainer}>
            {cardData.map((data) => (
                <Cards key={data.id} image={data.image} title={data.title} description={data.description}
                       location={data.location}/>
            ))}
        </View>
    </ScrollView>
);

const PopularRecommendations = () => (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.cardContainer}>
            {cardData.map((data) => (
                <Cards key={data.id} image={data.image} title={data.title} description={data.description}
                       location={data.location}/>
            ))}
        </View>
    </ScrollView>
);

const NearbyRecommendations = () => (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.cardContainer}>
            {cardData.map((data) => (
                <Cards key={data.id} image={data.image} title={data.title} description={data.description}
                       location={data.location}/>
            ))}
        </View>
    </ScrollView>
);

const RecommendedRecommendations = () => (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.cardContainer}>
            {cardData.map((data) => (
                <Cards key={data.id} image={data.image} title={data.title} description={data.description}
                       location={data.location}/>
            ))}
        </View>
    </ScrollView>
);
export default CustomTabBar;
export {HomeTabView};

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.black,
        marginHorizontal: 40,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 15,
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.42)',
    },
    tabBarItem: {
        flex: 1,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    tabButton: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: "center",
        gap: 0
    },
    tabButtonText: {
        fontSize: 14,
        fontFamily: "Poppins-Medium",
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,

    },
    divider: {
        height: 2,
        width: 10,
        borderRadius: 50,
    },
});

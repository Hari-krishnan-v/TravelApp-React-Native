import {FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import Colors from "@/constants/Colors";
import {beachtSVG, craterSVG, mountSVG, riverSVG, waterfallSVG} from "@/assets/icons/icons";
import {SvgXml} from "react-native-svg";
import {useNavigation} from "@react-navigation/native";
import {DefaultHeader} from "@/components/homeComponents/header";
import axios from "axios";
import {LinearGradient} from "expo-linear-gradient";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import {Pressable} from "@react-native-material/core";
import Animated, {useAnimatedStyle, useSharedValue, withDelay, withSpring} from "react-native-reanimated";
import {HomeTabView} from "@/components/tabBar";


const SearchScreen = () => {
    const [searchData, setSearch] = React.useState('')
    const [attractions, setAttractions] = useState([])
    const [filteredAttractions, setFilteredAttractions] = useState([]);
    const navigation = useNavigation();
    const translateY = useSharedValue(1000)
    const fetchAttractions = async () => {
        try {
            const response = await axios.get('https://travelwithus.pythonanywhere.com/attraction/attraction/');
            const attractionsData = response.data;
            // const attractionNames = attractionsData.map(attraction => attraction.name);
            setAttractions(attractionsData);
            // setFilteredAttractions(attractionsData);  // Initially, show all attractions
        } catch (error) {
            console.error('Error fetching attractions:', error);
        }
    }
    // console.log(filteredAttractions)
    useEffect(() => {
        translateY.value = 1000;


        fetchAttractions();
    }, []);
    const handleSearch = (text: string) => {
        setSearch(text);

        if (searchData.length > 2) {
            const filtered = attractions.filter(attraction =>
                attraction.name.toLowerCase().includes(searchData.toLowerCase())  // Match search query with attraction names
            );
            if (filtered.length > 0 && searchData.length > 2) {
                translateY.value = withDelay(500, withSpring(0, {damping: 20, stiffness: 100}));
                setFilteredAttractions(filtered);
            }
        } else {
            setFilteredAttractions([]);
            translateY.value = withDelay(500, withSpring(1000, {damping: 20, stiffness: 100}));// If no search query, show all attractions
        }
    };
    const animatedBottomContainerStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateY: translateY.value}],
        };
    });

    // Render each item in the FlatList
    const renderItem = ({item}) => (
        <Pressable style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
            <View style={styles.locationContainer}>
                <Ionicons name={"location"} color={Colors.light.icon} size={15}/>
                <Text>{item.city}</Text>
            </View>
        </Pressable>

    );

    return (
        <View style={styles.container}>
            <LinearGradient style={{position: "absolute", bottom: 0, zIndex: 100, width: "100%", height: hp("20%")}}
                            colors={["rgba(255,255,255,0)", "rgb(255,255,255)"]}/>
            <DefaultHeader title={"Search"}/>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#888" style={styles.searchIcon}/>
                <TextInput
                    placeholder="Search by Attraction Name..."
                    style={styles.searchInput}
                    onChangeText={handleSearch}
                    value={searchData}
                />
            </View>

            <Category/>
            <HomeTabView/>

            <Animated.View style={[styles.BottomContainer, animatedBottomContainerStyle]}>
                {filteredAttractions.length > 0 ?
                    <FlatList
                        data={filteredAttractions}
                        style={{width: "100%"}}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        ListEmptyComponent={<Text style={styles.noResultsText}>No results found</Text>}
                    /> : null}
            </Animated.View>
            {/*<MapView mapType={"satellite"} style={styles.map} />*/}
        </View>
    )
}
export default SearchScreen

const Category = () => {
    const navigation = useNavigation();
    const handleCategoryPress = (categoryTitle) => {
        // @ts-ignore
        navigation.navigate('category', {title: categoryTitle});
    };

    return (
        <View style={{flexDirection: 'column', gap: 20}}>
            <Text style={{fontFamily: 'Poppins-Bold', fontSize: 18, marginHorizontal: 20}}>Category</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={{flexDirection: 'row', gap: 35, paddingLeft: 20}}>

                    {/* Mountain Category */}
                    <TouchableOpacity
                        onPress={() => handleCategoryPress('Mountain Peak')}
                        style={{flexDirection: 'column', gap: 10, justifyContent: 'center', alignItems: 'center'}}
                    >
                        <SvgXml xml={mountSVG}/>
                        <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 12}}>Mountain</Text>
                    </TouchableOpacity>

                    {/* Beach Category */}
                    <TouchableOpacity
                        onPress={() => handleCategoryPress('Beach')}
                        style={{flexDirection: 'column', gap: 10, justifyContent: 'center', alignItems: 'center'}}
                    >
                        <SvgXml xml={beachtSVG}/>
                        <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 12}}>Beach</Text>
                    </TouchableOpacity>

                    {/* Crater Category */}
                    <TouchableOpacity
                        onPress={() => handleCategoryPress('Natural Feature')}
                        style={{flexDirection: 'column', gap: 10, justifyContent: 'center', alignItems: 'center'}}
                    >
                        <SvgXml xml={craterSVG}/>
                        <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 12}}>Crater</Text>
                    </TouchableOpacity>

                    {/* Waterfall Category */}
                    <TouchableOpacity
                        onPress={() => handleCategoryPress('Waterfall')}
                        style={{flexDirection: 'column', gap: 10, justifyContent: 'center', alignItems: 'center'}}
                    >
                        <SvgXml xml={waterfallSVG}/>
                        <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 12}}>Waterfall</Text>
                    </TouchableOpacity>

                    {/* River Category */}
                    <TouchableOpacity
                        onPress={() => handleCategoryPress('River Island')}
                        style={{flexDirection: 'column', gap: 10, justifyContent: 'center', alignItems: 'center'}}
                    >
                        <SvgXml xml={riverSVG}/>
                        <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 12}}>River</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.light.background,
        paddingTop: 30,
        gap: 30
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 10
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 17,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    itemContainer: {
        width: '100%',
        flexDirection: 'column',
        backgroundColor: Colors.light.background,
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 5,
        borderRadius: 10,
    },
    itemText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        color: Colors.light.text.grey,
    },
    noResultsText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: Colors.light.text.grey,
        textAlign: 'center',
        marginTop: 20,
    },
    BottomContainer: {
        position: 'absolute',
        width: '100%',
        height: '65%',
        padding: 20,
        alignItems: "center",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        bottom: 0,
        backgroundColor: "white",
        zIndex: 100,
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.25)',",
    },
    searchInput: {
        flex: 1,  // Make the input take up the remaining space
        fontSize: 16,
        color: '#333',
    },
    searchIcon: {
        marginRight: 8
    },
    locationContainer: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "flex-start"
    }


})

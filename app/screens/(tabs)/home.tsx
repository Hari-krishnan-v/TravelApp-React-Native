import { SafeAreaView, StyleSheet, View, Text, TextInput, ScrollView, RefreshControl, } from 'react-native';
import React, { useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import Cards, { HotelCard } from "@/components/homeComponents/cards";
import MenuItems from "@/components/homeComponents/menuitems";
import Colors from "@/constants/Colors";
import { cardData } from '@/cardData';
import Header from "@/components/homeComponents/header";
import Autocomplete from 'react-native-autocomplete-input';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { Easing, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated";
import {Pressable} from "@react-native-material/core";
import {useNavigation} from "@react-navigation/native";

const Home = () => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [points, setPoints] = React.useState(0);
    const [statusbarbg, setstatusbarbg] = React.useState('rgba(0,0,0,0.0)');
    const [statusColor, setstatusColor] = React.useState('light')
    const [suggestions, setSuggestions] = React.useState([])
    const [search, setSearch] = React.useState('')
    const navigation = useNavigation();


    const slideAnim = useSharedValue(-100);

    useEffect(() => {
        // Trigger the animation on mount

        slideAnim.value = withSpring(0, { duration: 1000, }); // Slide-up effect
    }, []);



    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setPoints(points => points + 1);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
    const Status = false;
    const handleScroll = (event: any) => {
        const yOffset = event.nativeEvent.contentOffset.y;
        if (yOffset > 25) {
            setstatusbarbg('white')
            setstatusColor('dark')
        }
        else {
            setstatusbarbg('rgba(0,0,0,0.0)')
            setstatusColor('light')
        }

    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar  style='dark' backgroundColor={Colors.light.background}/>
            <ScrollView  horizontal={false}
                         onScroll={handleScroll} // Attach the onScroll event handler
                         scrollEventThrottle={16}
                         refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <Animated.View style={{ // Apply fade-in effect
                    transform: [{ translateY: slideAnim }]
                }}>
                    <View>
                        {/*header section*/}
                        <Header/>
                        {/*search option*/}
                        <Pressable style={styles.searchContainer} onPress={() => {
                            // @ts-ignore
                            navigation.navigate('search')

                        }}>
                            <Ionicons name="search-outline" size={24} color="black" />
                            <Text style={styles.searchInput}  >Where to go?"</Text>
                        </Pressable>
                    </View>
                </Animated.View>


                {/*current status*/}

                {
                    Status && (
                        <View style={styles.statusContainer}>
                            <View style={styles.statusRow1}>
                                <Text style={styles.statusRow1Text}>Upcoming</Text>
                                <Text style={styles.statusRow1Text2}>24 March 2024</Text>
                            </View>

                            {/* Status row 2 */}
                            <View style={styles.statusRow2}>
                                <View style={styles.statusRow2container1}>
                                    <Text style={styles.statusRow2container1Text1}>Start At</Text>
                                    <Text style={styles.statusRow2container1Text1}>05:30</Text>
                                </View>
                                <View style={styles.statusRow2container2}>
                                    <Ionicons name="bus" size={30} color="black" />
                                </View>
                                <View style={styles.statusRow2container3}>
                                    <Text>---------------------{'>'} </Text>
                                    <Text style={{ marginLeft: wp(5) }}>10:00</Text>
                                </View>
                                <View style={styles.statusRow2container1}>
                                    <Text style={styles.statusRow2container1Text1}>Start At</Text>
                                    <Text style={styles.statusRow2container1Text1}>05:30</Text>
                                </View>
                                <View style={styles.statusRow2container2}>
                                    <Ionicons name="bus" size={30} color="black" />
                                </View>
                            </View>

                            {/* Status row 3 */}
                            <View style={styles.statusRow3}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Booking ID</Text>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>ZEEBAW</Text>
                            </View>
                        </View>
                    )
                }


                {/*..............menu..............*/}

                <MenuItems />

                {/*..............menu End..............*/}


                <View style={styles.places}>
                    <Text style={{fontFamily:'Poppins-Bold', fontSize: 16, fontWeight: 'bold', color: Colors.light.text.black }}>Let’s Explore Together </Text>
                    <Text style={{color:Colors.light.text.grey}} >See all</Text>
                </View>

                {/*.............cards..............*/}

                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false} >
                    <View
                        style={
                            styles.cardContainer} >
                        {cardData.map((data) => (
                            <Cards
                                key={data.id}
                                image={data.image}
                                title={data.title}
                                description={data.description}
                                location={data.location}
                            />
                        ))}
                    </View>
                </ScrollView>

                {/*.............End cards..............*/}


                <View style={styles.row}>
                    <Text style={{fontFamily:'Poppins-Bold', fontSize: 16, fontWeight: 'bold', color: Colors.dark }}>Hotels recomendation for you</Text>
                    <Text style={{ color: Colors.seeAll }}>See all</Text>
                </View>
                {/*    hotels cards*/}
                <HotelCard />
                <HotelCard />
                <HotelCard />
                <HotelCard />
                <HotelCard />
                <HotelCard />
                <HotelCard />
                <HotelCard />
                <HotelCard />
                <HotelCard />
                <HotelCard />
                <HotelCard />
            </ScrollView>

        </SafeAreaView>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.light.background,
        gap: 10,
    },

    searchContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        width: wp('90%'),
        height: hp('6%'),
        borderRadius: 17,
        padding: wp('2%'),
        marginRight: wp('5%'),
        marginLeft: wp('5%'),
        borderWidth: 1,
        borderColor: '#DFDFDF',
        backgroundColor: '#fff',
        zIndex: 10,
        overflow: 'hidden',
    },
    searchInput: {
        fontSize:14,
        color: Colors.light.text.grey,
        marginLeft: wp('2%'),


        // To add space between icon and input
    },
    statusContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: wp('90%'),
        height: hp('15%'),
        borderRadius: 10,
        padding: wp('3%'),
        marginTop: hp('5%'),
        marginRight: wp('5%'),
        marginLeft: wp('5%'),
        backgroundColor: 'white',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.52)',
    },
    statusRow1: {
        flexDirection: "row",
        alignItems: 'center',
    },
    statusRow1Text: {
        color: 'white',
        fontSize: 8,
        backgroundColor: '#336749',
        padding: wp('1.5%'),
        borderRadius: 20,
        marginLeft: wp('2%'),
    },
    statusRow1Text2: {
        color: 'black',
        fontSize: 10,
        marginLeft: wp('2%'),
    },
    statusRow2: {
        flexDirection: "row",
        alignItems: 'center',
        width: wp('80%'),
        height: hp('5%'),
        marginTop: hp('1%'),
        marginLeft: wp('2%'),
    },
    statusRow2container1: {
        height: hp('6%'),
        width: wp('15%'),
        marginTop: hp('2%'),
    },
    statusRow2container1Text1: {
        color: 'black',
        fontSize: 10,
        marginLeft: wp('2%'),
    },
    statusRow2container2: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: hp('6%'),
        width: wp('15%'),
        marginBottom: hp('1%'),

    },
    statusRow2container3: {
        height: hp('6%'),
        width: wp('25%'),

    },
    statusRow3: {
        height: hp('5%'),
        width: wp('78%'),
        marginTop: hp('1%'),
        marginLeft: wp('3%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    places: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        width: wp('90%'),
        height: hp('5%'),
        marginTop: hp('1%'),
        marginLeft: wp('5%'),
        padding: wp('2%'),
    },
    row: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        width: wp('90%'),
        height: hp('5%'),
        marginTop: hp('2%'),
        marginLeft: wp('5%'),
        padding: wp('2%'),
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp('2%'),
    }

});

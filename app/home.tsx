import { SafeAreaView, StyleSheet, View, Text, TextInput } from 'react-native';
import React from 'react';
import { StatusBar } from "expo-status-bar";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from '@expo/vector-icons/Ionicons';

const Home = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            {/*header section*/}
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <Text style={styles.headerText}>Hi, User</Text>
                    <View style={styles.coins}>
                        <Ionicons name="cash-outline" size={24} color="#FFC107" />
                        <Text style={styles.coinsText}>2.000 points</Text>
                    </View>
                </View>
                <Ionicons name="person-circle" size={50} color="white" />
            </View>

            {/*search option*/}
            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={24} color="black" />
                <TextInput style={styles.searchInput} placeholder="Where to go?" />
            </View>

            {/*current status*/}
            <View style={styles.statusContainer}>
                <View style={styles.statusRow1}>
                    <Text style={styles.statusRow1Text}>Upcoming</Text>
                    <Text style={styles.statusRow1Text2}>24 March 2024</Text>
                </View>

                {/*status row 2*/}
                <View style={styles.statusRow2}>
                    <View style={styles.statusRow2container1}>
                        <Text style={styles.statusRow2container1Text1}>Start At</Text>
                        <Text style={styles.statusRow2container1Text1}>05:30</Text>
                    </View>
                    <View style={styles.statusRow2container2}>
                        <Ionicons name="bus" size={30} color="black" />

                    </View>
                </View>

            </View>
        </SafeAreaView>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#00788A',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: wp('3%'),
        marginTop: hp('5%'),
    },
    userInfo: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        marginRight: wp('2%'),
    },
    coins: {
        display: 'flex',
        flexDirection: 'row',
    },
    coinsText: {
        marginLeft: wp('2%'),
        fontSize: 14,
        color: '#FFC107',
    },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: wp('90%'),
        height: hp('5%'),
        borderRadius: 10,
        padding: wp('2%'),
        marginTop: hp('2%'),
        marginRight: wp('5%'),
        marginLeft: wp('5%'),
        backgroundColor: 'white',
    },
    searchInput: {
        flex: 1,  // This allows the input field to take the remaining space
        height: hp('5%'),
        marginLeft: wp('2%'), // To add space between icon and input
    },
    statusContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: wp('90%'),
        height: hp('15%'),
        borderRadius: 10,
        padding: wp('3%'),
        marginTop: hp('2.5%'),
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
        marginTop: hp('.5%'),
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

    }
});

import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import Ionicons from '@expo/vector-icons/Ionicons';


const MenuItems = () => {
    return (
        <View style={styles.menu}>
            {/*........menu items..........*/}
            <View style={styles.menuitems}>
                <View style={styles.round}>
                    <Ionicons name='airplane-outline' size={24} color="#336749"/>
                </View>
                <Text style={styles.menuText}>Flight</Text>
            </View>
            {/*........menu items..........*/}
            <View style={styles.menuitems}>
                <View style={styles.round}>
                    <Ionicons name='business-outline' size={24} color="#336749"/>
                </View>
                <Text style={styles.menuText}>Hotels</Text>
            </View>
            {/*........menu items..........*/}
            <View style={styles.menuitems}>
                <View style={styles.round}>
                    <Ionicons name='train-outline' size={24} color="#336749"/>
                </View>
                <Text style={styles.menuText}>Train</Text>
            </View>
            {/*........menu items..........*/}
            <View style={styles.menuitems}>
                <View style={styles.round}>
                    <Ionicons name='bus-outline' size={24} color="#336749"/>
                </View>
                <Text style={styles.menuText}>Bus</Text>
            </View>

        </View>
    )
}
export default MenuItems
const styles = StyleSheet.create({
    menu:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: wp('90%'),
        height: hp('5%'),
        padding: wp('2%'),
        marginTop: hp('2.5%'),
        marginRight: wp('5%'),
    },
    menuitems:{
        width: wp('17%'),
        height: hp('5%'),
        padding: wp('2%'),
        marginRight: wp('4%'),
        marginLeft: wp('3%'),
        flexDirection: 'column',

    },
    round:{
        borderRadius: 100,
        backgroundColor: '#ffffff',
        width: wp('12%'),
        height: wp('12%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuText:{
        fontSize:13,
        marginTop:hp('1%'),
        color:'white',
        fontWeight:'bold',
        textAlign:'center',
    }
})

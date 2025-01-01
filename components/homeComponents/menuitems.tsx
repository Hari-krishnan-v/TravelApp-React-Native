import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { aeroplaneSVG, bedSVG, busSVG, trainSVG } from "@/assets/icons/icons";
import { SvgXml } from "react-native-svg";
import { Pressable } from "@react-native-material/core";
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const MenuItems = () => {
    const navigation = useNavigation()

    return (
        <View style={styles.menu}>
            {/*........menu items..........*/}
            <Animated.View style={styles.menuitems}>
                <Pressable style={styles.round}
                    onPress={() => {
                        // @ts-ignore
                        navigation.navigate("flight")
                    }}
                    pressEffect={'ripple'}>
                    <SvgXml xml={aeroplaneSVG} width="25" height="25" />
                </Pressable>
                <Text style={styles.menuText}>Flight</Text>
            </Animated.View>

            {/*........menu items..........*/}
            <View style={styles.menuitems}>
                <Pressable style={styles.round}
                    onPress={() => {
                        navigation.navigate("hotel")
                    }}
                    pressEffect={'ripple'}>
                    <SvgXml xml={bedSVG} width="25" height="25" />
                </Pressable>
                <Text style={styles.menuText}>Hotels</Text>
            </View>

            {/*........menu items..........*/}
            <View style={styles.menuitems}>
                <Pressable style={styles.round}
                    onPress={() => {
                        navigation.navigate("train")
                    }}
                    pressEffect={'ripple'}>
                    <SvgXml xml={trainSVG} width="25" height="25" />
                </Pressable>
                <Text style={styles.menuText}>Train</Text>
            </View>

            {/*........menu items..........*/}
            <View style={styles.menuitems}>
                <Pressable style={styles.round}
                    onPress={() => {
                        navigation.navigate("bus")
                    }}
                    pressEffect={'ripple'}>
                    <SvgXml xml={busSVG} width="25" height="25" />
                </Pressable>
                <Text style={styles.menuText}>Bus</Text>
            </View>

        </View>
    )
}
export default MenuItems
const styles = StyleSheet.create({
    menu: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 40,
        alignItems: 'center',
        width: wp('90%'),
        height: hp('10%'),
        padding: wp('2%'),
        marginTop: 30,
        marginRight: wp('5%'),
        marginLeft: wp('5%'),


    },
    menuitems: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 5,
    },
    round: {
        borderRadius: 20,
        backgroundColor: '#ffffff',
        width: wp('12%'),
        height: wp('12%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: wp('1%'),
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
    },
    menuText: {
        fontSize: 13,
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
    }
})

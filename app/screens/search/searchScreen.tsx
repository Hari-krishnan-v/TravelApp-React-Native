import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import Colors from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const SearchScreen = () => {
    return (
        <View style={styles.container}>
           <View style={styles.header}>
               <Ionicons name='menu' size={45} color={Colors.light.text.grey} />
               <Text style={{fontSize:22,fontWeight:'semibold',color:Colors.light.text.grey,fontFamily:'Poppins-SemiBold'}}>Search</Text>
               <Ionicons name='person-circle' size={45} color={Colors.light.text.grey} />
           </View>
        </View>
    )
}
export default SearchScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.light.background,
        padding: 20,
        paddingTop: 50,
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})

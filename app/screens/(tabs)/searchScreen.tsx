import {ImageBackground, ScrollView, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import Colors from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import {  SearchBar } from "react-native-elements";
import {aeroplaneSVG, beachtSVG, craterSVG, mountSVG, riverSVG, waterfallSVG} from "@/assets/icons/icons";
import {SvgXml} from "react-native-svg";
import {useNavigation} from "@react-navigation/native";
import MapView from 'react-native-maps'

const SearchScreen = () => {
    const [search,setSearch] = React.useState('')
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
           <View style={styles.header}>
               <Ionicons name='menu' size={45} color={Colors.light.text.grey} />
               <Text style={{fontSize:22,fontWeight:'semibold',color:Colors.light.text.grey,fontFamily:'Poppins-SemiBold'}}>Search</Text>
               <Ionicons onPress={() => {
                   // @ts-ignore
                   navigation.navigate("settings")
               }} name='person-circle' size={50} color='darkgray' />
           </View>

            <SearchBar
                placeholder="Type Here..."
                containerStyle={styles.searchContainer}
                inputContainerStyle={{borderRadius:17,backgroundColor:Colors.light.background,}}
                inputStyle={{color:Colors.light.text.grey,}}
                round
                key={0}
                onChangeText={(text) => setSearch(text)}
                value={search}
            />

          <Catgory/>

            {/*<MapView mapType={"satellite"} style={styles.map} />*/}
        </View>
    )
}
export default SearchScreen

const Catgory = () => {
    return (
        <View style={{flexDirection:'column' ,gap:20}}>
            <Text style={{fontFamily:'Poppins-Bold',fontSize:18,marginHorizontal:20}}>Category</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={{flexDirection:'row',gap:35,paddingLeft:20 }}>

                   <View style={{flexDirection:'column',gap:10,justifyContent:'center',alignItems:'center'}}>
                       <SvgXml xml={mountSVG}/>
                       <Text style={{fontFamily:'Poppins-SemiBold',fontSize:12,}}>Mountain</Text>
                   </View>

                    <View style={{flexDirection:'column',gap:10,justifyContent:'center',alignItems:'center'}}>
                       <SvgXml xml={beachtSVG}/>
                       <Text style={{fontFamily:'Poppins-SemiBold',fontSize:12,}}>Beach</Text>
                   </View>

                    <View style={{flexDirection:'column',gap:10,justifyContent:'center',alignItems:'center'}}>
                       <SvgXml xml={craterSVG}/>
                       <Text style={{fontFamily:'Poppins-SemiBold',fontSize:12,}}>Crater</Text>
                   </View>

                    <View style={{flexDirection:'column',gap:10,justifyContent:'center',alignItems:'center'}}>
                       <SvgXml xml={waterfallSVG}/>
                       <Text style={{fontFamily:'Poppins-SemiBold',fontSize:12,}}>Waterfall</Text>
                   </View>

                    <View style={{flexDirection:'column',gap:10,justifyContent:'center',alignItems:'center'}}>
                       <SvgXml xml={riverSVG}/>
                       <Text style={{fontFamily:'Poppins-SemiBold',fontSize:12,}}>River</Text>
                   </View>


                </View>
            </ScrollView>
        </View>
    )}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.light.background,
        paddingTop: 30,
        gap:30
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal:20,
        marginTop:10
    },
    searchContainer: {
        borderRadius:17,
        backgroundColor:Colors.light.background,
        borderWidth:1,
        borderColor:'#DFDFDF',
        marginHorizontal:20
    },
    map:{
        flex:1,
        width:'90%',
        height:'90%',
        marginHorizontal:'auto',
    }
})

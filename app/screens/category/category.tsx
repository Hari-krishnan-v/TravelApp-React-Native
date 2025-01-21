import { ActivityIndicator, FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeadWithBack from "@/components/HeadComponets/headComponent";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import {useAuth} from "@/store/authContext";
import {Pressable} from "@react-native-material/core";


const Category = ({route}) => {
    const { title } = route.params;
    const [data ,setData] = useState([]);
    const[loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { location, locationError } = useAuth()
    const [nearby, setNearby] = useState(null);

    const HandleNearBy= ()=>{
        setNearby(location.region);
    }

    useEffect(() => {
        const fetchData = async () =>{
            try {
                setLoading(true);
                const response = await axios.get(`https://travelwithus.pythonanywhere.com/attraction/attraction/?category=${title}`);
                setData(response.data);
            }catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };
        fetchData();
    }, []);
console.log(data)
    if (loading) {
        return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <HeadWithBack title="catogory" />
            <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%', }}>
                <ActivityIndicator style={{ marginLeft: 50, marginRight: 50, marginBottom: 50 }} size={50} color={'blue'} />
            </View>
        </View>
        )}


    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <HeadWithBack title={title} />
            <Pressable style={styles.dataItem} onPress={() => HandleNearBy()}>
                <Text>NearBy</Text>
            </Pressable>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <View style={styles.dataItem}>
                    <View>
                        <Text>{item.name}</Text>
                    </View>
                </View>
            ) }/>
        </View>
    )
}
export default Category
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        flexDirection: 'column',
    },
    dataItem: {
        marginBottom: 15,
        flexDirection: 'row',
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ddd',
    }
})

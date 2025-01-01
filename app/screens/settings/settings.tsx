import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import { StatusBar } from "expo-status-bar";
import HeadWithBack from "@/components/HeadComponets/headComponent";
import SearchComponent from "@/components/search/search";
import {useAuth} from "@/store/authContext";
import {useNavigation} from "@react-navigation/native";


const Settings = () => {
    const { user, logout } = useAuth();
    const navigation = useNavigation();
    const [search, setSearch] = React.useState('');

    const handleLogout = async () => {
        await logout(); // Logout the user
        navigation.navigate('login'); // Redirect to login screen
    };
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <HeadWithBack title="Settings and Privacy" />
            <SearchComponent placeholder={"Search"} />
            <View>

                <Text>Email: {user.email}</Text>

            </View>
            <TouchableOpacity onPress={handleLogout}>
                <View style={{borderRadius: 10, backgroundColor: 'tomato', padding: 10, marginTop: 20}}>
                    <Text>Logout</Text>
                </View>
            </TouchableOpacity>

        </SafeAreaView>
    )
}
export default Settings
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        flexDirection: 'column',
    },
})

import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import Colors from "@/constants/Colors";



// Custom TabBar Component
// @ts-ignore
const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.tabBar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const iconName = route.name === 'home' ? (isFocused ? 'home' : 'home-outline') :
                    route.name === 'newTrip' ? (isFocused ? 'add-circle' : 'add-circle-outline') :
                        route.name === 'account' ? ('person-circle-outline') : 'person-circle-outline';// Default icon for other tabs (e.g. account)

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
                    <TouchableOpacity
                        key={index}
                        style={styles.tabBarItem}
                        onPress={handlePress}
                    >

                        <Ionicons
                            name={iconName}
                            size={28}
                            color={isFocused ? 'tomato' : 'gray'}
                        />

                        {/*<Text style={[styles.tabBarLabel, { color: isFocused ? 'tomato' : 'gray' }]}>*/}
                        {/*    {options.tabBarLabel}*/}
                        {/*</Text>*/}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default CustomTabBar;

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.white,
        marginHorizontal: 80,
        paddingVertical: 15,
        borderRadius: 35,
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.42)',
    },
    tabBarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,

    },

})

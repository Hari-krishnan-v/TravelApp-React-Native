import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import welcome from "@/app/screens/AuthenticationScreens/welcome";
import home from "@/app/screens/(tabs)/home";
import NewTrip from "@/app/screens/(tabs)/newTrip";
import Account from "@/app/screens/(tabs)/account";
import login from "@/app/screens/AuthenticationScreens/login";
import signup from "@/app/screens/AuthenticationScreens/signup";
import CustomTabBar from "@/components/tabBar";
import TripDetail from "@/app/screens/cardsdetails/Tripdetail";
import settings from "@/app/screens/settings/settings";
import flight from "@/app/screens/flight/flight";
import hotel from "@/app/screens/hotel/hotel";
import train from "@/app/screens/train/train";
import bus from "@/app/screens/bus/bus"; // Import the trip detail screen
import {AuthProvider} from "@/store/authContext";

const Stack = createSharedElementStackNavigator();
const Tab = createBottomTabNavigator();

const _layout = () => {

    const isAuthenticated = true
    const config = {
        animation: 'spring',
        config: {
            stiffness: 1000,
            damping: 500,
            mass: 3,
            overshootClamping: true,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        },
    };
    // Simulate authentication state

        return (
            <AuthProvider>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="welcome" component={welcome} />
                <Stack.Screen name="login" component={login} />
                <Stack.Screen name="register" component={signup} />
                <Stack.Screen name="tabs" component={TabNavigator} initialParams={{ screen: "home" }} />
                <Stack.Screen name="tripDetail" component={TripDetail} options={{ headerShown: false, transitionSpec: { open: config, close: config, }, }} />
                <Stack.Screen name={"settings"} component={settings} options={{ headerShown: false, transitionSpec: { open: config, close: config, }, }} />
                <Stack.Screen name={"flight"} component={flight} options={{ headerShown: false, transitionSpec: { open: config, close: config, }, }} />
                <Stack.Screen name={"hotel"} component={hotel} options={{ headerShown: false, transitionSpec: { open: config, close: config, }, }} />
                <Stack.Screen name={"train"} component={train} options={{ headerShown: false, transitionSpec: { open: config, close: config, }, }} />
                <Stack.Screen name={"bus"} component={bus} options={{ headerShown: false, transitionSpec: { open: config, close: config, }, }} />
            </Stack.Navigator>
            </AuthProvider>
        );

};

const TabNavigator = () => {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />} // Using CustomTabBar
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    return null;
                },
                tabBarActiveTintColor: 'tomato', // Active tab color
                tabBarInactiveTintColor: 'gray', // Inactive tab color
            })}
        >
            <Tab.Screen
                name="home"
                component={home}
                options={{
                    headerShown: false,
                    title: 'Home',
                }}
            />
            <Tab.Screen
                name="newTrip"
                component={NewTrip}
                options={{
                    headerShown: false,
                    title: 'New Trip',
                }}
            />
            <Tab.Screen
                name="account"
                component={Account}
                options={{
                    headerShown: false,
                    title: 'Account',
                }}
            />
        </Tab.Navigator>
    );
};

export default _layout;

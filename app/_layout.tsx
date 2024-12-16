
import { useFonts } from 'expo-font';
import React from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { createStackNavigator } from '@react-navigation/stack';
import welcome from "@/app/welcome";
import home from "@/app/home";

const Stack = createStackNavigator();


// Prevent the splash screen from auto-hiding before asset loading is complete.


export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });


  return (
      <>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="welcome" component={welcome} />
              <Stack.Screen name="home" component={home} />
          </Stack.Navigator>
      </>

  );
}

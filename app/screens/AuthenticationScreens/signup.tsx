import { ImageBackground, StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native';
import { Pressable } from "@react-native-material/core";
import React, { useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Colors from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SvgXml } from 'react-native-svg';
// @ts-ignore
import bg1 from "@/assets/images/bg1.jpg";
// icons
import { googleSVG, facebookSVG, twitterSVG } from "@/assets/icons/icons";
import { registerUserApi } from "@/store/authApi";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from "@/firebaseConfig";
import {router} from "expo-router";

const Signup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [borderColor, setBorderColor] = useState(Colors.dark);
    const navigation = useNavigation();

    const signUp = async () => {
        setLoading(true);
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password)
            if (user) navigation.navigate('tabs');
        } catch (error: any) {
            console.log(error)
            alert('Sign in failed: ' + error.message);
        }
        finally {
            setLoading(false); // Stop loading once the process is complete (success or failure)
        }
    }

    const translateY = useSharedValue(-100);

    useEffect(() => {
        setTimeout(() => {
            translateY.value = withSpring(0); // Smooth spring animation to 0
        }, 100);
    }, []);

    return (
        <ImageBackground source={bg1} style={styles.container}>
            <StatusBar style="dark" />
            <Animated.View style={[styles.mainContainer, { transform: [{ translateY }] }]}>
                <Text style={{ fontSize: 28, fontWeight: "bold", color: Colors.dark }}>
                    Let's
                    <Text style={{ color: Colors.cyan }}> Travel </Text>
                    you
                    <Text style={{ color: Colors.cyan }}> In.</Text>
                </Text>
                <Text style={{
                    fontSize: 20,
                    position: 'relative',
                    width: wp("70%"),
                    color: Colors.dark,
                    marginTop: 10,
                }}>
                    Discover the World with Every Sign In
                </Text>

                <Animated.View style={{
                    flexDirection: 'column',
                    marginTop: hp("3%"),
                    gap: 15,
                }}>
                    <TextInput
                        style={[styles.input, { borderColor: borderColor }]}
                        placeholder={"Email or Phone Number"}
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            setBorderColor(Colors.dark);
                        }}
                    />
                    <TextInput
                        style={[styles.input, { borderColor: borderColor }]}
                        placeholder={"Password"}
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                            setBorderColor(Colors.dark);
                        }}
                        secureTextEntry={true}
                    />
                </Animated.View>
                <Text style={{ fontSize: 14, textAlign: 'right', marginTop: 10 }}>Forget password?</Text>

                {/* Signup button */}
                <Pressable
                    style={{
                        height: 48,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 20,
                        marginBottom: 10,
                        borderRadius: 50,
                        backgroundColor: Colors.cyan,
                        padding: 10,
                    }}
                    onPress={() => {
                        if (!email || !password) {
                            setBorderColor(Colors.error);
                        } else {
                            signUp();
                        }
                    }}>
                    {loading ? (
                        <ActivityIndicator size="small" color={Colors.white} />
                    ) : (
                        <Text style={{
                            color: Colors.white,
                            textAlign: 'center',
                            fontSize: 16
                        }}>
                            Sign Up
                        </Text>
                    )}
                </Pressable>

                <Text style={{ color: Colors.black, textAlign: 'center', marginTop: hp('2%') }}>or sign up with</Text>

                {/* Social icons */}
                <View style={{
                    maxHeight: 56,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 25,
                    marginTop: 20
                }}>
                    <Pressable style={styles.iconBox} onPress={() => {
                        console.log("facebook");
                    }}>
                        <SvgXml xml={facebookSVG} width="40" height="40" />
                    </Pressable>
                    <Pressable style={styles.iconBox} onPress={() => {
                        console.log("google");
                    }}>
                        <SvgXml xml={googleSVG} width="40" height="40" />
                    </Pressable>
                    <Pressable style={styles.iconBox} onPress={() => {
                        console.log("apple");
                    }}>
                        <SvgXml xml={twitterSVG} width="40" height="40" />
                    </Pressable>
                </View>
                <Text style={{
                    textAlign: 'center',
                    marginTop: 30
                }}>I already have an account?</Text>

            </Animated.View>

            {/* Navigation to login page */}
            <Pressable style={styles.subContainer} onPress={() => {
                navigation.navigate('login');
            }}>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 16,
                    color: Colors.cyan,
                }}>Sign in</Text>
            </Pressable>
        </ImageBackground>
    );
};

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        gap: 19,
        backgroundColor: Colors.dark,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        width: wp("90%"),
        maxHeight: hp("65%"),
        marginTop: hp("10%"),
        paddingTop: 25,
        paddingLeft: 25,
        paddingRight: 25,
        backgroundColor: Colors.white,
        borderRadius: 20,
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.35)',
    },
    subContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: wp("90%"),
        maxHeight: hp("5%"),
        backgroundColor: Colors.white,
        borderRadius: 30,
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.35)',
    },
    input: {
        width: wp("78%"),
        height: hp("5%"),
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
    },
    iconBox: {
        width: 75,
        height: 55,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 10px 13px rgba(0, 0, 0, 0.25) , 0px 5px 5px rgba(0, 0, 0, 0.22)',
    }
});

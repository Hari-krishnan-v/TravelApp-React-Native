import { ActivityIndicator, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import { Pressable } from "@react-native-material/core";
import React, { useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Colors from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/store/authContext"; // AuthContext hook
import { googleSVG, facebookSVG, twitterSVG } from "@/assets/icons/icons";
import { SvgXml } from 'react-native-svg';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "@/firebaseConfig";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signInWithEmail, user, loading, error } = useAuth();

    const [borderColor, setBorderColor] = useState(Colors.dark);
    const navigation = useNavigation();
    const translateY = useSharedValue(-100);

    // Handle Sign In Logic
    const signIn = async () => {
        try {
            await signInWithEmail(email, password);
        } catch (error) {
            alert('Sign in failed: ' + error.message);
        }
    };

    // Use `useEffect` to navigate after login or initial render
    useEffect(() => {
        if (user) {
            navigation.navigate('tabs');  // Navigate to tabs once the user is set
        }
    }, [user, navigation]);  // Only run when `user` changes

    useEffect(() => {
        // Animate the translateY value to 0 after 100ms
        setTimeout(() => {
            translateY.value = withSpring(0); // Smooth spring animation to 0
        }, 100);
    }, []);

    return (
        <ImageBackground source={require("@/assets/images/bg1.jpg")} style={styles.container}>
            <StatusBar style="dark" />
            <Animated.View style={[styles.mainContainer, { transform: [{ translateY }] }]}>
                <Text style={{ fontSize: 28, fontWeight: "bold", color: Colors.dark }}>
                    Let's <Text style={{ color: Colors.cyan }}>Travel</Text> you
                    <Text style={{ color: Colors.cyan }}> In.</Text>
                </Text>
                <Text style={{ fontSize: 20, position: 'relative', width: wp("70%"), color: Colors.dark, marginTop: 10 }}>
                    Discover the World with Every Sign In
                </Text>

                <Animated.View style={{ flexDirection: 'column', marginTop: hp("3%"), gap: 15 }}>
                    <TextInput
                        style={[styles.input, { borderColor: borderColor }]}
                        placeholder={"Email or Phone Number"}
                        value={email}
                        onChangeText={(text) => { setEmail(text); setBorderColor(Colors.dark); }}
                    />
                    <TextInput
                        style={[styles.input, { borderColor: borderColor }]}
                        placeholder={"Password"}
                        value={password}
                        onChangeText={(text) => { setPassword(text); setBorderColor(Colors.dark); }}
                        secureTextEntry={true}
                    />
                </Animated.View>

                <Text style={{ fontSize: 14, textAlign: 'right', marginTop: 10 }}>Forget password?</Text>

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
                            signIn();
                        }
                    }}
                >
                    {loading ? <ActivityIndicator size="small" color="white" /> : <Text style={{ color: Colors.white, textAlign: 'center', fontSize: 16 }}>Sign In</Text>}
                </Pressable>

                <Text style={{ color: Colors.black, textAlign: 'center', marginTop: hp('2%') }}>or sign in with</Text>

                <View style={{
                    maxHeight: 56,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 25,
                    marginTop: 20
                }}>
                    <Pressable style={styles.iconBox} onPress={() => console.log("facebook")}>
                        <SvgXml xml={facebookSVG} width="40" height="40" />
                    </Pressable>
                    <Pressable style={styles.iconBox} onPress={() => console.log("google")}>
                        <SvgXml xml={googleSVG} width="40" height="40" />
                    </Pressable>
                    <Pressable style={styles.iconBox} onPress={() => console.log("apple")}>
                        <SvgXml xml={twitterSVG} width="40" height="40" />
                    </Pressable>
                </View>
                <Text style={{ textAlign: 'center', marginTop: 30 }}>I don't have an account?</Text>
            </Animated.View>

            <Pressable style={styles.subContainer} onPress={() => navigation.navigate('register')}>
                <Text style={{ textAlign: 'center', fontSize: 16, color: Colors.cyan }}>Sign Up</Text>
            </Pressable>
        </ImageBackground>
    );
};

export default Login;

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
    }
});

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    // TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    //   CheckBox,
    ImageBackground,
    ActivityIndicator,
    Alert
} from 'react-native';
import TextInput from '../components/TextInput';
import { Checkbox } from 'react-native-paper';
import Background from '../components/Background';
import Button from '../components/Button';
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyle from '../core/Style'
import useAuthStore from '../authStore';
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { mlogin } from "../api/api";
import { nameValidator } from '../helpers/nameValidator';
import Keychain from "react-native-keychain";


import * as SecureStore from 'expo-secure-store';

const LoginScreen = ({ navigation }) => {
    const [checked, setChecked] = useState(false);
    const [email, setEmail] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" });
    const login = useAuthStore((state) => state.login);
    const [loading, setLoading] = useState(false);
    const logout = useAuthStore((state) => state.logout);

    // useEffect(() => {
    //     loadCredentials();
    //   }, []);


    const loadCredentials = async () => {
        try {
            const savedEmail = await SecureStore.getItemAsync("email");
            const savedPassword = await SecureStore.getItemAsync("password");
            const checked = await SecureStore.getItemAsync("rememberMe");

            if (savedEmail && savedPassword && checked === "true") {
                setEmail(savedEmail);
                setPassword(savedPassword);
                setChecked(true);
            }
        } catch (error) {
            console.log("Error loading credentials:", error);
        }
    };



    const onLoginPressed = async () => {

        // logout ();
        console.log("login button pressed");
        setLoading(true);


        // const emailError = emailValidator(email.value);
        const emailError = nameValidator(email.value);
        const passwordError = passwordValidator(password.value);
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });

            setLoading(false);
            return;
        }

        // if (checked) {
        //     await SecureStore.getItemAsync("email", email.value);
        //     await SecureStore.getItemAsync("password", password.value);
        //     await SecureStore.getItemAsync("rememberMe", "true");
        //   } else {
        //     await SecureStore.deleteItemAsync("email");
        //     await SecureStore.deleteItemAsync("password");
        //     await SecureStore.getItemAsync("rememberMe", "false");
        //   }



        try {
            const response = await mlogin(email.value, password.value);
            console.log("login Api", response.data);
            if (response.status === 200) {
                const mockUserData = { id: '123', name: response.data.username };
                const mockToken = response.data.jwtToken;
                await login(mockUserData, mockToken);
                console.log("Login successful!");
            } else {
                console.log("Login failed:", response);
            }
        } catch (error) {
            console.error("Login API Error:", error);
        } finally {
            setLoading(false);
        }



    }
    return (
        <SafeAreaView edges={['left', 'right',]} style={globalstyle.safearea}>
            <Background>
                <View style={styles.container}>

                    <ImageBackground
                        source={require('../../assets/images/topcontainer.png')} // Replace with your gradient image path
                        style={styles.logoContainer}
                        imageStyle={styles.imageBackgroundStyle}
                    >
                        <Image
                            source={require('../../assets/images/AIR_logo_white.png')} // Replace with your logo path
                            style={styles.logo}
                        />
                    </ImageBackground>
                    <View style={styles.formContainer}>
                        <Text style={styles.title}>Log In</Text>
                        <Text style={styles.subtitle}>log in to your account</Text>


                        <View style={styles.inputContainer}>
                            <TextInput
                                label="Email Address"
                                returnKeyType="next"
                                value={email.value}
                                style={styles.input}
                                onChangeText={(text) => setEmail({ value: text, error: "" })}
                                error={!!email.error}
                                errorText={email.error}
                                autoCapitalize="none"
                                autoCompleteType="email"
                                textContentType="emailAddress"
                                keyboardType="email-address"
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                label="Password"
                                returnKeyType="done"
                                value={password.value}
                                style={styles.input}
                                onChangeText={(text) => setPassword({ value: text, error: "" })}
                                error={!!password.error}
                                errorText={password.error}
                                secureTextEntry
                            />
                        </View>
                        <View style={styles.row}>
                            <View style={styles.rememberMeContainer}>
                                <Checkbox.Android
                                    // value={false} 
                                    status={checked ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked(!checked);
                                    }}
                                />
                                <Text style={styles.rememberMeText}>Remember me</Text>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                                <Text style={styles.forgotPasswordText}>Forgot Password</Text>
                            </TouchableOpacity>
                        </View>

                        {loading ? (
                            <ActivityIndicator size="large" color="blue" />
                        ) : (
                            // <Button title="Login" onPress={handleLogin} />

                            <Button style={styles.loginButton} mode="contained" onPress={onLoginPressed}>
                                <Text style={styles.loginButtonText}>Login</Text>
                            </Button>


                        )}



                        <TouchableOpacity>
                            <Text style={styles.signupText}>
                                Don’t have an account? <Text style={styles.signupLink} onPress={() => navigation.replace("RegisterScreen")}>Sign Up</Text>
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Background>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#F5F5F5',
    },


    formContainer: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1C1C1C',
        // textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#7A7A7A',
        // textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 15,
    },
    input: {
        // height: 50,
        borderColor: '',
        // borderWidth: 1,
        // borderRadius: 8,
        // paddingHorizontal: 15,
        backgroundColor: '#FFFFFF',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rememberMeText: {
        fontSize: 14,
        color: '#1C1C1C',
        marginLeft: 5,
    },
    forgotPasswordText: {
        fontSize: 14,
        color: '#B00020',
    },
    loginButton: {
        backgroundColor: '#B00020',
        // height: 50,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 8,
        marginBottom: 20,

    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,

        fontWeight: 'bold',
    },
    signupText: {
        fontSize: 14,
        color: '#7A7A7A',
        textAlign: 'center',
    },
    signupLink: {
        color: '#B00020',
        fontWeight: 'bold',
    },
    logoContainer: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBackgroundStyle: {
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        // marginHorizontal:1,
        overflow: 'hidden',
    },
    logo: {
        width: '90%',
        height: '60%',
        resizeMode: 'contain',
    },
});

export default LoginScreen;

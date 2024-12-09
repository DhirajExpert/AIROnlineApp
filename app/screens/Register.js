import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Linking, Alert } from "react-native";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";
import Background from "../components/Background"
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import Button from "../components/Button";
import { RadioButton, Text, Checkbox } from "react-native-paper";
import {RegisterApi} from "../api/api"

export default function Register({ navigation }) {

    const [name, setName] = useState({ value: "", error: "" });
    const [email, setEmail] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" });

    const [mobno, setMobNo] = useState({ value: "", error: "" });
    const [fullname, setFullName] = useState({ value: "", error: "" });
    const [checked, setChecked] = useState(false);


    const onSubmit = () => {
        if (validateData()) {
            console.log("validate");
            if (checked) {
                console.log("Submit Button clicked");

                RegisterUser()

            } else {
                Alert.alert("Please check i agree...")
            }


        } else {
            console.log("INvalidate");
        }
    };

    const RegisterUser = async () => {
        response = await RegisterApi(name.value,email.value,mobno.value,password.value,fullname.value);
        console.log("Regisyteration Response", response);
    }

    const validateData = () => {
        let isValid = true;

        if (!name.value.trim()) {
            setName({ ...name, error: "Username is required!" });
            isValid = false;
        }

        if (!password.value.trim()) {
            setPassword({ ...password, error: "Password is required!" });
            isValid = false;
        } else if (password.value.length < 6) {
            setPassword({ ...password, error: "Password must be at least 6 characters!" });
            isValid = false;
        }

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!email.value.trim()) {
            setEmail({ ...email, error: "Email is required!" });
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            setEmail({ ...email, error: "Invalid email format!" });
            isValid = false;
        }

        if (!mobno.value.trim()) {
            setMobNo({ ...mobno, error: "Mobile number is required!" });
            isValid = false;
        } else if (!/^\d{10}$/.test(mobno.value)) {
            setMobNo({ ...mobno, error: "Invalid mobile number!" });
            isValid = false;
        }

        if (!fullname.value.trim()) {
            setFullName({ ...fullname, error: "Full name is required!" });
            isValid = false;
        }

        return isValid;
    };

    const handleLinkPress = () => {
        Linking.openURL('https://www.aironline.in/terms-and-conditions.html');
    };
    return (

        <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.safeArea}>
            <Header>Registration</Header>
            <View style={styles.container}>

                <TextInput
                    label="Desire Username"
                    returnKeyType="next"
                    value={name.value}
                    onChangeText={(text) => setName({ value: text, error: "" })}
                    error={!!name.error}
                    errorText={name.error}
                />
                <TextInput
                    label="Password"
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={(text) => setPassword({ value: text, error: "" })}
                    error={!!password.error}
                    errorText={password.error}
                    secureTextEntry
                />
                <TextInput
                    label="Email"
                    returnKeyType="next"
                    value={email.value}
                    onChangeText={(text) => setEmail({ value: text, error: "" })}
                    error={!!email.error}
                    errorText={email.error}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />
                <TextInput
                    label="Mobile No."
                    returnKeyType="next"
                    value={mobno.value}
                    onChangeText={(text) => setMobNo({ value: text, error: "" })}
                    error={!!mobno.error}
                    errorText={mobno.error}
                />
                <TextInput
                    label="Full Name"
                    returnKeyType="next"
                    value={fullname.value}
                    onChangeText={(text) => setFullName({ value: text, error: "" })}
                    error={!!fullname.error}
                    errorText={fullname.error}
                />

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Checkbox.Android
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked);
                        }}
                    />

                    <Text style={styles.label}>
                        I agree to the{' '}
                        <TouchableOpacity onPress={handleLinkPress}>
                            <Text style={styles.linkText}>Terms & Conditions</Text>
                        </TouchableOpacity>
                    </Text>
                </View>

                <Button
                    style={{
                        marginTop: 30
                    }}
                    mode="contained"

                    onPress={() => onSubmit()
                    }
                >
                    Register
                </Button>
            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        marginTop: 4,
    },
    link: {
        fontWeight: "bold",
        color: theme.colors.primary,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        // alignItemsx: 'center',
        // paddingHorizontal: 20,
        flexDirection: "column"
    },
    stepContent: {
        alignItems: 'center',
    },
    safeArea: {
        flex: 1,
        paddingHorizontal: 20,
    },
});
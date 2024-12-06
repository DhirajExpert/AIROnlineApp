import React, { useState,useEffect } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text, Divider,Checkbox } from "react-native-paper";

import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../store/auth/authSlice';
import { saveSecureData, getSecureData, deleteSecureData } from '../utils/secureStorage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [rememberMe, setRememberMe] = useState(false);
  
  //Redux toolkit
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onLoginPressed = async() => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    if (rememberMe) {
      await saveSecureData('email', email.value);
    } else {
      await deleteSecureData('email');
    }
    dispatch(loginRequest())

  };

  useEffect(() => {
    const loadCredentials = async () => {
      const savedEmail = await getSecureData('email');
      if (savedEmail) {
        setEmail((preState)=>({...preState,value:savedEmail}));
        setRememberMe(true);
      }
    };
    loadCredentials();
  }, []);

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome Back!</Header>
    
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
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        right_btn={true}
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <Text style={styles.forgot}>Forgot your password ?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Log in
      </Button>
      <View style={styles.checkboxContainer}>
        <Checkbox
        status={rememberMe ? 'checked' : 'unchecked'}
          onPress={() => {
            setRememberMe(!rememberMe);
          }}
          
          />
        <Text>Remember Me</Text>
      </View>
      <Divider theme={{ colors: { primary: 'green' } }} />
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
          <View style={{ flexDirection: 'row' }}><Text>Don't have an account? </Text><Text style={styles.link}>Sign Up</Text></View>
        </TouchableOpacity>
      </View>
    </Background>
  );
}
const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf:'flex-start',
    marginBottom: 10,
  },
});

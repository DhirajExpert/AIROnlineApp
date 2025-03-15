{/*ForgotPassword/emailaddress */ }

import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert,ActivityIndicator } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import { getOtp } from '../api/api';
import Toast from 'react-native-toast-message';

const ForgotPassword = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState('');
  const [loading,setLoading] = useState(false);

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(input)) {
      setEmailError('');
    } else {
      setEmailError('Please enter a valid email address');
    }
    setEmail(input);
  };

  const SubmitButton = () => {
    if (email) {
      console.log("submit button click");
      forgotPassword();
    }
    else {
      Alert.alert("Please enter email address");
    }
  }
  const forgotPassword = async () => {
    setLoading(true);
    response = await getOtp(email);
    console.log("otp",response.data.data);
    if (response.data.status === 200) {

      setLoading(false);
      if (response.data.data.Success === 'OTP Sent') {
        Toast.show({
          type: 'success',
          text1: 'You will receive an OTP on your registered mobile number and email.',
          visibilityTime: 1000
        });
        navigation.navigate('ForgotOTPpassword', {
          email: email
        })
      }
    }
    else if(response.data.status === 404){
      setLoading(false);

      Toast.show({
        type: 'error',
        text1: response.data.data.message,
        visibilityTime: 1000
      });

    }
    else{
      if(error.response){
        setLoading(false);
      }
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",

        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.staticBackgroundCard}>
          <Image
            source={require('../../assets/images/AIR_logo_white.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.text}>AIROnline</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.heading}>Forgot Password</Text>
          <Text style={styles.subHeading}>Enter Email Address</Text>
          <View style={styles.email}>
            <Icon name="envelope-o" size={20} color="#6c757d" style={styles.icon} />
            <TextInput
              style={styles.emailinput}
              placeholder="example@gmail.com"
              value={email}
              onChangeText={validateEmail}
              keyboardType="email-address"
              placeholderTextColor="#6c757d"
            />
          </View>
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
          <TouchableOpacity>
            <Text style={styles.Text1}>Back to sign in</Text>
          </TouchableOpacity>

          {loading ? (
            <ActivityIndicator size="large" color="blue" />
          ) : (
            <TouchableOpacity style={styles.submitButton} onPress={() => SubmitButton()}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          )}
          <View style={styles.row1}>
            <Text style={styles.text1}>Login with a</Text>
            <TouchableOpacity>
              <Text style={styles.differentmethod}> different method</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row2}>
            <Text style={styles.text1}>Don't have an account?</Text>
            <TouchableOpacity>
              <Text style={styles.resendText1}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  staticBackgroundCard: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "27%",
    backgroundColor: "#1D2542",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logo: {
    width: 120,
    height: 200,
    marginTop: -20,
  },
  text: {
    color: "white",
    fontSize: 25,
    marginTop: -50,
  },
  content: {
    width: "85%",
    alignItems: "center",
    marginTop: 260,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1D2542",
    marginTop: 30,
  },
  subHeading: {
    fontSize: 19,
    textAlign: "center",
    color: "#1D2542",
    marginTop: 40,
    fontWeight: "bold",
  },
  Text1: {
    fontSize: 14,
    color: "#6c757d",
    bottom: -40,

  },
  text1: {
    color: "#1D2542",
    fontSize: 16.5,
  },
  submitButton: {
    width: "60%",
    paddingVertical: 15,
    backgroundColor: "#AB0000",
    borderRadius: 5,
    alignItems: "center",
    bottom: -95,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  row1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 120,
    bottom: -25,
  },
  resendText1: {
    fontSize: 16.5,
    color: "#AB0000",
    textDecorationLine: "underline",
    marginLeft: 5,
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  differentmethod: {
    textDecorationLine: "underline",
    color: "#1D2542",
    fontSize: 16.5,
  },
  emailinput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  email: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
    height: 50,
    top: 15,
  },
  icon: {
    marginRight: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    bottom: -15,
    alignSelf: 'flex-start',
  },
});

export default ForgotPassword;
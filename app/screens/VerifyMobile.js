{/*Login Page-2/Verifyphonenumber*/}

import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';

const VerifyMobile = () => {

         

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
          <Text style={styles.verifyyour}>Verify your</Text>
          <Text style={styles.phonenumber}>phone number</Text>
          <View style={styles.textcontainer}>
            <Text style={styles.Text1}>
              We have sent you an <Text style={styles.boldTextOTP}>One Time Password (OTP)</Text>
            </Text>
            <Text style={styles.Text1}>
              on this mobile number.
            </Text>
          </View>
          <Text style={styles.mobileno}>Enter mobile no.*</Text>
          <View style={styles.mobilenocontainer}>
            <View style={styles.countryCodeBox}>
              <Text>+91</Text>
            </View>
            <TextInput
               style={styles.input}
               keyboardType="numeric"
               secureTextEntry
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.Text1}>Don't have account?</Text>
            <TouchableOpacity>
              <Text style={styles.resendText}>Continue without account</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.getCodeButton}>
            <Text style={styles.getCodeButtonText}>Get Code</Text>
          </TouchableOpacity>
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
  verifyyour: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1D2542",
    marginTop: 30,
    marginRight: 180,
  },
  phonenumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1D2542",
    marginTop: 5,
    marginRight: 130,
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
    color: "#1D2542",
    bottom: -40,
    
  },
  text1 : {
    color: "#1D2542",
    fontSize: 16.5,
  },
  getCodeButton: {
    width: "60%",
    paddingVertical: 15,
    backgroundColor: "#AB0000",
    borderRadius: 5,
    alignItems: "center",
    bottom: -95,
    marginTop: 70,
  },
  getCodeButtonText: {
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
  textcontainer: {
    marginTop: -30,
    
  },
  boldTextOTP: {
    fontWeight: "bold",
    fontSize: 14,    
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    bottom: -60,
  },
  resendText: {
    fontSize: 14,
    color: "#AB0000",
    marginLeft: 5,
    bottom: -40,
  },
  mobileno: {
    color: "#1D2542",
    bottom: -80,
    marginRight: 210,
  },
  mobilenocontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: -90, 
  },
  countryCodeBox: {
    width: '20%', 
    left: -10, 
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  input: {
    width: '70%', 
    left: 5,
    right: 40, 
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },


});

export default VerifyMobile;
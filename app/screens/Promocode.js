import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Linking, Alert } from "react-native"; 
import { RadioButton, Checkbox } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { registerUser } from '../api/api';

export default function Promocode({ navigation, route }){
  

  const { fullname, username, email, mobile, password } = route.params || {};

  const [isChecked, setIsChecked] = useState(false);
  const [promoCode, setPromoCode] = useState({ value: "", error: "" });
  const [seCode, setSECode] = useState({ value: "", error: "" });
  const [couponserialno, setCouponSerialNo] = useState({ value: "", error: "" });
  const [couponcode, setCouponCode] = useState({ value: "", error: "" });
  const [value, setValue] = useState('1');
  const [checked, setChecked] = useState(false);
  const onSignUpPressed = async () => {
  
        console.log("Submit Button clicked");
  
        const response = await registerUser(username, email, mobile, password, fullname, promoCode, seCode, value);
        console.log("Register User", response);
  
  
        if (response.success) {     
         Alert.alert("User Successfully Registered...!")
        
        } else {
          Alert.alert(response.error)
        }
  
  };

  const handleLinkPress = () => {
    Linking.openURL('https://www.aironline.in/terms-and-conditions.html');
  };
  

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.safeArea}>
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
            source={require("../../assets/logo_white.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.Headingtext}>AIROnline</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.subheading1}>Promocode</Text>
          {/* <View style={styles.signupcontainer}>
            <Text style={styles.already}>Already have an account?</Text>
            <TouchableOpacity>
              <Text style={styles.LoginText}>Login Now</Text>
            </TouchableOpacity>
          </View> */}

          <Text style={styles.label1}>Enter Promocode</Text>
          <TextInput 
            style={styles.input1} 
            placeholder="" 
            returnKeyType="next"
            value={promoCode.value}
            onChangeText={(text) => setPromoCode({ value: text, error: "" })}
            error={!!promoCode.error}
            errorText={promoCode.error}
          />
      
          <Text style={styles.label2}>S. E. Code</Text>
          <TextInput 
            style={styles.input2} 
            placeholder="" 
            returnKeyType="next"
            value={seCode.value}
            onChangeText={(text) => setSECode({ value: text, error: "" })}
            error={!!seCode.error}
            errorText={seCode.error}
          />

          <Text style={styles.subheading2}>Agreement</Text>

          <View style={styles.radioContainer}>
            <View style={styles.radioButton}>
              <RadioButton.Android
                value="2"
                status={value === '2' ? 'checked' : 'unchecked'}
                color="#1E6DAD"
                uncheckedColor="#A9A9A9"
                onPress={() => setValue('2')}
              />
              <Text style={styles.radioText}>Activate with coupon details</Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton.Android
                value="1"
                status={value === '1' ? 'checked' : 'unchecked'}
                color="#1E6DAD"
                uncheckedColor="#A9A9A9"
                onPress={() => setValue('1')}
              />
              <Text style={styles.radioText}>Activate with demo coupon</Text>
            </View>
          </View>

          {value === '2' ?
            <View style={styles.couponcontainer}>
              <Text style={styles.label3}>Coupon Serial Number</Text>
              <TextInput style={styles.input3} placeholder="" />
      
              <Text style={styles.label4}>Coupon Code</Text>
              <TextInput style={styles.input4} placeholder="" />
            </View>
          : (null)}

          <View style={styles.checkboxContainer}>
            <Checkbox.Android
              status={isChecked ? "checked" : "unchecked"}
              onPress={() => setIsChecked(!isChecked)}
              color="#B91C1C"
              uncheckedColor="#B91C1C"
            />
            <Text style={styles.agreetext}>I agree in</Text>
            <TouchableOpacity onPress={handleLinkPress}>
              <Text style={styles.termsText}> Terms & Conditions.</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttoncontainer}>
            <TouchableOpacity style={[styles.prevButton]}>
              <Text style={styles.prevText}>❮ PREV</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.registerButton} onPress={onSignUpPressed}>
            <Text style={styles.registerText}>REGISTER</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={[styles.registerButton, { opacity: isChecked ? 1 : 0.5 }]} 
              onPress={() => {
                if (isChecked) {
                  onSignUpPressed();
                }
              }}
              disabled={!isChecked} // Disables the button when isChecked is false
            >
              <Text style={styles.registerText}>REGISTER</Text>
            </TouchableOpacity>

          </View>
          
        </View>

        
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
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
    height: "24%",
    backgroundColor: "#1D2542",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  subheading1: {
    color: "#022555",
    fontSize: 25,
    fontWeight: "bold",
    left: -85,
  },
  subheading2: {
    color: "#022555",
    fontSize: 25,
    fontWeight: "bold",
    left: -85,
    bottom: -35,
  },
  logo: {
    width: 120,
    height: 200,
    marginTop: -20,
  },
  Headingtext: {
    color: "white",
    fontSize: 25,
    marginTop: -50,
  },
  signupcontainer: {
    flexDirection: "row",
    left: -1,
    alignItems: "center",
  },
  already: {
    width: 238,
    height: 18,
    color: "#1D2542",
  },
  content: {
    width: "85%",
    alignItems: "center",
    marginTop: 250,

  },
  LoginText: {
    fontWeight: "bold",
    color: "red",
    textDecorationLine: "underline",
    left: -55,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0F172A", 
    marginBottom: 5,
  },
  input1: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
    bottom: -20,
  },
  input2: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
    bottom: -20,
  },
  input3: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
    bottom: -20,
  },
  input4: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
    bottom: -20,
  },
  label1: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
    color: "#1D2542",
    marginBottom: 5,
    bottom: -20,
    left: 20,
  },
  label2: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
    color: "#1D2542",
    marginBottom: 5,
    bottom: -20,
    left: 20,
  },
  label3: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
    color: "#1D2542",
    marginBottom: 5,
    bottom: -20,
    left: 20,
  },
  label4: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
    color: "#1D2542",
    marginBottom: 5,
    bottom: -20,
    left: 20,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    width: 200,
    bottom: -30,
    left: -70,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioText: {
    fontSize: 10, 
    fontWeight: "bold",
  },
  couponcontainer: {
    bottom: -20,
    width: 350,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    bottom: -30,
    left: -40,
  },
  termsText: {
    fontSize: 14,
    color: "#B91C1C",
    fontWeight: "bold",
  },
  agreetext: {
    color: "black",
    fontWeight: "bold",
    fontSize: 14,
  },
  buttoncontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    bottom: -40,
    marginBottom: 70,
  },
  // button: {
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  //   borderRadius: 8,
  // },
  prevButton: {
    backgroundColor: "#022555",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 8,
    left: -25,
  },
  prevText: {
    color: "white",
    fontWeight: "bold",
  },
  registerButton: {
    backgroundColor: "#AB0000",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
    right: -20,
  },
  registerText: {
    color: "white",
    fontWeight: "bold",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 2,
  },
});
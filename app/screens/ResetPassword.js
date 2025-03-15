{/*Forget Password-3*/ }


import React, { useState, useRef } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { getResetPassword } from '../api/api'
import Toast from 'react-native-toast-message';

const ResetPassword = ({ navigation,route }) => {
  const { email } = route.params;
  const [error, setError] = useState('');
  const [error1, setError1] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const confirmPasswordRef = useRef(null);

  const validatenewpassword = (input) => {
    if (input.length < 8) {
      setError('Password must be at least 8 characters long.');
    } else {
      setError('');
    }
    setNewPassword(input);
    updateButtonState(input, confirm);
  };

  const validateconfirm = (input1) => {
    if (input1 !== newpassword) {
      setError1('Password does not match.');
    } else {
      setError1('');
    }
    setConfirm(input1);
    updateButtonState(newpassword, input1);
  };

  const updateButtonState = (password, confirmPassword) => {
    if (password.length >= 8 && password === confirmPassword) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };
  const onSubmit = async () => {
    console.log("button pressed",newpassword);
    response = await getResetPassword(email, newpassword);
    console.log("getResetPassword", response)
    if (response.data.status === 200) {
    
          if (response.data.data.Success === 'Password Changed') {
            Toast.show({
              type: 'success',
              text1: 'Password reset Successfully..!',
              visibilityTime: 1000
            });
            navigation.navigate('LoginScreen')
          }
    
        }
        else if (response.data.status === 404) {
    
    
          Toast.show({
            type: 'error',
            text1: response.data.message,
            visibilityTime: 1000
          });
        }
         else if (response.data.status === 406) {
    
    
          Toast.show({
            type: 'error',
            text1: response.data.error,
            visibilityTime: 1000
          });
        }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
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
          <Text style={styles.heading}>New Password</Text>
          <Text style={styles.subHeading}>Enter new password</Text>
          <Text style={styles.text1}>New Password</Text>
          <View style={styles.password}>
            <Icon name="lock" size={20} color="#6c757d" style={styles.icon} />
            <TextInput
              style={styles.passwordinput}
              placeholder="At least 8 digits"
              placeholderTextColor="#6c757d"
              value={newpassword}
              onChangeText={validatenewpassword}
              onSubmitEditing={() => confirmPasswordRef.current.focus()}
            />
          </View>
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}
          <Text style={styles.text2}>Confirm Password</Text>
          <View style={styles.confirmpassword}>
            <Icon name="lock" size={20} color="#6c757d" style={styles.icon} />
            <TextInput
              style={styles.confirmpasswordinput}
              placeholder="********"
              placeholderTextColor="#6c757d"
              value={confirm}
              onChangeText={validateconfirm}
              ref={confirmPasswordRef}
              returnKeyType="done"
            />
          </View>
          {error1 ? (
            <Text style={styles.errorText1}>{error1}</Text>
          ) : null}

          <TouchableOpacity style={[styles.submitButton, { opacity: isButtonDisabled ? 0.6 : 1 }]} disabled={isButtonDisabled} onPress={() => onSubmit()}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
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
    marginTop: 40,
  },
  subHeading: {
    fontSize: 14,
    color: "#6c757d",
    marginTop: 10,
  },
  text1: {
    color: "#1D2542",
    fontSize: 15,
    marginTop: 30,
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  text2: {
    color: "#1D2542",
    fontSize: 15,
    marginTop: 20,
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  submitButton: {
    width: "60%",
    paddingVertical: 15,
    backgroundColor: "#AB0000",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 40,
    marginBottom: 50,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  passwordinput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  confirmpasswordinput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  password: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
    height: 50,
    marginTop: 10,
  },
  confirmpassword: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
    height: 50,
    marginTop: 10,
  },
  icon: {
    marginRight: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    bottom: -5,
    alignSelf: 'flex-start',
  },
  errorText1: {
    color: 'red',
    fontSize: 12,
    bottom: -8,
    alignSelf: 'flex-start',
  },
});

export default ResetPassword;
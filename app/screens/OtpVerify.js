import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import OTPInputView from 'react-native-otp-input';

const OtpVerify = () => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);

  const verifyOtp = () => {
    if (otp.length === 4) {
      Alert.alert('OTP Verified', `You entered: ${otp}`);
    } else {
      Alert.alert('Error', 'Please enter a valid 4-digit OTP');
    }
  };

  const resendOtp = () => {
    setTimer(30); 
    Alert.alert('OTP Resent', 'A new OTP has been sent to your number.');
  };

  
  React.useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>Enter the 4-digit code sent to your number</Text>
      <OTPInputView
        style={styles.otpBox}
        pinCount={4}
        code={otp}
        onCodeChanged={setOtp}
        autoFocusOnLoad
        codeInputFieldStyle={styles.otpInputField}
        codeInputHighlightStyle={styles.otpInputHighlight}
      />
      <TouchableOpacity style={styles.button} onPress={verifyOtp}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        {timer > 0 ? (
          <Text style={styles.timerText}>Resend OTP in {timer} seconds</Text>
        ) : (
          <TouchableOpacity onPress={resendOtp}>
            <Text style={styles.resendText}>Resend OTP</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  otpBox: {
    width: '80%',
    height: 100,
    marginBottom: 20,
  },
  otpInputField: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 18,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  otpInputHighlight: {
    borderColor: '#007bff',
  },
  button: {
    width: '80%',
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  timerText: {
    color: '#999',
    fontSize: 14,
  },
  resendText: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default OtpVerify;

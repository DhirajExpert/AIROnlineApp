import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../../store/auth/authSlice';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput, Button, Text } from 'react-native-paper';

export default function SignIn() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <LinearGradient
      colors={['#0055a4', '#003d7e', '#002f4b']} // Adjust colors for matching
      locations={[0.2, 0.6, 1]} // Define transition points
      style={styles.container}

    >
      <View style={styles.formContainer}>
        <Text style={styles.logo}>LOG IN</Text>
        <TextInput
          label="Email"
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          label="Password"
          mode="outlined"
          style={styles.input}
          secureTextEntry
        />
        <Button mode="contained" style={styles.button} onPress={() => dispatch(loginRequest())}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        <Text style={styles.orText}>OR</Text>
        <Button
          icon="google"
          mode="outlined"
          style={styles.googleButton}
          onPress={() => { }}
        >
          Google
        </Button>
        <Text style={styles.signUpText}>
          New Member? <Text style={styles.link}>Sign Up</Text>
        </Text>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#002f4b',
  },
  orText: {
    textAlign: 'center',
    color: 'white',
    marginVertical: 15,
  },
  googleButton: {
    borderColor: '#db4a39',
    borderWidth: 1,
  },
  signUpText: {
    textAlign: 'center',
    marginTop: 15,
    color: 'white',
  },
  link: {
    color: '#00aaff',
  },
});
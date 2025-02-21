import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Linking, Alert } from "react-native";
import { RadioButton, Text, Checkbox } from "react-native-paper";

import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { verifyUser, registerUser } from '../api/api';
import { SafeAreaView } from 'react-native-safe-area-context'



export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const [mobno, setMobNo] = useState({ value: "", error: "" });
  const [fullname, setFullName] = useState({ value: "", error: "" });
  const [promoCode, setPromoCode] = useState({ value: "", error: "" });
  const [seCode, setSECode] = useState({ value: "", error: "" });

  const [couponserialno, setCouponSerialNo] = useState({ value: "", error: "" });
  const [couponcode, setCouponCode] = useState({ value: "", error: "" });

  couponserialno
  couponcode

  const [callingCode, setCallingCode] = useState("91");

  const [step, setStep] = useState(0);
  const [value, setValue] = useState('1');
  const [checked, setChecked] = useState(false);

  const onNextStep1 = () => {
    if (validateStep1()) {
      setStep(step + 1); // Proceed to the next step
    }
    setStep(step + 1);
  };
  // const validateStep1 = () => {
  //   let isValid = true;

  //   if (!name.value.trim()) {
  //     setName({ ...name, error: "Username is required!" });
  //     isValid = false;
  //   }

  //   if (!password.value.trim()) {
  //     setPassword({ ...password, error: "Password is required!" });
  //     isValid = false;
  //   } else if (password.value.length < 6) {
  //     setPassword({ ...password, error: "Password must be at least 6 characters!" });
  //     isValid = false;
  //   }

  //   const emailRegex = /^\S+@\S+\.\S+$/;
  //   if (!email.value.trim()) {
  //     setEmail({ ...email, error: "Email is required!" });
  //     isValid = false;
  //   } else if (!emailRegex.test(email.value)) {
  //     setEmail({ ...email, error: "Invalid email format!" });
  //     isValid = false;
  //   }

  //   if (!mobno.value.trim()) {
  //     setMobNo({ ...mobno, error: "Mobile number is required!" });
  //     isValid = false;
  //   } else if (!/^\d{10}$/.test(mobno.value)) {
  //     setMobNo({ ...mobno, error: "Invalid mobile number!" });
  //     isValid = false;
  //   }

  //   if (!fullname.value.trim()) {
  //     setFullName({ ...fullname, error: "Full name is required!" });
  //     isValid = false;
  //   }

  //   return isValid;
  // };


  const validateStep1 = () => {
    let isValid = true;

    // Validate Name
    if (name.value.trim() === "") {
      setName({ ...name, error: "Name is required." });
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    if (email.value.trim() === "") {
      setEmail({ ...email, error: "Email is required." });
      isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
      setEmail({ ...email, error: "Enter a valid email address." });
      isValid = false;
    }

    return isValid;
  };
  const onNextStep = () => {

    setStep(step + 1);

  };

  const validateFields = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return false;
    }
    return true;
    // setStep(step + 1);


  }

  const onPreviousStep = () => {
    setStep(step - 1);
  };
  const handleLinkPress = () => {
    Linking.openURL('https://www.aironline.in/terms-and-conditions.html');
  };

  const onSignUpPressed = async () => {

    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: "HomeScreen" }],
    // });


    if (value === '1') {
      console.log("1");
    } else {
      console.log("2");
    }
    if (checked) {
      console.log("Submit Button clicked");

      const response = await registerUser(name.value, email.value, mobno.value, password.value, fullname.value, value, couponserialno.value, couponcode.value, checked);
      console.log("Register User", response);


      if (response.success) {     
       Alert.alert("User Successfully Registered...!")
      } else {
        Alert.alert(response.error)
      }

    } else {
      Alert.alert("Please check i agree...")
    }

  };

  const checkUsernameAvailability = async () => {


    const response = await verifyUser(name.value, email.value, mobno.value);
    console.log("verifyuser", response);

    if (response.success) {     
      setName((prev) => ({ ...prev, error: "" }));
    } else {
      setName((prev) => ({ ...prev, error: "Username is already taken" }));
    }
  };

  const checkEmailAvailability = async () => {
    const response = await verifyUser(name.value, email.value, mobno.value);
    console.log("verifyuser", response);

    if (response.success) {     
      setEmail((prev) => ({ ...prev, error: "" }));
    } else {
      setEmail((prev) => ({ ...prev, error: "Email id is already taken" }));
    }
  }
  const checkMobileAvailability = async () => {
    const response = await verifyUser(name.value, email.value, mobno.value);
    console.log("verifyuser", response);

    if (response.success) {     
      setMobNo((prev) => ({ ...prev, error: "" }));
    } else {
      setMobNo((prev) => ({ ...prev, error: "Mobile no is already taken" }));
    }
  }

  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState(false);

  const onNextStepprogress = () => {

    if (validateStep1()) {
      console.log("Validate data")
      setErrors(false);
    } else {
      console.log("In Validate data")
      setErrors(true);
    }
    // if (!isValid) {
    //   setErrors(true); // Show errors if not valid
    // } else {
    //   setErrors(false); // Clear errors if valid
    // }
  };

  return (
    // <Background>
    <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.safeArea}>
      <View style={styles.container}>
        <ProgressSteps activeStep={step}>
          <ProgressStep
            label="Login Info"
            // errors={!validateStep1()}
            // onNext={onNextStep1}
            onNext={onNextStepprogress}
            errors={errors}
            onPrevious={onPreviousStep}
            nextBtnText="Next"
            previousBtnText="Previous"
            removeBtnRow={false}

          >
            <View style={styles.stepContent}>

              <TextInput
                label="Desire Username"
                returnKeyType="next"
                value={name.value}
                onChangeText={(text) => setName({ value: text, error: "" })}
                error={!!name.error}
                errorText={name.error}
                onBlur={checkUsernameAvailability}
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
                onBlur={checkEmailAvailability}
              />
              <TextInput
                label="Mobile No."
                returnKeyType="next"
                value={mobno.value}
                onChangeText={(text) => setMobNo({ value: text, error: "" })}
                error={!!mobno.error}
                errorText={mobno.error}
                onBlur={checkMobileAvailability}
              />
              <TextInput
                label="Full Name"
                returnKeyType="next"
                value={fullname.value}
                onChangeText={(text) => setFullName({ value: text, error: "" })}
                error={!!fullname.error}
                errorText={fullname.error}
              />


            </View>
          </ProgressStep>
          {/* <ProgressStep
            label="Promo Code"
            onNext={onNextStep}
            onPrevious={onPreviousStep}
            nextBtnText="Next"
            previousBtnText="Previous"
          >
            <View style={styles.stepContent}>
              <TextInput
                label="PromoCode"
                returnKeyType="next"
                value={promoCode.value}
                onChangeText={(text) => setPromoCode({ value: text, error: "" })}
                error={!!promoCode.error}
                errorText={promoCode.error}
              />
              <TextInput
                label="S.E. Code"
                returnKeyType="next"
                value={seCode.value}
                onChangeText={(text) => setSECode({ value: text, error: "" })}
                error={!!seCode.error}
                errorText={seCode.error}
              />
            </View>
          </ProgressStep> */}
          <ProgressStep
            label="AGREEMENT"

            finishBtnText="Submit"
            onSubmit={onSignUpPressed}
            // previousBtnText="Previous"
            finishBtnStyle={styles.button}
            finishBtnTextStyle={styles.buttonText}
          >
            <View style={styles.stepContent} >
              <RadioButton.Group
                onValueChange={(newValue) => setValue(newValue)}
                value={value}
              >
                <View style={styles.radioContainer}>
                  <View style={styles.radioItem}>
                    <RadioButton.Android // Use Android style explicitly
                      value="1"
                      status={value === '1' ? 'checked' : 'unchecked'}
                      // onPress={() => setValue('1')}
                      color="#1E6DAD"
                      uncheckedColor="#A9A9A9"
                    />
                    <Text style={styles.label}>Activate with Demo Coupon</Text>
                  </View>
                  <View style={styles.radioItem}>
                    <RadioButton.Android
                      value="2"
                      status={value === '2' ? 'checked' : 'unchecked'}
                      // onPress={() => setValue('2')}
                      color="#1E6DAD"
                      uncheckedColor="#A9A9A9"
                    />
                    <Text style={styles.label}>Activate with Coupon Details</Text>
                  </View>
                </View>


              </RadioButton.Group>
            </View>
            {value === '2' ?

              <View style={styles.stepContent} >
                <TextInput
                  label="Coupon Serial Number"
                  returnKeyType="next"
                  value={couponserialno.value}
                  onChangeText={(text) => setCouponSerialNo({ value: text, error: "" })}
                  error={!!couponserialno.error}
                  errorText={couponserialno.error}
                />
                <TextInput
                  label="Coupon Code"
                  returnKeyType="next"
                  value={couponcode.value}
                  onChangeText={(text) => setCouponCode({ value: text, error: "" })}
                  error={!!couponcode.error}
                  errorText={couponcode.error}
                />
              </View>
              : (null)}
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

          </ProgressStep>
        </ProgressSteps>
      </View>
    </SafeAreaView>

    // </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  stepContent: {
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#007BFF',  // Custom blue color
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    width: 100,
  },
  buttonText: {
    color: '#fff',  // White text
    fontSize: 16,
    fontWeight: 'bold',
  },

  radioContainer: {
    padding: 10,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
  },
});

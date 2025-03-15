// import React, { useState } from "react";
// import { View, StyleSheet, TouchableOpacity, Linking, Alert } from "react-native";
// import { RadioButton, Text, Checkbox } from "react-native-paper";

// import Background from "../components/Background";
// import Logo from "../components/Logo";
// import Header from "../components/Header";
// import Button from "../components/Button";
// import TextInput from "../components/TextInput";
// import BackButton from "../components/BackButton";
// import { theme } from "../core/theme";
// import { emailValidator } from "../helpers/emailValidator";
// import { passwordValidator } from "../helpers/passwordValidator";
// import { nameValidator } from "../helpers/nameValidator";
// import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
// import { verifyUser, registerUser } from '../api/api';
// import { SafeAreaView } from 'react-native-safe-area-context'



// export default function RegisterScreen({ navigation }) {
//   const [name, setName] = useState({ value: "", error: "" });
//   const [email, setEmail] = useState({ value: "", error: "" });
//   const [password, setPassword] = useState({ value: "", error: "" });

//   const [mobno, setMobNo] = useState({ value: "", error: "" });
//   const [fullname, setFullName] = useState({ value: "", error: "" });
//   const [promoCode, setPromoCode] = useState({ value: "", error: "" });
//   const [seCode, setSECode] = useState({ value: "", error: "" });

//   const [couponserialno, setCouponSerialNo] = useState({ value: "", error: "" });
//   const [couponcode, setCouponCode] = useState({ value: "", error: "" });

//   couponserialno
//   couponcode

//   const [callingCode, setCallingCode] = useState("91");

//   const [step, setStep] = useState(0);
//   const [value, setValue] = useState('1');
//   const [checked, setChecked] = useState(false);

//   const onNextStep1 = () => {
//     if (validateStep1()) {
//       setStep(step + 1); // Proceed to the next step
//     }
//     setStep(step + 1);
//   };
//   // const validateStep1 = () => {
//   //   let isValid = true;

//   //   if (!name.value.trim()) {
//   //     setName({ ...name, error: "Username is required!" });
//   //     isValid = false;
//   //   }

//   //   if (!password.value.trim()) {
//   //     setPassword({ ...password, error: "Password is required!" });
//   //     isValid = false;
//   //   } else if (password.value.length < 6) {
//   //     setPassword({ ...password, error: "Password must be at least 6 characters!" });
//   //     isValid = false;
//   //   }

//   //   const emailRegex = /^\S+@\S+\.\S+$/;
//   //   if (!email.value.trim()) {
//   //     setEmail({ ...email, error: "Email is required!" });
//   //     isValid = false;
//   //   } else if (!emailRegex.test(email.value)) {
//   //     setEmail({ ...email, error: "Invalid email format!" });
//   //     isValid = false;
//   //   }

//   //   if (!mobno.value.trim()) {
//   //     setMobNo({ ...mobno, error: "Mobile number is required!" });
//   //     isValid = false;
//   //   } else if (!/^\d{10}$/.test(mobno.value)) {
//   //     setMobNo({ ...mobno, error: "Invalid mobile number!" });
//   //     isValid = false;
//   //   }

//   //   if (!fullname.value.trim()) {
//   //     setFullName({ ...fullname, error: "Full name is required!" });
//   //     isValid = false;
//   //   }

//   //   return isValid;
//   // };


//   const validateStep1 = () => {
//     let isValid = true;

//     // Validate Name
//     if (name.value.trim() === "") {
//       setName({ ...name, error: "Name is required." });
//       isValid = false;
//     }

//     // Validate Email
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
//     if (email.value.trim() === "") {
//       setEmail({ ...email, error: "Email is required." });
//       isValid = false;
//     } else if (!emailRegex.test(email.value.trim())) {
//       setEmail({ ...email, error: "Enter a valid email address." });
//       isValid = false;
//     }

//     return isValid;
//   };
//   const onNextStep = () => {

//     setStep(step + 1);

//   };

//   const validateFields = () => {
//     const nameError = nameValidator(name.value);
//     const emailError = emailValidator(email.value);
//     const passwordError = passwordValidator(password.value);
//     if (emailError || passwordError || nameError) {
//       setName({ ...name, error: nameError });
//       setEmail({ ...email, error: emailError });
//       setPassword({ ...password, error: passwordError });
//       return false;
//     }
//     return true;
//     // setStep(step + 1);


//   }

//   const onPreviousStep = () => {
//     setStep(step - 1);
//   };
//   const handleLinkPress = () => {
//     Linking.openURL('https://www.aironline.in/terms-and-conditions.html');
//   };

//   const onSignUpPressed = async () => {

//     // navigation.reset({
//     //   index: 0,
//     //   routes: [{ name: "HomeScreen" }],
//     // });


//     if (value === '1') {
//       console.log("1");
//     } else {
//       console.log("2");
//     }
//     if (checked) {
//       console.log("Submit Button clicked");

//       const response = await registerUser(name.value, email.value, mobno.value, password.value, fullname.value, value, couponserialno.value, couponcode.value, checked);
//       console.log("Register User", response);


//       if (response.success) {     
//        Alert.alert("User Successfully Registered...!")
//       } else {
//         Alert.alert(response.error)
//       }

//     } else {
//       Alert.alert("Please check i agree...")
//     }

//   };

//   const checkUsernameAvailability = async () => {


//     const response = await verifyUser(name.value, email.value, mobno.value);
//     console.log("verifyuser", response);

//     if (response.success) {     
//       setName((prev) => ({ ...prev, error: "" }));
//     } else {
//       setName((prev) => ({ ...prev, error: "Username is already taken" }));
//     }
//   };

//   const checkEmailAvailability = async () => {
//     const response = await verifyUser(name.value, email.value, mobno.value);
//     console.log("verifyuser", response);

//     if (response.success) {     
//       setEmail((prev) => ({ ...prev, error: "" }));
//     } else {
//       setEmail((prev) => ({ ...prev, error: "Email id is already taken" }));
//     }
//   }
//   const checkMobileAvailability = async () => {
//     const response = await verifyUser(name.value, email.value, mobno.value);
//     console.log("verifyuser", response);

//     if (response.success) {     
//       setMobNo((prev) => ({ ...prev, error: "" }));
//     } else {
//       setMobNo((prev) => ({ ...prev, error: "Mobile no is already taken" }));
//     }
//   }

//   const [isValid, setIsValid] = useState(false);
//   const [errors, setErrors] = useState(false);

//   const onNextStepprogress = () => {

//     if (validateStep1()) {
//       console.log("Validate data")
//       setErrors(false);
//     } else {
//       console.log("In Validate data")
//       setErrors(true);
//     }
//     // if (!isValid) {
//     //   setErrors(true); // Show errors if not valid
//     // } else {
//     //   setErrors(false); // Clear errors if valid
//     // }
//   };

//   return (
//     // <Background>
//     <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.safeArea}>
//       <View style={styles.container}>
//         <ProgressSteps activeStep={step}>
//           <ProgressStep
//             label="Login Info"
//             // errors={!validateStep1()}
//             // onNext={onNextStep1}
//             onNext={onNextStepprogress}
//             errors={errors}
//             onPrevious={onPreviousStep}
//             nextBtnText="Next"
//             previousBtnText="Previous"
//             removeBtnRow={false}

//           >
//             <View style={styles.stepContent}>

//               <TextInput
//                 label="Desire Username"
//                 returnKeyType="next"
//                 value={name.value}
//                 onChangeText={(text) => setName({ value: text, error: "" })}
//                 error={!!name.error}
//                 errorText={name.error}
//                 onBlur={checkUsernameAvailability}
//               />
//               <TextInput
//                 label="Password"
//                 returnKeyType="done"
//                 value={password.value}
//                 onChangeText={(text) => setPassword({ value: text, error: "" })}
//                 error={!!password.error}
//                 errorText={password.error}
//                 secureTextEntry
//               />
//               <TextInput
//                 label="Email"
//                 returnKeyType="next"
//                 value={email.value}
//                 onChangeText={(text) => setEmail({ value: text, error: "" })}
//                 error={!!email.error}
//                 errorText={email.error}
//                 autoCapitalize="none"
//                 autoCompleteType="email"
//                 textContentType="emailAddress"
//                 keyboardType="email-address"
//                 onBlur={checkEmailAvailability}
//               />
//               <TextInput
//                 label="Mobile No."
//                 returnKeyType="next"
//                 value={mobno.value}
//                 onChangeText={(text) => setMobNo({ value: text, error: "" })}
//                 error={!!mobno.error}
//                 errorText={mobno.error}
//                 onBlur={checkMobileAvailability}
//               />
//               <TextInput
//                 label="Full Name"
//                 returnKeyType="next"
//                 value={fullname.value}
//                 onChangeText={(text) => setFullName({ value: text, error: "" })}
//                 error={!!fullname.error}
//                 errorText={fullname.error}
//               />


//             </View>
//           </ProgressStep>
//           {/* <ProgressStep
//             label="Promo Code"
//             onNext={onNextStep}
//             onPrevious={onPreviousStep}
//             nextBtnText="Next"
//             previousBtnText="Previous"
//           >
//             <View style={styles.stepContent}>
//               <TextInput
//                 label="PromoCode"
//                 returnKeyType="next"
//                 value={promoCode.value}
//                 onChangeText={(text) => setPromoCode({ value: text, error: "" })}
//                 error={!!promoCode.error}
//                 errorText={promoCode.error}
//               />
//               <TextInput
//                 label="S.E. Code"
//                 returnKeyType="next"
//                 value={seCode.value}
//                 onChangeText={(text) => setSECode({ value: text, error: "" })}
//                 error={!!seCode.error}
//                 errorText={seCode.error}
//               />
//             </View>
//           </ProgressStep> */}
//           <ProgressStep
//             label="AGREEMENT"

//             finishBtnText="Submit"
//             onSubmit={onSignUpPressed}
//             // previousBtnText="Previous"
//             finishBtnStyle={styles.button}
//             finishBtnTextStyle={styles.buttonText}
//           >
//             <View style={styles.stepContent} >
//               <RadioButton.Group
//                 onValueChange={(newValue) => setValue(newValue)}
//                 value={value}
//               >
//                 <View style={styles.radioContainer}>
//                   <View style={styles.radioItem}>
//                     <RadioButton.Android // Use Android style explicitly
//                       value="1"
//                       status={value === '1' ? 'checked' : 'unchecked'}
//                       // onPress={() => setValue('1')}
//                       color="#1E6DAD"
//                       uncheckedColor="#A9A9A9"
//                     />
//                     <Text style={styles.label}>Activate with Demo Coupon</Text>
//                   </View>
//                   <View style={styles.radioItem}>
//                     <RadioButton.Android
//                       value="2"
//                       status={value === '2' ? 'checked' : 'unchecked'}
//                       // onPress={() => setValue('2')}
//                       color="#1E6DAD"
//                       uncheckedColor="#A9A9A9"
//                     />
//                     <Text style={styles.label}>Activate with Coupon Details</Text>
//                   </View>
//                 </View>


//               </RadioButton.Group>
//             </View>
//             {value === '2' ?

//               <View style={styles.stepContent} >
//                 <TextInput
//                   label="Coupon Serial Number"
//                   returnKeyType="next"
//                   value={couponserialno.value}
//                   onChangeText={(text) => setCouponSerialNo({ value: text, error: "" })}
//                   error={!!couponserialno.error}
//                   errorText={couponserialno.error}
//                 />
//                 <TextInput
//                   label="Coupon Code"
//                   returnKeyType="next"
//                   value={couponcode.value}
//                   onChangeText={(text) => setCouponCode({ value: text, error: "" })}
//                   error={!!couponcode.error}
//                   errorText={couponcode.error}
//                 />
//               </View>
//               : (null)}
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Checkbox.Android
//                 status={checked ? 'checked' : 'unchecked'}
//                 onPress={() => {
//                   setChecked(!checked);
//                 }}
//               />

//               <Text style={styles.label}>
//                 I agree to the{' '}
//                 <TouchableOpacity onPress={handleLinkPress}>
//                   <Text style={styles.linkText}>Terms & Conditions</Text>
//                 </TouchableOpacity>
//               </Text>
//             </View>

//           </ProgressStep>
//         </ProgressSteps>
//       </View>
//     </SafeAreaView>

//     // </Background>
//   );
// }

// const styles = StyleSheet.create({
//   row: {
//     flexDirection: "row",
//     marginTop: 4,
//   },
//   safeArea: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
//   link: {
//     fontWeight: "bold",
//     color: theme.colors.primary,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   stepContent: {
//     alignItems: 'center',
//   },
//   label: {
//     fontSize: 16,
//   },
//   linkText: {
//     color: 'blue',
//     textDecorationLine: 'underline',
//   },
//   button: {
//     backgroundColor: '#007BFF',  // Custom blue color
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 10,
//     width: 100,
//   },
//   buttonText: {
//     color: '#fff',  // White text
//     fontSize: 16,
//     fontWeight: 'bold',
//   },

//   radioContainer: {
//     padding: 10,
//   },
//   radioItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 5,
//   },
//   label: {
//     fontSize: 16,
//     marginLeft: 10,
//   },
// });


import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import { SafeAreaView } from "react-native-safe-area-context";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";
import { verifyUser } from '../api/api';

export default function RegisterScreen({ navigation }){
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [mobno, setMobNo] = useState({ value: "", error: "" });
  const [fullname, setFullName] = useState({ value: "", error: "" });

  const validateName = (name) => {
    if (!name.trim()) return "Name is required.";
    return "";
  };
  
  const validateEmail = (email) => {
    if (!email.trim()) return "Email is required.";
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) return "Invalid email format.";
    return "";
  };
  
  const validatePassword = (password) => {
    if (!password.trim()) return "Password is required.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    return "";
  };

  const validateFullName = (fullname) => {
    if (!fullname.trim()) return "Full name is required.";
    return "";
  };
  
  const validateMobileNumber = (mobno) => {
    if (!mobno.trim()) return "Mobile number is required.";
    const mobRegex = /^[0-9]{10}$/;
    if (!mobRegex.test(mobno)) return "Invalid mobile number.";
    return "";
  };
  
  const validateAllFields = () => {
    const nameError = validateName(name.value);
    const emailError = validateEmail(email.value);
    const passwordError = validatePassword(password.value);
    const fullNameError = validateFullName(fullname.value);
    const mobNoError = validateMobileNumber(mobno.value);
  
    let isValid = true;
  
    if (nameError) {
      setName((prev) => ({ ...prev, error: nameError }));
      isValid = false;
    } else {
      setName((prev) => ({ ...prev, error: "" }));
    }
  
    if (emailError) {
      setEmail((prev) => ({ ...prev, error: emailError }));
      isValid = false;
    } else {
      setEmail((prev) => ({ ...prev, error: "" }));
    }
  
    if (passwordError) {
      setPassword((prev) => ({ ...prev, error: passwordError }));
      isValid = false;
    } else {
      setPassword((prev) => ({ ...prev, error: "" }));
    }
  
    if (fullNameError) {
      setFullName((prev) => ({ ...prev, error: fullNameError }));
      isValid = false;
    } else {
      setFullName((prev) => ({ ...prev, error: "" }));
    }
  
    if (mobNoError) {
      setMobNo((prev) => ({ ...prev, error: mobNoError }));
      isValid = false;
    } else {
      setMobNo((prev) => ({ ...prev, error: "" }));
    }
  
    return isValid;
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

  const onNextButton = async () => {
    console.log("Button Pressed")
    if (!validateAllFields()) {
      console.log("Validation failed. Show errors.");
      return;
    }
  
    console.log("Validation successful! Checking username, email, and mobile availability...");
    const usernameResponse = await verifyUser(name.value, email.value, mobno.value);
    const emailResponse = await verifyUser(name.value, email.value, mobno.value);
    const mobileResponse = await verifyUser(name.value, email.value, mobno.value);
  
    let hasError = false;
  
    if (!usernameResponse.success) {
      setName((prev) => ({ ...prev, error: "Username is already taken" }));
      hasError = true;
    }
  
    if (!emailResponse.success) {
      setEmail((prev) => ({ ...prev, error: "Email ID is already taken" }));
      hasError = true;
    }
  
    if (!mobileResponse.success) {
      setMobNo((prev) => ({ ...prev, error: "Mobile number is already taken" }));
      hasError = true;
    }
  
    if (hasError) {
      console.log("One or more fields are already taken.");
      return;
    }
  
    console.log("All checks passed. Proceeding with signup.");
    navigation.replace("Promocode", {
      fullname: fullname.value,
      username: name.value,
      email: email.value,
      mobile: mobno.value,
      password: password.value,
    });

  };

  return (
    <SafeAreaView edges={['left', 'right']} style={styles.safeArea}>
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
          <Text style={styles.signuptext}>Sign Up</Text>
          <View style={styles.signupcontainer}>
            <Text style={styles.already}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
              <Text style={styles.LoginText}>Login Now</Text>
            </TouchableOpacity>
          </View>
        <Text style={styles.label1}>Name</Text>
          <TextInput 
            style={styles.input1} 
            returnKeyType="next"
            value={fullname.value}
            onChangeText={(text) => setFullName({ value: text, error: "" })}
          />
          {fullname.error ? <Text style={styles.errorText}>{fullname.error}</Text> : null}

          <Text style={styles.label3}>Desired Username</Text>
          <TextInput 
            style={styles.input3} 
            returnKeyType="next"
            value={name.value}
            onChangeText={(text) => setName({ value: text, error: "" })}
            onBlur={checkUsernameAvailability}
          />
          {name.error ? <Text style={styles.errorText}>{name.error}</Text> : null}


          <Text style={styles.label2}>Email Address</Text>
          <TextInput 
            style={styles.input2} 
            keyboardType="email-address" 
            returnKeyType="next"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: "" })}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            onBlur={checkEmailAvailability}
          />
          {email.error ? <Text style={styles.errorText}>{email.error}</Text> : null}
          

          <Text style={styles.mobileno}>Enter mobile no.</Text>
          <View style={styles.mobilenocontainer}>
            <View style={styles.countryCodeBox}>
              <Text>+91</Text>
            </View>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              returnKeyType="next"
              value={mobno.value}
              onChangeText={(text) => setMobNo({ value: text, error: "" })}
              onBlur={checkMobileAvailability}
            />
            
          </View>
          {mobno.error ? <Text style={styles.errorText}>{mobno.error}</Text> : null}

          <Text style={styles.label4}>Password</Text>
          <TextInput 
              style={styles.input4} 
              secureTextEntry={!isPasswordVisible}
              returnKeyType="done"
              value={password.value}
              onChangeText={(text) => setPassword({ value: text, error: "" })}
          />
          <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={styles.icon}
          >
            <Ionicons 
                name={isPasswordVisible ? "eye" : "eye-off"} 
                size={24} 
                color="gray" 
            />
          </TouchableOpacity>
          {password.error ? <Text style={styles.errorText}>{password.error}</Text> : null}
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity 
            style={styles.signupbutton} 
            onPress={() => onNextButton()} >
            <Text style={styles.signnowtext}>SIGN UP NOW</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Googlebutton}>
            <Image
              source={require("../../assets/images/google_icon.png")}
              style={styles.googleimage}
            />
            <Text style={styles.googletext}>CONTINUE WITH GOOGLE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.promocontainer}>
          <Text style={styles.promocodetext}>Have a Promocode?</Text>
          <TouchableOpacity>
            <Text style={styles.ClickHereText} >Click Here!</Text>
          </TouchableOpacity>
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
  safeArea: {
    flex: 1,
    paddingHorizontal: 2,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    // marginTop: 3,
    // marginLeft: 5,
    bottom: -10,
    left: -90,
  },
  
  staticBackgroundCard: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "17%",
    backgroundColor: "#1D2542",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  signuptext: {
    color: "#022555",
    fontSize: 25,
    fontWeight: "bold",
    left: -110,
  },
  logo: {
    width: 120,
    height: 200,
    marginTop: -40,
  },
  image: {
    width: 88,
    height: 31,
    resizeMode: "contain",
    left: -115,
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
  promocontainer: {
    flexDirection: "row",
    left: -1,
    alignItems: "center",
    marginBottom: 20,
  },
  promocodetext: {
    width: 238,
    height: 18,
    color: "#1D2542",
    right: -40,
  },
  content: {
    width: "85%",
    alignItems: "center",
    marginTop: 170,

  },
  phonenumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1D2542",
    marginTop: 5,
    marginRight: 130,
  },
  mobileno: {
    color: "#1D2542",
    bottom: -20,
    marginRight: 210,
    fontWeight: "bold",
    fontSize: 16,
    left: 15,
  },
  mobilenocontainer: {
    flexDirection: "row",
    alignItems: "center",
    bottom: -30,
    left: -5,
  },
  countryCodeBox: {
    width: 65,
    left: 2,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    top: -12,
    height: 45,
  },
  input: {
    width: "80%",
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
    bottom: -5,
    right: -10,
    top: -5,
  },
  LoginText: {
    fontWeight: "bold",
    color: "red",
    textDecorationLine: "underline",
    left: -55,
  },
  ClickHereText: {
    fontWeight: "bold",
    color: "red",
    textDecorationLine: "underline",
    left: -55,
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
    bottom: -25,
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
    bottom: -25,
    left: 20,
  },
  buttons: {
    marginTop: 80,
    top: -40,
  },
  Googlebutton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    width: 270,
    bottom: -15,
  },
  googletext: {
    color: "#1E1E1E",
    fontSize: 13.5,
    fontWeight: "bold",
    right: -10,
  },
  googleimage: {
    // left: -10,
    width:30,
    height:30
  },
  signupbutton: {
    backgroundColor: "#AB0000", 
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: "center",
    width: 270,
  },
  signnowtext: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    position: "absolute",
    right: 10, 
    bottom: 0,
  },
});
 {/*ForgotPassword2 */}

 import React, { useState, useEffect, useRef } from 'react';
 import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
 
 const ForgotOTPPassword = () => {
   const [code, setCode] = useState(Array(6).fill(""));
   const [timer, setTimer] = useState(180);
 
   const inputsRef = useRef([]);
 
   useEffect(() => {
     const interval = setInterval(() => {
       if (timer > 0) {
         setTimer(timer - 1);
       }
     }, 1000);
 
     return () => clearInterval(interval);
   }, [timer]);
 
   const formatTime = () => {
     const minutes = Math.floor(timer / 60);
     const seconds = timer % 60;
     return (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
   };
 
   const handleInputChange = (value, index) => {
     const newCode = [...code];
     newCode[index] = value;
 
     if (value && index < inputsRef.current.length - 1) {
       inputsRef.current[index + 1].focus();
     }
 
     setCode(newCode);
   };
 
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
           <Text style={styles.subHeading}>
             Enter the code from the SMS we sent to{" "}
             <Text style={styles.email}>example@gmail.com</Text>
           </Text>
 
           <Text style={styles.timer}>{formatTime()}</Text>
 
           <View style={styles.otpContainer}>
             {code.map((digit, index) => (
               <TextInput
                 key={index}
                 style={styles.otpInput}
                 keyboardType="numeric"
                 maxLength={1}
                 value={digit}
                 onChangeText={(value) => handleInputChange(value, index)}
                 ref={(el) => (inputsRef.current[index] = el)}
               />
             ))}
           </View>
 
           <View style={styles.row}>
             <Text style={styles.Text1}>I didn't receive any code.</Text>
             <TouchableOpacity>
               <Text style={styles.resendText}>RESEND</Text>
             </TouchableOpacity>
           </View>
 
           <TouchableOpacity style={styles.submitButton}>
             <Text style={styles.submitButtonText}>Submit</Text>
           </TouchableOpacity>
 
           <View style={styles.row1}>
             <Text style={styles.text1}>Login with a  </Text>
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
     fontSize: 22,
     fontWeight: "bold",
     color: "#1D2542",
     marginTop: 45,
   },
   subHeading: {
     fontSize: 14,
     textAlign: "center",
     color: "#6c757d",
     marginTop: 10,
   },
   email: {
     fontWeight: "bold",
     color: "#23416A",
   },
   timer: {
     fontSize: 18,
     fontWeight: "bold",
     color: "#FF0000",
     marginTop: 20,
     bottom: -25,
   },
   otpContainer: {
     flexDirection: "row",
     justifyContent: "space-between",
     width: "100%",
     marginTop: 20,
     bottom: -30,
   },
   otpInput: {
     width: 50,
     height: 50,
     borderWidth: 1,
     borderColor: "red",
     borderRadius: 5,
     textAlign: "center",
     fontSize: 18,
     backgroundColor: "#ffffff",
   },
   row: {
     flexDirection: "row",
     alignItems: "center",
     justifyContent: "center",
     marginTop: 20,
   },
   Text1: {
     fontSize: 14,
     color: "#6c757d",
     bottom: -35,
   },
   text1 : {
     color: "#1D2542",
     fontSize: 16.5,
   },
   resendText: {
     fontSize: 14,
     color: "#AB0000",
     marginLeft: 5,
     bottom: -35,
   },
   submitButton: {
     width: "60%",
     paddingVertical: 15,
     backgroundColor: "#AB0000",
     borderRadius: 5,
     alignItems: "center",
     // marginTop: 30,
     bottom: -75,
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
     marginTop: 90,
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
     marginTop: 50,
   },
   differentmethod: {
     textDecorationLine: "underline",
     color: "#1D2542",
     fontSize: 16.5,
   }
 });
 
 export default ForgotOTPPassword;
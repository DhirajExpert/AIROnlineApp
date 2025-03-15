import React, { useState, useCallback, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput,
    Modal,
    ImageBackground
} from 'react-native';

import { Checkbox } from 'react-native-paper';
import Background from '../components/Background';
import Button from '../components/Button';
import { SafeAreaView } from "react-native-safe-area-context";
import globalstyle from '../core/Style'
import { AntDesign, MaterialIcons, FontAwesome } from 'react-native-vector-icons';
import { theme } from "../core/theme";
import Textarea from 'react-native-textarea';
import { ScrollView } from 'react-native-gesture-handler';


export default function Feedback() {
    const textareaRef = useRef(null);
    const [rating, setRating] = useState(0);
    const [text, setText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const textInputRef = useRef(null);

    const filteriButton = () => {

    };
    const ratingCompleted = (rating) => {
        console.log("ratingCompleted", rating);

    }

    const handleRatingPress = (value) => {
        setRating(value);
        console.log('Selected Rating:', value);
    };

    const onChange = () => {

    }
    const privacyPolicy = () => {

    }
    const helpCenter = () => {
        console.log("Click helpCenter");
    }
    const sendFeedback = () => {
        console.log("Click sendFeedback");
        // setModalVisible(true)

        if (textInputRef.current) {
            textInputRef.current.focus();
          }
    }

    return (
        <SafeAreaView edges={['left', 'right', 'bottom']} style={globalstyle.safearea}>
            <Background>
                <ScrollView>
                <View style={styles.container}>

                    <ImageBackground
                        source={require('../../assets/images/topcontainer.png')} // Replace with your gradient image path
                        style={styles.logoContainer}
                        imageStyle={styles.imageBackgroundStyle}
                    >
                        <Image
                            source={require('../../assets/images/AIR_logo_white.png')} // Replace with your logo path
                            style={styles.logo}
                        />
                    </ImageBackground>
                    <View style={styles.formContainer}>
                        <Text style={styles.title}>Please provide your valuable feedback</Text>

                        <View style={{ paddingVertical: 25 }}>
                            <Text style={styles.emaillabel}>Email Address <Text style={{ fontWeight: '400' }}>(optional)</Text></Text>
                            <View style={styles.searchBarContainer}>

                                <AntDesign name="mail" size={24} color={theme.colors.lightgray} style={styles.searchBarIcon} />
                                <TextInput
                                    style={styles.searchBarInput}
                                    placeholder="Enter text to search"
                                    returnKeyType="done"
                                // placeholderTextColor="#A9A9A9"
                                />
                            </View>
                        </View>

                        <View >
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: '#1C1C1C',
                                // textAlign: 'center',
                                paddingHorizontal: 20
                            }} allowFontScaling={false}>Rate your experiennce</Text>
                            <View style={styles.ratingBarContainer}>

                                {[1, 2, 3, 4, 5].map((star) => (
                                    <TouchableOpacity key={star} onPress={() => handleRatingPress(star)}>
                                        <FontAwesome
                                            name={star <= rating ? 'star' : 'star-o'}
                                            size={60}
                                            color={star <= rating ? 'gold' : 'gray'}
                                            style={styles.star}
                                        />
                                    </TouchableOpacity>
                                ))}

                            </View>
                            {/* <Text style={styles.text}>Rating: {rating}</Text> */}
                        </View>

                        <View >
                            <Text style={styles.emaillabel}>Got suggestion? We’d love to hear them!<Text style={{ fontWeight: '400' }}>(optional)</Text></Text>
                            <Textarea
                                ref={textInputRef}
                                containerStyle={styles.textareaContainer}
                                style={styles.textarea}
                                onChangeText={onChange}
                                defaultValue={text}
                                maxLength={120}
                                placeholder='Enter feedback'
                                placeholderTextColor={'#c7c7c7'}
                                underlineColorAndroid={'transparent'}
                            />


                            {/* </View> */}
                        </View>
                        <View style={styles.feedbackrowContainer}>
                            <View style={styles.feedbackrow}>
                                <TouchableOpacity onPress={() => privacyPolicy()}>
                                    <Text style={styles.forgotPasswordText}>Privacy Policy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => helpCenter()}>
                                    <Text style={styles.forgotPasswordText}>Help Center</Text>
                                </TouchableOpacity>
                            </View>
                            <Button style={styles.feedbackButton} mode="contained" onPress={() => sendFeedback()} >
                                <Text style={styles.loginButtonText}>Send Feedback</Text>
                            </Button>
                        </View>


                    </View>

                </View>
                </ScrollView>
                <Modal
                    transparent={true}
                    visible={modalVisible}
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={styles.closeButton}
                            >
                                <Text style={styles.buttonText}>X</Text>
                            </TouchableOpacity>
                            <Image source={require('../../assets/images/feedback_ok.png')} />
                            <Text style={styles.thankyoulabel}>Thank You</Text>
                            <Text style={styles.modalText}>By making your voice heard, you
                                help us improve <Text style={styles.aironlinelabel}>AIROnline.</Text></Text>
                            
                        </View>
                    </View>
                </Modal>
            </Background>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#F5F5F5',
    },


    formContainer: {
        flex: 1,
        // padding: 20,
        paddingVertical: 20,
        //  alignItems: 'center'
        paddingHorizontal: 30
    },
    title: {
        fontSize: 17,
        fontWeight: '500',
        color: '#1C1C1C',
        // textAlign: 'center',
    },

    emaillabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1C1C1C',
        // textAlign: 'center',
        paddingHorizontal: 20
    },
    subtitle: {
        fontSize: 14,
        color: '#7A7A7A',
        // textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 15,
    },
    input: {
        // height: 50,
        borderColor: '#D9D9D9',
        // borderWidth: 1,
        // borderRadius: 8,
        // paddingHorizontal: 15,
        backgroundColor: '#FFFFFF',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: 20,
    },


    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rememberMeText: {
        fontSize: 14,
        color: '#1C1C1C',
        marginLeft: 5,
    },
    forgotPasswordText: {
        fontSize: 14,
        color: '#B00020',
    },
    // feedbackrowContainer: {
    //     flexDirection: 'row',
    //     // justifyContent: 'space-between',
    //     // alignItems: 'center',
    //     // marginBottom: 20
    //     paddingHorizontal: 30
    // },
    // feedbackrow: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-evenly',
    //     alignItems: 'center',
    //     // marginBottom: 20,
    //     width: '50%'

    // },
    // feedbackButton: {
    //     backgroundColor: theme.colors.blue,
    //     // height: 50,
    //     width: '50%',
    //     justifyContent: 'flex-end',
    //     // alignItems: 'center',
    //     // alignSelf: 'center',
    //     borderRadius: 8,
    //     // marginBottom: 20,

    // },


    feedbackrowContainer: {
        flexDirection: 'row',
        paddingHorizontal: 30,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },

    feedbackrow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },

    feedbackButton: {
        backgroundColor: theme.colors.blue,
        width: '100%',
        justifyContent: 'center',
        borderRadius: 8,
        marginTop: 20,
    },

    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,

        fontWeight: 'bold',
    },
    signupText: {
        fontSize: 14,
        color: '#7A7A7A',
        textAlign: 'center',
    },
    signupLink: {
        color: '#B00020',
        fontWeight: 'bold',
    },
    logoContainer: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBackgroundStyle: {
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        // marginHorizontal:1,
        overflow: 'hidden',
    },
    logo: {
        width: '90%',
        height: '60%',
        resizeMode: 'contain',
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
        marginVertical: 10,

    },
    textAreaContainer: {
        // flexDirection: 'row',
        // alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        paddingHorizontal: 10,
        // paddingVertical: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
        marginVertical: 10,
        // height:'15%'

    },

    ratingBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'rgba(255, 255, 255, 0.1)',

        marginTop: 10,
        // borderRadius: 5,
        // paddingHorizontal: 10,
        // paddingVertical: 10,
        margin: 20,

        justifyContent: 'center',


    },
    searchBarIcon: {
        marginRight: 10,
    },
    searchBarInput: {
        flex: 1,
        fontSize: 14,
        color: '#333',
    },
    textAreaInput: {
        // flex: 1,
        fontSize: 14,
        color: '#333',
    },

    searchBarIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    star: {
        marginHorizontal: 5,
    },
    text: {
        marginLeft: 20,
        fontSize: 16,
        color: 'black',
    },
    textareaContainer: {
        padding: 5,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
        marginVertical: 10
    },
    textarea: {
        textAlignVertical: 'top',
        fontSize: 14,
        color: '#333',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },

    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '75%',
        alignItems: 'center',
        position: 'relative',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: '400',
        paddingHorizontal:20

    },
    closeButton: {
        position: 'absolute',
        top: 10, 
        right: 10, 
        backgroundColor: theme.colors.red,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 50, 
        zIndex: 10, 
      },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    thankyoulabel: {
        color: theme.colors.red,
        fontSize: 26,
        fontWeight: '400'
    },
    aironlinelabel: {
        fontSize: 15,
        color: theme.colors.red,
        fontWeight: '400'
    }



});

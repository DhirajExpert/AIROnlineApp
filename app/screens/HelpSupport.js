import React, { useState } from "react";
import { StyleSheet, View, Text, Alert, TouchableOpacity, ImageBackground, Image, StatusBar } from 'react-native'

import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../core/theme";
import globalcss from "../core/Style";
import Background from "../components/Background";
import { FontAwesome, MaterialIcons } from "react-native-vector-icons"
import { List } from "react-native-paper";
import { Linking } from 'react-native'

export default function HelpSupport() {
    const [expanded, setExpanded] = useState(true);

    const handlePress = (accordionId) => {
        setExpanded(expanded === accordionId ? null : accordionId);
    };

    const [data, setData] = useState([
        {
            id: '1',
            question: 'What is React Native?',
            answers: ['React Native is a framework for building mobile apps.'],
        },
        {
            id: '2',
            question: 'What is JSX?',
            answers: ['JSX is a syntax extension for JavaScript. It is used with React to describe the UI.'],
        },
        {
            id: '3',
            question: 'What is State?',
            answers: ['State is an object used to store data that influences the component rendering.'],
        },
    ]);

    //   setData((prevData) => [
    //     ...prevData,
    //     {
    //       id: '4',
    //       question: 'What is a Component?',
    //       answers: ['A component is a building block of React applications.'],
    //     },
    //   ]);

    const tncClick = ()=>{
        Alert.alert("t & c Click");
    }
    return (
        <SafeAreaView edges={["bottom", "left", "right"]} style={globalcss.safearea}>
            <Background>
                <View style={styles.container}>
                    {/* <StatusBar hidden={true} /> */}

                    <ImageBackground
                        source={require('../../assets/images/topcontainer.png')} // Replace with your gradient image path
                        style={styles.logoContainer}
                        imageStyle={styles.imageBackgroundStyle}
                    >
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <View style={{ flexDirection: 'row',justifyContent:'flex-start' }}>
                                <Image source={require('../../assets/images/headphone.png')} style={styles.logo}></Image>
                                <Text style={styles.titleText}>Help & Support</Text>
                            </View>
                            <View style={{ flexDirection: 'row',justifyContent:'space-between' }}>
                                <Image source={require('../../assets/images/tnc.png')} style={[styles.logo,]}></Image>
                                <Image source={require('../../assets/images/close.png')} style={[styles.logo]}></Image>
                            </View>
                        </View>
                    </ImageBackground>
                    <View style={{ paddingHorizontal: '10%', paddingVertical: '2%' }}>
                        <View style={styles.searchBarContainer}>
                            <View style={styles.innerCircle}>
                                <MaterialIcons name="call" size={24} color={theme.colors.lightblue} />
                            </View>
                            <View style={{ paddingHorizontal: '5%' }}>
                                <Text style={styles.customerservicelabel}>
                                    Our 24x7 Customer Service
                                </Text>
                                <TouchableOpacity onPress={() => Linking.openURL(`tel:${'8380-005-660'}`)}>
                                    <Text style={styles.calllabel}>
                                        +91-8380-005-660
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.searchBarContainer}>
                            <View style={styles.innerCircle}>
                                <MaterialIcons name="mail" size={24} color={theme.colors.lightblue} />
                            </View>
                            <View style={{ paddingHorizontal: '5%' }}>
                                <Text style={styles.customerservicelabel}>
                                    Write us at
                                </Text>
                                <TouchableOpacity onPress={() => Linking.openURL('mailto:helpdesk.aironline@gmail.com')}>
                                    <Text style={styles.calllabel}>
                                        helpdesk.aironline@gmail.com
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.faqlabel}>Frequently Asked Questions</Text>
                        <View >
                            <List.Section>
                                {data.map((item) => (
                                    <List.Accordion
                                        key={item.id}
                                        title={item.question}
                                        expanded={expanded === item.id}
                                        onPress={() => handlePress(item.id)}
                                        style={styles.accordion}
                                        titleStyle={styles.accordionTitle}
                                    >
                                        {item.answers.map((answer, index) => (
                                            <List.Item key={index}
                                                // title={answer}
                                                style={styles.listItem}
                                                titleStyle={styles.itemTitle}
                                                description={item.answers}
                                            />
                                        ))}
                                    </List.Accordion>
                                ))}
                            </List.Section>
                        </View>
                    </View>
                </View>
            </Background>

        </SafeAreaView>
    )
}
export const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        paddingHorizontal: '10%',
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
        marginVertical: 10,
        // justifyContent:"center"
    },
    searchBarInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    logoContainer: {
        height: 100,
        justifyContent: 'center',
        // paddingHorizontal: '20%'
    },
    imageBackgroundStyle: {
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        // marginHorizontal:1,
        overflow: 'hidden',
    },
    logo: {
        // width: '90%',
        height: '80%',
        resizeMode: 'contain',
        
    },
    thumbnail: {
        height: 50,
        width: 50,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #333',
        borderRadius: '50%',
        backgroundColor: '#d9d9d9',

    },

    innerCircle: {
        width: 50,
        height: 50,
        borderRadius: '50%',
        backgroundColor: '#CEEBFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    customerservicelabel: {
        fontSize: 14,
        fontWeight: 400
    },
    calllabel: {
        fontSize: 14,
        fontWeight: 600,
        color: theme.colors.lightblue
    },
    faqlabel: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.blue,
        paddingHorizontal: '5%',
        paddingVertical: '5%'
    },
    accordion: {
        backgroundColor: '#FFFFFF',
        borderBottomColor: theme.colors.lightgray,
        borderBottomWidth: 1
    },
    accordionTitle: {
        color: '#959595',
        fontSize: 14,
        fontWeight: '400',
    },
    listItem: {
        backgroundColor: '#F5F5F5',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    itemTitle: {
        color: '#787878',
        fontSize: 12,
    },
    titleText: {
        fontSize: 20,
        fontWeight: '600',
        color: theme.colors.white,
        // justifyContent: "flex-start"
    }

});
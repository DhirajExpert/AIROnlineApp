import React from "react";
import { View, Text, TouchableOpacity, Linking, StyleSheet, Image, FlatList,Dimensions } from "react-native";
import { MaterialIcons } from "react-native-vector-icons";
import { theme } from "../core/theme";
import {
    useFonts,
    DMSans_400Regular,
    DMSans_400Regular_Italic,
    DMSans_500Medium,
    DMSans_500Medium_Italic,    
    DMSans_700Bold,
    DMSans_700Bold_Italic,
  } from '@expo-google-fonts/dm-sans';
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "../components/Background";
import { ScrollView } from "react-native-gesture-handler";
  const { width } = Dimensions.get('window');
  



export default function AboutUs() {
    const iconSize = width > 600 ? 60 : 40;

    let [fontsLoaded] = useFonts({
        DMSans_400Regular,
        DMSans_400Regular_Italic,
        DMSans_500Medium,
        DMSans_500Medium_Italic,
        DMSans_700Bold,
        DMSans_700Bold_Italic,
      });

    const features = [
        "Unparalleled Coverage: Access in-depth reports of cases from all High Courts and the Supreme Court.",
        "Seamless Accessibility: Choose your preferred format - print, CD-ROM, or our comprehensive online database.",
        "Unwavering Accuracy: Rely on our meticulous editorial process for reliable and trustworthy legal resources.",
        "Unbeatable Value: Get the information you need at economical prices, ensuring inclusivity in legal research.",
        "Pioneering Legacy: We take pride in our first-mover advantage, including the first pan-India Law Reports publication.",
        "Constant Innovation: AIR keeps pace with the evolving legal landscape, offering cutting-edge e-publications and databases.",
        "Unmatched Expertise: Explore our range of exclusive and unique publications, including AIR Manuals, Digests, ready reckoner, and insightful Commentaries.",
    ];
    return (
    <SafeAreaView edges={["left","right"]} style={styles.safearea}>
        <Background>
            {/* <ScrollView> */}
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between', alignItems: 'center',
                }}>
                    <Image
                        source={require('../../assets/images/air_label_new.png')}
                        style={styles.logo1}
                    />
                    <Text style={styles.airlabel}>
                        AIR<Text style={styles.airsublabel}>Online</Text>
                    </Text>
                    <Image
                        source={require('../../assets/images/air_logo_blue.png')}
                        style={styles.logo1}
                        accessibilityLabel="AIR Logo"
                    />
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start', alignItems: 'center', paddingVertical: '2%'
                }}>
                    <View style={{}}>
                        <Text style={styles.text}>Version</Text>
                        <Text style={styles.text}>0000.00.1</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>Powered By</Text>
                        <Text style={styles.text}>AIR</Text>
                    </View>
                </View>

                <Text style={styles.text}>About Company</Text>
                <Text style={styles.companytext}>ALL INDIA REPORTER PVT. LTD.</Text>
                <Text style={styles.companyinfo}>Established in 1914, All India Reporter (AIR) is India's leading law publisher, 100+ Years Strong</Text>
                <Text style={styles.companyinfo}>We take pride in empowering lawyers, judges and legal academics with:</Text>
                <FlatList
                    data={features}
                    scrollEnabled={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <Text style={styles.companyinfo}>{`  \u2022`}{item}</Text>}
                />
                <Text style={styles.bottomline}>The treasure house of case law since 1914</Text>

            </View>

            <Text style={styles.socialText}>Check our Social Media</Text>
            <View style={styles.socialRow}>
                <TouchableOpacity>
                    <Image source={require('../../assets/icons/instagram.png')} style={[styles.socialIcon, { width: iconSize, height: iconSize }]} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../../assets/icons/facebook.png')} style={[styles.socialIcon, { width: iconSize, height: iconSize }]} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../../assets/icons/telegram.png')} style={[styles.socialIcon, { width: iconSize, height: iconSize }]} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../../assets/icons/whatsapp.png')} style={[styles.socialIcon, { width: iconSize, height: iconSize }]} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../../assets/icons/linkedin.png')} style={[styles.socialIcon, { width: iconSize, height: iconSize }]} />
                </TouchableOpacity>
            </View>
        </View>
        {/* </ScrollView> */}
        </Background>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        
        paddingHorizontal: '5%'

    },
    safearea:{
        flex: 1,
    },
    searchBarContainer: {
        // height:500,


        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        paddingHorizontal: '5%',
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
        marginVertical: 10,
        // justifyContent:"center"
    },
    logo: {
        width: '30%',
        height: '100%',
        resizeMode: 'contain',
    },
    logo1: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
    },

    airlabel: {
        fontSize: 22,
        fontWeight: 500,
        
        color: theme.colors.red
    },
    airsublabel: {
        fontSize: 22,
        fontWeight: 500,
        
        color: theme.colors.blue
    },
    text: {
        fontSize: 16,
        fontWeight: 400,
        color: '#787878',
        padding: 5,
        fontFamily:'DMSans_400Regular'
    },
    companytext: {
        fontSize: 16,
        fontWeight: 600,
        color: theme.colors.red,
        padding: 5,
        fontFamily: 'DMSans_700Bold'
    },
    companyinfo: {
        fontSize: 10,
        fontWeight: 400,
        textAlign:'justify',
        color: '#787878',
        fontFamily:'DMSans_400'
    },
    bottomline: {
        fontSize: 16,
        fontWeight: 600,
        color: '#787878',
        marginTop: '5%',
        fontFamily: 'DMSans_600Bold'
        
    },
    socialText: {
        textAlign: 'center',
        fontSize: 16,
        marginVertical: 16,
        color:'#787878',
        fontFamily: 'DMSans_400Regular,'
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    socialIcon: {
        width: 40,
        height: 40,
    },

})
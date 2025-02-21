import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image,Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "../components/Background";
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
const { width } = Dimensions.get('window');


const data1 = [
    { id: '1', name: 'Facebook', path: require('../../assets/icons/facebook.png') },
    { id: '2', name: 'Whatsapp', path: require('../../assets/icons/whatsapp.png') },
    { id: '3', name: 'Instagtam', path: require('../../assets/icons/instagram.png') },
    { id: '4', name: 'Twitter', path: require('../../assets/icons/twitter.png') },
    { id: '5', name: 'Telegram', path: require('../../assets/icons/telegram.png') },
    { id: '6', name: 'Email', path: require('../../assets/icons/mail.png') },
];
const numColumns = 3;
export default function SocialShare() {
    const iconSize = width > 600 ? 60 : 40;
    let [fontsLoaded] = useFonts({
            DMSans_400Regular,
            DMSans_400Regular_Italic,
            DMSans_500Medium,
            DMSans_500Medium_Italic,
            DMSans_700Bold,
            DMSans_700Bold_Italic,
          });


    const itemclick = (id) => {
        console.log("itemclick", id);
        switch (id) {
            case '1':
                console.log("Click",id);
                break;
            case '2':
                console.log("Click",id);
                break;
            case '3':
                console.log("Click",id);
                break;
            case '4':
                console.log("Click",id);
                break;
            case '5':
                console.log("Click",id);
                break;
            case '6':
                console.log("Click",id);
                break;
            default:
        }

    }

    const renderGridData = ({ item }) => {
        return (
            <View style={styles.gridItem}>
                <TouchableOpacity onPress={() => itemclick(item.id)}>
                    <View style={{ alignContent: 'center', alignItems: 'center' }}>
                        <Image source={item.path} style={[styles.socialIcon, { width: iconSize, height: iconSize }]} resizeMode='contain' />
                        <Text style={styles.itemText}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.safearea}>

            <Background>
                <View style={styles.container}>
                    <Text style={styles.headerlabel}>Share this app <Text style={{fontFamily:'DMSans_700Bold'}}>invite link </Text>on any of these </Text>
                    <FlatList
                        data={data1}
                        renderItem={({ item }) => renderGridData({ item })}
                        keyExtractor={(item) => item.id}
                        numColumns={numColumns}
                        contentContainerStyle={styles.grid}
                        scrollEnabled={false}
                    />
                </View>
            </Background>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    safearea: {
        flex: 1
    },
    container: {

    },
    gridItem: {
        flex: 1,
        margin: "4%",
        aspectRatio: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    itemText: {
        color: theme.colors.black,
        fontSize: 10,
        fontWeight: '500',
        margin: 5,
        fontFamily:'DMSans_400Bold'
    },
    socialIcon: {
        width: 40,
        height: 40,
    },
    headerlabel:{
        textAlign:'center',
        color:theme.colors.red,
        paddingVertical:'10%',
        fontFamily:'DMSans_500Medium'
    }

})
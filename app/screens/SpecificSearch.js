import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from "react-native";
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
    { id: '1', name: 'Citaion Search', path: require('../../assets/images/search/citation.png') },
    { id: '2', name: 'Nominal Search', path: require('../../assets/images/search/nominal.png') },
    { id: '3', name: 'Judgement Date', path: require('../../assets/images/search/judgementdate.png') },
    { id: '4', name: 'Bench Strength', path: require('../../assets/images/search/benchstrength.png') },
    { id: '5', name: 'Court Search', path: require('../../assets/images/search/court.png') },
    { id: '6', name: 'Judges Search', path: require('../../assets/images/search/judges.png') },
    { id: '7', name: 'Topical Search', path: require('../../assets/images/search/topical.png') },
    { id: '8', name: 'Lawyer Search', path: require('../../assets/images/search/lawyer.png') },
];
const numColumns = 4;
export default function SpecificSearch({navigation}) {
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
               
                navigation.navigate('CitationSearch1');
                break;
            case '2':
                navigation.navigate('NominalSearch');
                break;
            case '3':
                navigation.navigate('JudgementDate');
                break;
            case '4':
                navigation.navigate('BenchStrength');
                break;
            case '5':
                navigation.navigate('BrowseByCourt');
                break;
            case '6':
                navigation.navigate('BrowseByJudge');
                break;
            case '7':
                navigation.navigate('TopicalSearch');
                break;
            case '8':
                navigation.navigate('BrowseByLawyer');
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
        <SafeAreaView edges={['left', 'right']} style={styles.safearea}>

            <Background>
                <View style={styles.container}>
                    <Text style={styles.headerlabel}>Specific Search </Text>
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
        margin: "2.5%",
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
        color: theme.colors.blue,
        fontSize: 10,
        fontWeight: '500',
        margin: 5,

        fontFamily: 'DMSans_400Bold'
    },
    socialIcon: {
        width: 40,
        height: 40,
        padding: 3
    },
    headerlabel: {
        textAlign: 'center',
        color: theme.colors.red,
        paddingVertical: '10%',
        fontSize: 22,
        fontFamily: 'DMSans_700Bold'
    }

})
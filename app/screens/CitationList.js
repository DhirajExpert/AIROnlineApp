import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text ,TouchableOpacity,Alert} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Header from "../components/Header";
import globalstyle from '../core/Style'
// import Icon from "react-native-vector-icons/FontAwesome"
import { getCitation } from '../api/api'
export default function CitationList({ navigation ,route }) {
    const [citaionResponse, setCitaionResponse] = useState([]);


    const { journal, year, segment, court, page } = route.params;

     useEffect(() => {
        const getCitationList = async () => {
            response = await getCitation(journal, year, segment, court, page);
            console.log("citationlist", response);
            setCitaionResponse(response.citationList);
        }
        getCitationList();
    }, []);
   
    
    const handleCitationClick = (citationID,citationName) => {
        // Alert.alert('Citation Clicked', `You clicked on ${citationName}`);
        
        navigation.navigate('Judgement', {
            citationID: citationID,
            citationName: citationName,
          })
      };
    return (

        <SafeAreaView edges={['bottom', 'left', 'right']} style={globalstyle.safearea}>
            {/* <Header>Citation List </Header> */}
            <View style={styles.container}>
                {/* <TextInput
                    label="Search By Court"
                    value={name.value}
                    onChangeText={(text) => setName({ value: text, error: "" })}
                    error={!!name.error}
                    errorText={name.error}

                    left={<TextInput.Icon icon="calendar" />}
                // right={<TextInput.Icon icon="eye" />}
                /> */}
                {/* <Icon name="calendar" size={16} color="black" /> */}
                {/* </TextInput> */}

                {/* <Button
                    mode="contained"
                    style={{ marginTop: 30 }}>
                    Search
                </Button> */}
                <FlatList
                    data={citaionResponse}
                    renderItem={({ item }) =>
                    (
                        <View style={styles.item}>
                            <TouchableOpacity onPress={() => handleCitationClick(item.citationID,item.citationName)}>
                                <Text style={styles.citationName}>
                                    {item.citationName}
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles.detail}>{item.nominal}</Text>
                            <Text style={styles.detail}>{item.topic}</Text>
                        </View>)
                    }
                    keyExtractor={item => item.citationID}
                />

            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    safearea: {
        flex: 1,
        paddingHorizontal: 20,
    },
    container: {
        flex: 1,
        justifyContent: "flex-start",
        flexDirection: "column"

    },
    item: {
        backgroundColor: '#d9dedb',
        padding: 20,
        marginVertical: 8,
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    detail: {
        fontSize: 14,
    },
    citationName: {
        fontSize: 16,
        color: 'blue', // Styling to show that it's clickable
        textDecorationLine: 'underline',
      },
});
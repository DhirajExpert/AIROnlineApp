import react, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { SelectList } from 'react-native-dropdown-select-list'
import Button from "../components/Button";
import TextInput from "../components/TextInput";

export default function BrowseByLawyer({ navigation }) {
    const [selected, setSelected] = useState("");
    const [name, setName] = useState({ value: "", error: "" });

    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);


    const SubmitButton = async (lawyerName) => {

        if (lawyerName === "") {
            Alert.alert("Please enter some content to search in legal database");
        } else {
            
                    navigation.navigate('BrowseByLawyerDetails', {
                        lawyerName: lawyerName,
                    });
                }      
        }
    
    return (
        <SafeAreaView style={styles.safearea} edges={["bottom", "left", "right"]}>
            <Header>Browse By Bench</Header>
            <View style={styles.container}>

                <TextInput
                    label="Search By Lawyer"
                    value={name.value}
                    onChangeText={(text) => {
                        setName({ value: text, error: "" })
                    }
                    }
                    style={styles.input}
                    error={!!name.error}
                    errorText={name.error}

                // left={<TextInput.Icon icon="calendar"  />}

                />

                <Button
                    style={{ marginTop: 30 }}
                    mode="contained"
                    onPress={() => SubmitButton(name.value)

                    }
                >
                    Search
                </Button>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safearea: {
        flex: 1,
        paddingHorizontal: 20
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        // alignItemsx: 'center',
        // paddingHorizontal: 20,
        flexDirection: "column"
    },

});
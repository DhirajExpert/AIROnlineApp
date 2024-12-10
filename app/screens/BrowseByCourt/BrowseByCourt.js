import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Text, Alert, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Checkbox } from 'react-native-paper';


import { getCourtList } from '../../api/api';
export default function BrowseByCourt({ navigation }) {
    const [name, setName] = useState({ value: "", error: "" });
    const [checkedItems, setCheckedItems] = useState([]);
    const [courtName, setCourtName] = useState([]);

    useEffect(() => {
        const courtList = async () => {
            response = await getCourtList();
            console.log("getCourtList", response)
            if (response.err_code === 'success') {
                const transformedData = response.courtName.map((item, index) => ({
                    id: String(index + 1),
                    label: item,
                }));
                setCourtName(transformedData);
            }
        }
        // courtList();
    }, []);

    const courtSearchApi = async (name) => {
        response = await getCourtList(name)
        if (response.err_code === 'success') {
            const transformedData = response.courtName.map((item, index) => ({
                id: String(index + 1),
                label: item,
            }));
            setCourtName(transformedData);
        }
    }
    const onPressCourt = async (courtValue) => {
        console.log("court click", courtValue);
        navigation.navigate('CourtDigestView', {
            courtlist: courtValue
        })
    }


    const toggleCheckbox = (id) => {
        setCheckedItems((prevCheckedItems) =>
            prevCheckedItems.includes(id)
                ? prevCheckedItems.filter((item) => item !== id)
                : [...prevCheckedItems, id]
        );
    };

    const printCheckedItems = () => {
        const selectedItems = courtName.filter((item) => checkedItems.includes(item.id));
        console.log("datavalue", selectedItems);

        if (selectedItems.length == 0) {
            Alert.alert("please select any 1 court");
        } else {
            navigation.navigate('CourtDigestView', {
                courtlist: selectedItems.map(item => item.label)
            })
        }
    };
    return (

        <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.safearea}>
            <Header>Search By Court</Header>
            <View style={styles.container}>
                <TextInput
                    label="Search By Court"
                    value={name.value}
                    onChangeText={(text) => {
                        setName({ value: text, error: "" })
                        courtSearchApi(text)
                    }
                    }
                    style={styles.input}
                    error={!!name.error}
                    errorText={name.error}

                // left={<TextInput.Icon icon="calendar"  />}

                />
                {/* <Icon name="calendar" size={16} color="black" /> */}
                {/* </TextInput> */}

                {/* <Button
                    mode="contained"
                    onPress={() => courtSearchApi(name.value)}
                >Search</Button> */}
                {/* multiple selection of court Logic */}
                {/* <ScrollView>
                    {courtName.map((item) => (
                        <Checkbox.Item
                            key={item.id}
                            label={item.label}
                            status={checkedItems.includes(item.id) ? 'checked' : 'unchecked'}
                            onPress={() => toggleCheckbox(item.id)}
                            mode="android"
                        />
                    ))}
                </ScrollView> */}
                {/* <ScrollView> */}
                <FlatList
                    data={courtName}
                    keyExtractor={index => index.id}
                    renderItem={({ item, index }) => (
                        <View style={styles.flatlistView}>
                            <TouchableOpacity onPress={() => onPressCourt(item.label)}>

                                <Text>{item.label}</Text>

                            </TouchableOpacity>
                        </View>
                    )}
                />
                {/* </ScrollView> */}

                {/* <Button mode="contained" onPress={printCheckedItems}> Submit</Button> */}


            </View>
            <View>

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
    input: {
        backgroundColor: 'white', // Optional: to set the background color
    },
    flatlistView: {
        padding: 15,
        backgroundColor: '#dddddd',
        margin: 5,
        borderRadius: 10
    }
});
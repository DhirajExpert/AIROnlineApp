import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
// import CheckBox from '@react-native-community/checkbox';
import { FlatList, Switch, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import CheckBox from "expo-checkbox";
import { getJudgesList } from "../api/api";
import { RadioButton, Checkbox } from "react-native-paper";

export default function BrowseByJudge({ navigation }) {
    const [name, setName] = useState({ error: "", value: "" });
    const [filteredData, setFilteredData] = useState([]);

    const [selectedItems, setSelectedItems] = useState([]);
    const [value, setValue] = useState('1');

    const handleSelect = (item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter((i) => i !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }

    };

    const handleSearch = async (text) => {
        // setQuery(text);
        setName({ value: text, error: "" });
        await JudgesSearch(text);
    };

    const JudgesSearch = async (word) => {
        const response = await getJudgesList(word);
        setFilteredData(response.judgeName);
        //   if (word.length > 0) {   
        const filtered = response.judgeName.filter((item) =>
            item.toLowerCase().includes(word.toLowerCase())
        );
        setFilteredData(filtered);
        //   } else {
        //     setFilteredData([]);
        //   }
    }
    const onsubmit = () => {
        navigation.navigate('BrowseByJudgeDetails', {
            judgesname: selectedItems,
            flag: value
        })
    }
    return (
        <SafeAreaView edges={["bottom", "left", "right"]} style={styles.safearea}>
            <Header>Browse By Judge</Header>
            <View style={styles.container}>
                <TextInput
                    label="Search for hon'ble Judge"
                    value={name.value}
                    onChangeText={
                        handleSearch
                    }
                    error={!!name.error}
                    errorText={name.error}
                />
                <FlatList
                    data={filteredData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <CheckBox
                                value={selectedItems.includes(item)}
                                onValueChange={() => handleSelect(item)}
                            />
                            <TouchableOpacity onPress={() => handleSelect(item)}>
                                <Text style={styles.item}>{item}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    style={styles.list}
                />
                <View>
                    <RadioButton.Group
                        onValueChange={(newValue) => setValue(newValue)}
                        value={value}>
                        <View style={styles.radioContainer}>
                            <View style={styles.radioItem}>
                                <RadioButton.Android
                                    value="1"
                                    status={value === '1' ? 'checked' : 'unchecked'}
                                    // onPress={() => setValue('1')}
                                    color="#1E6DAD"
                                    uncheckedColor="#A9A9A9"
                                />
                                <Text style={styles.label}>OR</Text>
                            </View>
                            <View style={styles.radioItem}>
                                <RadioButton.Android
                                    value="2"
                                    status={value === '2' ? 'checked' : 'unchecked'}
                                    // onPress={() => setValue('2')}
                                    color="#1E6DAD"
                                    uncheckedColor="#A9A9A9"
                                />
                                <Text style={styles.label}>AND</Text>
                            </View>
                        </View>
                    </RadioButton.Group>
                </View>
                <Button
                    mode="contained"
                    style={{ marginTop: 10 }}
                    onPress={() => onsubmit()}>
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
        justifyContent: "flex-start",
        flexDirection: "column"
    },
    list: {
        marginTop: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    item: {
        marginLeft: 10,
        fontSize: 16,
    },
    radioContainer: {
        // padding: 10,
        flexDirection: 'row',
        // alignItems: 'center',
        alignSelf: 'center'
    },
    radioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginVertical: 5,
    },
});
import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions, TouchableOpacity, TextInput, Button, Alert } from 'react-native';


const data = [
    { id: '1', name: 'Citation Module' },
    { id: '2', name: 'Court Module' },
    { id: '3', name: 'Lawyer Module' },
    { id: '4', name: 'Browse by Bench' },
    { id: '5', name: 'Browse By Judgement' },
    { id: '6', name: 'Nominal Module' },
    { id: '7', name: 'Topical Search' },
    { id: '8', name: 'Test' },
    { id: '9', name: 'BrowseByJudge' },
];

const numColumns = 3;

export default function Dashboard({ navigation }) {

    const [name, setName] = useState({ value: "", error: "" });

    const itemclick = (id) => {
        console.log("itemclick", id);
        switch (id) {
            case '1':
                navigation.navigate('CitationSearch1');
                break;
            case '2':
                navigation.navigate('BrowseByCourt');
                break;
            case '3':
                navigation.navigate('BrowseByLawyer');
                break;
            case '4':
                navigation.navigate('BenchStrength');
                break;
            case '5':
                navigation.navigate('JudgementDate');
                break;
            case '6':
                navigation.navigate('NominalSearch');
                break;
            case '7':
                navigation.navigate('TopicalSearch');
                break;
            case '8':
                navigation.navigate('Test');
                break;
            case '9':
                navigation.navigate('BrowseByJudge');
                break;

            default:

        }

    }

    const renderItemData = ({ item }) => {
        return (
            <View style={styles.gridItem}>
                <TouchableOpacity onPress={() => itemclick(item.id)}>
                    <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        );
    }
    const handlePress = () => {
        if (name.value.length < 3) {
            Alert.alert("please search more than 3 characters");
        }
        else {
            console.log("Success");
            navigation.navigate('FreeTextSearchDetails', {
                searchword: name.value
            })


        }
    };
    return (
        <View style={styles.container}>

            {/* <View style={{ flexDirection: 'row' }}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(noteText) =>
                        setName({ value: text, error: "" })
                    }
                    value={name.value}
                    placeholderTextColor='white'
                    underlineColorAndroid='transparent'>
                </TextInput>
                <TouchableOpacity onPress={() => submit()} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </View> */}

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                margin: 10,
            }}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Search your keyword"
                    value={name.value}
                    onChangeText={(text) => setName({ value: text, error: "" })}
                />
                <Button
                    title="Submit"
                    mode="contained"
                    onPress={handlePress}
                >Search</Button>
            </View>

            <FlatList
                data={data}
                renderItem={({ item }) => renderItemData({ item })}
                keyExtractor={(item) => item.id}
                numColumns={numColumns}
                contentContainerStyle={styles.grid}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    grid: {
        paddingHorizontal: 10,
    },
    gridItem: {
        flex: 1,
        margin: 5,
        aspectRatio: 1, // Ensures the item is square
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    itemText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    textInput: {
        flex: 1, // Ensures the TextInput takes available space
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        marginRight: 10,
    },
});
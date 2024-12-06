import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { Searchbar } from 'react-native-paper';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { homePageGrid } from '../config/data';
const numColumns = 3;

export default function Dashboard({ navigation }) {

    const [name, setName] = useState({ value: "", error: "" });
    const [searchQuery, setSearchQuery] = React.useState('');
    
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
                // navigation.navigate('CitationSearch1');
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
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                margin: 10,
            }}>
                {/* <TextInput
                    style={styles.textInput}
                    placeholder="Search your keyword"
                    value={name.value}
                    onChangeText={(text) => setName({ value: text, error: "" })}
                />
                <Button
                    title="Submit"
                    mode="contained"
                    onPress={handlePress}
                >Search</Button> */}
                <Searchbar
                    placeholder="Search"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                />
            </View>

            {/* <FlatList
                data={homePageGrid}
                renderItem={({ item }) => renderItemData({ item })}
                keyExtractor={(item) => item.id}
                numColumns={numColumns}
                contentContainerStyle={styles.grid}
            /> */}
            <Text style={styles.redBanner}>SEARCH JUDGMENTS</Text>
            <FlatList
                data={homePageGrid}
                keyExtractor={(item) => item.id}
                numColumns={3}
                contentContainerStyle={styles.gridContainer}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.gridItem}>
                        <FontAwesome name={item.icon} size={24} color="#00578E" />
                        <Text style={styles.gridLabel}>{item.label}</Text>
                    </TouchableOpacity>
                )}
            />
            <View style={styles.resultHeader}>
                <Text style={styles.resultTitle}>Supreme Court Of India</Text>
                <TouchableOpacity>
                    <Text style={styles.resultAction}>Select Court</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#00578E',
        padding: 15,
    },
    headerText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerIcons: {
        flexDirection: 'row',
    },
    icon: {
        marginRight: 15,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    redBanner: {
        backgroundColor: '#D32F2F',
        color: '#fff',
        textAlign: 'center',
        paddingVertical: 10,
        fontWeight: 'bold',
    },
    gridContainer: {
        padding: 0,
    },
    gridItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#D32F2F',
    },
    gridLabel: {
        marginTop: 5,
        textAlign: 'center',
        color: '#00578E',
        fontSize: 12,
    },
    resultHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#00578E',
    },
    resultTitle: {
        color: '#fff',
        fontWeight: 'bold',
    },
    resultAction: {
        color: '#FFD700',
    },
    resultItem: {
        padding: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    resultDescription: {
        paddingHorizontal: 10,
        color: '#666',
        marginBottom: 10,
    },
});
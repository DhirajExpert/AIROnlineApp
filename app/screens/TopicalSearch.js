import React, { useState, useEffect } from 'react';

import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getTopicalWords } from '../api/api';
import Autocomplete from 'react-native-autocomplete-input';
import SafeAreaView from 'react-native-safe-area-context';
import Button from '../components/Button';


export default function TopicalSearch({ navigation }) {
    const [query, setQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    // Sample data to filter
    // const data = ['Apple', 'Banana', 'Cherry', 'Date', 'Grapes', 'Mango', 'Orange'];

    const handleSearch = async (text) => {
        setQuery(text);

        console.log("search word", text);
        await topicalSearch(text);
    };

    const handleSelect = (item) => {
        setQuery(item);
        setFilteredData([]);
        console.log("item", item);
    };

    useEffect(() => {
        // fetch('https://abooutreactapis.000webhostapp.com/getpost.php?offset=1')
        //     .then((res) => res.json())
        //     .then((json) => {
        //         const { results: films } = json;
        //         setFilms(films);
        //         //setting the data in the films state
        //     })
        //     .catch((e) => {
        //         alert(e);
        //     });

        // topicalSearch();
    }, []);

    const topicalSearch = async (word) => {
        const response = await getTopicalWords(word);
        console.log("getTopicalWords", response);
        setFilteredData(response.topicNameList);

        //   if (word.length > 0) {
        console.log("filteredData", response.topicNameList);
        const filtered = response.topicNameList.filter((item) =>
            item.toLowerCase().includes(word.toLowerCase())
        );
        setFilteredData(filtered);
        //   } else {
        //     setFilteredData([]);
        //   }
    }

    const onSubmit = () => {
        if (query) {
            navigation.navigate('TopicalSearchDetails', {
                searchword: query
            })
        } else {
            Alert.alert("please select topic");
        }


    }



    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Type to search..."
                value={query}
                onChangeText={handleSearch}
            />
            {filteredData.length > 0 && (
                <FlatList
                    data={filteredData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleSelect(item)}>
                            <Text style={styles.item}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    style={styles.list}
                />
            )}

            <Button
                mode='contained'
                style={{ marginTop: 30 }}
                onPress={() => onSubmit()}>Search</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 4,
    },
    list: {
        marginTop: 4,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        maxHeight: 150,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});


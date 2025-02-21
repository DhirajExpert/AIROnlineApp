import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getSectionDetails } from "../api/api";
import CheckBox from "expo-checkbox";
import Button from "../components/Button";
import { RadioButton, Checkbox } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context"

const SectionDetails = ({ navigation, route }) => {
    const { actId, actName } = route.params;

    const [query, setQuery] = useState('');
    // const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [offset, setOffset] = useState(0);
    // const [hasMore, setHasMore] = useState(true);

    const [filteredData, setFilteredData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [value, setValue] = useState('1');

    // const limit = 10;

    const fetchData = async (searchText = '', currentOffset = 0, isInitialLoad = false, actName, actId) => {
        if (loading || (!hasMore && !isInitialLoad)) return;

        setLoading(true);
        try {
            // const response = await fetch(
            //     `https://example.com/api/items?query=${searchText}&limit=${limit}&offset=${currentOffset}`
            //   );
            //   const result = await response.json();

            const response = await getSectionDetails(limit, `${currentOffset}`, searchText, actId);
            console.log("getSectionList", response);

            if (response.count > 0) {
                setData(currentOffset === 0 ? response.actData : [...data, ...response.actData]);
                setHasMore(response.count === limit);
            } else {
                if (currentOffset === 0) setData([]);
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };

    const sectionData = async () => {
        const response = await getSectionDetails(actName, actId);
        console.log("getSectionList", response);
        setFilteredData(response.actData);
        setOriginalData(response.actData);
    }

    useEffect(() => {
        // fetchData(actName, 0, true, actName, actId);
        sectionData();
    }, []);

    // useEffect(() => {
    //     const filtered = filteredData.filter(item =>
    //         item.Section.toLowerCase().includes(query.toLowerCase())
    //     );
    //     console.log("filter section", filtered);
    //     setFilteredData(filtered);;
    // }, [query]);

    const handleTextChange = (text) => {
        setQuery(text);
        // const filtered = filteredData.filter(item =>
        //     item.Section.toLowerCase().includes(text.toLowerCase())
        // );
        // console.log("filter section", filtered);
        // setFilteredData(filtered);

        if (text.trim() === '') {
            // Reset to original data when input is cleared
            setFilteredData(originalData);
          } else {
            // Filter data based on input text
            const filtered = originalData.filter((item) =>
              item.Section.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredData(filtered);
          }
    };

    const handleSelect = (item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter((i) => i !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const onsubmit = () => {

        if (selectedItems.length === 0) {
            Alert.alert("please select at least one section ");
        } else {
            console.log("selected", selectedItems);
        }
        navigation.navigate('ActSectionDigestView', {
            sectionName: selectedItems,
            flag: value,
            actName:actName
        })
    }


    return (
        <SafeAreaView edges={["bottom", "left", "right"]} style={styles.safearea}>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Search Sections..."
                    value={query}
                    onChangeText={handleTextChange}
                    clearButtonMode="always"
                />
                {loading ? (
                    <ActivityIndicator size="large" />
                ) : filteredData.length === 0 && query.trim() !== '' ? (
                    <Text style={styles.noDataText}>No data available</Text>
                ) : (
                    <FlatList
                        data={filteredData}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <CheckBox
                                    value={selectedItems.includes(item.Section)}
                                    onValueChange={() => handleSelect(item.Section)}
                                />
                                <TouchableOpacity onPress={() => handleSelect(item.Section)}>
                                    <Text style={styles.item}>{item.Section}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    // onEndReached={loadMoreData}
                    // onEndReachedThreshold={0.5}
                    // ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
                    />
                )}
            </View>
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

                <Button
                    mode="contained"
                    style={{ marginTop: 10 }}
                    onPress={() => onsubmit()}>
                    Search
                </Button>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safearea: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    container: {
        flex: 1,
        // padding: 16,
        justifyContent: "flex-start",
        flexDirection: "column"
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    itemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    itemText: {
        fontSize: 16,
    },
    noDataText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#888',
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
    bottomContainer: {
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
});

export default SectionDetails;

import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    TextInput
} from "react-native";
import { getStatuesActList, getStateActList } from "../api/api";
import { theme } from "../core/theme";
import Background from "../components/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { getActList } from "../api/api";

const Statutes = ({ navigation }) => {
    const [expandedLetter, setExpandedLetter] = useState(null);
    const [actsByLetter, setActsByLetter] = useState({});
    const [loading, setLoading] = useState(false);
    const [isVisibleCentral, setIsVisibleCentral] = useState(false);
    const [isVisibleState, setIsVisibleState] = useState(false);
    const [stateActname, setStateActname] = useState([]);
    const [expandedState, setExpandedState] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [actsByState, setActsByState] = useState({});
    const [loadingActs, setLoadingActs] = useState(false);
    const [name, setName] = useState({ value: "", error: "" });

    const [actList, setActList] = useState([]);

    const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));


    useEffect(() => {
        StateActList();
    }, []);

    const StateActList = async () => {
        try {
            const response = await getStateActList('state');
            console.log("stateData", response);
            if (response.err_code === 'success') {
                setStateActname(response.actData)
            }
            else {

            }

        } catch (error) {
            console.error("Error fetching states:", error);
        }
        finally {
            setIsLoading(false)
        }
    }

    // Fetch acts from API based on the selected letter
    const fetchActsByLetter = async (letter) => {
        setLoading(true);
        try {
            const response = await getStatuesActList(`C`, `${letter}`);
            console.log("response ActList", response.actData);


            setActsByLetter((prev) => ({
                ...prev,
                [letter]: response.actData || [],
            }));
        } catch (error) {
            console.error("Error fetching acts:", error);
            setActsByLetter((prev) => ({
                ...prev,
                [letter]: [],
            }));
        } finally {
            setLoading(false);
        }
    };

    const toggleLetter = (letter) => {
        if (expandedLetter === letter) {
            setExpandedLetter(null); // Collapse if already expanded
        } else {
            setExpandedLetter(letter); // Expand new letter
            if (!actsByLetter[letter]) fetchActsByLetter(letter); // Fetch data only if not already loaded
        }
    };
    const centralActList = (actName, actID) => {
        navigation.navigate('BareActDetails',
            {
                actName: actName,
                actID: actID
            }
        )

    }
    // Toggle State Expansion & Fetch Acts
    const toggleState = (stateName) => {
        if (expandedState === stateName) {
            setExpandedState(null); // Collapse if already expanded
        } else {
            setExpandedState(stateName);
            fetchActsByState(stateName); // Fetch acts only when expanding
        }
    };

    // Fetch Acts List when a state is clicked
    const fetchActsByState = async (stateName) => {
        setLoadingActs(true);
        try {

            const response = await getStatuesActList(`S`, '', stateName);
            console.log("response ActList", response.actData);

            setActsByState((prevActs) => ({
                ...prevActs,
                [stateName]: response.actData || [], // Store acts in state
            }));
        } catch (error) {
            console.error(`Error fetching acts for ${stateName}:`, error);
        } finally {
            setLoadingActs(false);
        }
    };

    const actSearchApi = async (text) => {
        const response = await getActList(10, 0, text);
        console.log("Act", response.actData);
        if (response.err_code === 'success') {
            // const transformedData = response.courtName.map((item, index) => ({
            //     id: String(index + 1),
            //     label: item,
            // }));
            setActList(response.actData);
        }

    }

    return (
        <SafeAreaView edges={["bottom", "left", "right",]} style={styles.safearea}>
            <Background>
                <View style={styles.container}>

                    <View>
                        <View style={styles.searchBarContainer}>
                            <FontAwesome name="search" size={20} color={theme.colors.red} style={styles.searchBarIcon} />
                            <TextInput
                                style={styles.searchBarInput}
                                placeholder="Enter text to search"
                                returnKeyType="search"
                                onChangeText={(text) => {
                                    setName({ value: text, error: "" })
                                    actSearchApi(text)
                                }
                                }
                            // onSubmitEditing={(event) => handlePress(event)}
                            // placeholderTextColor="#A9A9A9"
                            />
                            <View style={styles.searchBarIconContainer}>
                                <TouchableOpacity >
                                    <MaterialIcons name="mic" size={20} color={theme.colors.blue} />
                                </TouchableOpacity>
                                {/* <TouchableOpacity>
                                <MaterialIcons name="history" size={20} color={theme.colors.blue} />
                            </TouchableOpacity> */}
                            </View>
                        </View>

                        <FlatList
                            data={actList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.itemContainer}>
                                    {/* <CheckBox
                                    value={selectedItems.includes(item)}
                                    onValueChange={() => handleSelect(item)}
                                /> */}
                                    <TouchableOpacity onPress={() => centralActList(item.Act_Name)} 
                                        >
                                        <Text style={styles.popitem}>{item.Act_Name}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            ListEmptyComponent={() => (
                                <View style={styles.emptyContainer}>
                                    <Text style={styles.emptyText}>No data available</Text>
                                </View>
                            )}
                            style={styles.list}
                        />

                    </View>
                    <TouchableOpacity
                        onPress={() => setIsVisibleCentral(!isVisibleCentral)}
                        style={{
                            backgroundColor: theme.colors.white,
                            padding: 10,
                            borderRadius: 3,
                            marginBottom: 10,
                        }}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                            <Text style={styles.header}>Central Acts</Text>
                            <Text style={{ color: "#AB0000", textAlign: "center", fontSize: 22, fontWeight: 'bold' }}>
                                {isVisibleCentral ? "V" : ">"}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {isVisibleCentral && (
                        <FlatList
                            data={alphabet}
                            keyExtractor={(item) => item}
                            renderItem={({ item: letter }) => (
                                <View>

                                    <TouchableOpacity
                                        style={styles.letterHeader}
                                        onPress={() => toggleLetter(letter)}
                                    >
                                        <Text style={styles.letterText}>{letter}</Text>
                                        <Text style={styles.toggleIcon}>
                                            {expandedLetter === letter ? "-" : "+"}
                                        </Text>
                                    </TouchableOpacity>


                                    {expandedLetter === letter && (
                                        <View style={styles.actsContainer}>
                                            {loading ? (
                                                <ActivityIndicator size="small" color="#0000ff" />
                                            ) : (
                                                <FlatList
                                                    data={actsByLetter[letter] || []}
                                                    keyExtractor={(act, index) => `${letter}-${index}`}
                                                    renderItem={({ item }) => (
                                                        <View style={styles.ListComponents}>
                                                            <TouchableOpacity onPress={() => centralActList(item.Act_Name, item.Act_ID)}>
                                                                <Text style={styles.actItem}>{item.Act_Name}</Text>
                                                            </TouchableOpacity>
                                                        </View>

                                                    )}
                                                    ListEmptyComponent={
                                                        <Text style={styles.noResults}>
                                                            No acts found for "{letter}".
                                                        </Text>
                                                    }
                                                />
                                            )}
                                        </View>
                                    )}
                                </View>
                            )}
                        />
                    )}
                    <TouchableOpacity
                        onPress={() => setIsVisibleState(!isVisibleState)}
                        style={{
                            backgroundColor: theme.colors.white,
                            padding: 10,
                            borderRadius: 3,
                            marginBottom: 10,
                        }}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                            <Text style={styles.header}>State Acts</Text>
                            <Text style={{ color: "#AB0000", textAlign: "center", fontSize: 22, fontWeight: 'bold' }}>
                                {isVisibleState ? "V" : ">"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    {isLoading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : isVisibleState && stateActname.length > 0 ? (
                        <FlatList
                            data={stateActname}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View>
                                    {/* State Name Header */}
                                    <TouchableOpacity
                                        style={styles.letterHeader}
                                        onPress={() => toggleState(item.State_Name)}
                                    >
                                        <Text style={styles.letterText}>{item.State_Name}</Text>
                                        <Text style={styles.toggleIcon}>
                                            {expandedState === item.State_Name ? "-" : "+"}
                                        </Text>
                                    </TouchableOpacity>

                                    {/* Expandable Acts List */}
                                    {expandedState === item.State_Name && (
                                        <View style={styles.actsContainer}>
                                            {loading ? (
                                                <ActivityIndicator size="small" color="#0000ff" />
                                            ) : (
                                                <FlatList
                                                    data={actsByState[item.State_Name] || []}
                                                    keyExtractor={(act, index) => `${item.State_Name}-${index}`}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            style={styles.actItem}
                                                            onPress={() => centralActList(item.Act_Name, item.Act_ID)}
                                                        >
                                                            <Text style={styles.actText}>{item.Act_Name}</Text>
                                                        </TouchableOpacity>
                                                    )}
                                                    ListEmptyComponent={
                                                        <Text style={styles.noResults}>
                                                            No acts found for "{item.State_Name}".
                                                        </Text>
                                                    }
                                                />
                                            )}
                                        </View>
                                    )}
                                </View>
                            )}
                        />

                    ) : (
                        <Text style={styles.noDataText}></Text>
                    )}


                </View>
            </Background>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safearea: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: '5%',
        paddingVertical: '5%'


    },
    header: {
        fontSize: 20,

        color: "#AB0000",
        textAlign: "center",

    },
    letterHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        backgroundColor: "#007bff",
        borderRadius: 8,
        marginVertical: 3,
    },
    letterText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
    toggleIcon: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
    actsContainer: {
        padding: 12,
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 8,
        elevation: 1,
    },
    actItem: {
        fontSize: 16,
        paddingVertical: 4,
        color: "#333",
    },
    noResults: {
        textAlign: "center",
        color: "#888",
        fontSize: 14,
        marginVertical: 4,
    },
    ListComponents: {
        borderColor: '#d9d9d9',
        // borderWidth: 1,
        borderBottomWidth: 2
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
        marginVertical: 10
    },
    searchBarIcon: {
        marginRight: 10,
    },
    searchBarInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    searchBarIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        zIndex: 3, // works on ios
        elevation: 3, // works on android
    },
    popitem: {
        marginLeft: 10,
        fontSize: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
});

export default Statutes;

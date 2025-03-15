import { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Touchable, TouchableOpacity } from "react-native";
import { getNominalDetails } from "../api/api";
import { useState } from "react";

import { theme } from "../core/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "../components/Background";

export default function NominalSearchDetails({ navigation, route }) {
    const { nominalSearch, courtName, searchString } = route.params;
    const [page, setPage] = useState(0);

    const [data, setData] = useState([]); // Store fetched records
    const [offset, setOffset] = useState(0);  // Offset starts at 0
    const [loading, setLoading] = useState(false); // Loading state
    const [hasMore, setHasMore] = useState(true); // Check if more data is available

    const [tableHead, setTableHead] = useState(
        ['PartyName', 'Court', 'Citations', 'D.O.D']
    );

    const [tableData, setTableData] = useState([
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd'],
        ['1', '2', '3', '456\n789'],
        ['a', 'b', 'c', 'd']
    ])

    useEffect(() => {

        nominalDetails();
    }, []);

    const nominalDetails = async () => {

        if (loading || !hasMore) return; // Prevent multiple calls if loading or no more data

        setLoading(true);
        try {
            response = await getNominalDetails(nominalSearch, courtName, searchString, 10, `${offset}`);
            console.log("response", response);

            if (response.err_code === 'success') {
                console.log("count", response.docCount);

                if (response.docCount > 0) {
                    setData((prevData) => [...prevData, ...response.nominalList]);
                    setOffset((prevOffset) => prevOffset + 10);


                    if (response.docCount < 10) {
                        setHasMore(false);
                    }


                } else {
                    setHasMore(false);
                }
            }
            else {
                setHasMore(false);
            }
        }
        catch (error) {
            console.error(error);
        }
        setLoading(false);
    }
    const nominalListClick = (citationID, citationName) => {
        navigation.navigate('Judgement', {
            citationID: citationID,
            citationName: citationName,
        })
    }


    return (
        <SafeAreaView edges={["bottom", "left", "right"]} style={styles.safearea}>
            <Background>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={[styles.headerText, { flex: 2 }]}>Party Name</Text>
                        <Text style={[styles.headerText, { flex: 1 }]}>Citations</Text>
                        <Text style={[styles.headerText,]}>D.O.D</Text>
                    </View>
                    <FlatList
                        data={data}
                        // keyExtractor={(item) => item.citationID}
                        keyExtractor={(item, index) => `${item.citationID}-${index}`}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => nominalListClick(item.citationID, item.citationName)}>
                                <View style={styles.item}>
                                    <View style={styles.body}>
                                        <View style={styles.partyNameContainer}>
                                            <Text style={{ textDecorationLine: 'underline', fontSize: 10 }}>{item.nominal_app}Vs{item.nominal_res}</Text>
                                        </View>
                                        <View style={styles.verticalLine} />
                                        <View style={styles.citationsContainer}>
                                            <Text style={{ fontSize: 10 }}>{item.citationName}</Text>
                                        </View>
                                        <View style={styles.verticalLine} />
                                        <View style={styles.dodContainer}>
                                            <Text style={{ fontSize: 7.5 }}>{item.dod}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        showsVerticalScrollIndicator={false}
                        onEndReached={nominalDetails} // Load more data when reaching the end
                        onEndReachedThreshold={2} // Trigger when the user is halfway down
                        ListFooterComponent={loading && <ActivityIndicator size="large" color="#0000ff" />}
                    />


                </View>
            </Background>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {


    },
    safearea: {
        flex: 1,
    },
    item: {
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        padding: 15,
        margin: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 5,
        // borderBottomWidth: 1,
        // borderBottomColor: '#e0e0e0',
        paddingHorizontal: '5%',
        paddingVertical: '10%'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 12,
        color: theme.colors.blue,
        paddingHorizontal: 5,
    },
    verticalLine: {
        width: 1,
        backgroundColor: '#ccc',
        height: '100%',
        marginHorizontal: 4, // Adds space around the line
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingTop: 10,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: theme.colors.red,
        justifyContent: 'space-between',
    },
    partyNameContainer: {
        flex: 3.5,
    },
    citationsContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 1,
        color: theme.colors.red,
        fontWeight: 600

    },
    dodContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        color: theme.colors.blue,
        fontWeight: 700
    },

});
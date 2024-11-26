import React, { useEffect, useState, useRef } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Pressable } from "react-native";
import { getFTSDigestView } from "../api/api";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyle from "../core/Style"
export default function FreeTextSearchDetails({ route, navigation }) {
    const { searchword } = route.params;
    const [responseDigestView, setResponseDigestView] = useState([]);
    const [expandedNotes, setExpandedNotes] = useState({});

    const [page, setPage] = useState(0); // To keep track of the current page
    const [loading, setLoading] = useState(false); // Loading state for pagination
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);
    const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 90 }).current; // To determine if an item is fully visible
    const [data, setData] = useState([]);
    const onEndReachedCalledDuringMomentum = useRef(false);
    useEffect(() => {
        CourtDigestView();
    }, []);

    const CourtDigestView = async () => {

        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const response = await getFTSDigestView(searchword, 10, `${offset}`);
            console.log("getFTSDigestView", response);

            if (response.err_code === 'success') {
                console.log("count", response.docCount);

                if (response.docCount > 0) {
                    setResponseDigestView((prevData) => [...prevData, ...response.digestView]);
                    setData((prevData) => [...prevData, ...(response.digestView)]);
                    setOffset((prevOffset) => prevOffset + 10); // Increase offset by 10

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


    const toggleExpansion = (citationID, noteIndex) => {
        setExpandedNotes(prevState => ({
            ...prevState,
            [`${citationID}-${noteIndex}`]: !prevState[`${citationID}-${noteIndex}`]
        }));
    };


    const onEndReached = () => {
        if (!onEndReachedCalledDuringMomentum.current) {
            CourtDigestView();
            onEndReachedCalledDuringMomentum.current = true;
        }
    };


    const onMomentumScrollEnd = () => {
        onEndReachedCalledDuringMomentum.current = false;
    };
    const renderShortNote = ({ item, index, citationID }) => {
        const isExpanded = expandedNotes[`${citationID}-${index}`];
        const lnoteText = isExpanded ? item.lnote : item.lnote.substring(0, 100) + '...';

        return (
            <View style={styles.noteContainer}>
                <Text style={styles.noteText}>{item.snote}</Text>
                {isExpanded && <Text style={styles.noteLText}>{item.lnote}</Text>}
                {item.lnote && (
                    <TouchableOpacity onPress={() => toggleExpansion(citationID, index)}>
                        <Text style={styles.showMoreText}>
                            {isExpanded ? 'Show Less' : 'Show More'}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };
    const CitationClick = (citationName, citationID) => {
        console.log("Citation Click", citationName + citationID);

        navigation.navigate('Judgement', {
            citationID: citationID,
            citationName: citationName,
        }
        )
    }
    return (
        <SafeAreaView edges={['left', 'right', 'bottom']} style={globalStyle.safearea}>
            <View style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={({ item }) =>
                    (
                        <View style={styles.item}>
                            <Pressable onPress={() => CitationClick(item.citationName, item.citationID)}>
                                <Text style={styles.title} >{item.citationName}</Text>
                            </Pressable>
                            <Text style={styles.subtitle}>{item.courts}</Text>
                            <Text style={styles.subtitle}>HON'BLE JUDGE(S): {item.judgeName}</Text>
                            <Text style={styles.subtitle}>{item.nominal}</Text>
                            {/* <Text style={styles.detail}>{item.topic}</Text> */}
                            <Text style={styles.detail}>{item.combineDod}</Text>
                            <FlatList
                                data={item.shortNote}
                                renderItem={({ item, index }) => renderShortNote({ item, index, citationID: item.citationID })}
                                keyExtractor={(note, index) => index.toString()}
                                onEndReached={onEndReached}
                                onEndReachedThreshold={0.1}
                                onMomentumScrollEnd={onMomentumScrollEnd}
                                ListFooterComponent={
                                    loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
                                }
                            />
                        </View>)
                    }
                    keyExtractor={item => item.citationID}
                />
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     justifyContent: "flex-start",
    //     flexDirection: "column"

    // },
    item: {
        backgroundColor: '#d9dedb',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        borderColor: '#ddd',
        borderWidth: 1
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'blue'
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
    },
    noteContainer: {
        padding: 5,
        backgroundColor: '#eef',
        marginTop: 8,
        borderRadius: 4
    },
    noteLText: {
        fontSize: 14,
        color: '#333',
        textAlign: 'justify'
    },
    showMoreText: {
        fontSize: 14,
        color: 'blue',
        marginTop: 4,
        fontWeight: 'bold'
    },
    noteText: {
        marginTop: 5,
        fontSize: 14,
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'justify',

    },
    itemContainer: {
        backgroundColor: '#f8f8f8',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        borderColor: '#ddd',
        borderWidth: 1
    },
});
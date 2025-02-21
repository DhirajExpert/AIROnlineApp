import React, { useEffect, useState, useRef } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Pressable } from "react-native";
import { getJudgeDetails } from "../api/api";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyle from "../core/Style";

export default function BrowseByJudgeDetails({ route, navigation }) {
    const { judgesname, flag } = route.params;
    const [responseDigestView, setResponseDigestView] = useState([]);
    const [expandedNotes, setExpandedNotes] = useState({});

    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);
    const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 90 }).current;
    const [data, setData] = useState([]);
    const onEndReachedCalledDuringMomentum = useRef(false);
    useEffect(() => {
        JudgeDigestView();
    }, []);
    const JudgeDigestView = async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            var and = '';
            var or = '';
            
            const judgesnameList =  judgesname.join("&judges=");
            if (flag === '1') {
                or = 'OR';
            }
            else {
                and = 'AND';
            }
            const response = await getJudgeDetails(judgesnameList, and, or, 10, `${offset}`);
            console.log("getBenchStrengthDetails", response);

            if (response.err_code === 'success') {
                console.log("count", response.docCount);

                if (response.docCount > 0) {
                    setResponseDigestView((prevData) => [...prevData, ...response.digestView]);
                    setData((prevData) => [...prevData, ...(response.digestView)]);
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
    const toggleExpansion = (citationID, noteIndex) => {
        setExpandedNotes(prevState => ({
            ...prevState,
            [`${citationID}-${noteIndex}`]: !prevState[`${citationID}-${noteIndex}`]
        }));
    };
    const onEndReached = () => {
        if (!onEndReachedCalledDuringMomentum.current) {
            JudgeDigestView();
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
            <View style={globalStyle.noteContainer}>
                <Text style={globalStyle.noteText}>{item.snote}</Text>
                {isExpanded && <Text style={globalStyle.noteLText}>{item.lnote}</Text>}
                {item.lnote && (
                    <TouchableOpacity onPress={() => toggleExpansion(citationID, index)}>
                        <Text style={globalStyle.showMoreText}>
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
        })
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

                            <Text style={globalStyle.courts}>{item.courts}</Text>
                            <Text style={globalStyle.judges}>HON'BLE JUDGE(S): {item.judgeName}</Text>
                            <Text style={globalStyle.nominal}>{item.nominal}</Text>
                            <Text style={globalStyle.combineDod}>{item.combineDod}</Text>
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
                            {/* <Text style={styles.advocateHeadingText}>Name of Advocates</Text>
                            <View >
                                <View
                                    style={{
                                        borderBottomColor: 'black',
                                        borderBottomWidth: 3,
                                    }}
                                />

                                <Text style={styles.headingText}>for Respondant: </Text>
                                <Text style={styles.bodyText}>{item.advocate_app}</Text>
                                <Text style={styles.headingText}>for Petitioner: </Text>
                                <Text style={styles.bodyText}>{item.advocate_res}</Text>
                                <View
                                    style={{
                                        borderBottomColor: 'black',
                                        borderBottomWidth: 3,
                                    }}
                                />
                            </View> */}

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

    headingText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    bodyText: {
        fontSize: 15,
    },
    advocateHeadingText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 10
    },

});
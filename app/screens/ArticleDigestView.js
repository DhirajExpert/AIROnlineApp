import React, { useEffect, useState, useRef } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Pressable } from "react-native";
import { getArticleDigestDetails, getQueryApi } from "../api/api";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyle from "../core/Style";

export default function ArticleDigestView({ route, navigation }) {
    const { searchString, searchInput } = route.params;
    // const [responseDigestView, setResponseDigestView] = useState([]);
    const [expandedNotes, setExpandedNotes] = useState({});

    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);
    const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 90 }).current;
    const [data, setData] = useState([]);
    const onEndReachedCalledDuringMomentum = useRef(false);
    useEffect(() => {
        DigestViewArticle();
    }, []);


    const DigestViewArticle = async () => {

        console.log("searchInput", searchString)

        if (loading || !hasMore) return;
        setLoading(true);
        try {
            var response = ""


            if (!searchInput) {
                response = await getQueryApi(searchString, 10, `${offset}`);
                console.log("getQueryApi", response);

            } else {
                response = await getArticleDigestDetails(searchString, searchInput, 10, `${offset}`);
                console.log("getArticleDigestDetails", response);
            }

            if (response.err_code === 'success') {
                console.log("count", response.count);

                if (response.count > 0) {

                    setData((prevData) => [...prevData, ...response.articleData]);
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
            DigestViewArticle();
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
    const highlightText = (text, searchString) => {
        if (!text || !searchString) return text;

        // Split the text based on the search string and wrap matches in a styled Text component
        const parts = text.split(new RegExp(`(${searchString})`, 'gi'));
        return (
            <Text>
                {parts.map((part, index) =>
                    part.toLowerCase() === searchString.toLowerCase() ? (
                        <Text key={index} style={{ backgroundColor: 'yellow', fontWeight: 'bold' }}>
                            {part}
                        </Text>
                    ) : (
                        <Text key={index}>{part}</Text>
                    )
                )}
            </Text>
        );
    };

    return (
        <SafeAreaView edges={['left', 'right', 'bottom']} style={globalStyle.safearea}>
            <View style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={({ item }) =>
                    (
                        <View style={styles.item}>
                            <Pressable onPress={() => articleClick(item.Article_ID,)}>
                                <Text style={styles.title} >{item.Article_Title}</Text>
                            </Pressable>
                            <Text style={styles.article_author}>
                                <Text style={{ fontWeight: 'bold', color: '#000000' }}>By: </Text> {item.Article_Author}
                            </Text>
                            <Text style={styles.article_summary}>
                                <Text style={{ fontWeight: 'bold', color: '#000000' }}>Published In: </Text> {item.Article_Summary_Text.replace(/<(.|\n)*?>/g, '')}
                            </Text>
                            {item.HitList && (
                                <Text style={styles.hitlist}>
                                    {highlightText(item.HitList, searchString)}
                                </Text>
                            )}
                        </View>)
                    }
                    onEndReached={onEndReached}
                    onEndReachedThreshold={0.1}
                    onMomentumScrollEnd={onMomentumScrollEnd}
                    ListFooterComponent={
                        loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
                    }
                    keyExtractor={item => item.Article_ID}
                    ListEmptyComponent={<Text style={styles.noResults}>No results found</Text>}
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
        backgroundColor: '#ffffff',
        padding: 10,
        marginVertical: 5,
        // marginHorizontal: 4,
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
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2e6e9e'
    },
    article_author: {
        // fontFamily: 'Signika_600SemiBold',
        color: '#d97000'
    },
    article_summary: {
        fontSize: 16,
        color: '#000',
    },
    noResults: {
        textAlign: 'center',
        color: '#888',
        padding: 10,
    },
    hitlist: {
        fontSize: 16,
        color: '#000',
    }
});
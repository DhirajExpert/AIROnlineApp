import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { getLawyer } from "../api/api";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyle from "../core/Style"
export default function BrowseByLawyerDetails({ route, navigation }) {
    const { lawyerName } = route.params;
    const [responseDigestView, setResponseDigestView] = useState([]);
    const [expandedNotes, setExpandedNotes] = useState({});

    const [page, setPage] = useState(0); // To keep track of the current page
    const [loading, setLoading] = useState(false); // Loading state for pagination
    const [hasMore, setHasMore] = useState(true);

    const [offset, setOffset] = useState(0);  
    useEffect(() => {

        // LawyerDigestView();
        fetchData();
    }, []);

    const LawyerDigestView = async () => {

        if (loading || !hasMore) return;
        setLoading(true);
        const response = await getLawyer(lawyerName, 10, `${page}`);
        console.log("getLawyer", response);

        if (response.err_code === 'success') {
            setResponseDigestView((prevData) => [...prevData, ...response.lawyerDataList]);
            setPage((prevPage) =>
                // prevPage + 1

                (prevPage - 1) * 10
            );
            console.log("page no", page)
        } else {
            setHasMore(false); 
        }
        setLoading(false);
    }



const fetchData = async () => {
    if (loading || !hasMore) return; 

    setLoading(true);
    try {
        const response = await getLawyer(lawyerName, 10, `${page}`);
        console.log("getLawyer", response);

      if (response.err_code === 'success') {
        setResponseDigestView((prevData) => [...prevData, ...response.lawyerDataList]);
        setOffset((prevOffset) => prevOffset + 10); 

        
        if (response.docCount < 10) {
          setHasMore(false);
        }
      } else {
        // setHasMore(false); 
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false); 
  };

    const toggleExpansion = (citationID, noteIndex) => {
        setExpandedNotes(prevState => ({
            ...prevState,
            [`${citationID}-${noteIndex}`]: !prevState[`${citationID}-${noteIndex}`]
        }));
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

    const loadMoreData = () => {
        if (!loading) {
            setLoading(true);

            const nextPage = page + 1;
            const start = nextPage * 10 - 10;
            const end = nextPage * 10;
            const newData = responseDigestView

            if (newData.length > 0) {
                // setData([...data, ...newData]);
                setResponseDigestView([...responseDigestView, ...newData]);
                setPage(nextPage);
            }

            setLoading(false); // Reset the loading state
        }
    };

    return (
        <SafeAreaView edges={['left', 'right', 'bottom']} style={globalStyle.safearea}>
            <View style={styles.container}>
                {/* <FlatList
                    data={responseDigestView}
                    keyExtractor={item => item.citationID}
                    renderItem={({ item }) => {
                        <View >
                            <Text>{item.citationName}</Text>
                            <Text>{item.court}</Text>
                            <Text>{item.nominal}</Text>

                        </View>

                    }}
                /> */}
                <FlatList
                    data={responseDigestView}
                    renderItem={({ item }) =>
                    (
                        <View style={styles.item}>
                            <Text style={styles.title}>{item.citationName}</Text>
                            <Text style={styles.subtitle}>{item.nominal}</Text>
                            {/* <Text style={styles.detail}>{item.topic}</Text> */}
                            <FlatList
                                data={item.shortNote}
                                // renderItem={({ item,index }) => (
                                //     <View>
                                //         <Text>{item.snote}</Text>
                                //         <Text>{item.lnote}</Text>
                                //     </View> 
                                // )}

                                renderItem={({ item, index }) => renderShortNote({ item, index, citationID: item.citationID })}
                                keyExtractor={(note, index) => index.toString()}
                                // onEndReached={loadMoreData}
                                onEndReached={hasMore ? fetchData : null}
                                onEndReachedThreshold={2}
                                ListFooterComponent={
                                    loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
                                }
                            />
                            <Text style={styles.advocateHeadingText}>Name of Advocates</Text>
                            <View >
                                <View
                                    style={{
                                        borderBottomColor: 'black',
                                        borderBottomWidth: 3,
                                    }}
                                />
                                
                                <Text style={styles.Respondant}>for Respondant: </Text>
                                <Text style={styles.bodyText}>{item.advocate_app}</Text>
                                <Text style={styles.Petitioner}>for Petitioner: </Text>
                                <Text style={styles.bodyText}>{item.advocate_res}</Text>

                                <View
                                    style={{
                                        borderBottomColor: 'black',
                                        borderBottomWidth: 3,
                                    }}
                                />
                            </View>
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
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    Respondant: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    Petitioner: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop:5
    },
    
    bodyText: {
        fontSize: 15,
    },
    advocateHeadingText:{
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical:10 
    }
});
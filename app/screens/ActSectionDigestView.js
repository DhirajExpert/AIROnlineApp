// import React, { useEffect, useState, useRef } from "react";
// import { FlatList, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Pressable } from "react-native";
// import { getActSectionDetails } from "../api/api";
// import { SafeAreaView } from "react-native-safe-area-context";
// import globalStyle from "../core/Style";

// export default function ActSectionDigestView({ route, navigation }) {
//     const { sectionName, flag, actName } = route.params;

//     const sectionNameList = sectionName.join("&section=");
//             console.log("sectionNameList", sectionNameList);
//             const actNameList = actName.join("&actName=");
//             console.log("sectionNameList", actNameList);

//     console.log("params data",route.params);
//     const [responseDigestView, setResponseDigestView] = useState([]);
//     const [expandedNotes, setExpandedNotes] = useState({});

//     const [page, setPage] = useState(0);
//     const [loading, setLoading] = useState(false);
//     const [hasMore, setHasMore] = useState(true);
//     const [offset, setOffset] = useState(0);
//     const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 90 }).current;
//     const [data, setData] = useState([]);
//     const onEndReachedCalledDuringMomentum = useRef(false);
//     useEffect(() => {
//         sectionDigestView();
//     }, []);
//     const sectionDigestView = async () => {

//         console.log("actName", actName);

//         if (loading || !hasMore) return;
//         setLoading(true);
//         try {
//             var searchFlag = '';

//             const sectionNameList = sectionName.join("&section=");
//             console.log("sectionNameList", sectionNameList);
            
//             console.log("searchFlag", flag);
//             const response = await getActSectionDetails(sectionNameList, actName, flag, 10, `${offset}`);
//             console.log("getActSectionDetails", response);

//             if (response.err_code === 'success') {
//                 console.log("count", response.docCount);

//                 if (response.docCount > 0) {
//                     setResponseDigestView((prevData) => [...prevData, ...response.digestView]);
//                     setData((prevData) => [...prevData, ...(response.digestView)]);
//                     setOffset((prevOffset) => prevOffset + 10);

//                     if (response.docCount < 10) {
//                         setHasMore(false);
//                     }
//                 } else {
//                     setHasMore(false);
//                 }
//             }
//             else {
//                 setHasMore(false);
//             }
//         }
//         catch (error) {
//             console.error(error);
//         }
//         setLoading(false);
//     }
//     const toggleExpansion = (citationID, noteIndex) => {
//         setExpandedNotes(prevState => ({
//             ...prevState,
//             [`${citationID}-${noteIndex}`]: !prevState[`${citationID}-${noteIndex}`]
//         }));
//     };
//     const onEndReached = () => {
//         if (!onEndReachedCalledDuringMomentum.current) {
//             sectionDigestView();
//             onEndReachedCalledDuringMomentum.current = true;
//         }
//     };
//     const onMomentumScrollEnd = () => {
//         onEndReachedCalledDuringMomentum.current = false;
//     };
//     const renderShortNote = ({ item, index, citationID }) => {
//         const isExpanded = expandedNotes[`${citationID}-${index}`];
//         const lnoteText = isExpanded ? item.lnote : item.lnote.substring(0, 100) + '...';

//         return (
//             <View style={globalStyle.noteContainer}>
//                 <Text style={globalStyle.noteText}>{item.snote}</Text>
//                 {isExpanded && <Text style={globalStyle.noteLText}>{item.lnote}</Text>}
//                 {item.lnote && (
//                     <TouchableOpacity onPress={() => toggleExpansion(citationID, index)}>
//                         <Text style={globalStyle.showMoreText}>
//                             {isExpanded ? 'Show Less' : 'Show More'}
//                         </Text>
//                     </TouchableOpacity>
//                 )}
//             </View>
//         );
//     };
//     const CitationClick = (citationName, citationID) => {
//         console.log("Citation Click", citationName + citationID);
//         navigation.navigate('Judgement', {
//             citationID: citationID,
//             citationName: citationName,
//         })
//     }
//     return (
//         <SafeAreaView edges={['left', 'right', 'bottom']} style={globalStyle.safearea}>
//             <View style={styles.container}>
//                 <FlatList
//                     data={data}
//                     renderItem={({ item }) =>
//                     (
//                         <View style={styles.item}>
//                             <Pressable onPress={() => CitationClick(item.citationName, item.citationID)}>
//                                 <Text style={styles.title} >{item.citationName}</Text>
//                             </Pressable>

//                             <Text style={globalStyle.courts}>{item.courts}</Text>
//                             <Text style={globalStyle.judges}>HON'BLE JUDGE(S): {item.judgeName}</Text>
//                             <Text style={globalStyle.nominal}>{item.nominal}</Text>
//                             <Text style={globalStyle.combineDod}>{item.combineDod}</Text>
//                             <FlatList
//                                 data={item.shortNote}
//                                 renderItem={({ item, index }) => renderShortNote({ item, index, citationID: item.citationID })}
//                                 keyExtractor={(note, index) => index.toString()}

//                             />
//                             {/* <Text style={styles.advocateHeadingText}>Name of Advocates</Text>
//                             <View >
//                                 <View
//                                     style={{
//                                         borderBottomColor: 'black',
//                                         borderBottomWidth: 3,
//                                     }}
//                                 />

//                                 <Text style={styles.headingText}>for Respondant: </Text>
//                                 <Text style={styles.bodyText}>{item.advocate_app}</Text>
//                                 <Text style={styles.headingText}>for Petitioner: </Text>
//                                 <Text style={styles.bodyText}>{item.advocate_res}</Text>
//                                 <View
//                                     style={{
//                                         borderBottomColor: 'black',
//                                         borderBottomWidth: 3,
//                                     }}
//                                 />
//                             </View> */}

//                         </View>)
//                     }
//                     keyExtractor={item => item.citationID}
//                     onEndReached={onEndReached}
//                     onEndReachedThreshold={0.1}
//                     onMomentumScrollEnd={onMomentumScrollEnd}
//                     ListFooterComponent={
//                         loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
//                     }
//                 />
//             </View>
//         </SafeAreaView>

//     );
// }
// const styles = StyleSheet.create({
//     // container: {
//     //     flex: 1,
//     //     justifyContent: "flex-start",
//     //     flexDirection: "column"

//     // },
//     item: {
//         backgroundColor: '#d9dedb',
//         padding: 15,
//         marginVertical: 8,
//         borderRadius: 8,
//         borderColor: '#ddd',
//         borderWidth: 1
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: 'blue'
//     },

//     headingText: {
//         fontWeight: 'bold',
//         fontSize: 16,
//     },
//     bodyText: {
//         fontSize: 15,
//     },
//     advocateHeadingText: {
//         fontWeight: 'bold',
//         fontSize: 16,
//         marginVertical: 10
//     },

// });


import React, { useEffect, useState, useRef } from "react";
import { FlatList, StyleSheet, TextInput, Text, View, TouchableOpacity, ActivityIndicator, Pressable, Image, Modal } from "react-native";
import { getActSectionDetails } from "../api/api";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyle from "../core/Style";
// import { TextInput } from "react-native-paper";
import { theme } from "../core/theme";
import {
    useFonts, Signika_300Light,
    Signika_400Regular,
    Signika_500Medium,
    Signika_600SemiBold,
    Signika_700Bold,
} from '@expo-google-fonts/signika';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'
import Background from "../components/Background";
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomModal from '../components/CustomModal';



export default function ActSectionDigestView({ route, navigation }) {
    const { sectionName, flag, actName } = route.params;
    const sectionNameList = sectionName.join("&section=");
            console.log("sectionNameList", sectionNameList);
            const actNameList = actName.join("&actName=");
            console.log("actNameList", actNameList);

    const [responseDigestView, setResponseDigestView] = useState([]);
    const [expandedNotes, setExpandedNotes] = useState({});

    const [page, setPage] = useState(0); // To keep track of the current page
    const [loading, setLoading] = useState(false); // Loading state for pagination
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);
    const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 90 }).current; // To determine if an item is fully visible
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState({
        //         benchStrenth: [],
        //   caseResult: [],
        //   courts: [],
        //   decisionYear: [],
        //   judges: [],
        //   nominalApp: [],
        //   nominalRes: [],
    }
    );
    const [datavalue, setDatavalue] = useState([]);
    const onEndReachedCalledDuringMomentum = useRef(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isSortModalVisible, setSortModalVisible] = useState(false);
    const [backdata, setBackdata] = useState(null);
    const [selectedOption, setSelectedOption] = useState("");
    var courts;

    useEffect(() => {
        sectionDigestView();
    }, []);

    const sortOptions = [
        "Relevance",
        "Heading A-Z",
        "Heading Z-A",
        "Party Name A-Z",
        "Party Name Z-A",
        "Court Name A-Z",
        "Court Name Z-A",
        "Date of decision (↑)",
        "Date of decision (↓)",
        "Coram (↑)",
        "Coram (↓)",
    ];



    const sectionDigestView = async () => {
        if (loading || !hasMore) return;
        setLoading(true);

        
        try {

            const response = await getActSectionDetails(sectionNameList, actNameList, flag, 10, `${offset}`);
            // console.log("getFTSDigestView", response);

            if (response.err_code === 'success') {
                console.log("count", response.docCount);

                if (response.docCount > 0) {
                    setResponseDigestView((prevData) => [...prevData, ...response.digestView]);
                    setData((prevData) => [...prevData, ...(response.digestView)]);
                    setOffset((prevOffset) => prevOffset + 10); // Increase offset by 10
                    if (response.filter) {
                        const updatedFilterData = {
                            ...filterData,
                            ...response.filter,
                        };
                        setFilterData(updatedFilterData);
                        // console.log("Updated filterData:", updatedFilterData);
                    } else {
                        console.warn("Response filter is undefined or null");
                    }




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

    useEffect(() => {
        // console.log("filterData updated:", filterData);
    }, [filterData]);

    const toggleExpansion = (citationID, noteIndex) => {
        setExpandedNotes(prevState => ({
            ...prevState,
            [`${citationID}-${noteIndex}`]: !prevState[`${citationID}-${noteIndex}`]
        }));
    };


    const onEndReached = () => {
        if (!onEndReachedCalledDuringMomentum.current && !loading && hasMore) {
            onEndReachedCalledDuringMomentum.current = true; // Prevent duplicate calls
            if (backdata && Object.keys(backdata).length > 0) {
                CourtFilterDigestView(
                    backdata.courts,
                    backdata.judges,
                    backdata.benchStrength,
                    backdata.Case_Results,
                    backdata.Decision_Years,
                    backdata.Nominal,
                    backdata.nominalRes,
                    backdata.topics,
                    backdata.Act,
                    backdata.Section
                ).finally(() => {
                    onEndReachedCalledDuringMomentum.current = false;
                });
            } else {
                sectionDigestView().finally(() => {
                    onEndReachedCalledDuringMomentum.current = false;
                });
            }
        }
    };
    const onMomentumScrollEnd = () => {
        onEndReachedCalledDuringMomentum.current = false;
    };
    const datavalueSet = new Set();
    const renderData = ({ item }) => {
        const dataKey = `${item.citationID}`;
        if (!datavalueSet.has(dataKey)) {
            datavalueSet.add(dataKey);
            datavalue.push({ name: item.citationName, id: item.citationID });
        }


        return (
            <View style={styles.item}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Pressable onPress={() => CitationClick(item.citationName, item.citationID)}>
                        <Text style={[styles.title, { maxWidth: '70%' }]} >{item.citationName}</Text>
                    </Pressable>
                    <Text style={[globalStyle.courts, { maxWidth: '100%' }]}>{item.courts}</Text>
                </View>
                {/* <Text style={globalStyle.judgeName}>HON'BLE JUDGE(S): {item.judgeName}</Text> */}
                {/* <Text style={globalStyle.nominal}>{item.nominal}</Text> */}
                {/* <Text style={styles.detail}>{item.topic}</Text> */}
                {/* <Text style={globalStyle.combineDod}>{item.combineDod}</Text> */}
                <FlatList
                    data={item.shortNote}
                    renderItem={({ item, index }) => renderShortNote({ item, index, citationID: item.citationID })}
                    keyExtractor={(note, index) => index.toString()}


                />
                <View style={styles.headnoteStrip}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                        <Text style={styles.dodtextstyle}>{item.year_of_decision_digest}</Text>
                        <Text style={styles.dodtextstyle}>{item.benchStrength_digest}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                        <TouchableOpacity style={styles.headnoteFilterButton} onPress={() => openBookmark()}>
                            <Image source={require('../../assets/images/bookmark.png')} resizeMode="contain" style={{ width: 24, height: 24 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.headnoteFilterButton} onPress={() => CitationClick(item.citationName, item.citationID)}>
                            <Image source={require('../../assets/images/judgement_open.png')} resizeMode="contain" style={{ width: 24, height: 24 }} />
                        </TouchableOpacity>

                    </View>
                </View>

            </View>)
    }

    const renderShortNote = ({ item, index, citationID }) => {

        const isExpanded = expandedNotes[`${citationID}-${index}`];
        // const lnoteText = isExpanded ? item.lnote : item.lnote.substring(0, 100) + '...';



        const getFirst150Words = (text) => {
            if (!text) return '';
            const words = text.split(' '); // Split text by spaces
            return words.length > 50 ? words.slice(0, 50).join(' ') + '...' : text;
        };

        const snoteText = isExpanded ? item.snote : getFirst150Words(item.snote); // Truncated or full heads note
        const lnoteText = isExpanded ? item.lnote : getFirst150Words(item.lnote); // Truncated or full lnote

        return (
            <View style={globalStyle.noteContainer}>

                <Text style={globalStyle.noteText}>{item.snote}</Text>
                {/* {highlightText(snoteText, courtlist)} */}
                {isExpanded &&
                    <Text style={globalStyle.noteLText}>{item.lnote}</Text>
                    // highlightText(lnoteText, courtlist)
                }
                {/* {item.snote && (
                    <TouchableOpacity onPress={() => toggleExpansion(citationID, index)}>
                        <Text style={globalStyle.showMoreText}>
                            {isExpanded ? 'Show Less' : 'Show More'}
                        </Text>
                    </TouchableOpacity>
                )} */}

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
            datavalue: datavalue
        }
        )
    }
    const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const highlightText = (text, searchText) => {
        const safeText = String(text);
        if (!searchText) return <Text>{safeText}</Text>;

        const escapedSearchText = escapeRegExp(searchText);
        const regex = new RegExp(`(${escapedSearchText})`, 'gi');
        const parts = safeText.split(regex);

        return (
            <Text>
                {parts.map((part, index) =>
                    regex.test(part) ? (
                        <Text key={index} style={{ backgroundColor: 'yellow' }}>
                            {part}
                        </Text>
                    ) : (
                        <Text key={index} style={globalStyle.noteText}>{part}</Text>
                    )
                )}
            </Text>
        );
    };
    const openBookmark = () => {
        console.log("bookmark");
    }
    const filterCompClick = () => {
        setModalVisible(true);
        setData([]);
        setPage(0);

    }
    const filterSortClick = () => {

    }
    const filteriButton = () => {

    }

    const handleModalClose = (data) => {
        // setSelectedData(data); // Update the state with data from the modal
        console.log("return modal data", data);
        setBackdata(data);
        setModalVisible(false);
    };
    useEffect(() => {

        // console.log("backdata is called", backdata);
        // CourtFilterDigestView(backdata.courts, backdata.judges, backdata.benchStrength, backdata.Case_Results, backdata.Decision_Years, backdata.Nominal, backdata.nominalRes, backdata.topics, backdata.Act, backdata.Section)

        if (backdata && Object.keys(backdata).length > 0) {
            // if (backdata && backdata.length > 0) {
            console.log("backdata is called", backdata);
            CourtFilterDigestView(
                backdata.courts,
                backdata.judges,
                backdata.benchStrength,
                backdata.Case_Results,
                backdata.Decision_Years,
                backdata.Nominal,
                backdata.nominalRes,
                backdata.topics,
                backdata.Act,
                backdata.Section
            );
        } else {
            console.log("Modal is empty or backdata is missing");
        }



    }, [backdata]);


    const CourtFilterDigestView = async (courts, judges, benchStrength, Case_Results, Decision_Years, Nominal, nominalRes, topics, acts, section, searchInSearch) => {
        if (loading) return;
        setLoading(true);
        try {

            const searchFilter = 'searchFilter';
            const response = await getActSectionDetails(actNameList,sectionNameList,flag, 10, `${page}`, courts, judges, benchStrength, Case_Results, Decision_Years, Nominal, nominalRes, topics, searchFilter, searchInSearch);
            // console.log("getFTSDigestView", response);

            if (response.err_code === 'success') {
                console.log("count", response.docCount);

                if (response.docCount > 0) {
                    setResponseDigestView((prevData) => [...prevData, ...response.digestView]);
                    setData((prevData) => [...prevData, ...(response.digestView)]);
                    setPage((prevPage) => prevPage + 10);
                    setFilterData((prevFilterData) => ({ ...prevFilterData, ...response.filter }));
                    if (response.docCount < 10) {
                        setHasMore(false);
                    }
                } else {
                    setHasMore(false);
                }
            }
            else if (response.err_code === 'ERR_01') {
                setData([]);
                setResponseDigestView([]);
                setHasMore(false);
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
    const HandleSelect = (event) => {
        const searchText = event.nativeEvent.text;
        if ((searchText).length < 3) {
            Alert.alert("please search more than 3 characters");
        }
        else {

            if (!backdata) {
                console.log("data not found");
                setData([]);
                setPage(0);
                CourtFilterDigestView('', '', '', '', '', '', '', '', searchText)
            }
            else {
                CourtFilterDigestView(backdata.courts, backdata.judges, backdata.benchStrength, backdata.Case_Results, backdata.Decision_Years, backdata.Nominal, backdata.nominalRes, backdata.topics, backdata.Act, searchText)
            }
        }

    }
    const handleRadioClick = (item) => {

        setSelectedOption(item);
        setSortModalVisible(false);
    }

    return (

        <SafeAreaView edges={['left', 'right', 'bottom']} style={globalStyle.safearea}>
            <Background>
                <View style={styles.searchWithinStrip}>
                    <Text style={{ color: "#FFFFFF", fontWeight: 'bold' }}>Search within results</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <TouchableOpacity style={styles.filterButton} onPress={filteriButton}>
                            <AntDesign name="infocirlceo" size={20} color={theme.colors.white} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.filterButton} onPress={() => setSortModalVisible(true)}>
                            <FontAwesome name="sort-amount-desc" size={20} color={theme.colors.white} />
                        </TouchableOpacity>

                        <Modal
                            transparent={true}
                            visible={isSortModalVisible}
                            animationType="slide"
                            onRequestClose={() => setSortModalVisible(false)}
                        >
                            <View style={styles.modalOverlay}>
                                <View style={styles.modalContent}>
                                    {/* Header */}
                                    <View style={styles.modalHeader}>
                                        <Text style={styles.modalTitle}>Sort Result</Text>
                                        <TouchableOpacity onPress={() => setSortModalVisible(false)}>
                                            <Ionicons name="close" size={24} color={theme.colors.white} />
                                        </TouchableOpacity>
                                    </View>

                                    {/* Sort Options */}
                                    <FlatList
                                        data={sortOptions}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity style={styles.option}
                                                onPress={() => handleRadioClick(item)}
                                            >
                                                {/* Radio Button */}
                                                <View style={styles.radioButtonContainer}>
                                                    <View
                                                        style={[
                                                            styles.radioButton,
                                                            selectedOption === item && styles.radioButtonSelected,
                                                        ]}
                                                    />
                                                </View>
                                                <Text style={styles.optionText}>{item}</Text>
                                            </TouchableOpacity>
                                        )}

                                    />
                                </View>
                            </View>
                        </Modal>
                        <TouchableOpacity style={styles.filterButton} onPress={filterCompClick}>
                            <FontAwesome name="filter" size={20} color={theme.colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.searchBarContainer}>
                        <FontAwesome name="search" size={20} color={theme.colors.red} style={styles.searchBarIcon} />
                        <TextInput
                            style={styles.searchBarInput}
                            placeholder="Enter text to search"
                            returnKeyType="search"
                            onSubmitEditing={(value) => HandleSelect(value)}
                        // placeholderTextColor="#A9A9A9"
                        />
                        <View style={styles.searchBarIconContainer}>
                            <TouchableOpacity>
                                <MaterialIcons name="mic" size={20} color={theme.colors.blue} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <MaterialIcons name="history" size={20} color={theme.colors.blue} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <FlatList
                        data={data}
                        renderItem={({ item }) => renderData({ item })

                        }
                        keyExtractor={(item, index) => `${item.citationID}-${index}`}
                        ListFooterComponent={
                            loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
                        }
                        // onEndReached={onEndReached}
                        // onEndReachedThreshold={0.1}
                        // onMomentumScrollEnd={onMomentumScrollEnd}
                        // initialNumToRender={10}  // Improve initial rendering
                        // maxToRenderPerBatch={10} // Improve batch rendering
                        // windowSize={5}

                        onEndReached={onEndReached}
                        onEndReachedThreshold={0.5}
                    />
                </View>
                <CustomModal
                    visible={isModalVisible}
                    onClose={handleModalClose}
                    data={{ ...(filterData || {}), actNameList }}
                />



            </Background>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },

    item: {
        backgroundColor: '#ffffff',
        padding: 15,
        marginVertical: 5,
        borderRadius: 8,
        borderColor: '#d9d9d9',
        borderWidth: 1,
        // shadowColor:'#d9d9d9',
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.2,
        // shadowRadius: 3,
        // elevation: 2,
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        // color: 'blue',
        color: theme.colors.blue
    },

    highlight: {
        backgroundColor: 'yellow',
        color: 'black',
    },

    judges: {
        fontFamily: 'Signika_600SemiBold'
    },
    courts: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold'
    },
    nominal: {
        fontSize: 16,
        color: '#000',
    },
    combineDod: {
        fontSize: 13,
        color: '#787775',
    },
    noteLText: {
        fontSize: 14,
        color: '#333',
        textAlign: 'justify',
        fontFamily: 'Signika_300Light'
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
        fontFamily: 'Signika_600SemiBold'

    },
    noteContainer: {
        padding: 5,
        backgroundColor: '#eef',
        marginTop: 8,
        borderRadius: 4
    },
    searchWithinStrip: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        padding: 5,
        backgroundColor: '#022555',
        paddingHorizontal: '8%',
        marginVertical: 10
    },
    headnoteStrip: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        // padding: 5,

    },
    Strip: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "flex-end",
        padding: 5,
        backgroundColor: '#022555',
        paddingHorizontal: '8%'
    },
    filterButton: {
        paddingHorizontal: 6
    },
    headnoteFilterButton: {
        paddingHorizontal: 6
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
    dodtextstyle: {
        backgroundColor: '#F0F0F0',
        padding: 8,
        margin: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        color: theme.colors.darkgray
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        paddingVertical: '35%'
    },
    modalContent: {
        width: "80%",
        height: '95%',

        backgroundColor: theme.colors.blue,
        borderRadius: 10,
        padding: 16,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: theme.colors.white
    },
    option: {
        flexDirection: "row",
        alignItems: "center",

        paddingVertical: '4%',
        // borderBottomWidth: 1,
        // borderBottomColor: "#eee",
    },
    optionText: {
        fontSize: 16,
        paddingHorizontal: '5%',
        color: theme.colors.white,
        fontWeight: '600'
    },
    radioButtonContainer: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: theme.colors.white,
        justifyContent: "center",
        alignItems: "center",
    },
    radioButton: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: "transparent",
    },
    radioButtonSelected: {
        backgroundColor: theme.colors.white,
    },


});
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, ScrollView, Image, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { getjudgement } from "../api/api";
import { useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';
import BackButton from "../components/BackButton";
// import { WebView } from 'react-native-webview';
import globalstyle from '../core/Style'
import { Button, Text } from "react-native-paper";
import Modal from "react-native-modal";
import { theme } from "../core/theme";
import { Dimensions } from "react-native";
import { FAB } from 'react-native-paper';
import { AntDesign, FontAwesome } from "@expo/vector-icons";

export default function Judgement({ route }) {
    // const { width } = Dimensions.get('window');
    const scrollViewRef = useRef(null);
    const paragraphRef = useRef(null);
    const [judgement, setJudgement] = useState("");
    const [errorCode, setErrorCode] = useState("");
    const { citationID, citationName, datavalue } = route.params;
    const { width } = useWindowDimensions();

    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [equalCitation, setEqualCitation] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    // const citationName = 'AIROnline 2019 JHA 177';
    const [isDisabled, setIsDisabled] = useState(false);
    const [count, setCount] = useState(0);
    const [isPreviousDisabled, setIsPreviousDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };


    useEffect(() => {
        const showJudgement = async () => {
            // setLoading(true);
            response = await getjudgement(citationID);
            console.log("judgement Response", response.err_code);

            if (response.err_code === "success") {
                setLoading(false);
                setErrorCode(response.err_code);
                setEqualCitation(response.equalCitation);
                setJudgement(response.content.replace(/<html>|<\/html>/g, '')
                    .replace(/<body>|<\/body>/g, '')
                    .replace(/\n/g, '')
                    .trim());
            } else {
                setJudgement("No data found for citation")
            }

        }

        showJudgement();
        // setJudgement(staticResponse.replace(/<html>|<\/html>/g, '')
        //     .replace(/<body>|<\/body>/g, '')
        //     .replace(/\n/g, '')
        //     .trim());


    }, []);


    // const customHTMLElementModels = {
    //     h2: {
    //         validAttributes: {},
    //         render: (htmlNode, children) => {
    //             return (
    //                 <Text style={styles.customHeading}>{children || ''}</Text>
    //             );
    //         },
    //     },
    // };


    // setJudgement(staticResponse);

    const scrollToTop = () => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    };

    const handleLinkPress = () => {
        scrollViewRef.current?.scrollTo({
            y: 500, // Adjust based on the position of jpara-3
            animated: true,
        });
    };

    const scrollToParagraph = () => {
        paragraphRef.current?.measureLayout(
            scrollViewRef.current,
            (x, y) => {
                // Scroll to the exact position of the paragraph
                scrollViewRef.current?.scrollTo({ y, animated: true });
            },
            (error) => console.error('Failed to measure layout', error)
        );
    };

    const renderersProps = {
        a: {
            onPress: (_, attribs) => {
                console.log("jpara", attribs);
                const result = attribs.includes('#') ? attribs.split('#')[1] : null;
                console.log('#' + result);
                if (result) {
                    console.log("Link log", result);
                    // handleLinkPress();
                }
            },
        },
    };

    const filteriButton = () => {

    }
    const filterSortClick = () => {

    }
    const filterCompClick = () => {

    }

    const callApi = async (citation) => {



        try {
            setLoading(true);
            response = await getjudgement(citation);
            console.log("judgement Response", response.err_code);

            if (response.err_code === "success") {
                setLoading(false);
                setErrorCode(response.err_code);
                setEqualCitation(response.equalCitation);
                setJudgement(response.content.replace(/<html>|<\/html>/g, '')
                    .replace(/<body>|<\/body>/g, '')
                    .replace(/\n/g, '')
                    .trim());
            } else {
                setJudgement("No data found for citation");
            }
        } catch (error) {

        }
        finally {
            setLoading(false);
        }
    }
    const filterPostClick = () => {
        datavalue[count];
        console.log("datavalue count", count);
        setCount(prevCount => {
            const newCount = prevCount + 1;
            setIsPreviousDisabled(false);

            callApi(datavalue[newCount].id);

    
            if (newCount >= datavalue.length-1) {
                setIsDisabled(true);
            }

            return newCount;
        });

    }

    const filterPreButton = () => {
        if (count > 0) {
            const newCount = count - 1;
            setCount(newCount);

            setIsDisabled(false);
            console.log("datavalue", datavalue[count - 1].id)
            callApi(datavalue[count - 1].id);

            if (newCount === 0) {
                setIsPreviousDisabled(true);
            }
        }
    }

    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={globalstyle.safearea}>

            {errorCode === 'success' ?
                <View>
                    <View>
                        {equalCitation[0] === citationName ? null : <Button style={{
                            alignSelf: "flex-end", marginVertical: 5,
                        }}
                            // icon="camera" 
                            mode="contained" onPress={openModal}>
                            Equal Citation
                        </Button>
                        }
                    </View>
                    <View style={styles.searchWithinStrip}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <TouchableOpacity style={[styles.filterButton, { opacity: isPreviousDisabled ? 0.5 : 1 }]} disabled={isPreviousDisabled} onPress={filterPreButton}>
                                {/* <AntDesign name="infocirlceo" size={20} color={theme.colors.white} /> */}
                                <Image source={require('../../assets/icons/previous-page.png')}
                                    style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.filterButton} onPress={filterSortClick}>
                                <Image source={require('../../assets/icons/arrow_left.png')}
                                    style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.filterButton} onPress={filterCompClick}>
                                <Image source={require('../../assets/icons/search_white.png')}
                                    style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.filterButton} onPress={filterCompClick}>
                                <Image source={require('../../assets/icons/arrow_right.png')}
                                    style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.filterButton, { opacity: isDisabled ? 0.5 : 1 }]} disabled={isDisabled} onPress={filterPostClick}>
                                <Image source={require('../../assets/icons/next-page.png')}
                                    style={styles.icon} />
                            </TouchableOpacity>
                        </View>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <TouchableOpacity style={styles.filterButton} onPress={filteriButton}>
                                <Image source={require('../../assets/icons/i_icon.png')}
                                    style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.filterButton} onPress={filterSortClick}>
                                <Image source={require('../../assets/icons/font_change_icon.png')}
                                    style={styles.icon} />
                            </TouchableOpacity>

                        </View>
                    </View>

                    <ScrollView ref={scrollViewRef}>

                        <View style={styles.container}>
                            <Image style={{
                                width: 100,
                                height: 100, alignSelf: 'center'
                            }} source={require('../../assets/images/AIR-Logo-Black-New.png')} />

                            <RenderHTML
                                contentWidth={width}
                                source={{ html: judgement }}
                                tagsStyles={tagsStyles}
                                classesStyles={classesStyles}
                                // renderersProps={{ a: { renderersProps } }}
                                renderersProps={renderersProps}
                            />
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={closeModal} // For Android back button
                            >
                                <View style={styles.modalOverlay}>
                                    <View style={styles.modalContent}>
                                        <View>
                                            <Text style={styles.modalTitle}>Select an Item</Text>
                                        </View>
                                        <FlatList
                                            data={equalCitation}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={({ item }) => (
                                                <TouchableOpacity style={styles.itemContainer}>
                                                    <Text style={styles.itemText}>{item}</Text>
                                                </TouchableOpacity>
                                            )}
                                        />
                                        <Button title="Close Modal" style={{ backgroundColor: theme.colors.primary, alignSelf: "flex-end", marginVertical: 5, color: 'white' }} onPress={closeModal} />
                                    </View>
                                </View>
                            </Modal>

                        </View>

                    </ScrollView>
                    <FAB
                        icon="arrow-up"
                        style={styles.fab}
                        onPress={scrollToTop}
                    />
                </View>
                : <View style={{
                    flex: 1,
                    justifyContent: "center"
                }}>
                    <Text style={{ textAlign: 'center' }}>No data found for citation</Text>

                    <Image style={{
                        width: 200,
                        height: 200, alignSelf: 'center',
                    }} source={require('../../assets/images/file-not-found.jpg')} />
                </View>



            }
            {setLoading ? (
                <ActivityIndicator size="large" color="#007BFF" />
            ) : (
                <Text>Error</Text>
            )}



        </SafeAreaView>
    );
}
const tagsStyles = {
    'div': {
        padding: 0,
    },
    'h5': {
        fontSize: 15
    },
    'h6': {
        fontSize: 14,
    },
    'p': {
        textAlign: 'justify'
    },
    'span': {
        fontSize: 15,
        // textFontSize: { fontSize: width / 15 },
        fontWeight: 'bold'
    }
};

const classesStyles = {
    centerContainer: {
        textAlign: "center",
        fontWeight: '600',
        lineHeight: 25,
    },
    citation: {
        fontSize: 22
    },
    advocatesName: {
        // fontWeight: 'bold',
        // textTransform: 'capitalize'
    },
    dod: {
        fontWeight: '500',
        // textTransform: 'capitalize'
    },
    refferedCase: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10
    },
    ref_heading: {
        flexDirection: "row",
        // display:'flex',
        justifyContent: "space-between",
        alignItems: 'center', // Align items vertically in the center
        width: '100%',

    },
    ChronologicalParas: {
        textAlign: 'right'
    },

    refferdCit: {
        flex: 1
    },
    headNote: {
        textAlign: 'justify',
        fontFamily: 'Signika-SemiBold'
    },
    partyName: {
        textTransform: 'capitalize',
        fontWeight: 'bold'
    },
    caseResult: {
        textAlign: 'right',
    },
    judgesName: {
        textTransform: 'uppercase'
    },
    paraNo: {
        flexDirection: 'row', justifyContent: 'flex-end'
    }

    // judgesCount: {
    //     marginLeft:25
    // }
};
const styles = StyleSheet.create({

    safearea: {
        flex: 1,
        paddingHorizontal: 10,
    },
    container: {
        flex: 1,
        justifyContent: "flex-start",
        flexDirection: "column",
        backgroundColor: "#F8F6F4",
        marginTop: 5

    },
    searchWithinStrip: {
        flexDirection: "row",
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: "space-between",
        padding: 7,
        backgroundColor: '#022555',
        paddingHorizontal: '8%',

    },
    filterButton: {
        paddingHorizontal: 6
    },
    customHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    // itemContainer: {
    //     padding: 10,
    //     borderBottomWidth: 1,
    //     borderBottomColor: '#ccc',
    // },
    itemText: {
        fontSize: 16,

    },
    modalOverlay: {
        flex: 1,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',

    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',

        borderRadius: 10,
        alignItems: 'center',
        maxHeight: '70%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,

    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',

    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 25,
    },
    containerStyle: { backgroundColor: 'white', padding: 20 },
    paraNo: {
        flexDirection: 'row', justifyContent: 'flex-end'
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain'
    },


}) 
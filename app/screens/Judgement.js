import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, ScrollView, Image, FlatList, TouchableOpacity } from "react-native";
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

export default function Judgement({ route }) {
    // const { width } = Dimensions.get('window');
    const scrollViewRef = useRef(null);
    const paragraphRef = useRef(null);
    const [judgement, setJudgement] = useState("");
    const [errorCode, setErrorCode] = useState("");
    const { citationID, citationName } = route.params;
    const { width } = useWindowDimensions();

    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [equalCitation, setEqualCitation] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    // const citationName = 'AIROnline 2019 JHA 177';

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    useEffect(() => {
        const showJudgement = async () => {
            response = await getjudgement(citationID);
            console.log("judgement Response", response);

            if (response.err_code === "success") {
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

    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={globalstyle.safearea}>

            {errorCode === 'success' ?
                <View>
                    <View >
                        {equalCitation[0] === citationName ? null : <Button style={{
                            alignSelf: "flex-end", marginVertical: 5,
                        }}
                            // icon="camera" 
                            mode="contained" onPress={openModal}>
                            Equal Citation
                        </Button>
                        }
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
    // ChronologicalParas: {
    //     textAlign: 'right'
    // },

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
    }

}) 
import React, { useEffect, useState, useRef } from "react";
import {
    StyleSheet, View, ScrollView, Image, FlatList, TouchableOpacity, ActivityIndicator, Alert, findNodeHandle,
    UIManager,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { getjudgement, getgeneratepdf, getdownloadpdf } from "../api/api";
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
// import Pdf from 'react-native-pdf';
import { File, Paths } from 'expo-file-system/next';

import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';






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
    const [pdfUri, setPdfUri] = useState('');

    const [fontSize, setFontSize] = useState(16); // Default font size
    const [showControls, setShowControls] = useState(false); // Toggle visibility


    const paragraphRefs = useRef({});

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const [state, setState] = React.useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;

    useEffect(() => {
        const showJudgement = async () => {
            // setLoading(true);
            response = await getjudgement(citationID);
            console.log("judgement Response", response);

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
                setLoading(false);
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

    const handleLinkPress = (event, href, attributes) => {
        console.log("Full Attributes:", attributes);
        console.log("Full href:", href);

        const extractedText = Object.keys(attributes)
    .filter(key => key !== "href") // Remove "href"
    .map(key => key.replace(/"/g, "").toUpperCase()) // Clean & format
    .join(" "); // Join words

console.log(extractedText);
    
        // 🔹 Extract the href ID (e.g., "act-43854" from "#act-43854")
        const referenceID = href.startsWith("#") ? href.substring(1) : href;
    
        console.log("Extracted ID:", referenceID);
    
        // 🔹 Extract the text inside the <a> tag
        let linkText = null;
        if (attributes.children && attributes.children.length > 0) {
            linkText = attributes.children
                .map(child => (child.data ? child.data.trim() : ""))
                .filter(text => text.length > 0)
                .join(" "); // Joins multiple text nodes if present
        }
    
        console.log("Link Text:", linkText); // Should print "Penal Code (45 of 1860)"
    
        // 🔹 If href contains extra text, extract correctly
    let cleanedHref = href.replace(/"/g, "").trim(); // Remove any unwanted quotes
    console.log("Cleaned Href:", cleanedHref); // Expected: `citation AIR 2023 SC 3113`

    // 🔹 Navigate or perform any action
    if (cleanedHref) {
        console.log("Navigating to:", cleanedHref);
        // navigation.navigate("CitationDetails", { citation: citationText, href: cleanedHref });
    }

        
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
            // onPress: (_, attribs) => {
            //     // <strong><a href=\"#act-43854\">Penal Code (45 of 1860)</a>
            //     console.log("jpara", attribs);
            //     const result = attribs.includes('#') ? attribs.split('#')[1] : null;
            //     console.log('#' + result);
            //     if (result) {
            //         console.log("Link log", result);
            //         // handleLinkPress();
            //         const targetRef = paragraphRefs.current[result];

            //         if (targetRef) {
            //             const handle = findNodeHandle(targetRef);
            //             if (handle) {
            //                 UIManager.measureLayout(
            //                     handle,
            //                     scrollViewRef.current?.getScrollableNode(),
            //                     () => { },
            //                     (x, y) => {
            //                         scrollViewRef.current?.scrollTo({ x: 0, y, animated: true });
            //                     }
            //                 );
            //             }
            //         }
            //     }
            // },

            onPress: (_, attribs) => {
                console.log("jpara", attribs); // Debugging

            
                // Extract href (e.g., "#act-43854")
                const href = attribs.href || "";
                console.log("href", href);
                const result = href.includes('#') ? href.split('#')[1] : null;
            
                console.log("Extracted ID:", '#' + result);
            
                // 🔹 Ensure `attribs.children` exists before accessing data
                let linkText = null;
                if (attribs.children && attribs.children.length > 0) {
                    linkText = attribs.children.map(child => child.data).join(''); // Extract text properly
                }
            
                console.log("Link Text:", linkText); // Should print "Penal Code (45 of 1860)"
            
                if (result) {
                    console.log("Link log", result);
                    const targetRef = paragraphRefs.current[result];
            
                    if (targetRef) {
                        const handle = findNodeHandle(targetRef);
                        if (handle) {
                            UIManager.measureLayout(
                                handle,
                                scrollViewRef.current?.getScrollableNode(),
                                () => { },
                                (x, y) => {
                                    scrollViewRef.current?.scrollTo({ x: 0, y, animated: true });
                                }
                            );
                        }
                    }
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


            if (newCount >= datavalue.length - 1) {
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
    const downloadPDF = async () => {

        response = await getgeneratepdf(citationID);
        console.log('judgement data', response);

        if (response.data.err_code === 'success') {

            const response1 = await getdownloadpdf(response.data.pdf_path);
            console.log('download data', response1.data)
            console.log('download data1', response1.data.request.responseURL)



            if (response1.data.status === 200) {
                // saveFile(response1.data.data._data)
                download(response1.data.request.responseURL)
            }
            else {
                Alert.alert('Error fetching data');
            }

            //    console.log('download data',response1.data.request.responseURL)
            //    const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };

            console.log('pdf link', response.data.pdf_path)


        }
    }

    const download = async (url) => {
        try {
            const pdfUrl = url; // Change to your PDF URL
            const fileUri = FileSystem.documentDirectory + 'myfile.pdf';

            console.log('Downloading PDF...');
            const downloadObject = FileSystem.createDownloadResumable(pdfUrl, fileUri);
            const { uri } = await downloadObject.downloadAsync();

            if (uri) {
                setPdfUri(uri);
                console.log("pdf saved at", uri);
                Alert.alert('Download Complete', 'PDF saved successfully!');
            }
        } catch (error) {
            console.error('Download Error:', error);
            Alert.alert('Error', 'Failed to download PDF');
        }
    };



    const saveFile = async (byteArray) => {
        const hasPermission = await requestPermission();
        if (!hasPermission) return;

        // const url = pdf_path;

        // const fileUri = `${FileSystem.cacheDirectory}sample.pdf`; // Destination path

        // try {
        //     const { uri } = await FileSystem.downloadAsync(url, fileUri);
        //     console.log('✅ PDF downloaded to:', uri);
        // } catch (error) {
        //     console.error('❌ Error downloading PDF:', error);
        // }

        // for saving pdf with content
        const fileUri = `${FileSystem.documentDirectory}output.pdf`; // Safe directory
        const base64Data = RNFetchBlob.base64.encode(byteArray);
        try {
            await FileSystem.writeAsStringAsync(fileUri, base64Data, 'base64');
            console.log('File saved at:', fileUri);
        } catch (error) {
            console.error('Error saving file:', error);
        }



        // const pdfUrl = "https://aisnagpur.com/aironline/api/pdf/download-pdf?filePath=%2Fmnt%2Fxvdb%2Fapache-tomcat-10.1.34%2Ftemp%2Foutput.pdf";
        // const fileUri = `${FileSystem.documentDirectory}output.pdf`; // Save to app directory

        // try {
        //     console.log("📥 Downloading PDF...");
        //     const { uri } = await FileSystem.downloadAsync(pdfUrl, fileUri);
        //     console.log("✅ PDF saved at:", uri);

        //     return uri;
        // } catch (error) {
        //     console.error("❌ Error downloading PDF:", error);
        // }







        // const fileUri = FileSystem.documentDirectory + 'downloaded.pdf';

        // const res = await FileSystem.downloadAsync(url, fileUri);
        // console.log('PDF saved at:', res.uri);

        // try {
        //     const fileUri = FileSystem.documentDirectory + 'downloaded.pdf';

        //     // Convert byte array to Base64
        //     const base64String = Buffer.from(byteArray).toString('base64');

        //     // Save the Base64 string as a PDF file
        //     await FileSystem.writeAsStringAsync(fileUri, base64String, { encoding: FileSystem.EncodingType.Base64 });

        //     console.log('PDF saved at:', fileUri);
        //   } catch (error) {
        //     console.log('Download error:', error);
        //   }


    };
    const requestPermission = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access media library is required!');
            return false;
        }
        return true;
    };

    // Increase font size
    const increaseFontSize = () => {
        setFontSize((prev) => (prev < 24 ? prev + 2 : prev));
    };

    // Decrease font size
    const decreaseFontSize = () => {
        setFontSize((prev) => (prev > 12 ? prev - 2 : prev));
    };
    const closeControls = () => {
        if (showControls) {
            setShowControls(false);
        }
    };

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
                            <TouchableOpacity style={[styles.filterButton]} onPress={() => setShowControls(!showControls)}>
                                <Image source={require('../../assets/icons/font_change_icon.png')}
                                    style={styles.icon} />
                            </TouchableOpacity>


                        </View>

                    </View>
                    {/* Overlay View for Font Size Controls */}
                    {showControls && (
                        <View style={styles.overlayContainer}>
                            <View style={styles.controls}>
                                <TouchableOpacity onPress={decreaseFontSize} style={styles.controlButton}>
                                    <Text style={styles.buttonText}>A-</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={increaseFontSize} style={styles.controlButton}>
                                    <Text style={styles.buttonText}>A+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}


                    <ScrollView ref={scrollViewRef}>

                        <View style={styles.container}>
                            <Image style={{
                                width: 100,
                                height: 100, alignSelf: 'center'
                            }} source={require('../../assets/images/AIR-Logo-Black-New.png')} />
                            <ScrollView ref={scrollViewRef} style={{ padding: 10 }}>
                                <RenderHTML
                                    contentWidth={width}
                                    source={{ html: judgement }}
                                    tagsStyles={tagsStyles}
                                    classesStyles={classesStyles}
                                    defaultTextProps={{ style: { fontSize: fontSize, lineHeight: fontSize * 1.0 } }}
                                    
                                    // renderersProps={renderersProps}
                                    renderersProps={{ a: { onPress: handleLinkPress } }}
                                    enableExperimentalMarginCollapsing={true}
                                    // onLinkPress={handleLinkPress}
                                    systemFonts={["Arial", "Roboto", "Helvetica"]}

                                    renderers={{
                                        p: ({ TDefaultRenderer, ...props }) => {
                                            const { id } = props.tnode.attributes;
                                            return (
                                                <View
                                                    ref={(el) => {
                                                        if (id) paragraphRefs.current[id] = el;
                                                    }}
                                                >
                                                    <TDefaultRenderer {...props} />
                                                </View>
                                            );
                                        },
                                    }}
                                />
                            </ScrollView>
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


            {/* <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf}/> */}
            <FAB
                icon={() => <FontAwesome name="arrow-circle-o-up"

                    size={27} color="white" />}

                style={styles.fab}
                onPress={scrollToTop}
                fabStyle={styles.transparentFab}
            // stylzssrtrt e={styles.iconImage}


            />

            <FAB.Group
                open={open}
                visible
                icon={() => (
                    <Image
                        source={
                            open
                                ? require('../../assets/icons/closed.png') // Path to 'calendar-today' equivalent
                                : require('../../assets/icons/floating_share.png') // Path to 'plus' equivalent
                        }
                        style={styles.iconImage}
                    />
                )}
                actions={[
                    {
                        icon: () => (
                            <Image
                                source={require('../../assets/icons/case_research.png')}
                                style={styles.iconImage}
                            />
                        ),
                        label: 'Case Research',
                        onPress: () => console.log('Pressed star'),
                        style: styles.transparentFab,
                    },
                    {
                        icon: () => (
                            <Image
                                source={require('../../assets/icons/add_folder.png')}
                                style={styles.iconImage}
                            />
                        ),
                        label: 'Add to folder',
                        onPress: () => console.log('Pressed email'),
                        style: styles.transparentFab,
                    },
                    {
                        icon: () => (
                            <Image
                                source={require('../../assets/icons/save_as_pdf.png')}
                                style={styles.iconImage}
                            />
                        ),
                        label: 'Save as pdf',
                        onPress: () => downloadPDF(),
                        style: styles.transparentFab,
                    },
                    {
                        icon: () => (
                            <Image
                                source={require('../../assets/icons/email.png')}
                                style={styles.iconImage}
                            />
                        ),
                        label: 'E-mail',
                        onPress: () => console.log('Pressed notifications'),
                        style: styles.transparentFab,
                    },
                    {
                        icon: () => (
                            <Image
                                source={require('../../assets/icons/share.png')}
                                style={styles.iconImage}
                            />
                        ),
                        label: 'share',
                        style: styles.transparentFab,
                        onPress: () => console.log('Pressed notifications'),
                    },
                ]}
                theme={{
                    colors: {
                        backdrop: 'rgba(0, 0, 0, 0)',
                    },
                }}
                fabStyle={styles.transparentFab}
                onStateChange={onStateChange}
                onPress={() => {
                    if (open) {
                        // do something if the speed dial is open
                    }
                }}
            />


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
    },



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
    aButton: {
        backgroundColor: "black",
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-end",
        marginBottom: 10,
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
        margin: 10,
        right: 0,
        bottom: 0,
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
    iconImage: {
        width: 34,
        height: 34,
        resizeMode: 'contain',
        backgroundColor: 'transparent',
    },
    transparentFab: {
        backgroundColor: 'transparent',
        // backgroundColor: '#6200ea',
        elevation: 0,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    selectorContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        width: '90%',
        marginTop: 10,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4, // Android shadow
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sliderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
    },
    dot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        marginHorizontal: 15,
    },
    activeDot: {
        backgroundColor: 'darkred',
    },
    inactiveDot: {
        backgroundColor: 'lightgray',
    },
    defaultText: {
        color: 'gray',
        fontSize: 14,
        marginTop: 5,
        alignSelf: 'center',
    },
    activeText: {
        color: 'black',
        fontWeight: 'bold',
    },
    overlay: {
        // position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.3)", // Semi-transparent background
        justifyContent: "center",
        alignItems: "center",
    },
    overlayContainer: {
        position: "absolute",
        top: 50, // Adjust the position below the font change button
        right: 20, // Align with the right side
        backgroundColor: "white",
        padding: 10,
        borderRadius: 8,
        elevation: 10, // Android shadow
        shadowColor: "#000", // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        zIndex: 9999, // Ensure it's above other views
    },
    controls: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    controlButton: {
        backgroundColor: theme.colors.blue,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },

}) 
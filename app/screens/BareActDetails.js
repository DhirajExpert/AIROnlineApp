import React, { useEffect, useState, useRef } from "react"
import { Text, StyleSheet, View, Image, ScrollView, ActivityIndicator } from "react-native"
import { getActFullText } from "../api/api";
import RenderHTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { WebView } from 'react-native-webview';
// import { XMLParser } from "fast-xml-parser";


const BareActDetails = ({ navigation, route }) => {
    const { actName, actID } = route.params;
    const [loading, setLoading] = useState(false);
    const [judgement, setJudgement] = useState("");
    const [errorCode, setErrorCode] = useState("");
    const scrollViewRef = useRef(null);
    const { width } = useWindowDimensions();
    const paragraphRefs = useRef({});


    useEffect(() => {
        bareActFullText()
    }, []);

    const bareActFullText = async () => {
        const response = await getActFullText(actName, actID);
        console.log("bare act", response.actData[0].Full_Act_Text);
        console.log("bare act code", response.err_code);

        if (response.err_code === "success") {
            setLoading(false);
            setErrorCode(response.err_code);
            // setEqualCitation(response.equalCitation);
            setJudgement(response.actData[0].Full_Act_Text.replace(/<html>|<\/html>/g, '')
                .replace(/<body>|<\/body>/g, '')
                .replace(/\n/g, '')
                .trim());
            setJudgement(response.actData[0].Full_Act_Text)
        } else {
            setJudgement("No data found for citation")
            setLoading(false);
        }
    }
    const parseXML = (xmlData) => {
        const parser = new XMLParser();
        return parser.parse(xmlData);
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

    const handleLinkPress = (event, href) => {
        if (href.startsWith("#")) {
            const id = href.substring(1); // Extracts "jpara-13" from "#jpara-13"
            const targetRef = paragraphRefs.current[id];

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
    };

    return (
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
                    // renderersProps={{ a: { renderersProps } }}
                    renderersProps={renderersProps}
                    enableExperimentalMarginCollapsing={true}
                    onLinkPress={handleLinkPress}

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

                {/* <WebView
                    originWhitelist={['*']}
                    source={{ html: judgement }}
                /> */}
            </ScrollView>

            {/* {setLoading ? (
                <ActivityIndicator size="large" color="#007BFF" />
            ) : (
                <Text>Error</Text>
            )} */}
        </View>
    )
}

export default BareActDetails;


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


})
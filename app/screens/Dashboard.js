import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions, TouchableOpacity, TextInput, Button, Alert, Image, Pressable } from 'react-native';
import FilterScreen from './FilterScreen';
import CustomModal from '../components/CustomModal';
import Background from '../components/Background';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { theme } from "../core/theme"
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyle from "../core/Style";
import { ScrollView } from 'react-native-gesture-handler';
import useAuthStore from '../authStore';




const data = [
    { id: '1', name: 'Citation Module' },
    { id: '2', name: 'Court Module' },
    { id: '3', name: 'Lawyer Module' },
    { id: '4', name: 'Browse by Bench' },
    { id: '5', name: 'Browse By Judgement' },
    { id: '6', name: 'Nominal Module' },
    { id: '7', name: 'Topical  Search' },
    { id: '8', name: 'Article' },
    { id: '9', name: 'BrowseBy Judge' },
    { id: '10', name: 'Acts & Sections' },
    { id: '11', name: 'Test' },
    { id: '12', name: 'About Us' },
    { id: '13', name: 'Profile' },
    { id: '14', name: 'new' },
    { id: '15', name: 'New1' },
];
const data1 = [
    { id: '1', name: 'Citation Module', path: require('../../assets/images/citation_logo.png') },
    { id: '2', name: 'Court Module', path: require('../../assets/images/bareact_logo.png') },
    { id: '3', name: 'Lawyer Module', path: require('../../assets/images/actsection_logo.png') },
    { id: '4', name: 'Browse by Bench', path: require('../../assets/images/bareact_logo.png') },

];


const numColumns = 3;
const numColumn = 2;

export default function Dashboard({ navigation }) {
    const [isModalVisible, setModalVisible] = useState(false);

    const [name, setName] = useState({ value: "", error: "" });
    const [loading, setLoading] = useState(false);
    const [expandedNotes, setExpandedNotes] = useState({});
    const logout = useAuthStore((value) => value.logout)

    const itemclick = (id) => {
        console.log("itemclick", id);
        switch (id) {
            case '1':
                navigation.navigate('CitationSearch1');
                break;
            case '2':
                navigation.navigate('BrowseByCourt');
                break;
            case '3':
                navigation.navigate('BrowseByLawyer');
                break;
            case '4':
                navigation.navigate('BenchStrength');
                break;
            case '5':
                navigation.navigate('JudgementDate');
                break;
            case '6':
                navigation.navigate('NominalSearch');
                break;
            case '7':
                navigation.navigate('TopicalSearch');
                break;
            case '8':
                navigation.navigate('Articles');
                break;
            case '9':
                navigation.navigate('BrowseByJudge');
                break;
            case '10':
                navigation.navigate('ActSection');
                break;
            case '11':
                navigation.navigate('TestDropdown');
                break;
            case '12':
                navigation.navigate('Statutes');
                break;
            case '13':
                navigation.navigate('Profile');
                break;
            case '14':
                navigation.navigate('SocialShare');
                break;
            case '15':
                navigation.navigate('SocialShare');
                break;
            default:
        }

    }

    const ftsResponse = {
        "docCount": 2,
        "err_code": "success",
        "digestView": [
            {
                "citationID": "AIROnline2024ALL567",
                "citationName": "AIROnline 2024 ALL 567",
                "judgeName": "Arun Bhansali ,C.J. AND Jaspreet Singh ,J.",
                "courts": "Allahabad High Court",
                "combineDod": "Special Appeal No. - 347 of 2017, D/-2024-04-03 ",
                "nominal": "Ramesh Chandra Dwivedi Vs. State Of U.P",
                "topic": null,
                "advocate_app": "",
                "advocate_res": "",
                "highlightedShortHeadNotes": [
                    "Constitution of India, Art.226, Art.309— U.P. Technical <em>Education</em> Department Non-Gazetted Technical Service Rules , R.26— Pay parity - Claim for - Petitioners were appointed on various posts before coming into force of the Rules of 1988 and one petitioner was appointed after enforcement of Rules - Requirement of educational qualifications for said posts indicated in advertisements issued at relevant time, were based on then existing Government Order issued in 1982 - Admittedly, qualifications indicated in said advertisement were not equivalent to requisite qualifications indicated for post of 'Workshop Instructor' under Rules of 1988 - Further, cadre in which petitioners were recruited, was declared as dying cadre - Very fact that requisite educational qualification for posts held by petitioners was lower than that meant for post of Workshop Instructor, foundational requirement for claiming equivalence was missing - Petitioners were not entitled to relief claimed AIROnline 2017 All 173-AffirmedAIROnline 2023 SC 137-Relied on (Para 11 16 17)"
                ],
                "highlightedLongNotes": [],
                "highlightedJudgementText": [
                    "Reliance was placed on Director of Elementary <em>Education</em>, Odisha and others v. Pramod Kumar Sahoo: 2019(10) SCC 674 : (<a href=\"AIR 2019 SC 4755\">AIR 2019 SC 4755</a>) and Union of India v. "
                ],
                "propertyCount": 0,
                "erp_ID": "805643",
                "shortNote": [
                    {
                        "lnote": "",
                        "snote": "Constitution of India, Art.226, Art.309— U.P. Technical Education Department Non-Gazetted Technical Service Rules , R.26— Pay parity - Claim for - Petitioners were appointed on various posts before coming into force of the Rules of 1988 and one petitioner was appointed after enforcement of Rules - Requirement of educational qualifications for said posts indicated in advertisements issued at relevant time, were based on then existing Government Order issued in 1982 - Admittedly, qualifications indicated in said advertisement were not equivalent to requisite qualifications indicated for post of 'Workshop Instructor' under Rules of 1988 - Further, cadre in which petitioners were recruited, was declared as dying cadre - Very fact that requisite educational qualification for posts held by petitioners was lower than that meant for post of Workshop Instructor, foundational requirement for claiming equivalence was missing - Petitioners were not entitled to relief claimed AIROnline 2017 All 173-AffirmedAIROnline 2023 SC 137-Relied on (Para 11 16 17)"
                    }
                ]
            },
            {
                "citationID": "AIROnline1999Bom2",
                "citationName": "AIROnline 1999 Bom 2",
                "judgeName": "[Ljava.lang.String;@6d248fae  J.",
                "courts": "Bombay High Court",
                "combineDod": "Writ Petition No. - 545 of 1985, D/-1999-12-08 ",
                "nominal": "Sudhakar Vinayak Karegaonkar Vs. State of Maharashtra",
                "topic": null,
                "advocate_app": "",
                "advocate_res": "",
                "highlightedShortHeadNotes": [
                    "(B) Constitution of India, Art.12, Art.226— \"State\" under Art. 12 - Nanded <em>Education</em> Society - Is \"State\" within meaning of Art. 12 - Is therefore amenable to writ jurisdiction. "
                ],
                "highlightedLongNotes": [],
                "highlightedJudgementText": [
                    "The respondent No. 3 (the Nanded <em>Education</em> Society at Nanded) is a society registered under the Bombay Public Trusts Act, and is running educational institutions like schools, colleges etc. at and around Nanded. "
                ],
                "propertyCount": 0,
                "erp_ID": "406267",
                "shortNote": [
                    {
                        "lnote": "",
                        "snote": "(A) Maharashtra Employees of Private Schools (Conditions of Service) Regulation Act (3 of 1978), S.2, S.9— Appeal against termination - Maintainability - Society engaged in running only educational institutions and not prescribed separate set of rules to govern service conditions of employee working in its office - Employee working in office of society, terminated - Society come under definition of S.2 - Appeal filed by employee against his termination, maintainable under S.9. (Para 17)"
                    },
                    {
                        "lnote": "",
                        "snote": "(B) Constitution of India, Art.12, Art.226— \"State\" under Art. 12 - Nanded Education Society - Is \"State\" within meaning of Art. 12 - Is therefore amenable to writ jurisdiction. (Para 12)"
                    }
                ]
            }
        ],
        "filter": {
            "courts": [
                {
                    "name": "allahabad high court",
                    "count": 1
                },
                {
                    "name": "bombay high court",
                    "count": 1
                }
            ],
            "judges": [
                {
                    "name": "a. s. bagga",
                    "count": 1
                },
                {
                    "name": "arun bhansali",
                    "count": 1
                },
                {
                    "name": "b. h. marlapalle",
                    "count": 1
                },
                {
                    "name": "jaspreet singh",
                    "count": 1
                }
            ],
            "benchStrenth": [
                {
                    "name": "2",
                    "count": 2
                }
            ],
            "topic": [
                {
                    "name": "service laws",
                    "count": 1
                },
                {
                    "name": "service laws constitution",
                    "count": 1
                }
            ],
            "remark": [],
            "nominalApp": [
                {
                    "name": "ramesh chandra dwivedi",
                    "count": 1
                },
                {
                    "name": "sudhakar vinayak karegaonkar",
                    "count": 1
                }
            ],
            "nominalRes": [
                {
                    "name": "state of maharashtra",
                    "count": 1
                },
                {
                    "name": "state of u.p",
                    "count": 1
                }
            ],
            "caseResult": [
                {
                    "name": "appeal dismissed",
                    "count": 1
                },
                {
                    "name": "petition allowed",
                    "count": 1
                }
            ],
            "decisionYear": [
                {
                    "name": "1999",
                    "count": 1
                },
                {
                    "name": "2024",
                    "count": 1
                }
            ]
        }
    }

    const renderItemData = ({ item }) => {
        return (
            <View style={styles.gridItem}>
                <TouchableOpacity onPress={() => itemclick(item.id)}>
                    <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        );
    }
    const renderGridData = ({ item }) => {
        return (
            <View style={styles.gridItem}>
                <TouchableOpacity onPress={() => itemclick(item.id)}>
                    <View style={{ alignContent: 'center', alignItems: 'center' }}>
                        <Image source={item.path} resizeMode='contain' style={{ width: 36, height: 36 }} />
                        <Text style={styles.itemText}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
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

                <Text style={globalStyle.noteText}>{snoteText}</Text>
                {/* {highlightText(snoteText, searchword)} */}
                {/* {isExpanded &&
                        // <Text style={globalStyle.noteLText}>{item.lnote}</Text>
                        highlightText(lnoteText, searchword)
                    } */}
                {/* {item.snote && (
                        <TouchableOpacity onPress={() => toggleExpansion(citationID, index)}>
                            <Text style={globalStyle.showMoreText}>
                                {isExpanded ? 'Show Less' : 'Show More'}
                            </Text>
                        </TouchableOpacity>
                    )} */}

                {/* {item.lnote && (
                        <TouchableOpacity onPress={() => toggleExpansion(citationID, index)}>
                            <Text style={globalStyle.showMoreText}>
                                {isExpanded ? 'Show Less' : 'Show More'}
                            </Text>
                        </TouchableOpacity>
                    )} */}
            </View>
        );
    };

    const handlePress = (event) => {
        if ((event.nativeEvent.text).length < 3) {
            Alert.alert("please search more than 3 characters");
        }
        else {
            console.log("Success");
            navigation.navigate('FreeTextSearchDetails', {
                searchword: event.nativeEvent.text
            })
        }
    };

    const logoutpress = async () => {
        await logout();
    }

    const openModal = () => {
        console.log("button click");
        // setModalVisible(true)
        navigation.navigate('HelpSupport');
    }
    const CitationClick = (citationName, citationID) => {
        console.log("Citation Click", citationName + citationID);

        navigation.navigate('Judgement', {
            citationID: citationID,
            citationName: citationName,
        }
        )
    }

    const onSubmitHandler = (event) => {
        console.log("Submit is click", event.nativeEvent.text);
    }
    return (
        <SafeAreaView edges={['left', 'right',]} style={styles.safearea}>
            {/* <ScrollView> */}
                <Background>
                    <View style={styles.container}>

                        {/* <View style={{ flexDirection: 'row' }}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(noteText) =>
                        setName({ value: text, error: "" })
                    }
                    value={name.value}
                    placeholderTextColor='white'
                    underlineColorAndroid='transparent'>
                </TextInput>
                <TouchableOpacity onPress={() => submit()} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </View> */}


                        <View style={styles.searchBarContainer}>
                            <FontAwesome name="search" size={20} color={theme.colors.red} style={styles.searchBarIcon} />
                            <TextInput
                                style={styles.searchBarInput}
                                placeholder="Enter text to search"
                                returnKeyType="search"
                                onSubmitEditing={(event) => handlePress(event)}
                            // placeholderTextColor="#A9A9A9"
                            />
                            <View style={styles.searchBarIconContainer}>
                                <TouchableOpacity >
                                    <MaterialIcons name="mic" size={20} color={theme.colors.blue} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <MaterialIcons name="history" size={20} color={theme.colors.blue} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <FlatList
                            data={data1}
                            renderItem={({ item }) => renderGridData({ item })}
                            keyExtractor={(item) => item.id}
                            numColumns={numColumn}
                            contentContainerStyle={styles.grid}
                            scrollEnabled={false}
                        />
                        <View style={styles.judgementupdatecontainer}>
                            <Text style={styles.judgementupdatelabel}>Judgement News/Updates</Text>
                            <MaterialIcons name="arrow-forward-ios" size={20} color={theme.colors.blue} />
                        </View>
                        <View style={[styles.judgementupdatecontainer, { paddingVertical: '2%' }]}>

                            <TouchableOpacity style={styles.judgementbuttonstyle}>
                                <Text style={styles.judgementbuttontext}>All Courts</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.judgementbuttonstyle}>
                                <Text style={styles.judgementbuttontext}>Supreme Court</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.judgementbuttonstyle}>
                                <Text style={styles.judgementbuttontext}>High Courts</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ padding: 15, backgroundColor: '#FFFFFF', shadowColor: '#000' }}>
                            <FlatList
                                data={ftsResponse.digestView.slice(0, 1)}

                                renderItem={({ item }) =>
                                (
                                    <View style={styles.item}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <Pressable onPress={() => CitationClick(item.citationName, item.citationID)}>
                                                <Text style={styles.title} >{item.citationName}</Text>
                                            </Pressable>
                                            <TouchableOpacity style={styles.headnoteFilterButton} onPress={() => CitationClick(item.citationName, item.citationID)}>
                                                <Image source={require('../../assets/images/judgement_open.png')} resizeMode="contain" style={{ width: 24, height: 24 }} />
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={globalStyle.courts}>{item.courts}</Text>
                                        <Text style={globalStyle.judgeName}>HON'BLE JUDGE(S): {item.judgeName}</Text>

                                        <FlatList

                                            data={item.shortNote}
                                            renderItem={({ item, index }) => renderShortNote({ item, index, citationID: item.citationID })}
                                            keyExtractor={(note, index) => index.toString()}
                                            // onEndReached={onEndReached}
                                            // onEndReachedThreshold={0.1}
                                            // onMomentumScrollEnd={onMomentumScrollEnd}
                                            ListFooterComponent={
                                                loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
                                            }

                                        />
                                        {/* <View style={styles.headnoteStrip}>
                                   
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                        <TouchableOpacity style={styles.headnoteFilterButton} onPress={() => openBookmark()}>
                                            <Image source={require('../../assets/images/bookmark.png')} resizeMode="contain" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.headnoteFilterButton} onPress={() => CitationClick(item.citationName, item.citationID)}>
                                            <Image source={require('../../assets/images/judgement_open.png')} resizeMode="contain" />
                                        </TouchableOpacity>

                                    </View>
                                </View> */}

                                    </View>)
                                }
                                keyExtractor={item => item.citationID}
                            />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            margin: 10,
                        }}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Search your keyword"
                                value={name.value}
                                onChangeText={(text) => setName({ value: text, error: "" })}
                            />
                            <Button
                                title="Submit"
                                mode="contained"
                                onPress={logoutpress}
                            >Logout</Button>
                        </View>
                        <Button
                            title="Submit"
                            mode="contained"
                            onPress={openModal}
                        >Search</Button>

                        <FlatList
                            data={data}
                            renderItem={({ item }) => renderItemData({ item })}
                            keyExtractor={(item) => item.id}
                            numColumns={numColumns}
                            contentContainerStyle={styles.grid}
                        />
                        <CustomModal
                            visible={isModalVisible}
                            onClose={() => setModalVisible(false)}
                        />
                    </View>
                </Background>
            {/* </ScrollView> */}
        </SafeAreaView>

    );
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#f5f5f5',
        paddingHorizontal: '5%'
    },
    grid: {
        // paddingHorizontal: 10,

    },
    safearea: {
        flex: 1,
        // paddingHorizontal: 20,
    },
    gridItem: {
        flex: 1,
        margin: "4.5%",
        aspectRatio: 1.8,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    itemText: {
        color: theme.colors.blue,
        fontSize: 12,
        fontWeight: '500',
        margin: 5
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        marginRight: 10,
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
    judgementupdatelabel: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.blue
    },
    judgementupdatecontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '6%',

    },

    judgementbuttonstyle: {
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        padding: '2%',

    },
    judgementbuttontext: {
        color: theme.colors.blue
    }
});
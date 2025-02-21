import react, { useState, useEffect, useRef } from "react"
import { StyleSheet, View, FlatList, Pressable, Text, TouchableOpacity, ActivityIndicator, Modal, Alert, Image } from "react-native"
// import TextInput from "../components/TextInput";
// import Button from '../components/Button';
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context"
import AntDesign from "@expo/vector-icons/AntDesign"
import CheckBox from "expo-checkbox";
import { TextInput, Button, } from "react-native-paper";
import { getDefaultArticle, getArticleSearch, getArticleAuthorSearch, getArticleKeywordSearch, getApi, getQueryApi } from "../api/api";
import globalStyle from "../core/Style";
import { useWindowDimensions } from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { theme } from "../core/theme"
import Background from "../components/Background";


export default function Articles({ navigation }) {
    const [name, setName] = useState({ value: "", error: "" });
    const [popupName, setPopupName] = useState({ value: "", error: "" });

    const [offset, setOffset] = useState(0);
    const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 90 }).current;
    const [data, setData] = useState([]);
    const onEndReachedCalledDuringMomentum = useRef(false);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

    const { width } = useWindowDimensions();
    const fontSize = Math.min(width / 30, 16);

    const [selectedItems, setSelectedItems] = useState([]);
    const [modalInput, setModalInput] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [filteredInputData, setFilteredInputData] = useState();
    const [searchInput, setSearchInput] = useState('');

    const buttonData = [
        { title: "Article Title", icon: "article", onPress: clickTitle },
        { title: "Article Author", icon: "assignment-ind", onPress: clickAuthor },
        // { title: "Article Keywords", icon: "dataset", onPress: clickKeyword },
        // { title: "Article Hitlist", icon: "dvr", onPress: clickHitlist },
    ];

    function clickTitle() {

        openModal('Article Title');
    }
    function clickAuthor() {
        openModal('Article Author');
    }
    function clickKeyword() {
        openModal('Article Keywords');
    }
    function clickHitlist() {

    }


    const handleSelect = (item) => {
        console.log("pressed", item);
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter((i) => i !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    useEffect(() => {
        showArticle();
    }, []);
    const showArticle = async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const response = await getDefaultArticle(10, `${offset}`);
            console.log("getDefaultArticle", response);

            if (response.err_code === 'success') {
                console.log("count", response.count);

                if (response.count > 0) {

                    setData((prevData) => [...prevData, ...response.articleData.slice(0, 3)]);
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

    const onEndReached = () => {
        if (!onEndReachedCalledDuringMomentum.current) {
            showArticle();
            onEndReachedCalledDuringMomentum.current = true;
        }
    };
    const onMomentumScrollEnd = () => {
        onEndReachedCalledDuringMomentum.current = false;
    };
    const openFilter = () => {
        console.log("filter button is clicked");
        setModalVisible(!isModalVisible);

    }
    const showModel = () => {
        setModalVisible(!isModalVisible)
    }
    const articleClick = (article_ID) => {
        navigation.navigate('ArticleDetails', {
            articleID: article_ID
        })
    }

    const handleSearch = async (text) => {
        // setQuery(text);
        console.log("modalInput", modalInput);
        setPopupName({ value: text, error: "" });
        if (modalInput === 'Article Title') {
            await ArticleSearch(text);
        } else if (modalInput === 'Article Author') {
            await ArticleAuthorSearch(text);
        }
        else if (modalInput === 'Article Keywords') {
            await ArticleKeywordSearch(text);
        }

    };

    const ArticleSearch = async (word) => {
        const response = await getArticleSearch(word);
        console.log("ArticleSearch", response);

        if (response.err_code === 'success') {
            const filtered = response.articleDatasuggesion[0].article_title_suggesions.map(
                (item) =>
                    item.Article_Title
            );

            setFilteredData(filtered);
        }
        else if (response.err_code === 'ERR_01') {
            setFilteredData([]);
        }
    }
    const ArticleAuthorSearch = async (word) => {
        const response = await getArticleAuthorSearch(word);
        console.log("ArticleSearch", response);
        if (response.err_code === 'success') {
            const filtered = response.articleDatasuggesion[0].article_author_suggesions.map(
                (item) =>
                    item.Article_Author
            );
            setFilteredData(filtered);
        }
        else if (response.err_code === 'ERR_01') {
            setFilteredData([]);
        }
    }
    const ArticleKeywordSearch = async (word) => {
        const response = await getArticleKeywordSearch(word);
        console.log("ArticleSearch", response);
        if (response.err_code === 'success') {
            const filtered = response.articleDatasuggesion[0].article_keywords_suggesions.filter((item) =>
                item.toLowerCase().includes(word.toLowerCase())
            );
            setFilteredData(filtered);
        }
        else if (response.err_code === 'ERR_01') {
            setFilteredData([]);
        }
    }
    const onsubmit = (selected_list, modalInput) => {

        setModalVisible(false);

        console.log("modalInput ", modalInput);
        const list = selected_list.join("&searchString=");

        const result = selected_list.map(str => `searchString:${str}`).join(', ');
        setPopupName({ value: "", error: "" });
        setFilteredData([]);
        setSelectedItems([]);
        console.log("selected list ", list);
        console.log("selected new list ", result);

        navigation.navigate('ArticleDigestView',
            {
                searchString: selected_list,
                searchInput: modalInput
            }
        )
    }
    const openModal = (type) => {
        setModalVisible(true);
        setModalInput(type);

    }
    const handleSearchInput = (text) => {
        setSearchInput(text);
        setName({ value: text, error: "" })
        setDropdownVisible(true)
        ApiCall(text);
    };
    const handleSearchQuery = () => {

        if (!name.value) {
            Alert.alert("please select search content");
        }
        else {
            navigation.navigate('ArticleDigestView',
                {
                    searchString: name.value
                }
            )
        }

    };

    const handleInputSelect = () => {
        setDropdownVisible(false);
        console.log("select item", name.value);
        console.log("handleSelect", searchInput);

        navigation.navigate('ArticleDigestView', {
            searchString: name.value,
            searchInput: searchInput
        })
    }
    const ApiCall = async (text) => {
        const response = await getApi(text)
        console.log("response", response);
        const transformedData = transformApiResponse(response);
        console.log(transformedData);
        setFilteredInputData(transformedData);
    }

    const QueryApi = async (text) => {
        const response = await getQueryApi(text)
        console.log("response", response);

    }

    const transformApiResponse = (response) => {
        const data = [];

        if (response.articleDatasuggesion[0] && response.articleDatasuggesion[0].article_title_suggesions) {
            const titles = response.articleDatasuggesion[0].article_title_suggesions.map((item) => item.Article_Title);
            data.push({ heading: 'Article Title', items: titles });
        }

        if (response.articleDatasuggesion[1] && response.articleDatasuggesion[1].article_author_suggesions) {
            const authors = response.articleDatasuggesion[1].article_author_suggesions.map((item) => item.Article_Author);
            data.push({ heading: 'Article Author', items: authors });
        }

        // if (response.articleDatasuggesion[2] && response.articleDatasuggesion[2].article_category_suggesions) {
        //     const categories = response.articleDatasuggesion[2].article_category_suggesions.map((item) => item.Article_Category);
        //     data.push({ heading: 'Article Category', items: categories });
        // }
        return data;
    };

    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.safeArea}>
           <Background>
            <View style={{ flex: 1, position: 'relative', paddingHorizontal: '3%' }}>

                {/* <View style={styles.container}>

                    <TextInput
                        style={styles.input}
                        label="Search and Add New Filter"
                        returnKeyType="next"
                        value={name.value}
                        onChangeText={
                            // (text) => setName({ value: text, error: "" })
                            handleSearchInput
                        }
                        error={!!name.error}
                        errorText={name.error}
                    />
                    <Button
                        style={styles.button}
                        mode="contained"
                        onPress={() => handleInputSelect()}
                    >
                        Search
                    </Button>
                </View> */}


                <View style={styles.container}>

                    <TextInput
                        style={styles.input}
                        label="Search Content"
                        returnKeyType="next"
                        value={name.value}
                        onChangeText={(text) => setName({ value: text, error: "" })}
                        error={!!name.error}
                        errorText={name.error}
                    />
                    <Button
                        style={styles.button}
                        mode="contained"
                        onPress={() => handleSearchQuery()}
                    >
                        Search
                    </Button>
                </View>

                {dropdownVisible && (
                    <View style={styles.dropdownContainer}>
                        <FlatList
                            style={styles.dropdown}
                            data={filteredInputData}
                            renderItem={({ item: category }) => (
                                <View style={styles.section}>
                                    <Text style={styles.heading}>{category.heading}</Text>
                                    <FlatList
                                        data={category.items}
                                        keyExtractor={(item, index) => `${index}`} // Use unique id if possible
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                style={styles.item}
                                                onPress={() => {
                                                    setSearchInput(category.heading);
                                                    //   setSelectedHeading(category.heading); 
                                                    setName({ value: item, error: "" });
                                                }}
                                            >
                                                <Text>{item}</Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                </View>
                            )}
                            ListEmptyComponent={<Text style={styles.noResults}>No results found</Text>}
                        />
                    </View>
                )}

                {/* <View style={{ flexDirection: 'row', alignContent: "space-evenly", alignItems: 'center', }}>
                    <Button
                        style={styles.filterButton}
                        mode="contained"
                        labelStyle={styles.buttonText}
                        onPress={() => openModal('Article Title')}
                    >
                        Article Title
                    </Button>
                    <Button
                        style={styles.filterButton}
                        labelStyle={styles.buttonText}
                        mode="contained"
                        onPress={() => openModal('Article Author')}
                    >
                        Article Author
                    </Button>
                    <Button
                        style={styles.filterButton}
                        labelStyle={styles.buttonText}
                        mode="contained"
                        onPress={() => openModal('Article Keywords')}
                    >
                        Article Keywords
                    </Button>
                </View> */}

                <View style={styles.gridContainer}>
                    {buttonData.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.button}
                            onPress={item.onPress}
                        >
                            <MaterialIcons name={item.icon} size={40} color="#083e89" />
                            <Text style={styles.buttonText}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{modalInput}</Text>
                            <View style={styles.searchContainer}>
                                <TextInput
                                    label="Search..."
                                    value={popupName.value}
                                    onChangeText={handleSearch}
                                    error={!!popupName.error}
                                    errorText={popupName.error}
                                    style={styles.popupinput}
                                />
                            </View>
                            <FlatList
                                data={filteredData}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <View style={styles.itemContainer}>
                                        <CheckBox
                                            value={selectedItems.includes(item)}
                                            onValueChange={() => handleSelect(item)}
                                        />
                                        <TouchableOpacity onPress={() => handleSelect(item)}>
                                            <Text style={styles.popitem}>{item}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                ListEmptyComponent={() => (
                                    <View style={styles.emptyContainer}>
                                        <Text style={styles.emptyText}>No data available</Text>
                                    </View>
                                )}
                                style={styles.list}
                            />
                            <Button
                                mode="contained"
                                style={{ marginTop: 10 }}
                                onPress={() => onsubmit(selectedItems, modalInput)}
                            >
                                Search
                            </Button>

                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.popupbuttonText}>Close Modal</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <FlatList
                    data={data}
                    renderItem={({ item }) =>
                    (
                        <View style={styles.item}>
                            <Pressable onPress={() => articleClick(item.Article_ID,)}>
                                <Text style={styles.title} >{item.Article_Title}</Text>
                            </Pressable>
                            <Text style={styles.article_author}>
                                <Text style={styles.authorBy}>By:</Text> {item.Article_Author}
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.article_summary}>
                                    <Text style={styles.authorpublished}>Published In:</Text> {item.Article_Summary_Text.replace(/<(.|\n)*?>/g, '')}
                                </Text>
                                <TouchableOpacity style={styles.headnoteFilterButton} onPress={() => articleClick(item.Article_ID)}>
                                    <Image source={require('../../assets/images/judgement_open_red1.png')} resizeMode="contain" style={{width:24,height:24}}/>
                                </TouchableOpacity>
                            </View>
                        </View>)
                    }
                    // onEndReached={onEndReached}
                    // onEndReachedThreshold={0.1}
                    // onMomentumScrollEnd={onMomentumScrollEnd}
                    ListFooterComponent={
                        loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
                    }
                    keyExtractor={item => item.Article_ID}
                />
            </View>
            </Background>

        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        // paddingHorizontal: 20,
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        position: 'relative'

    },
    searchContainer: {
        flex: 1,
        flexDirection: "row",
        width: '100%',
        marginBottom: 15,
    },
    input: {
        flex: 1,
        marginRight: 10,
    },
    input_article: {
        flex: 1,
        marginRight: 10,
        height: 50
    },
    icon: {
        marginRight: 5,
        position: 'absolute',
        right: 0,
        padding: 10
    },
    modal: {
        backgroundColor: 'white',
        padding: 20
    },
    button: {
        // height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    filterButton: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 5
    },
    buttonText: {
        fontSize: 11,
        textAlign: 'center',
    },
    item: {
        backgroundColor: '#ffffff',
        padding: 10,
        marginVertical: 3,
        marginHorizontal: 4,
        borderRadius: 8,
        borderColor: '#ddd',
        borderWidth: 1,

    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.red
    },
    authorBy: {
        fontWeight: '300',
        color: theme.colors.blue
    },
    authorpublished: {
        fontWeight: '600',
        color: theme.colors.blue
    },
    article_author: {
        fontWeight: '300',
        color: theme.colors.blue
    },
    article_summary: {
        fontSize: 16,
        fontWeight: 600,
        color: theme.colors.blue
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        height: '60%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        maxHeight: '80%', // Prevent modal from occupying full height
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: '#dc3545',
        padding: 10,
        borderRadius: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
    },
    squarebutton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    image: {
        width: 50,
        height: 50,
        marginBottom: 5,
    },
    text: {
        fontSize: 14,
        color: '#333',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    popitem: {
        marginLeft: 10,
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        height: '70%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        maxHeight: '80%', // Prevent modal from occupying full height
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    searchContainer: {
        width: '100%',
        // height: '60%',
        marginBottom: 15,
    },
    popupinput: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    list: {
        width: '100%',
        // maxHeight: '100%', // Limit list height
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },

    closeButton: {
        marginTop: 10,
        backgroundColor: '#ff6347',
        padding: 10,
        borderRadius: 5,
    },
    popupbuttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
    },
    dropdown: {
        maxHeight: 300,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
        marginTop: 5,
    },
    section: {
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    heading: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    // item: {
    //     padding: 10,
    //     backgroundColor: '#f9f9f9',
    //     borderRadius: 5,
    //     marginBottom: 5,
    // },
    noResults: {
        textAlign: 'center',
        color: '#888',
        padding: 10,
    },
    dropdownContainer: {
        position: "absolute",
        top: 60,

        width: "100%",
        zIndex: 1000,
    },
    // dropdownContainer: {
    //     position: "absolute", // Ensures dropdown overlaps other views
    //     top: 60, // Adjust this based on the TextInput height
    //     left: 0,
    //     width: "100%",
    //     backgroundColor: "white",
    //     borderWidth: 1,
    //     borderColor: "#ccc",
    //     borderRadius: 5,
    //     zIndex: 1000, // Ensures it appears above other views
    //     maxHeight: 200, // Limit dropdown height
    //     overflow: "hidden", // Prevent content from spilling outside borders
    //     elevation: 5, // Adds shadow on Android
    // },
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
    },
    headnoteFilterButton:{
        color:theme.colors.red
    }
})
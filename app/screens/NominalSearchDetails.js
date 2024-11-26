import { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Touchable, TouchableOpacity } from "react-native";
import { getNominalDetails } from "../api/api";
import { useState } from "react";

export default function NominalSearchDetails({ navigation, route }) {
    const { nominalSearch, courtName, searchString } = route.params;
    const [page, setPage] = useState(0);

    const [data, setData] = useState([]); // Store fetched records
    const [offset, setOffset] = useState(0);  // Offset starts at 0
    const [loading, setLoading] = useState(false); // Loading state
    const [hasMore, setHasMore] = useState(true); // Check if more data is available

    useEffect(() => {

        nominalDetails();
    }, []);

    const nominalDetails = async () => {

        if (loading || !hasMore) return; // Prevent multiple calls if loading or no more data

        setLoading(true);
        try {
            response = await getNominalDetails(nominalSearch, courtName, searchString, 10, `${offset}`);
            console.log("response", response);

            if (response.err_code === 'success') {
                console.log("count", response.docCount);

                if (response.docCount > 0) {
                    setData((prevData) => [...prevData, ...response.nominalList]);
                    setOffset((prevOffset) => prevOffset + 10); // Increase offset by 10

                    
                    if (response.docCount < 10) {
                        setHasMore(false);
                    }


                } else {
                    setHasMore(false); // Stop further loading if no more data is returned
                }
            }
            else{
                setHasMore(false);
            }
        }
        catch (error) {
            console.error(error);
        }
        setLoading(false);
    }

    const nominalListClick= (citationID,citationName)=>{
        

        navigation.navigate('Judgement',{
            citationID: citationID,
            citationName: citationName, 
        })



    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.citationID}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={()=>nominalListClick(item.citationID,item.citationName)}>
                    <View style={styles.item}>

                        <Text>Nominal: {item.nominal_app}</Text>
                        <Text>Respondent: {item.nominal_res}</Text>
                        <Text>Court: {item.courtName}</Text>
                        <Text>Citation Name: {item.citationName}</Text>
                        <Text>Dod: {item.dod}</Text>
                    </View>
                    </TouchableOpacity>
                )}
                onEndReached={nominalDetails} // Load more data when reaching the end
                onEndReachedThreshold={2} // Trigger when the user is halfway down
                ListFooterComponent={loading && <ActivityIndicator size="large" color="#0000ff" />}
            />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    item: {
        padding: 15,
        marginVertical: 5,
        backgroundColor: '#dddddd',
        borderRadius: 10,
    },
});
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert } from "react-native";
import { getBenchStrength } from "../api/api";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';

export default function BenchStrength({ navigation }) {
    const [items, setItems] = useState([]);
    const [selectedCourtName, setSelectedCourtName] = useState(null);
    const [courtValue, setCourtValue] = useState("");
    useEffect(() => {

        const fetchBenchStrength = async () => {
            response = await getBenchStrength();
            console.log("Response", response);
            const benchStrengthData = response.benchName.map(label => ({ label }));
            console.log("benchStrengthData", benchStrengthData);
            setItems(benchStrengthData);
        }
        fetchBenchStrength();
    }, []);

    const renderItem = item => (
        <View style={styles.item}>
            <Text style={styles.textItem}>{item.label}</Text>
        </View>
    );
    const onSubmit = () => {
        console.log("courtValue", courtValue);

        if (courtValue === "") {
            Alert.alert("Please Select Value from Serchfield")
        }
        else {
            navigation.navigate('BenchStrengthDetails', {
                benchStrength: courtValue
            })
        }
    }


    return (
        <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.safeArea}>
            <Header>Bench Strength Module</Header>
            <View style={styles.container}>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={items}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="label"
                    placeholder="Select Court"
                    searchPlaceholder="Search..."
                    value={selectedCourtName}
                    onChange={item => {
                        setCourtValue(item.label);
                    }}
                    renderLeftIcon={() => (
                        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                    )}
                    renderItem={renderItem} />

                <Button
                    style={{
                        marginTop: 30
                    }}
                    mode="contained"
                    onPress={() => onSubmit()
                    }>
                    Search
                </Button>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
        paddingHorizontal: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        // alignItemsx: 'center',
        // paddingHorizontal: 20,
        flexDirection: "column"
    },
    dropdown: {
        marginTop: 10,
        width: '100%',
        // margin: 15,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,

    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },

})
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import { getBenchStrength } from "../api/api";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import DropDownPicker from 'react-native-dropdown-picker';

export default function BenchStrength({ navigation }) {
    const [items, setItems] = useState([]);
    const [selectedCourtName, setSelectedCourtName] = useState(null);
    const [courtValue, setCourtValue] = useState("");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("SINGLE BENCH");
    const [benchType, setBenchType] = useState([
        { label: 'Single Bench', value: 'SINGLE BENCH' },
        { label: 'Divisional Bench', value: 'DIVISIONAL BENCH' },
        { label: 'Larger/ full/ Constitutional Bench', value: 'FULL BENCH' },
    ]);

    const [activeInput, setActiveInput] = useState('one');

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

        var benchStrengthValue = '';
        var benchStrenthType = '';
        console.log("courtValue", courtValue);
        console.log("Value", value);

        if (activeInput === 'one') {
            benchStrenthType = value
        } else if (activeInput === 'two') {
            benchStrengthValue = courtValue;
        }
        if (benchStrengthValue == "" && benchStrenthType == "") {
            Alert.alert("Please Select Value from Serchfield")
        }
        else {
            navigation.navigate('BenchStrengthDetails', {
                benchStrength: benchStrengthValue,
                benchTypeFullName: benchStrenthType
            })
        }
    }

    const isDropdownDisabled = activeInput !== 'one';
    const isCourtDropdownDisabled = activeInput !== 'two';
    return (
        <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.safeArea}>
            <Header>Bench Strength Module</Header>
            <View style={styles.container}>

                <View style={styles.radioContainer}>
                    <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => setActiveInput('one')}>
                        <View style={styles.outerCircle}>
                            {activeInput === 'one' && <View style={styles.innerCircle} />}
                        </View>
                        <Text style={styles.radioText}>Bench</Text>
                    </TouchableOpacity>


                </View>
                <View pointerEvents={isDropdownDisabled ? 'none' : 'auto'}
                    style={{ backgroundColor: '#ffffff' }}>
                    <DropDownPicker
                        style={[styles.dropdownpicker,
                        activeInput === 'two' && styles.disabledInput,
                        ]}
                        open={open}
                        value={value}
                        items={benchType}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setBenchType}
                        dropDownContainerStyle={styles.dropdownContainer}
                    />

                </View>
                <Text style={{
                    alignSelf: 'center', marginVertical: 20, fontWeight: 'bold', fontSize: 18
                }}>OR</Text>

                <View style={styles.radioContainer}>
                    <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => setActiveInput('two')}>
                        <View style={styles.outerCircle}>
                            {activeInput === 'two' && <View style={styles.innerCircle} />}
                        </View>
                        <Text style={styles.radioText}>HON'BLE Judges </Text>
                    </TouchableOpacity>
                </View>
                <View pointerEvents={isCourtDropdownDisabled ? 'none' : 'auto'}>
                    <Dropdown
                        style={[styles.dropdown,
                        activeInput === 'one' && styles.disabledInput,
                        ]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={items}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="label"
                        placeholder="Select Bench"
                        searchPlaceholder="Search..."
                        value={selectedCourtName}
                        onChange={item => {
                            setCourtValue(item.label);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                        )}
                        renderItem={renderItem} />
                </View>
                <Button
                    style={{
                        marginTop: 100
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
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        // alignItemsx: 'center',
        // paddingHorizontal: 20,
        flexDirection: "column"
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    outerCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: 'blue',
    },
    radioText: {
        marginLeft: 8,
        fontSize: 16,
    },
    dropdown: {
        // marginTop: 10,
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
    dropdownpicker: {
        marginBottom: 20,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
        // padding:15,
        // margin: 15
    },
    dropdownContainer: {
        width: '100%',
        backgroundColor: '#ffffff'
    },
    disabledInput: {
        backgroundColor: '#f0f0f0',
    },

})
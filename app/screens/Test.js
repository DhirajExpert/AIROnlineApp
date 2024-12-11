
import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';
import { getBenchStrength } from "../api/api";
import Button from '../components/Button';

export default function Test() {

    const [inputOne, setInputOne] = useState('');
    const [inputTwo, setInputTwo] = useState('');
    const [activeInput, setActiveInput] = useState('one');
    const [submittedValue, setSubmittedValue] = useState('');
    const [items, setItems] = useState([]);
    const [selectedCourtName, setSelectedCourtName] = useState(null);
   
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("Either Petitioner or Respondent");
    const [benchType, setBenchType] = useState([
        { label: 'Either Petitioner or Respondent', value: 'Either Petitioner or Respondent' },
        { label: 'Petitioner', value: 'Petitioner' },
        { label: 'Respondent', value: 'Respondent' },
    ]);
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

    const handleSubmit = () => {
        if (activeInput === 'one') {
            setSubmittedValue(inputOne);
        } else {
            setSubmittedValue(inputTwo);
        }
    };
    const isDropdownDisabled = activeInput !== 'one';
    const isCourtDropdownDisabled = activeInput !== 'two';

    const renderItem = item => (
        <View style={styles.item}>
            <Text style={styles.textItem}>{item.label}</Text>
        </View>
    );
    return (
        <View style={styles.container}>
            {/* <Text style={styles.label}>Select Active Input:</Text> */}
            <View style={styles.radioContainer}>
                <TouchableOpacity
                    style={styles.radioButton}
                    onPress={() => setActiveInput('one')}
                >
                    <View style={styles.outerCircle}>
                        {activeInput === 'one' && <View style={styles.innerCircle} />}
                    </View>
                    <Text style={styles.radioText}>Bench</Text>
                </TouchableOpacity>


            </View>


            {/* <TextInput
                style={[
                    styles.input,
                    activeInput === 'two' && styles.disabledInput,
                ]}
                placeholder="Enter value for Input 1"
                value={inputOne}
                onChangeText={setInputOne}
                editable={activeInput === 'one'}
            /> */}
            <View pointerEvents={isDropdownDisabled ? 'none' : 'auto'}>
                <Dropdown
                    style={[styles.dropdown,
                    activeInput === 'two' && styles.disabledInput,
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
                    renderItem={renderItem}
                // editable={activeInput === 'one'} 

                />
            </View>

            <View style={styles.radioContainer}>
                <TouchableOpacity
                    style={styles.radioButton}
                    onPress={() => setActiveInput('two')}
                >
                    <View style={styles.outerCircle}>
                        {activeInput === 'two' && <View style={styles.innerCircle} />}
                    </View>
                    <Text style={styles.radioText}>HON'BLE Judges </Text>
                </TouchableOpacity>
            </View>

            {/* <TextInput
                style={[
                    styles.input,
                    activeInput === 'one' && styles.disabledInput,
                ]}
                placeholder="Enter value for Input 2"
                value={inputTwo}
                onChangeText={setInputTwo}
                editable={activeInput === 'two'}
            /> */}
            <View pointerEvents={isCourtDropdownDisabled ? 'none' : 'auto'}>
                <DropDownPicker
                    style={styles.dropdownpicker}
                    open={open && !isCourtDropdownDisabled}
                    value={value}
                    items={benchType}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setBenchType}
                    dropDownContainerStyle={styles.dropdownContainer}

                />
            </View>
            {/* <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity> */}

            <Button
                style={{
                    marginTop: 30
                }}
                mode="contained"
                onPress={() => onSubmit()
                }>
                Search
            </Button>

            {/* {submittedValue !== '' && (
                <Text style={styles.resultText}>Submitted Value: {submittedValue}</Text>
            )} */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        padding: 20,
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
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    disabledInput: {
        backgroundColor: '#f0f0f0',
    },
    submitButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    submitText: {
        color: 'white',
        fontSize: 16,
    },
    resultText: {
        marginTop: 20,
        fontSize: 16,
        color: 'green',
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
    inputSearchStyle: {
        height: 40,
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
    iconStyle: {
        width: 20,
        height: 20,
    },
});
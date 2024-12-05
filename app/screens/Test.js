
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Test() {

    const [inputOne, setInputOne] = useState('');
    const [inputTwo, setInputTwo] = useState('');
    const [activeInput, setActiveInput] = useState('one'); 
    const [submittedValue, setSubmittedValue] = useState('');

    const handleSubmit = () => {
        if (activeInput === 'one') {
            setSubmittedValue(inputOne);
        } else {
            setSubmittedValue(inputTwo);
        }
    };
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

            {/* <Text style={styles.label}>Input 1:</Text> */}
            <TextInput
                style={[
                    styles.input,
                    activeInput === 'two' && styles.disabledInput, 
                ]}
                placeholder="Enter value for Input 1"
                value={inputOne}
                onChangeText={setInputOne}
                editable={activeInput === 'one'} 
            />
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
            {/* <Text style={styles.label}>Input 2:</Text> */}
            <TextInput
                style={[
                    styles.input,
                    activeInput === 'one' && styles.disabledInput, 
                ]}
                placeholder="Enter value for Input 2"
                value={inputTwo}
                onChangeText={setInputTwo}
                editable={activeInput === 'two'} 
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>

            {submittedValue !== '' && (
                <Text style={styles.resultText}>Submitted Value: {submittedValue}</Text>
            )}
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
});
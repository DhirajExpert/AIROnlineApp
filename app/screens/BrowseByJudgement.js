import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function BrowseByJudgement() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("Specific Date");
    const [items, setItems] = useState([
        {
            label: 'Specific Date', value: 'Specific Date',
            label: 'Between Date', value: 'Between Date',
            label: 'After Date', value: 'After Date',
            label: 'Before Date', value: 'Before Date',
        }
    ]);
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text>Decesion Period:</Text>
                <DropDownPicker
                    style={styles.dropdownpicker}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    dropDownContainerStyle={styles.dropdownContainer}
                />
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
    },
});

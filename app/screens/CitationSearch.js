import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Modal, FlatList, TextInput, } from "react-native";


import { Text } from "react-native-paper"
import Background from "../components/Background"
import BackButton from "../components/BackButton";

import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import SelectListDropdown from "../components/SelectListDropdown";

import RNPickerSelect from 'react-native-picker-select';
import { theme } from "../core/theme";

import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';


const journals = [
    { label: 'AIR HIGH COURTS', value: 'AIR HIGH COURTS' },
    { label: 'AIR ONLINE', value: 'AIROnline' },
    { label: 'AIR SUPREME COURT', value: 'AIR SUPREME COURT' },
    { label: 'CRIMINAL LAW JOURNAL', value: 'CRIMINAL LAW JOURNAL' },
    { label: 'AIR SUPREME COURT WEEKLY', value: 'AIR SUPREME COURT WEEKLY' },
    { label: 'AIR SUPREME COURT WEEKLY', value: 'AIR SUPREME COURT WEEKLY' },
    { label: 'AIR SUPREME COURT WEEKLY', value: 'AIR SUPREME COURT WEEKLY' },
    { label: 'AIR SUPREME COURT WEEKLY', value: 'AIR SUPREME COURT WEEKLY' },

];
const journalItems = [
    { label: 'AIR HIGH COURTS', value: 'AIR HIGH COURTS' },
    { label: 'AIR ONLINE', value: 'AIROnline' },
    { label: 'AIR SUPREME COURT', value: 'AIR SUPREME COURT' },
    { label: 'CRIMINAL LAW JOURNAL', value: 'CRIMINAL LAW JOURNAL' },
    { label: 'AIR SUPREME COURT WEEKLY', value: 'AIR SUPREME COURT WEEKLY' },
    { label: 'AIR SUPREME COURT WEEKLY', value: 'AIR SUPREME COURT WEEKLY' },
    { label: 'AIR SUPREME COURT WEEKLY', value: 'AIR SUPREME COURT WEEKLY' },
    { label: 'AIR SUPREME COURT WEEKLY', value: 'AIR SUPREME COURT WEEKLY' },

];
const data1 = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];
const data2 = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

export default function CitationSearch({ navigation }) {

    const [selectedJournal, setSelectedJournal] = useState('');
    const [journals, setJournals] = useState([
        { label: 'AIR HIGH COURTS', value: 'AIR HIGH COURTS' },
        { label: 'AIR ONLINE', value: 'AIR ONLINE' },
        { label: 'AIR SUPREME COURT', value: 'AIR SUPREME COURT' },
        { label: 'CRIMINAL LAW JOURNAL', value: 'CRIMINAL LAW JOURNAL' },
        { label: 'AIR SUPREME COURT WEEKLY', value: 'AIR SUPREME COURT WEEKLY' },
    ]);

    const handleAddJournal = (newJournal) => {
        const newJournalItem = { label: newJournal, value: newJournal };
        setJournals(prevJournals => [...prevJournals, newJournalItem]);
    };
    

    

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            Dropdown label
          </Text>
        );
      }
      return null;
    };

    return (
        // <Background>

        <View style={styles.container}>
            <BackButton goBack={navigation.goBack} />
            {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data1}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
            {/* {renderLabel()} */}
            <Text>Publication Year:</Text>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={journalItems}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Journal year' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                }}
                renderLeftIcon={() => (
                    <AntDesign
                        style={styles.icon}
                        color={isFocus ? 'blue' : 'black'}
                        name="Safety"
                        size={20}
                    />
                )}
            />

            {/* Picker Button */}
            {/* <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.pickerButtonText}>
                    {selectedJournal ? selectedJournal : 'Select Journal'}
                </Text>

            </TouchableOpacity>



            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>

                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search Journal"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />


                        <FlatList
                            data={filteredJournals}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.listItem}
                                    onPress={() => {
                                        setSelectedJournal(item.label);
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text style={styles.listItemText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />


                        <TouchableOpacity
                            style={styles.selectButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.selectButtonText}>Select</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


            <Text style={styles.label}>Select a Journal:</Text> */}

            {/* Common Dropdown Component */}
            {/* <Dropdown
                items={journals}
                placeholder="Select Journal"
                selectedValue={selectedJournal}
                onSelect={(value) => setSelectedJournal(value)}
                onAddJournal={handleAddJournal} // Pass down the add journal function
            /> */}

            {/* Display Selected Value */}
            {/* {selectedJournal ? (
                <Text style={styles.selectedText}>Selected: {selectedJournal}</Text>
            ) : null} */}



        </View>
        // </Background>

    );
}
const styles = StyleSheet.create({


    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },



    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
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
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    pickerButton: {
        padding: 15,
        backgroundColor: '#f0f0f0',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
    },
    pickerButtonText: {
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',

    },
    searchInput: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        borderRadius: 8,
        marginBottom: 20,
    },
    listItem: {
        paddingVertical: 10,
        width: '100%',
        // marginVertical:5

    },
    listItemText: {
        fontSize: 16,
        color: '#333',

    },
    selectButton: {
        marginTop: 20,
        backgroundColor: theme.colors.primary,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
    },
    selectButtonText: {
        color: 'white',
        fontSize: 16,
    },
    icon: {
        marginLeft: 10,
    },
    container: {
        padding: 20,
      },
      label: {
        fontSize: 18,
        marginBottom: 10,
      },
      selectedText: {
        marginTop: 20,
        fontSize: 16,
        color: 'green',
      },

});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
        backgroundColor: '#f9f9f9',
        marginBottom: 20,
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
        backgroundColor: theme.colors.primary,
        marginBottom: 20,
    },
});
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Platform, Pressable } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
// import TextInput from '../components/TextInput';
import Button from '../components/Button';
import DatePicker from 'react-native-date-picker'
import { TextInput } from 'react-native-paper';

import DateTimePicker from '@react-native-community/datetimepicker';
import {getJudgementDateDetails} from "../api/api";

export default function JudgementDate({navigation}) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("Specific Date");

    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());

    const [fromShow, setFromShow] = useState(false);
    const [toShow, setToShow] = useState(false);
    const [show, setShow] = useState(false);


    const onFromDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setFromShow(false);
        setFromDate(currentDate);
    };

    const onToDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setToShow(false);
        setToDate(currentDate);
    };

    const showFromDatepicker = () => {
        setFromShow(true);
    };
    const showToDatepicker = () => {
        setToShow(true);
    };

    const [openPicker, setOpenPicker] = useState(false);

    const [items, setItems] = useState([
        { label: 'Specific Date', value: 'Specific Date' },
        { label: 'Between Dates', value: 'Between Dates' },
        { label: 'After Date', value: 'After Date' },
        { label: 'Before Date', value: 'Before Date' },
    ]);
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

    const onSubmit = () => {
        if (fromDate.toDateString() === '') {
            value === 'Between Dates' ?
                Alert.alert('Please select from date')
                :
                Alert.alert('Please select appropriate date')
        } else if (toDate.toDateString() === '') {
            Alert.alert('Please select to date');
        }
        else {
            JudgementDateApi();
        }
    }
    const JudgementDateApi= async ()=> {
        
        navigation.navigate('JudgementDateDetails',{
            decision_period:value,
            fromDate:formatDate(fromDate),
            toDate:formatDate(toDate)
        })

    }
    return (
        <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.safeArea}>
            <Header>Judgement Date</Header>
            <View style={styles.container}>

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

                <View>
                    {value === 'Between Dates' ? (<Text>From Date:</Text>) :
                        (<Text>{value}:</Text>)}

                    <TouchableOpacity onPress={showFromDatepicker}>
                        <TextInput
                            value={formatDate(fromDate)}
                            editable={false}
                            pointerEvents="none"
                            right={<TextInput.Icon icon={'calendar'}
                                onPress={showFromDatepicker} />}
                        />
                    </TouchableOpacity>
                    {fromShow && (
                        <DateTimePicker
                            value={fromDate}
                            mode="date"
                            // display={Platform.OS === 'ios' ? 'inline' : 'default'}
                            display='spinner'
                            onChange={onFromDateChange}
                            maximumDate={new Date()}
                        // onSubmit={onFromDateChange}
                        // onPress={onFromDateChange}
                        />
                    )}
                </View>

                {value === 'Between Dates' && (
                    <View>
                        <Text>To Date:</Text>
                        <TouchableOpacity onPress={showToDatepicker}>
                            <TextInput
                                value={formatDate(toDate)}
                                editable={false}
                                pointerEvents="none"
                                right={<TextInput.Icon icon={'calendar'}
                                    onPress={showFromDatepicker} />}
                            />
                        </TouchableOpacity>
                        {toShow && (
                            <DateTimePicker
                                value={toDate}
                                mode="date"
                                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                                onChange={onToDateChange}
                            />
                        )}
                    </View>)}
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
    )

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
    dropdownContainer: {
        width: '100%',
    },
    icon: {
        marginRight: 5,
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
});
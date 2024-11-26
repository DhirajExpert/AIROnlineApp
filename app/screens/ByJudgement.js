import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
// import TextInput from '../components/TextInput';
// import { TextInput } from 'react-native-paper';
import Button from "../components/Button";
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
export default function ByJudgement() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("Either Petitioner or Respondent");
    const [name, setName] = useState({ value: "", error: "" })
    const [openPicker, setOpenPicker] = useState(false);
    const [date,setDate] = useState(new Date())
    const [items, setItems] = useState([
        { label: 'Specific Date', value: 'Specific Date' },
        { label: 'Between Date', value: 'Between Date' },
        { label: 'After Date', value: 'After Date' },
        { label: 'Before Date', value: 'Before Date' }

    ]);
    const [show, setShow] = useState(false);
    const openDatePicker = () => {
        console.log("Date picker is clicked");
    }
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios'); // Keep the picker open on iOS
        setDate(currentDate);
      };
    
      const showDatePicker = () => {
        setShow(true);
      };
    return (
        <SafeAreaView style={styles.safeArea}>
            <Header>Browse By Judgement</Header>
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

                <TextInput
                    style={{ marginTop: 10 }}
                    label="Either Petitioner or Respondent"
                    mode='flat'
                    editable={false}
                    value={name.value}
                    onChangeText={(text) => setName({ value: text, error: "" })}
                    error={!!name.error}
                    errorText={name.error}

                />
                <TouchableOpacity
                    style={styles.input}
                    onPress={showDatePicker}>
                    <Text></Text>
                    <Icon name="calendar" size={16} color="black" />

                </TouchableOpacity>
                {/* <DatePicker
                    open={openPicker}
                    date={date}
                    onConfirm={()=>{
                        setOpenPicker(false)
                        setDate(date)
                    }} 
                    onCancel={()=>{
                        setOpenPicker(false)
                    }}/> */}
                    {/* <RNDateTimePicker mode="date" /> */}

                    <Button
                    style={{ marginTop: 30 }}
                    mode="contained"
                    onPress={() => navigation.navigate("LoginScreen")
                    }
                >
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
    // input: {
    //     // height: 40,
    //     margin: 3,
    //     borderWidth: 1,
    //     padding: 10,
    //     // shadowColor: '#000',
    //     borderColor: '#ccc',
    //     backgroundColor: '#FFF'


    // },
    input: {
        flexDirection: 'row', // Align items in a row
        justifyContent: 'space-between', // Pushes the icon to the right
        alignItems: 'center', // Vertically center the text and icon
        padding: 10, // Adjust padding as needed
        margin: 3,
        borderWidth: 1,
        padding: 10,
        borderColor: '#ccc',
        backgroundColor: '#FFF',
        height: 45,
        borderRadius: 10
    },
});

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import {getNominalCourt} from '../api/api'

export default function NominalSearch({ navigation }) {
    const [selectedCourtName,setSelectedCourtName] = useState(null);  // State for journal name
    const [courtNames, setCourtNames] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("Either Petitioner or Respondent");
    const [courtValue, setCourtValue] = useState("");
    const [name, setName] = useState({ value: "", error: "" });
   
    const [items, setItems] = useState([
        { label: 'Either Petitioner or Respondent', value: 'Either Petitioner or Respondent' },
        { label: 'Petitioner', value: 'Petitioner' },
        { label: 'Respondent', value: 'Respondent' },
    ]);

    useEffect(()=>{

    CourtList()
    },[]);

    const CourtList = async ()=>{
       response = await getNominalCourt();
        console.log("getNominalcourt", response);
        const getJournalList = response.courtName.map(label => ({ label }));

        setCourtNames(getJournalList);
    }
    const onSubmit = ()=>{

        
        console.log("Submit button is clicked");
      
        console.log("Value",value);
        console.log("Name",name.value);
        console.log("courtValue",courtValue);
        if(name.value ===""){
            Alert.alert('provide res or pet')
        }else {
            console.log('data is correct');
            navigation.navigate('NominalSearchDetails',{
                nominalSearch:value,
                courtName:courtValue,
                searchString:name.value
            })
        }
    }
    

    const renderItem = item => (
        <View style={styles.item}>
            <Text style={styles.textItem}>{item.label}</Text>
        </View>
    );
    return (
        <SafeAreaView edges={['left','right','bottom']}style={styles.safeArea}>
            <Header>Nominal Search Module</Header>
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
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={courtNames}
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
                <TextInput
                    style={{ marginTop: 10 }}
                    label="Either Petitioner or Respondent"
                    returnKeyType="next"
                    value={name.value}
                    onChangeText={(text) => setName({ value: text, error: "" })}
                    error={!!name.error}
                    errorText={name.error}
                />
                
                    <Button
                    style={{ marginTop: 30 
                     }}
                    mode="contained"
                   
                    onPress={() => onSubmit()
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
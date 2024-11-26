import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list'
import { theme } from "../core/theme";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
export default function SelectListDropdown({ ...props }) {
    return (
        <View style={styles.container}>

            <Dropdown
                
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                search
                maxHeight={300}
                
                searchPlaceholder="Search..."
                
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        
        fbackgroundColor: 'white',
        padding: 16,
        
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
});
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Button from "../components/Button";


export default function () {
    const [name,setName] = useState({error:"",value:""})
    return (
        <SafeAreaView style={styles.safearea}>
            <Header>Browse By Judge</Header>
            <View style={styles.container}>
            <TextInput
                    label="Search for hon'ble Judge"
                    value={name.value}
                    onChangeText={(text) => setName({ value: text, error: "" })}
                    error={!!name.error}
                    errorText={name.error}
                    
                    // left={<TextInput.Icon icon="calendar"  />}
                    // right={<TextInput.Icon icon="eye" />}
                />
                {/* <Icon name="calendar" size={16} color="black" /> */}
                {/* </TextInput> */}

                <Button
                    mode="contained"
                    style={{ marginTop: 30 }}>
                    Search
                </Button>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    safearea:{
        flex:1,
        paddingHorizontal:20
    },
    container:{
        flex:1,
        justifyContent:"flex-start",
        flexDirection:"column"
    }
});
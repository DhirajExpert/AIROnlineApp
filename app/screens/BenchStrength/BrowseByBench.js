import react, { useState } from "react";
import { StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { SelectList } from 'react-native-dropdown-select-list'
import Button from "../../components/Button";
export default function BrowseByBench() {
    const [selected, setSelected] = useState("");

    const data = [
        { key: '1', value: 'Single Judge' },
        { key: '2', value: 'Divivsion Bench' },
        { key: '3', value: 'Larger Bench' },
        { key: '4', value: 'Full Bench' },
        { key: '5', value: 'Special Bench' },
        { key: '6', value: 'NCDRC' },
        { key: '7', value: 'Unknown Bench' },
    ]
    return (
        <SafeAreaView style={styles.safearea}>
            <Header>Browse By Bench</Header>
            <View style={styles.container}>
                <SelectList
                    setSelected={(val) => setSelected(val)}
                    data={data}
                    save="value"
                />
                <Button
                    style={{ marginTop: 30 }}
                    mode="contained">
                    Search
                </Button>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safearea: {
        flex: 1,
        paddingHorizontal: 20
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        // alignItemsx: 'center',
        // paddingHorizontal: 20,
        flexDirection: "column"
    },

});
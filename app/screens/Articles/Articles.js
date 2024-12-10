import react, { useState } from "react"
import { StyleSheet, View } from "react-native"
import TextInput from "../../components/TextInput";
import Button from '../../components/Button';
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context"
import AntDesign from "@expo/vector-icons/AntDesign"
import { Modal, Text } from "react-native-paper";
export default function Articles({ navigation }) {
    const [name, setName] = useState({ value: "", error: "" });
    const [isModalVisible, setModalVisible] = useState(false);
    const openFilter = () => {
        console.log("filter button is clicked");
        setModalVisible(!isModalVisible);

    }
    const showModel = () => {
        setModalVisible(!isModalVisible)
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            <View>
                <Header>Articles
                </Header>
                <AntDesign style={styles.icon} color="black" name="filter" size={30}
                    onPress={() => openFilter()} />
            </View>
            <View style={styles.container}>

                <TextInput
                    style={{ marginTop: 10 }}
                    label="Search and Add New Filter"
                    returnKeyType="next"
                    value={name.value}
                    onChangeText={(text) => setName({ value: text, error: "" })}
                    error={!!name.error}
                    errorText={name.error}
                />
                <Button
                    style={{ marginTop: 30 }}
                    mode="contained"
                    onPress={() => navigation.navigate("LoginScreen")
                    }
                >
                    Search
                </Button>
                <Modal visible={isModalVisible} onDismiss={!isModalVisible} style={styles.modal}>
                    <Text style={{ alignContent: "center" }}>Open Modal</Text>
                    <Button onPress={() => showModel()}>
                        Close
                    </Button>
                </Modal>

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
    icon: {
        marginRight: 5,
        position: 'absolute',
        right: 0,
        padding: 10
    },
    modal: {
        backgroundColor: 'white',
        padding: 20
    }
})
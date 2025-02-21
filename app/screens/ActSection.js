import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator, Alert, ScrollView, TextInput } from "react-native";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { MaterialIcons } from "@expo/vector-icons";

const API_URL_ACTS = "https://aisnagpur.com/aironline/act/act_list?searchString=&limit=100&offset=0";
const API_URL_SECTIONS = "https://aisnagpur.com/aironline/act/section_list";

const ActSection = () => {
    const [actList, setActList] = useState([]);
    const [sectionsData, setSectionsData] = useState({});
    const [sections, setSections] = useState([
        { id: Date.now(), actID: null, sectionList: [] },
    ]);
    const [loadingActs, setLoadingActs] = useState(true);
    const [loadingSections, setLoadingSections] = useState({});


    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedValue, setSelectedValue] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchActs = async (query) => {
        console.log("query",query);
        if (!query) return;
        setLoading(true);
        try {
            console.log(`https://aisnagpur.com/aironline/act/act_list?searchString=${query}&limit=100&offset=0`);
          const response = await fetch(`https://aisnagpur.com/aironline/act/act_list?searchString=${query}&limit=100&offset=0`);
          const data = await response.json();
          console.log("response",data);

          setActList(
            data.map((act) => ({
              label: act.name, 
              value: act.id,
            }))
          );
        } catch (error) {
          console.error("Error fetching acts:", error);
        } finally {
          setLoading(false);
        }
      };


    

    const fetchSectionsData = async (actName, actID, sectionIndex) => {
        setLoadingSections((prev) => ({ ...prev, [sectionIndex]: true }));

        try {
            const url = `${API_URL_SECTIONS}?actName=${encodeURIComponent(
                actName
            )}&actID=${actID}`;
            console.log("Fetching sections from:", url);

            const response = await fetch(url);
            const result = await response.json();

            console.log("API Response:", result);

            if (result.err_code === "success" && Array.isArray(result.actData)) {
                const sectionList = result.actData.map((item) => ({
                    label: item.Section,
                    value: item.Section,
                }));

                setSectionsData((prev) => ({ ...prev, [actID]: sectionList }));

                setSections((prev) =>
                    prev.map((s, i) => (i === sectionIndex ? { ...s, sectionList } : s))
                );
            } else {
                Alert.alert(
                    "Error",
                    `Unexpected API response: ${JSON.stringify(result)}`
                );
            }
        } catch (error) {
            Alert.alert("Error", `Failed to fetch section data: ${error.message}`);
        } finally {
            setLoadingSections((prev) => ({ ...prev, [sectionIndex]: false }));
        }
    };

    const handleActChange = (value, label, index) => {
        fetchSectionsData(label, value, index);
        setSections((prev) =>
            prev.map((s, i) =>
                i === index ? { ...s, actID: value, sectionList: [], selectedSections: [] } : s
            )
        );
    };


    const addSection = () => {
        setSections([
            ...sections,
            { id: Date.now(), actID: null, sectionList: [] },
        ]);
    };

    const removeSection = (id) => {
        setSections(sections.filter((section) => section.id !== id));
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                {sections.map((section, index) => (
                    <View key={section.id} style={styles.sectionContainer}>
                        {/* <View style={styles.inputContainer}>
              <Text style={styles.label}>Act Name :</Text>
              {loadingActs ? (
                <ActivityIndicator size="large" color="#007AFF" />
              ) : (
                <Dropdown
                  style={styles.dropdown}
                  data={actList}
                  labelField="label"
                  valueField="value"
                  placeholder="Select an Act"
                  onChange={(item) =>
                    handleActChange(item.value, item.label, index)
                  }
                />
              )}
            </View> */}

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Act Name:</Text>
                            <Dropdown
                                style={styles.dropdown}
                                data={actList}
                                search
                                searchPlaceholder="Search Act..."
                                labelField="label"
                                valueField="value"
                                placeholder="Select an Act"
                                value={selectedValue}
                                onChange={(item) => {
                                    setSelectedValue(item.value);
                                    handleActChange(item.value, item.label, index);
                                }}
                                onSearch={fetchActs} // Calls API when user types in search field
                                renderLeftIcon={() => (loading ? <ActivityIndicator size="small" color="#007AFF" /> : null)}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Section :</Text>
                            {loadingSections[index] ? (
                                <ActivityIndicator size="large" color="#007AFF" />
                            ) : (

                                <MultiSelect
                                    style={styles.dropdown}
                                    data={section.sectionList}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={
                                        section.selectedSections?.length > 0
                                            ? `${section.selectedSections.length} selected`
                                            : "Select Sections"
                                    }
                                    value={section.selectedSections || []}
                                    onChange={(items) => {
                                        setSections((prev) =>
                                            prev.map((s, i) =>
                                                i === index ? { ...s, selectedSections: items } : s
                                            )
                                        );
                                    }}
                                    selectedStyle={{ display: "none" }}
                                    renderItem={(item, selected) => (
                                        <View style={styles.item}>
                                            <Text style={styles.itemText}>{item.label}</Text>
                                            <Text style={styles.checkbox}>
                                                {selected ? "✔️" : "⬜"}
                                            </Text>
                                        </View>
                                    )}
                                />
                            )}
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.plusButton} onPress={addSection}>
                                <Text style={styles.plusText}>+</Text>
                            </TouchableOpacity>
                            {index > 0 && (
                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={() => removeSection(section.id)}
                                >
                                    <MaterialIcons name="delete" size={24} color="red" />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                ))}

                <TouchableOpacity style={styles.searchButton}>
                    <Text style={styles.searchText}>Search</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingVertical: 20,
    },
    container: {
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    sectionContainer: {
        width: "95%",
        backgroundColor: "white",
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    dropdown: {
        width: "100%",
        height: 50,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: "#ccc",
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    plusButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#007AFF",
        justifyContent: "center",
        alignItems: "center",
        right: -270,
    },
    plusText: {
        fontSize: 30,
        color: "#ffffff",
        top: -3,
    },
    deleteButton: {
        marginLeft: 10,
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    itemText: {
        fontSize: 16,
        color: "#333",
    },
    checkbox: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#007AFF",
    },
    searchButton: {
        width: '70%',
        padding: 15,
        backgroundColor: '#28a745',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    searchText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
    searchInput: { borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 10 },
});

export default ActSection;
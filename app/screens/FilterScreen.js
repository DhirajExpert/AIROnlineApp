import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Button, RadioButton, Checkbox } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyle from "../core/Style";
import CheckBox from "expo-checkbox";


const filter = {
  "courts": [
    {
      "name": "bombay high court",
      "count": 1
    },
    {
      "name": "patna high court",
      "count": 1
    },
    {
      "name": "supreme court",
      "count": 2
    },
    {
      "name": "uttarakhand high court",
      "count": 1
    }
  ],
  "judges": [
    {
      "name": "ahsanuddin amanullah",
      "count": 1
    },
    {
      "name": "ashwani kumar singh",
      "count": 1
    },
    {
      "name": "chakradhari sharan singh",
      "count": 1
    },
    {
      "name": "hemant gupta",
      "count": 1
    },
    {
      "name": "indu malhotra",
      "count": 1
    },
    {
      "name": "j.j. heaton",
      "count": 1
    },
    {
      "name": "krishna murari",
      "count": 1
    },
    {
      "name": "l.c. crump",
      "count": 1
    },
    {
      "name": "lallubhai asharam shah",
      "count": 1
    },
    {
      "name": "manoj kumar tiwari",
      "count": 1
    },
    {
      "name": "n. v. ramana",
      "count": 1
    },
    {
      "name": "rajendra kumar mishra",
      "count": 1
    },
    {
      "name": "ravindra maithani",
      "count": 1
    },
    {
      "name": "surya kant",
      "count": 1
    },
    {
      "name": "uday umesh lalit",
      "count": 1
    },
    {
      "name": "vikash jain",
      "count": 1
    },
    {
      "name": "vipin sanghi",
      "count": 1
    }
  ],
  "benchStrenth": [
    {
      "name": "3",
      "count": 4
    },
    {
      "name": "5",
      "count": 1
    }
  ],
  "topic": [
    {
      "name": "adulteration in turmeric powder",
      "count": 1
    },
    {
      "name": "criminal laws  (offences & punishment)",
      "count": 1
    },
    {
      "name": "mandi fees tecovered from purchaser",
      "count": 1
    },
    {
      "name": "report of public analyst",
      "count": 1
    },
    {
      "name": "sale price",
      "count": 1
    },
    {
      "name": "trusts",
      "count": 1
    },
    {
      "name": "validity",
      "count": 1
    },
    {
      "name": "value added tax",
      "count": 1
    },
    {
      "name": "waqf board",
      "count": 1
    }
  ],
  "remark": [
    {
      "name": "overruled",
      "count": 1
    },
    {
      "name": "reversed",
      "count": 1
    }
  ],
  "nominalApp": [
    {
      "name": "hargovind pulchand doshi",
      "count": 1
    },
    {
      "name": "prabhagiya vipnan prabandhak uttarakhand forest development ramnagar",
      "count": 1
    },
    {
      "name": "prem chand",
      "count": 1
    },
    {
      "name": "smriti madan kansagra",
      "count": 1
    },
    {
      "name": "suo motu cognizance",
      "count": 1
    }
  ],
  "nominalRes": [
    {
      "name": "bai hirbai",
      "count": 1
    },
    {
      "name": "commissioner commercial tax uttarakhand, dehradun",
      "count": 1
    },
    {
      "name": "perry kansagra",
      "count": 1
    },
    {
      "name": "state of bihar",
      "count": 1
    },
    {
      "name": "state of haryana",
      "count": 1
    }
  ],
  "caseResult": [
    {
      "name": "appeal allowed",
      "count": 1
    },
    {
      "name": "appeal dismissed",
      "count": 1
    },
    {
      "name": "order accordingly",
      "count": 1
    },
    {
      "name": "order accordingly.",
      "count": 1
    },
    {
      "name": "petition dismissed",
      "count": 1
    }
  ],
  "decisionYear": [
    {
      "name": "1920",
      "count": 1
    },
    {
      "name": "2020",
      "count": 2
    },
    {
      "name": "2021",
      "count": 1
    },
    {
      "name": "2023",
      "count": 1
    }
  ]
}


const staticData = {
  courts: filter.courts.map(item => ({ name: item.name, count: item.count })),
  judges: filter.judges.map(item => ({ name: item.name, count: item.count })),
  benchStrength: filter.benchStrenth.map(item => ({ name: item.name, count: item.count })),
  topics: filter.topic.map(item => ({ name: item.name, count: item.count })),
  remarks: filter.remark.map(item => ({ name: item.name, count: item.count })),
  Nominal: filter.nominalApp.map(item => ({ name: item.name, count: item.count })),
  nominalRes: filter.nominalRes.map(item => ({ name: item.name, count: item.count })),
  Case_Results: filter.caseResult.map(item => ({ name: item.name, count: item.count })),
  Decision_Years: filter.decisionYear.map(item => ({ name: item.name, count: item.count }))
};

// console.log(staticData);

export default function FilterScreen() {
  const [filterData, setFilterData] = useState([]);


  useEffect(() => {
    const updatedFilter = updateFilterData(filterData, selectedItem);
    setFilterData(updatedFilter);
  }, [selectedItem]);


  const initialCollapsedState = Object.keys(staticData).reduce((acc, category) => {
    acc[category] = true;
    return acc;
  }, {});

  const [collapsed, setCollapsed] = useState(initialCollapsedState);
  const [selectedItem, setSelectedItem] = useState({});


  const [modalVisible, setModalVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState([]);
  const [currentCategoryKey, setCurrentCategoryKey] = useState("");

  const toggleCollapse = (category) => {
    setCollapsed((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSelect = (category, name) => {
    setSelectedItem((prev) => ({
      ...prev,
      [category]: name,
    }));
  };
  const openModal = (key, items) => {
    setCurrentCategory(items);
    setCurrentCategoryKey(key);
    setModalVisible(true);
  };

  const renderCategory = ({ item }) => {
    const { categoryName, data } = item;
    const isCollapsed = collapsed[categoryName];
    const visibleItems = data.slice(0, 5);

    return (
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.categoryTitle}
          onPress={() => toggleCollapse(categoryName)}
        >
          <Text style={styles.categoryText}>{categoryName}</Text>
          <Text style={styles.arrow}>{isCollapsed ? "↓" : "↑"}</Text>
        </TouchableOpacity>
        {!isCollapsed && (
          <>
            <FlatList
              data={visibleItems}
              keyExtractor={(item, index) => `${item.name}-${index}`}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  {/* <RadioButton
                    value={item.name}
                    status={selectedItem[categoryName] === item.name ? "checked" : "unchecked"}
                    onPress={() => handleSelect(categoryName, item.name)}
                  /> */}
                  <Checkbox
                    status={
                      selectedItem[categoryName]?.[item.name]
                        ? "checked" : "unchecked"
                    }
                    containerStyle={{
                      backgroundColor: "transparent",
                      borderWidth: 0,
                    }}
                    textStyle={{
                      fontSize: 16,
                    }}
                    checkedColor="#007BFF"
                    uncheckedColor="#C0C0C0"
                    onPress={() => handleCheckboxToggle(categoryName, item.name)}
                  />
                  <Text>{item.name} ({item.count})</Text>
                </View>
              )}
            />
            {data.length > 5 && (
              <TouchableOpacity
                onPress={() => openModal(categoryName, data)}
                style={styles.readMoreButton}
              >
                <Text style={styles.readMoreText}>Read More</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    );
  };

  const categories = Object.keys(staticData).map((key) => ({
    categoryName: key,
    data: staticData[key],
  }));

  const updateFilterData = (originalData, responseData) => {
    const updatedData = {};

    // Iterate over each category in the original data
    Object.keys(originalData).forEach((key) => {
      updatedData[key] = originalData[key].map((item) => ({
        ...item,
        checked: responseData[key]?.[item.name] || false, // Set checked based on response
      }));
    });
    return updatedData;
  };

  const onSubmit = () => {
    console.log("selected", selectedItem);
    const updatedData = updateFilterData(staticData, selectedItem);

    console.log("New Updated Data", updatedData);
  }

  const handleCheckboxToggle = (category, name) => {
    setSelectedItem((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category] || {}),
        [name]: !(prev[category]?.[name] || false),
      },
    }));
  };

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={globalStyle.safearea}>
      <View style={styles.container}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.categoryName}
          renderItem={renderCategory}
        />

        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>{currentCategoryKey}</Text>
                <FlatList
                  data={currentCategory}
                  keyExtractor={(item, index) => `${item.name}-${index}`}
                  renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                      {/* <RadioButton
                        value={item.name}
                        status={
                          Object.values(selectedItem).includes(item.name)
                            ? "checked"
                            : "unchecked"
                        }
                        onPress={() => handleSelect("modalCategory", item.name)}
                      /> */}


                      <Checkbox
                        status={
                          selectedItem[currentCategoryKey]?.[item.name]
                            ? "checked"
                            : "unchecked"
                        }
                        onPress={() => handleCheckboxToggle(currentCategoryKey, item.name)}
                      />

                      <Text>{item.name} ({item.count})</Text>
                    </View>
                  )}
                />
                <Button mode='contained' onPress={() => setModalVisible(false)} >Close</Button>
              </View>
            </View>
          </View>
        </Modal>
        <Button
          mode='contained' onPress={onSubmit}>
          Submit
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    paddingHorizontal: 12,
  },
  categoryCollapsed: {
    backgroundColor: '#e0e0e0',
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  arrow: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingLeft: 16,
  },
  readMoreButton: {
    alignItems: "center",
    marginVertical: 10,
  },
  readMoreText: {
    color: "#007BFF",
    textDecorationLine: "underline",
  },
  modalContainer: {


    padding: 16,

  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '95%',
    height: '90%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});


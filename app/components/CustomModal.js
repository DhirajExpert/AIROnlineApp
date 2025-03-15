import React, { useState, useEffect } from 'react';
import {
  View, Text, Modal, FlatList, TouchableOpacity, StyleSheet, TextInput, ScrollView,
} from 'react-native';
import { Button, RadioButton, Checkbox } from 'react-native-paper';
import {theme} from "../core/theme";
import { getFTSDigestView } from "../api/api";
import { color } from 'react-native-elements/dist/helpers';

const CustomModal = ({ visible, onClose, handleModalDismiss, data }) => {

// const [data, setData] = useState([]);
 const [responseDigestView, setResponseDigestView] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [staticData, setStaticData] = useState({});


useEffect(() => {
  if (data) {
    setStaticData({
      courts: data?.courts?.map(item => ({ name: item.name, count: item.count })) || [],
      judges: data?.judges?.map(item => ({ name: item.name, count: item.count })) || [],
      benchStrength: data?.benchStrength?.map(item => ({ name: item.name, count: item.count })) || [],
      topics: data?.topic?.map(item => ({ name: item.name, count: item.count })) || [],
      remarks: data?.remark?.map(item => ({ name: item.name, count: item.count })) || [],
      Nominal: data?.nominalApp?.map(item => ({ name: item.name, count: item.count })) || [],
      nominalRes: data?.nominalRes?.map(item => ({ name: item.name, count: item.count })) || [],
      Case_Results: data?.caseResult?.map(item => ({ name: item.name, count: item.count })) || [],
      Decision_Years: data?.decisionYear?.map(item => ({ name: item.name, count: item.count })) || [],
      Act: data?.acts?.map(item => ({ name: item.name, count: item.count })) || [],
    });
  }
}, [data]);

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
                  <Text style={styles.itemname}>{item.name} ({item.count})</Text>
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
    // console.log("New Updated Data", updatedData);
    //  setVisible(false);
    const transformedData = transformResponse(selectedItem);

    console.log(transformedData);
    onClose(transformedData);

  }

  const transformResponse = (response) => {
    const transformedData = {};

    // Iterate over each key in the response
    Object.keys(response).forEach((key) => {
      transformedData[key] = Object.keys(response[key]).filter((subKey) => response[key][subKey]);
    });

    return transformedData;
  };

  const handleCheckboxToggle = (category, name) => {
    setSelectedItem((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category] || {}),
        [name]: !(prev[category]?.[name] || false),
      },
    }));

    if (category === "Act" && !selectedItem[category]?.[name]) {
      console.log("ActNmae",name);
     

      const transformedData = transformResponse(selectedItem);
      console.log("transformedData",transformedData);
      CourtFilterDigestView(transformedData.courts||'', transformedData.judges||'', transformedData.benchStrength||'', transformedData.Case_Results||'', transformedData.Decision_Years||'', transformedData.Nominal||'', transformedData.nominalRes||'', transformedData.topics||'', name)
    }





    // setSelectedItem((prev) => {
    //   const prevSelected = prev[category] || {}; // Get previous selections
    //   const newSelection = !prevSelected[name]; // Toggle current selection
  
    //   const updatedSelection = {
    //     ...prevSelected,
    //     [name]: newSelection, // Update selected value
    //   };
  
    //   const newSelectedItem = {
    //     ...prev,
    //     [category]: updatedSelection,
    //   };
  
    //   // If the selected category is "Act", call the API
    //   if (category === "Act") {
    //     const previouslySelectedActs = Object.keys(prevSelected).filter(
    //       (key) => prevSelected[key] // Get previously selected items
    //     );
  
    //     const currentlySelectedActs = Object.keys(updatedSelection).filter(
    //       (key) => updatedSelection[key]
    //     );
  
    //     console.log("Previously Selected Acts:", previouslySelectedActs);
    //     console.log("Currently Selected Acts:", currentlySelectedActs);
        
    //     // Call transformResponse and API with previous & current selected Acts
    //     const transformedData = transformResponse(newSelectedItem);
        

    //     CourtFilterDigestView(transformedData.courts||'', transformedData.judges||'', transformedData.benchStrength||'', transformedData.Case_Results||'', transformedData.Decision_Years||'', transformedData.Nominal||'', transformedData.nominalRes||'', transformedData.topics||'', currentlySelectedActs)
    //   }
  
    //   return newSelectedItem; // Update state
    // });

  };
  const CourtFilterDigestView = async (courts, judges, benchStrength, Case_Results, Decision_Years, Nominal, nominalRes, topics,acts, searchInSearch) => {
          // if (loading) return;
          setLoading(true);
          try {
  
              const searchFilter = 'searchFilter';
              const response = await getFTSDigestView(data?.searchword||'', 10, `${page}`, courts, judges, benchStrength, Case_Results, Decision_Years, Nominal, nominalRes, topics,acts, searchFilter, searchInSearch||'');
              console.log("getFTSDigestView section", response);
  
              if (response.err_code === 'success') {
                  console.log("count", response.docCount);
  
                  if (response.docCount > 0) {
                      setResponseDigestView((prevData) => [...prevData, ...response.digestView]);
                      // setData((prevData) => [...prevData, ...(response.digestView)]);
                      setPage((prevPage) => prevPage + 10);
                      // setFilterData((prevFilterData) => ({ 
                      
                      //   ...prevFilterData,
                      //   sections: data?.decisionYear?.map((item) => ({ name: item.name, count: item.count })),
                      // }));


                      setStaticData(prevData => ({
                        ...prevData,
                        Section: response?.filter?.sections?.map(item => ({ name: item.name, count: item.count })) || [],
                      }));


                      // if (response.docCount < 10) {
                      //     setHasMore(false);
                      // }
                  } else {
                      // setHasMore(false);
                  }
              }
              else if (response.err_code === 'ERR_01') {
                  // setData([]);
                  setResponseDigestView([]);
                  // setHasMore(false);
              }
              else {
  
                  // setHasMore(false);
              }
          }
          catch (error) {
              console.error(error);
          }
          setLoading(false);
      }


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose} // Handle back button press on Android
      onDismiss={handleModalDismiss}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View >
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

                          <Text style={styles.itemname}>{item.name} ({item.count})</Text>
                        </View>
                      )}
                    />
                    <Button mode='contained' onPress={() => setModalVisible(false)} >Close</Button>
                  </View>
                </View>
              </View>

            </Modal>

          </View>
          <View style={styles.buttonContainer}>

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close Modal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={onSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            {/* <Button
              mode='contained' >Submit
            </Button> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '95%',
    height: '80%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    // alignItems: 'center',
  
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    // backgroundColor: '#FF5252',
    padding: 10,
    borderRadius: 5,
    
    borderWidth:1,
   
  },
  submitButton: {
    // backgroundColor: '#FF5252',
    padding: 10,
    borderRadius: 5,
    
  },
  closeButtonText: {
    color:theme.colors.blue,
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButtonText: {
    color:theme.colors.red,
    fontSize: 16,
    fontWeight: 'bold',
  },


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
    backgroundColor: '#ffffff',
    borderRadius: 5,
    paddingHorizontal: 12,
   
  },
  categoryCollapsed: {
    backgroundColor: '#e0e0e0',
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.blue
  },
  arrow: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.blue
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingLeft: 16,
    // borderBottomWidth:1
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


    // padding: 16,

  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemname:{
    color:theme.colors.blue,
    fontSize:20
  },
  // modalOverlay: {
  //   flex: 1,
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black background
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // modalContent: {
  //   width: '95%',
  //   height: '90%',
  //   backgroundColor: '#FFF',
  //   padding: 20,
  //   borderRadius: 10,
  //   alignItems: 'center',
  // },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#FFF',
  }

});

export default CustomModal;

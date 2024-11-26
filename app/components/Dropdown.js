import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function Dropdown({ items, placeholder, onSelect, selectedValue, onAddJournal}) {
    const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter items based on search query
  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle adding a new journal
  const handleAddJournal = () => {
    if (searchQuery && !items.some(item => item.label.toLowerCase() === searchQuery.toLowerCase())) {
      onAddJournal(searchQuery);
    }
    setSearchQuery(''); // Clear search after adding
    setModalVisible(false); // Close modal
  };
    return (
        <View style={styles.container}>
      {/* Dropdown Button */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => {
          setModalVisible(true);
          setSearchQuery(''); // Clear search query when opening modal
        }}
      >
        <Text style={styles.dropdownButtonText}>
          {selectedValue ? selectedValue : placeholder}
        </Text>
        <Icon name="chevron-down" size={24} color="#333" style={styles.icon} /> {/* Down Arrow */}
      </TouchableOpacity>

      {/* Modal for Items List */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Search Input */}
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            {/* Add Journal Button */}
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddJournal}
            >
              <Text style={styles.addButtonText}>Add Journal</Text>
            </TouchableOpacity>

            {/* List of Items */}
            <FlatList
              data={filteredItems} // Only filtered items are displayed
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => {
                    onSelect(item.label); // Call the onSelect function passed as a prop
                    setModalVisible(false); // Close modal after selection
                    setSearchQuery(''); // Clear search after selection
                  }}
                >
                  <Text style={styles.listItemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
      marginVertical: 10,
    },
    dropdownButton: {
      padding: 15,
      backgroundColor: '#f0f0f0',
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    dropdownButtonText: {
      fontSize: 16,
      color: '#333',
    },
    icon: {
      marginLeft: 10,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '90%',
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    searchInput: {
      width: '100%',
      padding: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      marginBottom: 20,
    },
    addButton: {
      backgroundColor: '#4CAF50',
      padding: 10,
      borderRadius: 5,
      marginBottom: 20,
      width: '100%',
      alignItems: 'center',
    },
    addButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    listItem: {
      paddingVertical: 15,
      width: '100%',
    },
    listItemText: {
      fontSize: 16,
      color: '#333',
    },
  });
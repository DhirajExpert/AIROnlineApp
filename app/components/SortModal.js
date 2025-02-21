import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For icons (optional)

const SortModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const sortOptions = [
    "Relevance",
    "Heading A-Z",
    "Heading Z-A",
    "Party Name A-Z",
    "Party Name Z-A",
    "Court Name A-Z",
    "Court Name Z-A",
    "Date of decision (↑)",
    "Date of decision (↓)",
    "Coram (↑)",
    "Coram (↓)",
  ];

  return (
    <View style={styles.container}>
      {/* Button to Open Modal */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Sort Results</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sort Result</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            {/* Sort Options */}
            <FlatList
              data={sortOptions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.option}>
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SortModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  option: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
  },
});

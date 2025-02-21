import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';

const ArticleTitleModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Button to open the modal */}
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Open Modal</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="slide" // or 'fade', 'none'
        transparent={true} // Ensures the modal has a transparent background
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Handles back button on Android
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Modal Title</Text>
            <Text style={styles.modalText}>
              This is the content of the modal.
            </Text>
            {/* Button to close the modal */}
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  openButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
  },
});

export default ArticleTitleModal;

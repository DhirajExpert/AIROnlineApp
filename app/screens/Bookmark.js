// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
// import { AntDesign } from "@expo/vector-icons";

// // Default Folders
// const initialFolders = [
//   { id: "1", name: "NameA", subfolders: [] },
//   { id: "2", name: "NameB", subfolders: [] },
// ];

// const Bookmark = () => {
//   const [folders, setFolders] = useState(initialFolders); // Store folders
//   const [folderName, setFolderName] = useState(""); // Input field
//   const [selectedFolderId, setSelectedFolderId] = useState(null); // Selected parent folder
//   const [expandedFolders, setExpandedFolders] = useState({}); // Folder expansion state

//   // Function to add a new folder (main folder or subfolder)
//   const addFolder = () => {
//     if (folderName.trim() === "") return;

//     const newFolder = {
//       id: Date.now().toString(),
//       name: folderName,
//       subfolders: [], // Every folder starts empty
//     };

//     if (selectedFolderId) {
//       // Add subfolder inside the selected folder
//       setFolders((prevFolders) =>
//         prevFolders.map((folder) =>
//           folder.id === selectedFolderId
//             ? { ...folder, subfolders: [...folder.subfolders, newFolder] }
//             : folder
//         )
//       );
//     } else {
//       // Add as a new main folder
//       setFolders([...folders, newFolder]);
//     }

//     setFolderName("");
//     setSelectedFolderId(null);
//   };

//   // Toggle Expand/Collapse of Folders
//   const toggleFolderExpand = (folderId) => {
//     setExpandedFolders((prev) => ({
//       ...prev,
//       [folderId]: !prev[folderId],
//     }));
//   };

//   return (
//     <View style={styles.container}>
//       {/* Input Field to Create Folder */}
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Folder Name"
//           value={folderName}
//           onChangeText={setFolderName}
//         />
//         <TouchableOpacity style={styles.addButton} onPress={addFolder}>
//           <AntDesign name="pluscircle" size={24} color="white" />
//         </TouchableOpacity>
//       </View>

//       {/* Folder List */}
//       <FlatList
//         data={folders}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View>
//             {/* Main Folder */}
//             <TouchableOpacity style={styles.folderItem} onPress={() => toggleFolderExpand(item.id)}>
//               <Image source={require("../../assets/images/folder.png")} style={styles.folderIcon} />
//               <Text style={styles.folderText}>{item.name}</Text>
//               <TouchableOpacity onPress={() => setSelectedFolderId(item.id)}>
//                 <AntDesign name="plus" size={18} color="green" />
//               </TouchableOpacity>
//               <AntDesign name={expandedFolders[item.id] ? "down" : "right"} size={16} color="gray" />
//             </TouchableOpacity>

//             {/* Render Subfolders */}
//             {expandedFolders[item.id] && item.subfolders.length > 0 && (
//               <FlatList
//                 data={item.subfolders}
//                 keyExtractor={(subItem) => subItem.id}
//                 renderItem={({ item: subItem }) => (
//                   <View style={styles.subfolderContainer}>
//                     <Image source={require("../../assets/images/folder.png")} style={styles.subfolderIcon} />
//                     <Text style={styles.subFolderText}>{subItem.name}</Text>
//                   </View>
//                 )}
//               />
//             )}
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#f8f9fa",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 10,
//     borderRadius: 5,
//     backgroundColor: "white",
//   },
//   addButton: {
//     marginLeft: 10,
//     backgroundColor: "#007bff",
//     padding: 10,
//     borderRadius: 5,
//   },
//   folderItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//     borderRadius: 6,
//     marginBottom: 6,
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   folderIcon: {
//     width: 30,
//     height: 30,
//     marginRight: 10,
//   },
//   folderText: {
//     fontSize: 16,
//     flex: 1,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   subfolderContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingLeft: 40,
//     paddingVertical: 6,
//   },
//   subfolderIcon: {
//     width: 25,
//     height: 25,
//     marginRight: 10,
//   },
//   subFolderText: {
//     fontSize: 14,
//     color: "#666",
//   },
// });




// export default Bookmark;



import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, Modal, Alert, Button } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { getfolderDefault, getcreateFolder } from '../api/api';
import Background from "../components/Background";

// Default Folders
const initialFolders = [
  { id: "1", name: "NameA", subfolders: [] },
  { id: "2", name: "NameB", subfolders: [] },
];

const Bookmark = () => {
  // const [folders, setFolders] = useState(initialFolders); // Store folders
  const [folderName, setFolderName] = useState(""); // Input field
  const [selectedFolderId, setSelectedFolderId] = useState(null); // Selected parent folder
  const [expandedFolders, setExpandedFolders] = useState({}); // Folder expansion state

  const [folders, setFolders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  


  const folderDefault = async () => {

    response = await getfolderDefault('BF');
    console.log("folder data", response.data.data.userDataList[0].userDataTitle);

    setFolders(response.data.data.userDataList);
  }

  useEffect(() => {
    folderDefault();

  }, [])


  const openFolderModal = (folderId) => {
    setSelectedFolderId(folderId);
    setNewFolderName(""); // Reset input field
    setModalVisible(true);
  };

  const handlePlusClick = (folderId) => {
    setExpandedFolders((prevState) => ({
      ...prevState,
      [folderId]: !prevState[folderId], // Toggle expand/collapse
    }));
  };

  const addSubFolder = (folderList, parentId, newSubFolder) => {
    return folderList.map((folder) => {
      if (folder.id === parentId) {
        return {
          ...folder,
          subFolders: folder.subFolders ? [...folder.subFolders, newSubFolder] : [newSubFolder],
        };
      } else if (folder.subFolders && folder.subFolders.length > 0) {
        return {
          ...folder,
          subFolders: addSubFolder(folder.subFolders, parentId, newSubFolder),
        };
      }
      return folder;
    });
  };

  const createSubFolder = async () => {
    if (!newFolderName.trim()) {
      Alert.alert("Error", "Folder name cannot be empty!");
      return;
    }

    try {
     
      const response = await getcreateFolder(newFolderName, 'BF', selectedFolderId, 'NO');
       console.log("folder created",response.data.data);



      if (response.data.data.err_code==='SUCCESS') {
        Alert.alert(response.data.data.err_msg);
        const newSubFolder = {
          id: response.data.folderId, // Use ID from API response
          userDataTitle: response.data.folderName,
          subFolders: [],
        };

        // Update State Recursively
        setFolders((prevFolders) => addSubFolder(prevFolders, selectedFolderId, newSubFolder));

        setModalVisible(false);
      } 
      else if (response.data.data.err_code==='FAILURE') {
        Alert.alert(response.data.data.err_msg);
      } 
      
      else {
        Alert.alert("Error", "Failed to create subfolder");
      }
    } catch (error) {
      console.error("API Error:", error);
      Alert.alert("API Error", "Something went wrong while creating the folder.");
    }
  };



  


  const renderFolders = (folderList = [], level = 0) => {
    if (!Array.isArray(folderList)) return null;
  
    return folderList.map((folder) => (
      <View key={folder.id} style={{ marginLeft: level * 20 }}>
        
        {/* Folder Row with + Button if Needed */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          
          {/* Expand/Collapse Button */}
          {folder.subFolders && folder.subFolders.length > 0 && (
            <TouchableOpacity onPress={() => handlePlusClick(folder.id)} style={styles.expandButton}>
              <Text style={styles.plusText}>{expandedFolders[folder.id] ? "▼" : "▶"}</Text>
            </TouchableOpacity>
          )}
  
          {/* Folder Name */}
          <TouchableOpacity style={styles.folder} onPress={() => openFolderModal(folder.id)}>
          <Image source={require("../../assets/images/folder.png")} style={styles.subfolderIcon} />
            <Text style={styles.folderText}>{folder.userDataTitle}</Text>
          </TouchableOpacity>
        </View>
  
        {/* Render Subfolders Recursively If Expanded */}
        {expandedFolders[folder.id] && folder.subFolders.length > 0 && (
          <View style={{ marginLeft: 20 }}>
            {renderFolders(folder.subFolders, level + 1)}
          </View>
        )}
        
      </View>
    ));
  };
  
  
  
  

  

  

  // Toggle Expand/Collapse of Folders
  const toggleFolderExpand = (folderId) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  return (
    <View style={styles.container}>
     <Background>
    <View style={styles.viewcontainer}>
      
    {renderFolders(folders)}

    {/* Modal for Folder Name Input */}
    <Modal visible={modalVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Enter Folder Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Folder Name"
            value={newFolderName}
            onChangeText={setNewFolderName}
          />
          <View style={styles.buttonRow}>
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
            <Button title="Create" onPress={createSubFolder} />
          </View>
        </View>
      </View>
    </Modal>
  </View>
  </Background>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  viewcontainer: {
    padding: 20,
    
  },
  
  // folder: {
  //   backgroundColor: "#4CAF50",
  //   padding: 10,
  //   borderRadius: 5,
  //   marginVertical: 5,
    
  // },
  // folderText: {
  //   color: "#fff",
  //   fontWeight: "bold",
  // },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    width: "100%",
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
    folderIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  folder: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection:'row'
  },
  folderText: {
    color: "#fff",
    fontWeight: "bold",
  },
  expandButton: {
    marginRight: 10,
    
  },
  plusText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    
  },
    subfolderIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },

});




export default Bookmark;

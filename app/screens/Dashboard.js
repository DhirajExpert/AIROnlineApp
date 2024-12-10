import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

import { homePageGrid } from "../config/data";
import SearchBar from "../components/SearchBar";
import ListItemButton from "../components/ListItem";

export default function Dashboard({ navigation }) {
  const [name, setName] = useState({ value: "", error: "" });
  const [searchQuery, setSearchQuery] = React.useState("");

  const onClickHandler = (id) => {
    console.log("itemclick", id);
    switch (id) {
      case "1":
        navigation.navigate("CitationSearch1");
        break;
      case "2":
        navigation.navigate("BrowseByCourt");
        break;
      case "3":
        navigation.navigate("BrowseByLawyer");
        break;
      case "4":
        navigation.navigate("BenchStrength");
        break;
      case "5":
        navigation.navigate("JudgementDate");
        break;
      case "6":
        navigation.navigate("NominalSearch");
        break;
      case "7":
        navigation.navigate("TopicalSearch");
        break;
      case "8":
        navigation.navigate("Test");
        break;
      case "9":
        // navigation.navigate('CitationSearch1');
        break;

      default:
    }
  };


  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center",padding:1 }}>
        <SearchBar />
      </View>
      <Text style={styles.redBanner}>SEARCH JUDGMENTS</Text>
      <FlatList
        data={homePageGrid}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.gridContainer}
        renderItem={({ item }) =><ListItemButton clickHandler={onClickHandler} icon={item.icon} label={item.label} id={item.id} /> }
      />
      <View style={styles.resultHeader}>
        <Text style={styles.resultTitle}>Supreme Court Of India</Text>
        <TouchableOpacity>
          <Text style={styles.resultAction}>Select Court</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#00578E",
    padding: 15,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
  },
  icon: {
    marginRight: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  redBanner: {
    backgroundColor: "#D32F2F",
    color: "#fff",
    textAlign: "center",
    paddingVertical: 10,
    fontWeight: "bold",
  },
  gridContainer: {
    padding: 0,
  },
  
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#00578E",
  },
  resultTitle: {
    color: "#fff",
    fontWeight: "bold",
  },
  resultAction: {
    color: "#FFD700",
  },
  resultItem: {
    padding: 10,
    fontWeight: "bold",
    color: "#333",
  },
  resultDescription: {
    paddingHorizontal: 10,
    color: "#666",
    marginBottom: 10,
  },
});

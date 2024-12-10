import { TouchableOpacity,Text, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ListItemButton = ({clickHandler,icon,label,id}) => {
  return (
    <TouchableOpacity style={styles.gridItem} onPress={clickHandler(id)}>
      <FontAwesome name={icon} size={24} color="#00578E" />
      <Text style={styles.gridLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderWidth: 1,
        borderColor: "#D32F2F",
      },
      gridLabel: {
        marginTop: 5,
        textAlign: "center",
        color: "#00578E",
        fontSize: 12,
      },
})


export default ListItemButton;
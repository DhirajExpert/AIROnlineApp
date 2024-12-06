import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, StyleSheet } from 'react-native';
import { Drawer, Avatar,Divider,Text } from 'react-native-paper';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const DrawerContent = (props)=>{
    return(
        <DrawerContentScrollView {...props}>
        {/* Header Section */}
        <View style={styles.header}>
          <Avatar.Image
            size={50}
            source={{
              uri: 'https://via.placeholder.com/150',
            }}
          />
          <Text style={styles.username}>User User</Text>
          <Text style={styles.welcome}>Welcome back</Text>
        </View>
  
        {/* Menu Items */}
        <Drawer.Section style={styles.menu}>
          <DrawerItem
            label="Home"
            icon={() => <FontAwesome name="home" size={24}  style={styles.icon} />}
            onPress={() => props.navigation.navigate('Home')}
          />
          <DrawerItem
            label="Articles"
            icon={() => <FontAwesome name="file-text-o" size={24}  style={styles.icon} />}
            onPress={() => props.navigation.navigate('Articles')}
          />
          <DrawerItem
            label="Legal Dictionary"
            icon={() => <FontAwesome name="book" size={24}  style={styles.icon} />}
            onPress={() => props.navigation.navigate('LegalDictionary')}
          />
           <Divider />
           <Text variant="titleMedium">Search</Text>
           <Divider />
          <DrawerItem
            label="Headnote"
            icon={() => <FontAwesome name="font" size={24}  style={styles.icon} />}
            onPress={() => props.navigation.navigate('Headnote')}
          />
          <DrawerItem
            label="Citation"
            icon={() => <FontAwesome name="quote-right" size={24}  style={styles.icon} />}
            onPress={() => props.navigation.navigate('Citation')}
          />
           <DrawerItem
            label="Nominal"
            icon={() => <FontAwesome name="users" size={24}  style={styles.icon} />}
            onPress={() => props.navigation.navigate('Nominal')}
          />
           <DrawerItem
            label="Equal Citation"
            icon={() => <FontAwesome name="exchange" size={24}  style={styles.icon} />}
            onPress={() => props.navigation.navigate('Equal Citation')}
          />
        <DrawerItem
            label="Comprehensive"
            icon={() => <FontAwesome name="globe" size={24}  style={styles.icon} />}
            onPress={() => props.navigation.navigate('Comprehensive')}
          />
          <DrawerItem
            label="Date of Decision"
            icon={() => <FontAwesome name="calendar" size={24}  style={styles.icon} />}
            onPress={() => props.navigation.navigate('Date of Decision')}
          />
           <DrawerItem
            label="Topical Index"
            icon={() => <FontAwesome name="check-square-o" size={24}  style={styles.icon} />}
            onPress={() => props.navigation.navigate('Topical Index')}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
    )
}


const styles = StyleSheet.create({
    header: {
      backgroundColor: '#00578E', // Dark blue
      padding: 20,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    username: {
      color: '#ffffff',
      fontWeight: 'bold',
      marginTop: 10,
      fontSize: 16,
    },
    welcome: {
      color: '#ffffff',
      fontSize: 14,
    },
    menu: {
      marginTop: 20,
      padding:0,
      marginLeft:0,
    },
    icon: {
      width: 24,
      height: 24,
      tintColor: '#555',
    },
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  
  export default DrawerContent;
import React, { useState ,useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import Background from '../components/Background';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from "../core/theme";
import * as SecureStore from 'expo-secure-store';

const ProfilePage = () => {
    const [imageUri, setImageUri] = useState(null);
    const [activeButton, setActiveButton] = useState('Basic Info');
    const [user, setUser] = useState(null);

 useEffect(() => {
        const fetchUserData = async () => {
            const authData = await SecureStore.getItemAsync('authLogin');

            if (authData) {
                const { userData, token } = JSON.parse(authData);
                console.log('User Data in:', userData);
                //   console.log('Token:', token);
                setUser(userData.name);
                return { userData, token };
            } else {
                console.log('No user data found');
                return null;
            }
        };
        fetchUserData();
    }, []);


    const handleImagePicker = () => {
        Alert.alert(
            "Upload Profile Picture",
            "Choose an option",
            [
                {
                    text: "Camera",
                    onPress: openCamera,
                },
                {
                    text: "Gallery",
                    onPress: openGallery,
                },
                {
                    text: "Cancel",
                    style: "cancel",
                },
            ]
        );
    };

    const openCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert("Permission to access camera is required!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const openGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert("Permission to access gallery is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.safearea}>
            <Background>
                <View style={styles.container}>
                    <View style={styles.profileSection}>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity style={styles.iconBackground} onPress={handleImagePicker}>
                                {imageUri ? (
                                    <Image source={{ uri: imageUri }} style={styles.iconImage} />
                                ) : (
                                    <Image source={require('../../assets/icons/face_icon.png')} style={styles.iconImage} />

                                )}
                            </TouchableOpacity>
                        </View>

                        <View style={styles.buttonColumn}>
                            <TouchableOpacity style={styles.button_red}>
                                <Text style={styles.buttonText_blue}>Edit Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button_blue}>
                                <Text style={styles.buttonText_red}>Invite a Friend</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: '5%', paddingVertical: '3%' }} >
                        <Text style={styles.name}>Your Registered Name</Text>
                        <Text style={styles.username}>@{user}</Text>
                    </View>
                    <View style={styles.divider} />

                    <View style={styles.infoContainer}>
                        <View style={styles.infoRow}>
                            <Icon name="envelope" size={20} style={styles.icon} />
                            <Text style={styles.infoLabel}>Email:</Text>
                            <Text style={styles.infoText}>Your.Email.Id@gmail.com</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Icon name="phone" size={20} color="#555" style={styles.icon} />
                            <Text style={styles.infoLabel}>Phone:</Text>
                            <Text style={styles.infoText}>+91-1234-567-890</Text>
                        </View>
                    </View>

                    <View style={styles.navRow}>
                        {['Basic Info', 'My Library', 'Active Plan'].map((button) => (
                            <TouchableOpacity
                                key={button}
                                style={[
                                    styles.navButton,
                                    activeButton === button && styles.activeButton,
                                ]}
                                onPress={() => setActiveButton(button)}
                            >
                                <Text
                                    style={[
                                        styles.navButtonText,
                                        activeButton === button && styles.activeButtonText,
                                    ]}
                                >
                                    {button}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Background>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safearea: {
        flex: 1,
    },
    container: {

        // backgroundColor: '#f7f7f7',

        padding: 20,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    iconBackground: {
        backgroundColor: '#e0e0e0',
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    iconImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        resizeMode: 'contain',
        shadowColor: '#000',
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 3,
        // shadowRadius: 10,
        // elevation: 5,
    },
    buttonColumn: {
        marginLeft: 65,
        justifyContent: 'space-around',
        height: 100,
    },
    button_blue: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: theme.colors.blue,
        paddingVertical: '6%',
        paddingHorizontal: '5%',
        borderRadius: 5,
    },
    button_red: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: theme.colors.red,
        paddingVertical: '6%',
        paddingHorizontal: '5%',
        borderRadius: 5,
    },
    buttonText_blue: {
        color: theme.colors.red,
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        paddingHorizontal: '1%'

    },
    buttonText_red: {
        color: theme.colors.blue,
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        paddingHorizontal: '1%'
    },

    name: {
        fontSize: 20,
        fontWeight: 'bold',
        // paddingVertical:'1%',

        color: theme.colors.blue
    },
    username: {
        fontSize: 16,
        // marginBottom: 20,
        // marginRight: 200,

        color: theme.colors.red
    },
    infoContainer: {
        width: '100%',
        paddingHorizontal: "5%",
        paddingVertical: '3%'
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: '1%',
    },
    icon: {
        marginRight: 10,
        color: theme.colors.red
    },
    infoLabel: {
        fontSize: 14,
        color: '#555',
        fontWeight: 'bold',
        marginRight: 5,
        color: theme.colors.red
    },
    infoText: {
        fontSize: 14,
        color: theme.colors.blue,
    },
    navRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        paddingVertical: '5%',
    },
    navButton: {
        backgroundColor: 'trasparent',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: theme.colors.red,
    },
    activeButton: {
        backgroundColor: theme.colors.red,
    },
    navButtonText: {
        color: theme.colors.red,
        fontSize: 14,
        fontWeight: 'bold',
    },
    activeButtonText: {
        color: '#fff',
    },
    divider: {
        // width: '100%',
        height: 0.5,
        paddingHorizontal: '45%',
        backgroundColor: theme.colors.blue,


    },
});

export default ProfilePage;
















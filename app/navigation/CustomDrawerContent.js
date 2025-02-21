import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements'; // Optional: for adding icons
import { theme } from "../core/theme";
import useAuthStore from '../authStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';

const CustomDrawerContent = ({ props, navigation }) => {

    const logout = useAuthStore((set) => set.logout);
    const [user, setUser] = useState(null);

    // ✅ Fetch user data inside useEffect, NOT in the component body
    useEffect(() => {
        const fetchUserData = async () => {
            const authData = await SecureStore.getItemAsync('authLogin');

            if (authData) {
                const { userData, token } = JSON.parse(authData);
                console.log('User Data:', userData);
                //   console.log('Token:', token);
                setUser(userData);
                return { userData, token };
            } else {
                console.log('No user data found');
                return null;
            }
        };
        fetchUserData();
    }, []);

    // ✅ Show a loading screen until user data is ready
    if (!user) return <Text style={{ padding: 20 }}>Loading...</Text>;

    const options = [
        {
            id: 1,
            label: 'About Us',
            image: require('../../assets/screenshot/about_us.png'),
            onPress: () => navigation.navigate('AboutUs'),
        },
        {
            id: 2,
            label: 'Help & Support',
            image: require('../../assets/screenshot/help_support.png'),
            onPress: () => navigation.navigate('HelpSupport'),
        },
        {
            id: 3,
            label: 'Notification Center',
            image: require('../../assets/screenshot/notifications.png'),
            onPress: () => alert('Notification Center Pressed'),
        },
        {
            id: 4,
            label: 'Share this app',
            image: require('../../assets/screenshot/share.png'),
            onPress: () => navigation.navigate('SocialShare'),
        },
        {
            id: 5,
            label: 'Send feedback',
            image: require('../../assets/screenshot/feedback.png'),
            onPress: () => navigation.navigate('Feedback'),
        },
    ];

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: theme.colors.blue }}>

                <View style={styles.drawerHeader}>
                    <Image source={require('../../assets/app.png')} style={{ width: 36, height: 36, resizeMode: 'contain' }} />
                    <Text style={styles.headerText}>AirOnline</Text>
                </View>

                <DrawerContentScrollView {...props}
                    contentContainerStyle={{
                        paddingTop: 0,
                        marginTop: 0,
                    }}
                >
                    {/* Default Drawer Items */}
                    {/* <DrawerItemList {...props} /> */}

                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../assets/app.png')} style={{ width: 36, height: 36, resizeMode: 'contain' }} />
                        <View style={{ paddingVertical: '5%' }}>
                            <Text style={styles.customText}>Your Register Name</Text>
                            <Text style={styles.customText}>{user.name}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />
                    {/* <TouchableOpacity style={styles.customItem} onPress={() => alert('Custom Item Pressed')}>
                    <Image source={require('../../assets/screenshot/theme_mode.png')} style={styles.icon} />
                    <Text style={styles.customText}>Dark Mode</Text>
                </TouchableOpacity> */}
                    <TouchableOpacity style={styles.customItem} onPress={() => alert('Custom Item Pressed')}>
                        <Image source={require('../../assets/screenshot/setting.png')} style={styles.icon} />
                        <Text style={styles.customText}>General Settings</Text>
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.customItem} onPress={() => alert('Custom Item Pressed')}>
                        <Image source={require('../../assets/screenshot/theme_mode.png')} style={styles.icon} />
                        <Text style={styles.customText}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.customItem} onPress={() => navigation.navigate('CitationSearch1')}>
                        <Image source={require('../../assets/screenshot/specific_search.png')} style={styles.icon} />
                        <Text style={styles.customText}>Specific Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.customItem} onPress={() => navigation.navigate('Statutes')}>
                        <Image source={require('../../assets/screenshot/bare_act.png')} style={styles.icon} />
                        <Text style={styles.customText}>Bare Acts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.customItem} onPress={() => navigation.navigate('Articles')}>
                        <Image source={require('../../assets/screenshot/articles.png')} style={styles.icon} />
                        <Text style={styles.customText}>Articles</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.customItem} onPress={() => alert('Custom Item Pressed')}>
                        <Image source={require('../../assets/screenshot/Shop.png')} style={styles.icon} />
                        <Text style={styles.customText}>Shop Products</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.customItem} onPress={() => alert('Custom Item Pressed')}>
                        <Image source={require('../../assets/screenshot/plan_pricing.png')} style={styles.icon} />
                        <Text style={styles.customText}>Plans & Pricing</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />

                    {/* <TouchableOpacity style={styles.customItem} onPress={() => alert('Custom Item Pressed')}>
                    <Image source={require('../../assets/screenshot/about_us.png')} style={styles.icon} />
                    <Text style={styles.customText}>About Us</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.customItem} onPress={() => alert('Custom Item Pressed')}>
                    <Image source={require('../../assets/screenshot/help_support.png')} style={styles.icon} />
                    <Text style={styles.customText}>Help & Support</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.customItem} onPress={() => alert('Custom Item Pressed')}>
                    <Image source={require('../../assets/screenshot/notifications.png')} style={styles.icon} />
                    <Text style={styles.customText}>Notification Center</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.customItem} onPress={() => alert('Custom Item Pressed')}>
                    <Image source={require('../../assets/screenshot/share.png')} style={styles.icon} />
                    <Text style={styles.customText}>Share this app</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.customItem} onPress={() => alert('Custom Item Pressed')}>
                    <Image source={require('../../assets/screenshot/feedback.png')} style={styles.icon} />
                    <Text style={styles.customText}>Send feedback</Text>
                </TouchableOpacity> */}


                    {options.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.customItem}
                            onPress={item.onPress}
                        >
                            <Image source={item.image} style={styles.icon} />
                            <Text style={styles.customText}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </DrawerContentScrollView>

                {/* Custom Footer */}
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => logout()}>
                        <Text style={styles.footerText}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    drawerHeader: {
        backgroundColor: '#2c3e50',
        padding: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    headerText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    customItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '3%',
        paddingHorizontal: '5%'
    },
    customText: {
        fontSize: 18,
        marginLeft: 10,
        color: theme.colors.white
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    footerText: {
        fontSize: 18,
        color: '#e74c3c',
    },
    divider: {
        // width: '100%',
        height: 1,
        paddingHorizontal: '45%',
        backgroundColor: theme.colors.white,
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain'
    }
});

export default CustomDrawerContent;

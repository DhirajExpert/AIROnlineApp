import React, { useEffect, useState } from "react";
import { Button, View, StyleSheet, Image, TouchableOpacity, Text, Platform, Dimensions, ActivityIndicator } from 'react-native'
import { IconButton, Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from '@expo/vector-icons'
import { Header } from "@react-navigation/stack";
import { LinearGradient } from 'expo-linear-gradient';
// import LinearGradient from 'react-native-linear-gradient';
// import DeviceInfo from 'react-native-device-info';


// import { LinearGradient } from "react-native-svg";
import headerStyle from "./app/components/headerHeight";
import useAuthStore from "./app/authStore";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import CustomDrawerContent from "./app/navigation/CustomDrawerContent";
import Icon from 'react-native-vector-icons/Ionicons';
import TabBar from "./app/components/TabBar";
import * as SecureStore from 'expo-secure-store';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';
import { DrawerToggleButton } from '@react-navigation/drawer';



import { theme } from "./app/core/theme";
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  HomeScreen,
  CitationSearch,
  CitationSearch1,
  NominalSearch,
  Articles,
  // BrowseByJudgement,
  ByJudgement,
  BrowseByBench,
  BrowseByCourt,
  BrowseByJudge,
  BrowseByTopical,
  CitationList,
  Judgement,
  CourtDigestView,
  NominalSearchDetails,
  BrowseByLawyer,
  BrowseByLawyerDetails,
  JudgementDate,
  BenchStrength,
  BenchStrengthDetails,
  Dashboard,
  FreeTextSearchDetails,
  TopicalSearch,
  TopicalSearchDetails,
  Test,
  Register,
  BrowseByJudgeDetails,
  JudgementDateDetails,
  OtpVerify,
  ArticleDetails,
  ActSection,
  TestDropdown,
  ArticleDigestView,
  FilterScreen,
  SectionDetails,
  ActSectionDigestView,
  Feedback,
  HelpSupport,
  AboutUs,
  SocialShare,
  Profile,
  Navigation,
  VerifyMobile,
  OTPVerification,
  ForgotPassword,
  ResetPassword,
  ForgotOTPpassword,
  Statutes,
  BareActDetails,
  SpecificSearch,
  PlanPricing,
  Jump,
  Bookmark,
  Promocode



} from "./app/screens";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const toastConfig = {
 
  success: (props) => (
    <BaseToast
      {...props}
      style={{ 
        borderLeftColor: 'green' ,
        borderLeftWidth:7,
        width:'90%',
        height:70,
        borderRightColor:'green',
        borderRightWidth:7,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: '700'
      }}
      text2style={{
        fontSize:14
      }}
    />
  ),
  
  error: (props) => (
    <ErrorToast
      {...props}
      text2NumberOfLines={3}
      style={{ 
        borderLeftColor: 'red' ,
        borderLeftWidth:7,
        width:'90%',
        height:70,
        borderRightColor:'red',
        borderRightWidth:7,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: '700'
      }}
      text2style={{
        fontSize:14
      }}
    />
  ),
  
  tomatoToast: ({ text1, props }) => (
    <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  )
};



export default function App({ navigation }) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const restoreSession = useAuthStore((state) => state.restoreSession);
  const logout = useAuthStore((state) => state.logout);
  const [loading, setLoading] = useState(true);

  

  // useEffect(() => {
  //   // logout();
  //   restoreSession();
  //   setLoading(false);
  // }, []);

  useEffect(() => {
    const restore = async () => {
      await restoreSession();
      setLoading(false);  
    };
  
    restore();
  }, []);

  // function TabNavigator() {
  //   return (
  //     <Tab.Navigator
  //       screenOptions={({ route }) => ({
  //         tabBarIcon: ({ color, size }) => {
  //           let iconName;

  //           if (route.name === 'Home') {
  //             iconName = 'home-outline';
  //           } else if (route.name === 'Profile') {
  //             iconName = 'person-outline';
  //           } else if (route.name === 'Settings') {
  //             iconName = 'settings-outline';
  //           }

  //           return <Icon name={iconName} size={size} color={color} />;
  //         },
  //         tabBarActiveTintColor: theme.colors.primary,
  //         tabBarInactiveTintColor: 'gray',
  //       })}
  //     >
  //       <Tab.Screen name="Home" component={HomeScreen} />
  //       <Tab.Screen name="Profile" component={Profile} />
  //       <Tab.Screen name="Settings" component={CitationSearch1} />
  //     </Tab.Navigator>
  //   );
  // }
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  console.log("isLoggedIn", isLoggedIn);

  const { width, height } = Dimensions.get('window');
  // const isTablet = DeviceInfo.isTablet();

 
  

  function LogoTitle() {
    return (
      <Image
        style={{ width: 50, height: 50 }}
        source={require('./assets/airlogo.png')}
      />

    );

  }

  
  // const TabNavigator = () => {
  //   <Tab.Navigator>
  //     <Tab.Screen name="Home" component={HomeScreen} />
  //     <Tab.Screen name="Search" component={CitationSearch1} />
  //     <Tab.Screen name="Notification" component={BrowseByJudge} />
  //     <Tab.Screen name="Profile" component={Profile} />
  //   </Tab.Navigator>
  // }


  


  


  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1 }}>
        <StatusBar style="light" />
          <AppStack isLoggedIn={isLoggedIn} loading={loading}  navigation={navigation}/>
          <Toast config={toastConfig} />
        </SafeAreaView>
        
      </NavigationContainer>
    </Provider>
  );
}

const Bottomtabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconPath;
          if (route.name === 'Home') {
            iconPath = focused
              ? require('./assets/icons/bottom_home.png')
              : require('./assets/icons/bottom_home.png');
          } else if (route.name === 'Navigation') {
            iconPath = focused
              ? require('./assets/icons/bottom_navigation.png')
              : require('./assets/icons/bottom_navigation.png');
          } else if (route.name === 'Profile') {
            iconPath = focused
              ? require('./assets/icons/bottom_profile.png')
              : require('./assets/icons/bottom_profile.png');
          } else if (route.name === 'AboutUs') {
            iconPath = focused
              ? require('./assets/icons/bottom_shop.png')
              : require('./assets/icons/bottom_shop.png');
          } else if (route.name === 'Help&Support') {
            iconPath = focused
              ? require('./assets/icons/bottom_rewards.png')
              : require('./assets/icons/bottom_rewards.png');
          }
          return (<Image
            source={iconPath}
            style={[styles.icon, { tintColor: color }]}
            resizeMode="contain"
          />);
          //  <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.white,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: styles.tabBar,
      })}

    >
      <Tab.Screen name="Home" component={Dashboard}

      />
      <Tab.Screen name="Navigation" component={Bookmark} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="AboutUs" component={AboutUs} />
      <Tab.Screen name="Help&Support" component={HelpSupport} />
    </Tab.Navigator>
  );
}

const GradientHeader = props => (
  // <View style={{ backgroundColor: '#eee' }}>
  <LinearGradient
    colors={['#7A0B34', '#1f2937', '#022555']}
    style={[StyleSheet.absoluteFill, { height: gradientHeight }]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
  >
    <Header {...props} />
  </LinearGradient>
  // </View>
)

const getGradientHeight = () => {
  const { height } = Dimensions.get('window');
  if (Platform.OS === 'ios') {
    return height * 0.07; // 10% of screen height for iOS
  } else if (Platform.OS === 'android') {
    return height * 0.059; // 8% of screen height for Android
  }
  // else if(isTablet())  {
  //   return height * 0.12; // 12% of screen height for tablets
  // }
  else {
    return height * 0.02; // 12% of screen height for tablets
  }
};
const gradientHeight = getGradientHeight();


const AppStack = ({ isLoggedIn,loading,navigation}) => {
  //  SecureStore.deleteItemAsync('authLogin');

  // return(
  //   <View><Text>Hello</Text></View>
  // )

  return(
    
  

  <Stack.Navigator
  
  >
    

    {loading ? (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) :
      isLoggedIn ? (


        <Stack.Screen
          name="MainDrawer"
          component={DrawerNavigator}
          options={{ headerShown: false }}

          


          // options={({ navigation }) => ({
          //   title: 'Dashboard',
          //   headerLeft: () => (
          //     <FontAwesome
          //       name="navicon" size={24} color={theme.colors.blue}
          //       onPress={() => navigation.openDrawer()}
          //     />
          //   ),
          // })}

        />


      ) : (
        <Stack.Screen name="LoginScreen" component={LoginScreen} 
        
       options={
        {
          headerShown:false,
          
        }
       }
        
        />
      )}

    <Stack.Screen name="StartScreen" component={StartScreen} />
    {/* <Stack.Screen name="LoginScreen" component={LoginScreen} /> */}
    <Stack.Screen name="RegisterScreen" component={RegisterScreen} 
    options={({ navigation }) => ({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      ),
    })}
     />
    
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="CitationSearch" component={CitationSearch} />
    <Stack.Screen name="CitationSearch1" component={CitationSearch1}
      options={({ navigation }) => ({
        // header: () => (
        //   <CustomHeader navigation={navigation} title="Citation Search" />
        // ),
      })}
    />
    <Stack.Screen name="NominalSearch" component={NominalSearch} />
    <Stack.Screen name="Articles" component={Articles} />
    {/* <Stack.Screen name="BrowseByJudgement" component={BrowseByJudgement} /> */}
    <Stack.Screen name="ByJudgement" component={ByJudgement} />

    <Stack.Screen name="BrowseByCourt" component={BrowseByCourt} />
    <Stack.Screen name="BrowseByJudge" component={BrowseByJudge} />
    <Stack.Screen name="CitationList" component={CitationList} />
    <Stack.Screen name="BrowseByTopical" component={BrowseByTopical} />
    <Stack.Screen name="Judgement" component={Judgement} />
    <Stack.Screen name="CourtDigestView" component={CourtDigestView} />
    <Stack.Screen name="NominalSearchDetails" component={NominalSearchDetails} />
    <Stack.Screen name="BrowseByLawyer" component={BrowseByLawyer} />
    <Stack.Screen name="BrowseByLawyerDetails" component={BrowseByLawyerDetails} />
    <Stack.Screen name="JudgementDate" component={JudgementDate} />
    <Stack.Screen name="BenchStrength" component={BenchStrength} />
    <Stack.Screen name="JudgementDateDetails" component={JudgementDateDetails} />
    <Stack.Screen name="BenchStrengthDetails" component={BenchStrengthDetails}

    // options={{
    //   // headerTitle: (props) => <LogoTitle {...props} />,
    //   headerStyle: {
    //     backgroundColor: theme.colors.primary,
    //   },
    //   headerTintColor: '#fff',
    //   headerTitleStyle: {
    //     fontWeight: 'bold',
    //   },
    // }}
    />
    {/* <Stack.Screen name="Dashboard" component={Dashboard}
            options={({ }) => ({

              header: () => (
                <LinearGradient
                  colors={['#7A0B34', '#1f2937', '#022555']}
                  style={[StyleSheet.absoluteFill, { height: gradientHeight }]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <View style={styles.headerContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', }}>
                      <Image
                        source={require('./assets/logo_white.png')}
                        style={styles.icon}
                      />
                    </View>
                    <Text style={styles.headerTitle}>Dashboard</Text>
                    <TouchableOpacity>
                      <Image
                        source={require('./assets/icons/menu.png')}
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              ),
            })}
          /> */}
    <Stack.Screen name="FreeTextSearchDetails" component={FreeTextSearchDetails} />
    <Stack.Screen name="TopicalSearch" component={TopicalSearch} />
    <Stack.Screen name="TopicalSearchDetails" component={TopicalSearchDetails} />
    <Stack.Screen name="Test" component={Test} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="BrowseByJudgeDetails" component={BrowseByJudgeDetails} />
    <Stack.Screen name="OtpVerify" component={OtpVerify} />
    <Stack.Screen name="ArticleDetails" component={ArticleDetails} />
    <Stack.Screen name="ActSection" component={ActSection} />
    {/* <Stack.Screen name="TestDropdown" component={TestDropdown}
          options={{
            headerShown: true,

            title: 'Dashboard',
            headerStyle: {
              backgroundColor: 'transparent',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            },
            header: props => <GradientHeader {...props} />,
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          /> */}
    <Stack.Screen name="ArticleDigestView" component={ArticleDigestView} />
    <Stack.Screen name="FilterScreen" component={FilterScreen} />
    <Stack.Screen name="SectionDetails" component={SectionDetails} />
    <Stack.Screen name="ActSectionDigestView" component={ActSectionDigestView} />
    <Stack.Screen name="Feedback" component={Feedback} />
    <Stack.Screen name="HelpSupport" component={HelpSupport}
      options={{
        // headerShown:false
      }} />
    <Stack.Screen
      name="ResetPasswordScreen"
      component={ResetPasswordScreen}
    />
    <Stack.Screen name="AboutUs" component={AboutUs} />
    <Stack.Screen name="SocialShare" component={SocialShare} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="Navigation" component={Navigation} />
    <Stack.Screen name="VerifyMobile" component={VerifyMobile} />
    <Stack.Screen name="OTPVerification" component={OTPVerification} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="ForgotOTPpassword" component={ForgotOTPpassword} />
    <Stack.Screen name="ResetPassword" component={ResetPassword} />
    <Stack.Screen name="Statutes" component={Statutes} />
    <Stack.Screen name="BareActDetails" component={BareActDetails} />
    <Stack.Screen name="SpecificSearch" component={SpecificSearch}/>
    <Stack.Screen name="PlanPricing" component={PlanPricing}/>
    <Stack.Screen name="Jump" component={Jump}/>
    <Stack.Screen name="Bookmark" component={Bookmark}/>
    <Stack.Screen name="Promocode" component={Promocode}/>
  
  

    {/* <Stack.Screen
      name="MainDrawer"
      component={DrawerNavigator}
      options={{ headerShown: false }}
    /> */}
  </Stack.Navigator>
  )
};

const HomeStack = () => (
  <Stack.Navigator screenOptions={({ navigation }) => ({
    headerLeft: () => (
      <FontAwesome
        name="navicon" size={24} color={theme.colors.blue}
        onPress={() => navigation.openDrawer()}
      />
    ),
  })}>
    <Stack.Screen name="Dashboard" component={Dashboard}
      options={({ navigation }) => ({
        title: 'Dashboard',
        headerLeft: () => (
          <FontAwesome
            name="navicon" size={24} color={theme.colors.blue}
            onPress={() => navigation.openDrawer()}
          />
        ),
      })}
    />
    <Stack.Screen name="BrowseByBench" component={BrowseByBench}
      options={({ navigation }) => ({
        title: 'Dashboard',
        headerLeft: () => (
          <FontAwesome
            name="navicon" size={24} color={theme.colors.blue}
            onPress={() => navigation.openDrawer()}
          />
        ),
      })}
    />

  </Stack.Navigator>
);


const CustomHeader = ({ navigation, title }) => {
  return (

    <LinearGradient
      colors={['#7A0B34', '#1f2937', '#022555']}
      style={[StyleSheet.absoluteFill, { height: 20 }]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={styles.headerContainer}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('./assets/icons/back.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Image
            source={require('./assets/logo_white.png')}
            style={styles.icon}
          />
        </View>

        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity>
          <Image
            source={require('./assets/icons/menu.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const DrawerNavigator = ({ navigation }) => (
  <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}

  >
    <Drawer.Screen name="Dashboard" component={Bottomtabs} options={{ headerShown: false }} />
    {/* <Drawer.Screen name="Log" component={Log} /> */}
  </Drawer.Navigator>
);


const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    paddingVertical: '4%',
    paddingHorizontal: '4%',

  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  tabBar: {
    backgroundColor: theme.colors.blue,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '7%',
    position: 'absolute',
    justifyContent: 'center', // Centers children vertically
    alignItems: 'center',
    padding: 10,
    left: 0,
    right: 0,
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6.27,
    elevation: 10,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white", // Prevents black screen
  },

})

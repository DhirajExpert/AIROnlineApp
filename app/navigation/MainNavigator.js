import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

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
    FreeTextSearchDetails

} from "../screens";

import JudgementDateDetails from "../screens/JudgementDateDetails";
import SettingsScreen from "../screens/Settings"

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const StackNavigator = () => (
    <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
            headerShown:false
        }}
    >

        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CitationSearch" component={CitationSearch} />
        <Stack.Screen name="CitationSearch1" component={CitationSearch1}
            options={{
                title: 'Citation Search Module',
                headerStyle: {
                    backgroundColor: theme.colors.primary,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
        <Stack.Screen name="NominalSearch" component={NominalSearch} />
        <Stack.Screen name="Articles" component={Articles} />
        {/* <Stack.Screen name="BrowseByJudgement" component={BrowseByJudgement} /> */}
        <Stack.Screen name="ByJudgement" component={ByJudgement} />
        <Stack.Screen name="BrowseByBench" component={BrowseByBench} />
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
        <Stack.Screen name="BenchStrengthDetails" component={BenchStrengthDetails} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="FreeTextSearchDetails" component={FreeTextSearchDetails} />
        <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
        />
    </Stack.Navigator>
)


const TabNavigator = () => (
    <Tab.Navigator>
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="HomeScreen" component={StackNavigator} />
    </Tab.Navigator>
);


const MainNavigator = () => (
    <Drawer.Navigator>
        <Drawer.Screen name="Main Tabs" component={TabNavigator} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
);


export default MainNavigator;




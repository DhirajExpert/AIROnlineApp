import React from "react";
import { Button } from 'react-native'
import { IconButton, Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesomeIcon } from '@expo/vector-icons/AntDesign'

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

} from "./app/screens";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Dashboard"
        // screenOptions={{
        //   headerShown: false,
        // }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
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
          <Stack.Screen name="TopicalSearch" component={TopicalSearch} />
          <Stack.Screen name="TopicalSearchDetails" component={TopicalSearchDetails}/>
          <Stack.Screen name="Test" component={Test}/>
          <Stack.Screen name="Register" component={Register}/>
          <Stack.Screen name="BrowseByJudgeDetails" component={BrowseByJudgeDetails}/>

          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

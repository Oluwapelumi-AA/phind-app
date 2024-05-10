import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './screens/SignInScreen';
import MainTabNavigator from './screens/MainTabNavigator';
import Jobs from './screens/Jobs';
import SplashScreen2 from './screens/SplashScreen2';
import Jobdescription from './screens/JobDetails';
import EducationDetails from './screens/EducationDetails';
import Education from './screens/Education';
import Resources from './screens/Resources';
import ResourcesDetails from './screens/ResourcesDetails';
import { Platform } from 'react-native';

const Stack = createStackNavigator();


function App() {
 
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen2}  />
        <Stack.Screen name="SignIn" component={SignInScreen}  />
        <Stack.Screen name="MainTabNavigator" component={MainTabNavigator}  />
        {/* <Stack.Screen name="Jobs" component={Jobs}/> */}
        {/* <Stack.Screen name="JobDetails" component={Jobdescription} /> */}
        {/* <Stack.Screen name="Education" component={Education}/> */}
        {/* <Stack.Screen name="EducationDetails" component={EducationDetails} /> */}
        {/* <Stack.Screen name="Resouces" component={Resources} /> */}
        {/* <Stack.Screen name="ResourcesDetails" component={ResourcesDetails} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

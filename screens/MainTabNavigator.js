import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import Resources from './Resources';
import Education from './Education';
import Jobs from './Jobs';
import Jobdescription from './JobDetails';
import ResourcesDetails from './ResourcesDetails';
import EducationDetails from './EducationDetails';


const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const MainHomeScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen}  />
        <Stack.Screen name="JobDetails" component={Jobdescription} />
      </Stack.Navigator>
  );
};

const MainJobScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="JobScreen" component={Jobs}  />
        <Stack.Screen name="JobDetails" component={Jobdescription} />
      </Stack.Navigator>
  );
};

const MainResource = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Resources" component={Resources}  />
        <Stack.Screen name="ResourcesDetails" component={ResourcesDetails} />
      </Stack.Navigator>
  );
};

const MainEducation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Education" component={Education}  />
        <Stack.Screen name="EducationDetails" component={EducationDetails} />
      </Stack.Navigator>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { ...styles.menuBar, ...styles.tabBarStyle },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#072A44',
        position: 'absolute', // Ensure the tab navigator is positioned absolutely
        bottom: 0, // Place the tab navigator at the bottom of the screen
        zIndex: 999,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={MainHomeScreen} 
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconWrapper, focused && styles.activeIconWrapper]}>
              {/* <Icon name="home-outline" size={size} color={color} style={styles.icon} /> */}
              <Image source={require('../assets/images/home.png')} style={styles.imageIcon}/>
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="Job" 
        component={MainJobScreen} 
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconWrapper, focused && styles.activeIconWrapper]}>
              <Image source={require('../assets/images/jobs.png')} style={styles.imageIcon}/>
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="MainResource" 
        component={MainResource} 
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconWrapper, focused && styles.activeIconWrapper]}>
              <Image source={require('../assets/images/resources.png')} style={styles.imageIcon}/>
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="MainEducation" 
        component={MainEducation} 
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconWrapper, focused && styles.activeIconWrapper]}>
              <Image source={require('../assets/images/education.png')} style={styles.imageIcon}/>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  menuBar: {
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  tabBarStyle: {
    backgroundColor: '#fff',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconWrapper: {
    backgroundColor: '#FDBC5B',
    borderRadius: 100,
    padding: 10,
  },
  imageIcon: {
    width: 25,
    height: 25,
  },
});

export default MainTabNavigator;

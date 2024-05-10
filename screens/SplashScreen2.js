import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen2 = () => {
  const navigation = useNavigation();

  // useEffect(() => {
    
  //   checkUserCredentials();
  // }, []);


  useEffect(() => {
    const displayTime = 10000;

    const timer = setTimeout(() => {
      checkUserCredentials();
    }, displayTime);

    return () => clearTimeout(timer);
  }, []);


  const checkUserCredentials = async () => {
    try {
      const storedCredentials = await AsyncStorage.getItem('userCredentials');
      if (storedCredentials) {
        const { username, email } = JSON.parse(storedCredentials);
        // Navigate to the MainTabNavigator screen
        navigation.navigate('MainTabNavigator');
      } else {
        checkUserAuthentication();
      }
    } catch (error) {
      console.error('Error retrieving user credentials:', error);
    }
  };

  const checkUserAuthentication = async () => {
    try {
      const response = await fetch('https://phindwork.com/wp-json/api-form/v1/check-auth', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.authenticated) {
          // User is authenticated, check if the user has an account
          const hasAccount = await AsyncStorage.getItem('userAccountData');
          if (hasAccount) {
            // User has an account, navigate to MainTabNavigator and replace SplashScreen2 with MainTabNavigator
            navigation.replace('MainTabNavigator');
            return; // Return to prevent further navigation
          }
        }
      }

      // Navigate to SignInScreen for all other cases and replace SplashScreen2 with SignIn
      navigation.replace('SignIn');
    } catch (error) {
      // Error occurred, navigate to SignInScreen and replace SplashScreen2 with SignIn
      console.error('Error checking user authentication:', error);
      navigation.replace('SignIn');
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/images/logo.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen2;
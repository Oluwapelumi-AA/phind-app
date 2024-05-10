import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import Header from './Header';

// Function to validate email format
function isEmail(str) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(str);
}

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const onPressSignUp = async () => {
    if (!isEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    const name = username;
    try {
      const response = await fetch('https://phindwork.com/wp-json/api-form/v1/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, username, email }),
      });
      if (response.ok) {
        // Sign up successful
        // Store user credentials securely
        await AsyncStorage.setItem('userCredentials', JSON.stringify({ username, email }));
        // Navigate to the MainTabNavigator screen
        navigation.navigate('MainTabNavigator');
      } else {
        // Sign up failed
        const errorMessage = await response.text();
        Alert.alert('Sign Up Failed', errorMessage);
      }
    } catch (error) {
      console.error('Sign Up Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.pageWrapper}>
        <KeyboardAvoidingView style={styles.signInContent} behavior="padding" enabled>
          <Text style={styles.formTitle}>One time registration</Text>
          <Text style={styles.formsubTitle}>Please provide your details, to start using the app</Text>
          <View style={styles.formFiledWrapper}>
            <Text style={styles.formFilledText}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              value={username}
              onChangeText={setUsername}
            />
            <Text style={styles.formFilledText}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <TouchableWithoutFeedback onPress={onPressSignUp}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInContent: {
    width: '100%',
    paddingHorizontal: 30,
  },
  formTitle: {
    fontSize: 25,
    fontWeight: '600',
    lineHeight: 24.26,
    letterSpacing: -0.45,
    color: '#072A44',
    marginBottom: 20,
  },
  formsubTitle: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 24.26,
    letterSpacing: -0.45,
    color: '#072A44',
    marginBottom: 20,
  },
  formFiledWrapper: {
    marginTop: 10,
  },
  formFilledText: {
    fontSize: 16.5,
    fontWeight: '500',
    lineHeight: 19.35,
    color: '#475569',
    marginTop: 20,
  },
  input: {
    borderColor: '#E2E8F0',
    borderWidth: 1.04,
    borderRadius: 5,
    height: 40,
    marginTop: 10,
    color: '#475569',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19.35,
  },
  button: {
    backgroundColor: '#FDBC5B',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 35,
  },
  buttonText: {
    color: 'white',
    fontSize: 16.67,
    lineHeight: 19.55,
    fontWeight: '500',
  },
});

export default SignInScreen;

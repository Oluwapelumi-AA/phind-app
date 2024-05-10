import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';

const LoginScreen = () => {
  const navigation = useNavigation(); 

  const [rememberMe, setRememberMe] = React.useState(false);

  const onPress = () => {
    console.log('Button Pressed!');
  };

  const onRegisterPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <Header />
      <KeyboardAvoidingView style={styles.pageWrapper} behavior="padding" enabled>
        <View style={styles.loginContent}>
          <Text style={styles.formTitle}>Log In</Text>
          <View style={styles.formFiledWrapper}>
            <Text style={styles.formFilledText}>Username</Text>
            <TextInput style={styles.input} placeholder="" />
            <Text style={styles.formFilledText}>Password</Text>
            <TextInput style={styles.input} placeholder="" secureTextEntry={true} />
          </View>
          <View style={styles.rememberMeContainer}>
            <CheckBox
              title="Remember Me"
              checked={rememberMe}
              onPress={() => setRememberMe(!rememberMe)}
              containerStyle={styles.checkboxContainer}
              textStyle={styles.rememberMeText}
            />
          </View>
          <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.bottomSection}>
          <Text style={styles.bottomText}>
            Still not a member?</Text>
        <TouchableOpacity onPress={onRegisterPress}> 
            <Text style={styles.lastWord}> Register</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  pageWrapper: {
    marginLeft: 30,
    marginRight: 30,
  },
  formTitle: {
    fontSize: 25,
    fontWeight: '600',
    lineHeight: 24.26,
    letterSpacing: -0.45,
    color: '#072A44',
  },
  formFiledWrapper: {
    marginTop: 30,
  },
  formFilledText: {
    fontSize: 16.5,
    fontWeight: '500',
    lineHeight: 19.35,
    marginTop: 20,
    color: '#475569',
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
  rememberMeContainer: {
    marginTop: 10,
  },
  checkboxContainer: {
    color: '#475569',
    backgroundColor: 'transparent',
    borderWidth: 0, 
    padding: 0,
  },
  rememberMeText: {
    fontSize: 16.5,
    color: '#475569', 
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#FDBC5B',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16.67,
    lineHeight: 19.55,
    fontWeight: '500',
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  forgotPasswordText: {
    fontSize: 16.5,
    color: '#475569', 
    fontWeight: '500',
  },
  bottomSection: {
    backgroundColor: '#072A44',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  bottomText: {
    color: 'white',
    fontSize: 16.5,
  },
  lastWord: {
    fontSize: 16.5,
    fontWeight: '700',
    lineHeight: 19.35,
    color: 'white',
  },
  
});

export default LoginScreen;

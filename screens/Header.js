import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Header = () => {
  return (
    <View style={styles.header}>
      {/*<View style={styles.menuButton}>
        <MaterialIcons name="menu" size={24} color="black" /> 
      </View>*/}
      <View style={styles.logoContainer}>
        <Image style={styles.headerLogo} source={require('../assets/images/logo.png')} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 44,
      marginTop: 40,
      marginLeft: 30,
      backgroundColor: '#F5F5F5',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerLogo: {
    width: 120,
    height: 45,
  },
});



export default Header;

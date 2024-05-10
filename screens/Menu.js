import React from 'react';
import { StatusBar, StyleSheet, Text, View, ImageBackground, Image, Platform,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const Menu = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <ImageBackground source={require('../assets/images/bg.jpg')} style={styles.backgroundImage}>
          <View style={styles.overlay} />

          <View style={styles.imageTextWrapper}>
            <Image style={styles.headerImage} source={require('../assets/images/profile.jpg')} />
            <View style={styles.textWrapper}>
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.email}>John@gmail.com</Text>
            </View>
          </View>
        </ImageBackground>
      </View>

      {/*List Section*/}

      <View style={styles.listWrapper}>
        <View style={styles.listContent}>
          <Text style={styles.listText}>Jobs</Text>
          <Text style={styles.customIcon}>&gt;</Text>
        </View>
      </View>

      <View style={styles.listWrapper}>
        <View style={styles.listContent}>
          <Text style={styles.listText}>Education</Text>
          <Text style={styles.customIcon}>&gt;</Text>
        </View>
      </View>

      <View style={styles.listWrapper}>
        <View style={styles.listContent}>
          <Text style={styles.listText}>Resources</Text>
          <Text style={styles.customIcon}>&gt;</Text>
        </View>
      </View>

      <View style={styles.listWrapper}>
        <View style={styles.listContent}>
          <Text style={styles.listText}>Login</Text>
          <Text style={styles.customIcon}>&gt;</Text>
        </View>
      </View>

      <View style={styles.listWrapper}>
        <View style={styles.listContent}>
          <Text style={styles.listText}>Sign Up</Text>
          <Text style={styles.customIcon}>&gt;</Text>
        </View>
      </View>

      {/*List Section End*/}

      {/*Follow us and social media section*/}

      <View style={styles.followUscontainer}>
      <Text style={styles.followUsText}>Follow Us</Text>

      <View style={styles.socialIconsContainer}>
        <TouchableOpacity style={styles.iconWrapper}>
          <Icon style={styles.icon} name="facebook"/>
          <Icon style={styles.icon} name="twitter"/>
          <Icon style={styles.icon} name="instagram"/>
          <Icon style={styles.icon} name="linkedin"/>
        </TouchableOpacity>
      </View>
    </View>

    {/*Follow us and social media section end*/}

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 327,
    height: 214,
    borderRightWidth: 1,  
    borderRightColor: '#fff', 
  },
  headerContent: {
    height: 214,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 42, 68, 0.7)', 
  },
  imageTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 70,
  },
  headerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  textWrapper: {
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  email: {
    color: '#F6F6F6',
    fontSize: 14,
    marginTop: 9,
  },
  listWrapper : {
    padding: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#20608F'
  },
  listContent : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 212,
    height: 19,
  },
  listText : {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 18.77,
    color: '#072A44',
  },
  customIcon : {
    fontSize: 16,
    fontWeight: '500',
    color: '#072A44',
  },
  followUscontainer : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  
  },
  followUsText : {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: '#072A44',
    marginBottom: 10,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10, 
  },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: '#fff',
    backgroundColor: '#072A44',
    fontSize: 20,
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    marginHorizontal: 10, 
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    lineHeight: 40,
  },
});

export default Menu;

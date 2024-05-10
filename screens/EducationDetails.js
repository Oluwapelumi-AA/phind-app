import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView, Dimensions, TouchableWithoutFeedback, Image } from 'react-native';
import Header from './Header';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const EducationDetails = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [featuredImage, setFeaturedImage] = useState(null);

  const route = useRoute();
  const { EducationData } = route.params;

  useEffect(() => {
    const fetchFeaturedImage = async () => {
      try {
        const response = await fetch(EducationData._links['wp:featuredmedia'][0].href);
        if (response.ok) {
          const mediaData = await response.json();
          setFeaturedImage(mediaData.source_url);
        } else {
          console.error('Failed to fetch featured image');
        }
      } catch (error) {
        console.error('Error fetching featured image:', error);
      }
    };

    fetchFeaturedImage();
  }, []);

  const removeTags = (content) => {
    return content.replace(/<p>|<\/p>|<br\s*\/?>/g, '');
  };

  
  const handleSortByPress = () => {
    setModalVisible((prevModalVisible) => !prevModalVisible);
  };

  

  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  return (
    <View style={styles.container}>
      <Header />

      {/*Start of featured section */}
      <View style={styles.pageWrapper}>
        <View style={styles.filter}>
          <Text style={styles.sectionTitle}>Featured Education Posts</Text>
        </View>
        {/*End of featured section */}

        {/*Start of user contact section */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.educationWrapper]}>
            <View style={styles.imageAndDate}>
            {featuredImage && (
              <Image style={styles.imageStyle} source={{ uri: featuredImage }} />
            )}
              <View style={styles.imageText}>
                <Text style={styles.textStyle}>Application Deadline: 00/00/0000</Text>
              </View>
            </View>
            {/*End of user Image and deadline section */}

            {/*Start of user contact section */}
            <View style={styles.detailsWrapper}>
              <View style={styles.innerDetailWrapper}>
                <Text style={styles.heading}>Application Details</Text>
                <View style={styles.iconWrapper}>
                  <View style={styles.iconAndImage}>
                    <Icon style={styles.icon} name="mail" />
                    <Text style={styles.iconText}>{EducationData.meta && EducationData.meta['application-email']}</Text>
                  </View>
                  <View style={styles.secondIconAndImage}>
                    <Icon style={styles.icon} name="phone" />
                    <Text style={styles.iconText}>{EducationData.meta && EducationData.meta['application-phone']}</Text>
                  </View>
                </View>
                <View style={styles.thirdIconAndImage}>
                  <Icon style={styles.icon} name="location-on" />
                  <Text style={styles.iconText}>{EducationData.meta.city}</Text>
                </View>
              </View>
            </View>
            {/*End of user contact section */}

            {/*Education Title & Text section */}
            <View style={styles.titleTextWrapper}>
              <Text style={styles.title}>{EducationData.title.rendered}</Text>
              <Text style={styles.subtext}><Text style={styles.subtext}>{removeTags(EducationData.content?.rendered)}</Text></Text>
              {/*End of Education Title & Text section */}

            </View>
          </View>
        </ScrollView>
      </View>
    </View >
  );
};

export default EducationDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageWrapper: {
    marginBottom: 190,
  },

  filter: {
    marginVertical: 30,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontFamily: 'WorkSans-Medium',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 25,
    letterSpacing: -0.45,
    color: '#072A44',
    width: 217,
    height: 25,
  },
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    fontFamily: 'WorkSans-Medium',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 22,
    letterSpacing: -0.45,
    color: '#072A44',
    width: 55,
    height: 22,
  },
  educationWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1, 
  },

  imageAndDate: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 300,
    height: 343,
  },
  imageText: {
    backgroundColor: '#072A44',
    width: 300,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: 'WorkSans-Medium',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 25,
    letterSpacing: -0.45,
    color: '#fff',
  },
  detailsWrapper: {
    width: 320,
    height: 159,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerDetailWrapper: {
    width: 290,
    height: 105,
    justifyContent: 'center',
  },
  heading: {
    fontFamily: 'WorkSans-Medium',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 25,
    letterSpacing: -0.45,
    color: '#072A44',
  },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '311',
    height: 25,
    marginTop: 15,
    marginBottom: 15,
  },
  iconAndImage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 13,
    color: '#072A44',
    marginRight: 7,
  },
  iconText: {
    fontFamily: 'WorkSans-Medium',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 25,
    letterSpacing: -0.45,
    color: '#000',
  },
  secondIconAndImage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thirdIconAndImage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleTextWrapper: {
    width: 295,
    justifyContent: 'center',
    marginTop: 30,
  },
  title: {
    fontFamily: 'WorkSans-Medium',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 25,
    letterSpacing: -0.45,
    color: '#072A44',
    height: 40,
  },
  subtext: {
    fontFamily: 'WorkSans-Medium',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 25,
    letterSpacing: -0.45,
    color: '#000',
    textAlign: 'justify',
  },
  showMoreButton: {
    alignSelf: 'flex-end',
    borderRadius: 5,
  },
});

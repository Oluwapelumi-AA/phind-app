import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, RefreshControl, TouchableOpacity, Modal, FlatList, Dimensions, TouchableWithoutFeedback, Image, ActivityIndicator } from 'react-native';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const Resources = () => {
  const [ResourcesData, setResourcesData] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchResourcesData = async () => {
      try {
        const response = await fetch('https://phindwork.com/wp-json/wp/v2/resource');
        if (response.ok) {
          const data = await response.json();
          const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setResourcesData(sortedData);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchResourcesData();
  }, []);

  const getShortenedContent = (content) => {
    return content.length > 150 ? content.slice(0, 200) + '...' : content;
  };

  const onRefresh = async () => {
    setRefreshing(true); // Set refreshing state to true
    try {
      const response = await fetch('https://phindwork.com/wp-json/wp/v2/resource');
      if (response.ok) {
        const data = await response.json();
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setResourcesData(sortedData);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false); // Set refreshing state to false when done
    }
  };

  const ResourcesCard = ({ item }) => {
    const isExpanded = expandedItems[item.id];
    const [featuredImage, setFeaturedImage] = useState(null);

    useEffect(() => {
      const fetchFeaturedImage = async () => {
        try {
          const response = await fetch(item._links['wp:featuredmedia'][0].href);
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

    const handleJobItemPress = (item) => {
      navigation.navigate('ResourcesDetails', { ResourcesData: item });
    };

    return (
      <TouchableOpacity onPress={() => handleJobItemPress(item)} activeOpacity={1}>
        <View style={[styles.educationWrapper, { height: isExpanded ? 'auto' : 759 }]}>
          <View style={styles.imageAndDate}>
            {featuredImage && (
              <Image style={styles.imageStyle} source={{ uri: featuredImage }} />
            )}
          </View>
          <View style={styles.detailsWrapper}>
            <View style={styles.innerDetailWrapper}>
              <Text style={styles.heading}>Application Details</Text>
              <View style={styles.iconWrapper}>
                <View style={styles.iconAndImage}>
                  <Icon style={styles.icon} name="mail" />
                  <Text style={styles.iconText}>{item.meta && item.meta['application-email']}</Text>
                </View>
                <View style={styles.secondIconAndImage}>
                  <Icon style={styles.icon} name="phone" />
                  <Text style={styles.iconText}>{item.meta && item.meta['application-phone']}</Text>
                </View>
              </View>
              <View style={styles.thirdIconAndImage}>
                <Icon style={styles.icon} name="location-on" />
                <Text style={styles.iconText}>{item.meta.city}</Text>
              </View>
            </View>
          </View>

          <View style={styles.titleTextWrapper}>
            <Text style={styles.title}>{item.title?.rendered}</Text>
            <Text style={styles.subtext}>
              {isExpanded
                ? removeTags(item.content?.rendered)
                : getShortenedContent(removeTags(item.content?.rendered))}
            </Text>
            <TouchableOpacity
              onPress={() => toggleWorkCondition(item.id)}
              style={styles.showMoreButton}
              touchSoundDisabled={true}
            >
              <Text style={styles.showMoreText}>
                {isExpanded ? 'Learn Less' : 'Learn More'}
                <Entypo name={isExpanded ? 'chevron-up' : 'chevron-down'} style={styles.downIcon} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const toggleWorkCondition = (itemId) => {
    setExpandedItems((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  return (
    <View style={styles.container}>
      <Header />
      {loading ? ( // Show loading indicator if data is still loading
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#072A44" />
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <View style={styles.pageWrapper}>
            <View style={styles.filter}>
              <Text style={styles.sectionTitle}>Featured Resources </Text>
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={ResourcesData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <ResourcesCard item={item} />}
              contentContainerStyle={{ flexGrow: 1 }}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} // Pull-to-refresh functionality
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Resources;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 90,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
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
  modalOverlay: {
    position: 'relative',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalOption: {
    fontSize: 16,
    paddingVertical: 5,
  },
  educationWrapper: {
    width: width,
    height: 791,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageAndDate: {
    marginTop: 40,
  },
  imageAndDate: {
    marginTop: 40,
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
  },
  title: {
    fontFamily: 'WorkSans-Medium',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 25,
    letterSpacing: -0.45,
    color: '#072A44',
    marginTop: 30,
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
    alignItems: 'center',
    paddingBottom: 50,

  },
  showMoreText: {
    color: '#072A44',
    fontSize: 12,
    fontWeight: '500',
  },
  downIcon: {
    fontSize: 12,
    marginLeft: 5,
  },
});

import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList, Alert, Image, RefreshControl, ActivityIndicator } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';
import Header from './Header';

const Jobs = () => {
  const [searchText, setSearchText] = useState('');
  const [zipText, setZipText] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [jobData, setJobData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [numJobsAvailable, setNumJobsAvailable] = useState(0);
  const [showNoJobsMessage, setShowNoJobsMessage] = useState(false);
  const [loadingOverlay, setLoadingOverlay] = useState(false); // State to control loading overlay
  const [userLocation, setUserLocation] = useState(null);
  const [initialLoadInProgress, setInitialLoadInProgress] = useState(true); // State to track initial load
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchJobData();
    requestLocationPermission(); // Call requestLocationPermission when component mounts
  }, []);

  const fetchJobData = async () => {
    setIsLoading(true);
    setLoadingOverlay(false); // Show loading overlay
    try {
      const response = await fetch("https://phindwork.com/wp-json/wp/v2/jobs-vacancies");
      if (response.ok) {
        const data = await response.json();
        setJobData(data);
        setNumJobsAvailable(data.length);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
      setInitialLoadInProgress(false); // Initial load completed
      setLoadingOverlay(false); // Hide loading overlay
    }
  };

  const handleSearch = async (text) => {
    setLoadingOverlay(true); // Show loading overlay
    setSearchPerformed(true);
    if (!text.trim()) {
      fetchJobData();
      return;
    }
    try {
      const response = await fetch(`https://phindwork.com/wp-json/wp/v2/jobs-vacancies?search=${text}`);
      if (response.ok) {
        const data = await response.json();
        if (data.length === 0) {
          setShowNoJobsMessage(true);
          setJobData([]);
          setNumJobsAvailable(0);
        } else {
          setShowNoJobsMessage(false);
          const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setJobData(sortedData);
          setNumJobsAvailable(sortedData.length);
        }
      } else {
        console.error('Failed to fetch search results:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoadingOverlay(false); // Hide loading overlay
    }
  };

  const handleZipSearch = async (text) => {
    setLoadingOverlay(true); // Show loading overlay
    setSearchPerformed(true);
    if (!text.trim()) {
      fetchJobData();
      return;
    }
    try {
      const response = await fetch(`https://phindwork.com/wp-json/wp/v2/jobs-vacancies?zip=${text}`);
      if (response.ok) {
        const data = await response.json();
        if (data.length === 0) {
          setShowNoJobsMessage(true);
          setJobData([]);
          setNumJobsAvailable(0);
        } else {
          setShowNoJobsMessage(false);
          const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setJobData(sortedData);
          setNumJobsAvailable(sortedData.length);
        }
      } else {
        console.error('Failed to fetch search results:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoadingOverlay(false); // Hide loading overlay
    }
  };

  const handleCombinedSearch = async () => {
    setLoadingOverlay(true); // Show loading overlay
    setSearchPerformed(true);
    if (!searchText.trim() && !zipText.trim()) {
      fetchJobData();
      return;
    }
    try {
      const response = await fetch(`https://phindwork.com/wp-json/wp/v2/jobs-vacancies?search=${searchText}&zip=${zipText}`);
      if (response.ok) {
        const data = await response.json();
        if (data.length === 0) {
          setShowNoJobsMessage(true);
          setJobData([]);
          setNumJobsAvailable(0);
        } else {
          setShowNoJobsMessage(false);
          const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setJobData(sortedData);
          setNumJobsAvailable(sortedData.length);
        }
      } else {
        console.error('Failed to fetch search results:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoadingOverlay(false); // Hide loading overlay
    }
  };

  const clearSearch = () => {
    setSearchText('');
    setZipText('');
    setSearchPerformed(false);
    setShowNoJobsMessage(false);
    setLoadingOverlay(true); // Show loading overlay
    fetchJobData();
  };

  const onRefresh = () => {
    setRefreshing(true); // Set refreshing state to true
    fetchJobData(); // Fetch data again
    setRefreshing(false); // Set refreshing state to false when done
  };


  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app requires access to your location to function properly.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
        getUserLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getUserLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        fetchJobLocation(latitude, longitude);
      },
      (error) => {
        console.error('Error getting user location:', error);
        Alert.alert('Error', 'Failed to get user location.');
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const fetchJobLocation = async (latitude, longitude) => {
    setIsLoading(false);
    setLoadingOverlay(true); // Show loading overlay
    const apiUrl = `https://phindwork.com/wp-json/wp/v2/jobs-vacancies?latitude=${latitude}&longitude=${longitude}`;
    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        setJobData(data);
        setNumJobsAvailable(data.length);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
      setLoadingOverlay(false); // Hide loading overlay
    }
  };

  const handleJobItemPress = (item) => {
    navigation.navigate('JobDetails', { jobData: item });
  };

  const PopularCard = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleJobItemPress(item)} activeOpacity={1}>
        <View style={[styles.popularCategoryWrapper]}>
          <View style={styles.popularFirstsection}>
            {item && item.author && item.author['company-logo'] && (
              <Image style={styles.image} source={{ uri: item.author['company-logo'] }} />
            )}
            <View style={styles.popularTextWrapper}>
              <Text style={styles.popularTitleText}>{item.title?.rendered}</Text>
              <Text style={styles.popularSubtitleText}>Phindwork</Text>
              <View style={styles.popularCalendarWrapper}>
                <MaterialIcons style={styles.popularIcon} name="event" />
                <Text style={styles.popularDateText}>
                  {dateInStringFormat(item.date)}
                </Text>
              </View>
            </View>
          </View>
          <Text style={styles.popularCardMainText}>
            {item.meta["_job-description"] ? item.meta["_job-description"].slice(0, 220) : ''}
          </Text>
          <View style={styles.popularLastSectionWrapper}>
            <View style={styles.popularPriceWrapper}>
              <Text style={styles.popularPriceText}>${item.meta?._salary}</Text>
              <Text style={styles.popularRoleText}>Full time</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const dateInStringFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <View style={styles.container}>
      <Header />
      {initialLoadInProgress || isLoading ? ( // Show loading indicators only during initial load or when isLoading is true
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#072A44" />
        </View>
      ) : (
        <>

          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={ // Attach RefreshControl to ScrollView
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={styles.pageWrapper}>
              {/* Search job section */}
              <View style={styles.searchBarWrapper}>
                <View style={styles.searchSection}>
                  <View style={styles.jobSearch}>
                    <FeatherIcon style={styles.customIcon} name="search" />
                    <TextInput
                      style={styles.input}
                      placeholder="Keyword or Job title"
                      placeholderTextColor="#D3D3D3"
                      onChangeText={(text) => {
                        setSearchText(text);
                        if (!text) clearSearch(); // Call clearSearch when text is empty
                      }}
                      value={searchText}
                      onSubmitEditing={() => handleSearch(searchText)} // Trigger search when "Enter" is pressed
                    />
                  </View>
                </View>

                {/* Zip section */}
                <View style={styles.zipfilterWrapper}>
                  <View style={styles.zipSection}>
                    <MaterialIcons style={styles.customIcon} name="flight" />
                    <TextInput
                      style={styles.ZipInput}
                      placeholder="Zip"
                      placeholderTextColor="#D3D3D3"
                      value={zipText}
                      onChangeText={(text) => {
                        setZipText(text);
                        if (!text) clearSearch(); // Call clearSearch when text is empty
                      }}
                      onSubmitEditing={() => handleZipSearch(zipText)} // Trigger search when "Enter" is pressed
                    />
                  </View>
                </View>
              </View>

              {/* Available job section */}
              <View style={styles.availableJobNumber}>
                <Text style={styles.availableJobText}>{numJobsAvailable} Jobs Available</Text>
              </View>

              {/* Popular job section */}
              <View style={styles.popularJobSection}>
                <Text style={styles.popularJobText}>Popular Job categories</Text>
              </View>

              {/* First popular Categories card*/}
              <FlatList
                data={jobData.slice(0, 7)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <PopularCard item={item} />}
              />
            </View>
          </ScrollView>

          {/* Loading overlay */}
          {loadingOverlay && ( // Display loading overlay if loadingOverlay state is true
            <View style={styles.overlay}>
              <ActivityIndicator size="large" color="#072A44" />
            </View>
          )}
        </>
      )}
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Position the overlay at the center of the screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background color
  },
  pageWrapper: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 100,
  },
  searchBarWrapper: {
    marginTop: 30,
    justifyContent: 'center',
    borderColor: 'rgba(0, 0, 0, 0.15)',
    borderWidth: 0.3,
    height: 117,
  },
  searchSection: {
    borderBottomWidth: 0.3,
    borderColor: 'rgba(0, 0, 0, 0.15)',
    marginLeft: 19,
    marginRight: 19,
  },
  jobSearch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customIcon: {
    paddingRight: 15,
    fontSize: 20,
    color: '#FDBC5B',
  },
  input: {
    fontSize: 15,
    fontWeight: '500',
    color: '#072A44',
    lineHeight: 24.26,
    letterSpacing: -0.45,
  },
  zipSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 19,
    marginRight: 19,
  },
  ZipInput: {
    fontSize: 15,
    fontWeight: '500',
    color: '#072A44',
    lineHeight: 24.26,
    letterSpacing: -0.45,
    flex: 1,

  },
  // filterIcon: {
  //   width: 39,
  //   height: 36,
  //   backgroundColor: '#FDBC5B',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: 5,

  // },
  mainIcon: {
    fontSize: 20,
    width: 16.88,
    height: 15.75,
    alignItems: 'flex-end',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject, // This makes the overlay cover the entire screen
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  availableJobNumber: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  availableJobText: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 25,
    color: '#072A44',
  },
  filter: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontFamily: 'WorkSans-Medium',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 25,
    letterSpacing: -0.45,
    color: '#072A44',

  },
  featuredJobSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  FeaturedJobText: {
    fontFamily: 'WorkSans-Bold',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 25,
    color: '#072A44',
  },
  jobItem: {
    marginRight: 20,
  },
  jobImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  jobTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  categoryWrapper: {
    marginTop: 30,
    height: 404,
    backgroundColor: '#072A44',
    padding: 25,
  },
  firstsection: {
    flexDirection: 'row',
    width: 285,
    height: 114,
  },
  image: {
    width: 114,
    height: 114,
    borderRadius: 6,
  },
  textWrapper: {
    marginLeft: 15,
    justifyContent: 'flex-end',
  },
  featuredWrapper: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  featuredText: {
    backgroundColor: 'rgba(253, 188, 91, 0.14)',
    width: 61,
    height: 25,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 25,
    color: '#FDBC5B',
    fontSize: 12,
    fontWeight: '400',
  },
  titleText: {
    color: '#fff',
    fontWeight: '600',
  },
  subtitleText: {
    color: '#fff',
    marginTop: 7,
    fontWeight: '600',
  },
  calendarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    width: 130,
    height: 25,
    borderRadius: 3,
    marginTop: 7,
  },
  icon: {
    fontSize: 13,
    color: "#fff",
    marginRight: 5,
  },
  dateText: {
    color: '#fff',
    fontSize: 13,
  },
  cardMainText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 25,
    marginTop: 20,
  },
  lastSectionWrapper: {
    alignItems: 'flex-end',
    marginTop: 5,
  },
  priceWrapper: {
    width: 53,
    height: 50,
    alignItems: 'center',
    marginTop: 10,
  },
  priceText: {
    color: '#FDBC5B',
    fontWeight: '600',
  },
  roleText: {
    color: '#fff',
    fontSize: 13,
    marginTop: 5,

  },
  popularJobSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  popularJobText: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 25,
    color: '#072A44',
  },
  popularCategoryWrapper: {
    marginTop: 30,
    width: '100%',
    height: 404,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
    padding: 25,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
  },
  popularFirstsection: {
    flexDirection: 'row',
    width: 285,
    height: 114,
  },
  popularImage: {
    width: 114,
    height: 114,
    borderRadius: 6,
  },
  popularTextWrapper: {
    marginLeft: 15,
    justifyContent: 'flex-end',
  },
  popularTitleText: {
    color: '#072A44',
    fontWeight: '600',
  },
  popularSubtitleText: {
    color: '#FDBC5B',
    marginTop: 7,
    fontWeight: '600',
  },
  popularCalendarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 130,
    height: 25,
    borderRadius: 3,
    marginTop: 7,
  },
  popularIcon: {
    fontSize: 13,
    color: "#072A44",
    marginRight: 5,
  },
  popularDateText: {
    color: '#072A44',
    fontSize: 13,
  },
  popularCardMainText: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 25,
    marginTop: 20,
  },
  popularLastSectionWrapper: {
    alignItems: 'flex-end',
    marginTop: 5,
  },
  popularPriceWrapper: {
    width: 53,
    height: 50,
    alignItems: 'center',
    marginTop: 10,
  },
  popularPriceText: {
    color: '#072A44',
    fontWeight: '600',
  },
  popularRoleText: {
    color: '#072A44',
    fontSize: 13,
    marginTop: 5,
  },
  footerWrapper: {
    width: '100%',
    height: 158,
    marginTop: 70,
  },
  firstLayer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  footerImage: {
    width: 40,
    height: 40,
  },
  secondLayer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 30,
  },
  footerText: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 25,
    letterSpacing: -0.45,
    justifyContent: 'center',
    color: '#000',

  },
});

export default Jobs;

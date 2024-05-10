import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from './Header';
import { useRoute } from '@react-navigation/native';


const JobDetails = () => {
    const [isLoading, setIsLoading] = useState(true);
    const route = useRoute(); // Use useRoute hook to access route object
    const { jobData } = route.params; // Access jobData from route.params



    const dateInStringFormat = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };


    return (
        <View style={styles.container}>
            <Header />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.JobDetailsWrapper}>

                    {/*First section */}
                    <View style={styles.firstSection}>
                        {jobData && jobData.author && jobData.author['company-logo'] && (
                            <Image style={styles.sectionImage} source={{ uri: jobData.author['company-logo'] }} />
                        )}
                       
                        <View style={styles.sectionText}>
                            <Text style={styles.sectionTitle}>{jobData.title.rendered}</Text>
                            <Text style={styles.ComapanyText}>Phindwork</Text>
                            <View style={styles.calendarWrapper}>
                                <MaterialIcons style={styles.icon} name="event" />
                                <Text style={styles.dateText}>{dateInStringFormat(jobData.date)}</Text>
                            </View>
                        </View>
                        <View style={styles.priceWrapper}>
                            <Text style={styles.priceText}>${jobData.meta?._salary}</Text>
                            <Text style={styles.priceRole}>Full time</Text>
                        </View>
                    </View>
                    {/*First section ends */}

                    {/*Second section*/}
                    <View style={styles.secondSectionWrapper}>
                        <View style={styles.secondSection}>
                            <Text style={styles.secondSectionText}>Application Details</Text>
                            <View style={styles.iconSection}>
                                <View style={styles.iconWrapperA}>
                                    <View style={styles.iconAndTextA}>
                                        <MaterialIcons style={styles.icon} name="mail" />
                                        <Text style={styles.iconText}>{jobData.meta['application-email']}</Text>
                                    </View>
                                    <View style={styles.iconAndTextA}>
                                        <MaterialIcons style={styles.icon} name="location-on" />
                                        <Text style={styles.iconText}>{jobData.meta['address-city']}</Text>
                                    </View>
                                    <View style={styles.iconAndTextA}>
                                        <MaterialIcons style={styles.icon} name="person" />
                                        <Text style={styles.iconText}>www.phind.com</Text>
                                    </View>
                                </View>

                                <View style={styles.iconWrapperB}>
                                    <View style={styles.iconAndTextB}>
                                        <MaterialIcons style={styles.icon} name="phone" />
                                        <Text style={styles.iconText}>{jobData.meta['application-phone']}</Text>
                                    </View>
                                    <View style={styles.iconAndTextB}>
                                        <Entypo style={styles.icon} name="location" />
                                        <Text style={styles.iconText}>{jobData.meta['address-zip-code']}</Text>
                                    </View>
                                    <View style={styles.iconAndTextB}>
                                        <MaterialIcons style={styles.icon} name="person" />
                                        <Text style={styles.iconText}>10-50</Text>
                                    </View>
                                </View>
                            </View>
                            {/*Second section End*/}

                            {/*Job Description Begins */}
                            <View style={styles.descriptionWrapper}>
                                <Text style={styles.descriptionTitle}>Job Description</Text>
                                <Text style={styles.descriptionText}>
                                    {jobData.meta?.['_job-description']}
                                </Text>

                                {/* Requirement Condition */}
                                <Text style={styles.descriptionCondtion}>Requiremnet</Text>
                                <Text style={styles.descriptionText}>
                                    {jobData.meta?.['_requirements']}
                                </Text>


                                {/* Work Condition*/}
                                <Text style={styles.descriptionCondtion}>Work Condition</Text>
                                <Text style={styles.descriptionText}>
                                    {jobData.meta?.['_work-conditions']}
                                </Text>

                                {/* Responsibility */}
                                <Text style={styles.descriptionResponsibility}>Responsibility</Text>
                                <Text style={styles.descriptionText}>
                                    {jobData.meta?.['_responsibilities']}
                                </Text>
                                {/*End of Responsibility */}
                            </View>
                        </View>
                    </View>

                </View>

            </ScrollView>

            {/* Apply Now Button 
            <TouchableOpacity style={styles.applyNowButton}>
                <Text style={styles.applyNowText}>Apply Now</Text>
            </TouchableOpacity>
             {/* MainTabNavigator Component */}

        </View>
    );
};

export default JobDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    JobDetailsWrapper: {
        width: '90%',
        height: 'auto',
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        elevation: 2,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.15)',
        marginTop: 50,
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 50,
        paddingTop: 40,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    firstSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sectionImage: {
        width: 80,
        height: 80,
        borderRadius: 6,

    },
    sectionText: {
        justifyContent: 'flex-end',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#072A44',
        letterSpacing: -0.45,
    },
    ComapanyText: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 5,
        color: '#FDBC5B',
        letterSpacing: -0.45,
    },
    calendarWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,

    },
    icon: {
        fontSize: 13,
        fontWeight: '600',
        color: '#000000',
    },
    dateText: {
        fontSize: 13,
        fontWeight: '400',
        color: '#000000',
        letterSpacing: -0.45,
    },
    priceWrapper: {
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    priceText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#072A44',
        letterSpacing: -0.45,
    },
    priceRole: {
        fontSize: 13,
        fontWeight: '400',
        color: '#072A44',
        letterSpacing: -0.45,
    },
    secondSectionWrapper: {
        marginTop: 40,
    },
    secondSectionText: {
        fontSize: 18,
        fontWeight: '500',
        letterSpacing: -0.45,
        color: '#072A44',
    },
    iconSection: {
        flexDirection: 'row',
        marginTop: 10,
    },
    iconWrapperA: {
        paddingRight: 19,
    },
    iconAndTextA: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    icon: {
        fontSize: 13,
        marginRight: 10,
        color: '#072A44',
    },
    iconText: {
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 24.26,
        letterSpacing: -0.45,
        color: "#000",
    },
    iconAndTextB: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    descriptionWrapper: {
        marginTop: 40,
    },
    descriptionTitle: {
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 24.26,
        letterSpacing: -0.45,
        color: '#072A44',
    },
    descriptionText: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 24.26,
        letterSpacing: -0.45,
        color: '#000',
    },
    descriptionCondtion: {
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 25,
        letterSpacing: -0.45,
        marginTop: 50,
        color: '#072A44',
    },
    descriptionResponsibility: {
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 24.26,
        letterSpacing: -0.45,
        marginTop: 50,
        color: '#072A44',
    },
    showMoreButton: {
        alignItems: 'flex-start',
        marginTop: 10,
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
    bottomWrapper: {
        alignContent: 'flex-end',
    },
    applyNowButton: {
        width: '90%',
        bottom: 20,
        backgroundColor: '#FDBC5B',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingVertical: 15,

        borderRadius: 8,
    },
    applyNowText: {
        fontFamily: 'WorkSans-Italic',
        fontSize: 16.67,
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '500',
        lineHeight: 19.55,
    },
});


import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors, Spacing, Fonts } from '../styles/tripTheme';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const BookingScreen = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('Tour schedule');
    
    const [expandedDay, setExpandedDay] = useState(1);

    const itineraryData = [
        {
            id: 1,
            day: 'Day 1',
            title: 'Arrival to Rio de Janeiro',
            image: require('../assets/images/airport.jpg'),
            details: [
                { time: 'Morning', desc: 'Arrive in Rio de Janeiro and transfer to your hotel' },
                { time: 'Afternoon', desc: 'Free time to relax or explore the nearby area' },
                { time: 'Evening', desc: 'Welcome dinner at a traditional Brazilian restaurant' }
            ]
        },
        {
            id: 2,
            day: 'Day 2',
            title: 'Rio de Janeiro Highlights',
            image: require('../assets/images/mountain.jpg'),
            details: [
                { time: 'Morning', desc: 'Visit the Christ the Redeemer statue' },
                { time: 'Afternoon', desc: 'Cable car ride to Sugarloaf Mountain' }
            ]
        }
    ];

    return (
        <View style={styles.container}>
            
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
                    <Icon name="chevron-left" size={24} color={Colors.black} />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Iconic Brazil</Text>
                    <Text style={styles.headerSubtitle}>Wed, Oct 21 – Sun, Nov 1</Text>
                </View>
                <TouchableOpacity style={styles.iconBtn}>
                    <Icon name="heart" size={20} color={Colors.black} />
                </TouchableOpacity>
            </View>

            
            <View style={styles.tabWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
                    {['Tour schedule', 'Accommodation', 'Booking details'].map((tab) => (
                        <TouchableOpacity 
                            key={tab} 
                            onPress={() => setActiveTab(tab)}
                            style={[styles.tab, activeTab === tab && styles.activeTab]}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.handle} />
                <Text style={styles.sectionTitle}>8-Days Brazil Adventure</Text>

                {itineraryData.map((item) => {
                    const isExpanded = expandedDay === item.id;
                    return (
                        <TouchableOpacity 
                            key={item.id} 
                            activeOpacity={0.9}
                            onPress={() => setExpandedDay(isExpanded ? null : item.id)}
                            style={styles.itineraryCard}
                        >
                            <View style={styles.cardHeader}>
                                
                                <Image source={item.image} style={styles.dayThumb} />
                                <View style={styles.dayTitleBox}>
                                    <Text style={styles.dayLabel}>{item.day}</Text>
                                    <Text style={styles.dayTitle}>{item.title}</Text>
                                </View>
                                <Icon 
                                    name={isExpanded ? "chevron-up" : "chevron-down"} 
                                    size={20} 
                                    color={Colors.black} 
                                />
                            </View>

                            
                            {isExpanded && (
                                <View style={styles.expandedContent}>
                                    {item.details.map((detail, idx) => (
                                        <View key={idx} style={styles.detailItem}>
                                            <Text style={styles.timeLabel}>{detail.time}</Text>
                                            <Text style={styles.detailText}>{detail.desc}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.bookBtn}>
                    <Text style={styles.bookBtnText}>Book a tour</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingHorizontal: 20, 
        paddingTop: 60, 
        paddingBottom: 20,
        backgroundColor: '#fff' 
    },
    iconBtn: { padding: 8 },
    headerTitleContainer: { alignItems: 'center' },
    headerTitle: { fontSize: 18, fontFamily: Fonts.bold, color: Colors.black },
    headerSubtitle: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
    
    tabWrapper: { backgroundColor: '#fff', paddingBottom: 15 },
    tabScroll: { paddingHorizontal: 20, gap: 10 },
    tab: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 25, backgroundColor:Colors.primaryLight },
    activeTab: { backgroundColor: Colors.primary },
    tabText: { color: Colors.textSecondary, fontWeight: '600' },
    activeTabText: { color: '#fff' },

    scrollContent: { 
        padding: 20, 
        paddingBottom: 150, 
        backgroundColor: '#fff', 
        borderTopLeftRadius: 40, 
        borderTopRightRadius: 40,
        marginTop: -20,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    handle: { width: 40, height: 4, backgroundColor: '#E5E7EB', borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
    sectionTitle: { fontSize: 22, fontFamily: Fonts.bold, marginBottom: 20, color: Colors.black },
    
    itineraryCard: { 
        backgroundColor: '#fff', 
        borderRadius: 25, 
        padding: 20, 
        marginBottom: 15, 
        borderWidth: 1, 
        borderColor: '#F3F4F6',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2
    },
    cardHeader: { flexDirection: 'row', alignItems: 'center' },
    dayThumb: { 
        width: 70, 
        height: 70, 
        borderRadius: 15 
    },
    dayTitleBox: { flex: 1, marginLeft: 15 },
    dayLabel: { fontSize: 12, color: Colors.textSecondary, fontFamily: Fonts.regular },
    dayTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.black, marginTop: 2 },
    
    expandedContent: { 
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#F9FAFB',
        paddingTop: 20
    },
    detailItem: { marginBottom: 15 },
    timeLabel: { fontSize: 13, color: '#9CA3AF', fontFamily: Fonts.medium, marginBottom: 4 },
    detailText: { fontSize: 14, color: Colors.black, lineHeight: 22, fontFamily: Fonts.regular },

    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingBottom: 40,
        backgroundColor: 'rgba(255,255,255,0.8)',
    },
    bookBtn: { 
        backgroundColor: Colors.primary, 
        height: 65, 
        borderRadius: 35, 
        justifyContent: 'center', 
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 8
    },
    bookBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});

export default BookingScreen;
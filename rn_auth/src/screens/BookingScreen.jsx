import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Dimensions,
    Alert,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useStripe } from '@stripe/stripe-react-native';
import { Colors, Spacing, Fonts } from '../styles/tripTheme';
import { IP_ADDRESS } from '@env'
const { width } = Dimensions.get('window');

const BookingScreen = ({ navigation }) => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const [activeTab, setActiveTab] = useState('Tour schedule');
    const [expandedDay, setExpandedDay] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchPaymentSheetParams = async () => {
        try {
            const response = await fetch(`${IP_ADDRESS}:3000/create-payment-intent` , {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: 65900, // $659.00 in cents
                    currency: 'usd'
                }),
            });

            const { clientSecret, error } = await response.json();
            if (error) {
                Alert.alert("Backend Error", error);
                return null;
            }
            return clientSecret;
        } catch (e) {
            console.error(e);
            Alert.alert("Connection Error", "Cannot reach server. Check your IP and Firewall.");
            return null;
        }
    };

    const initializePaymentSheet = async () => {
        setLoading(true);

        const clientSecret = await fetchPaymentSheetParams();

        if (!clientSecret) {
            setLoading(false);
            return;
        }

        const { error } = await initPaymentSheet({
            merchantDisplayName: "TripGlide",
            paymentIntentClientSecret: clientSecret,
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: 'Test Rider',
            }
        });

        if (!error) {
            openPaymentSheet();
        } else {
            setLoading(false);
            Alert.alert(`Init Error: ${error.code}`, error.message);
        }
    };

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error: ${error.code}`, error.message);
        } else {
            Alert.alert('Success', 'Your adventure is confirmed! Check your email for details.');
            navigation.navigate('Home'); // Or wherever your main screen is
        }
        setLoading(false);
    };

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
            {/* Header */}
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

            {/* Tabs */}
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

            {/* Content */}
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

            {/* Sticky Bottom Button */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.bookBtn, loading && { opacity: 0.7 }]}
                    onPress={initializePaymentSheet}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.bookBtnText}>Book a tour</Text>
                    )}
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
    tab: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 25, backgroundColor: Colors.primaryLight },
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
        elevation: 2
    },
    cardHeader: { flexDirection: 'row', alignItems: 'center' },
    dayThumb: { width: 70, height: 70, borderRadius: 15 },
    dayTitleBox: { flex: 1, marginLeft: 15 },
    dayLabel: { fontSize: 12, color: Colors.textSecondary },
    dayTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.black, marginTop: 2 },

    expandedContent: {
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#F9FAFB',
        paddingTop: 20
    },
    detailItem: { marginBottom: 15 },
    timeLabel: { fontSize: 13, color: '#9CA3AF', marginBottom: 4 },
    detailText: { fontSize: 14, color: Colors.black, lineHeight: 22 },

    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingBottom: 40,
        backgroundColor: 'rgba(255,255,255,0.9)',
    },
    bookBtn: {
        backgroundColor: Colors.primary,
        height: 65,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8
    },
    bookBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});

export default BookingScreen;
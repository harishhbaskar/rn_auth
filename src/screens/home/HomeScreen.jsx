import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Colors, globalStyles, Spacing } from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Feather';

import ScreenWrapper from '../../components/common/ScreenWrapper';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import IconButton from '../../components/common/IconButton';


const DeviceCard = ({ title, subtitle, icon, initialStatus = false }) => {
    const [isOn, setIsOn] = useState(initialStatus);

    return (
        <Card style={styles.deviceCard}>
            {/* Top Row: Icon + Text */}
            <View style={styles.cardHeader}>
                <View style={[styles.iconBox, { backgroundColor: isOn ? Colors.primary : Colors.white }]}>
                    <Icon 
                        name={icon} 
                        size={20} 
                        color={isOn ? Colors.white : Colors.primary} 
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.deviceTitle} numberOfLines={1}>{title}</Text>
                    <Text style={styles.deviceSubtitle} numberOfLines={1}>{subtitle}</Text>
                </View>
            </View>

            {/* Bottom Row: Status + Toggle */}
            <View style={styles.cardFooter}>
                <Text style={styles.statusText}>{isOn ? 'ON' : 'OFF'}</Text>
                <Switch
                    trackColor={{ false: "#E5E7EB", true: Colors.primary }}
                    thumbColor={Colors.white}
                    ios_backgroundColor="#E5E7EB"
                    onValueChange={() => setIsOn(!isOn)}
                    value={isOn}
                    style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }} 
                />
            </View>
        </Card>
    );
};

const renderHeader = () => {
    return(
        <Header 
            showLogo={true} 
            rightComponent={
                <View style={{flexDirection: 'row', gap: 10}}>
                    <IconButton icon={<Icon name="search" size={20} color={Colors.textPrimary} />} />
                    <IconButton icon={<Icon name="bell" size={20} color={Colors.textPrimary} />} />
                    <View style={styles.avatar} />
                </View>
            }
        />
    )
}

const renderContent1 = () => {
    return(
        <View>
            {/*room tabs*/}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
                <TouchableOpacity style={[styles.pill, styles.activePill]}>
                    <Text style={styles.activeText}>Living Room</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.pill}><Text style={styles.inactiveText}>Bedroom</Text></TouchableOpacity>
                <TouchableOpacity style={styles.pill}><Text style={styles.inactiveText}>Kitchen</Text></TouchableOpacity>
            </ScrollView>

            {/*camera section */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Camera</Text>
                <View style={styles.roomBadge}>
                    <Text style={styles.roomBadgeText}>Living Room ▾</Text>
                </View>
            </View>

            <Card style={styles.cameraCard}>
                <View style={styles.liveBadge}>
                    <Text style={styles.liveText}>• LIVE</Text>
                </View>
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <Icon name="image" size={40} color="#9CA3AF" />
                </View>
            </Card>
        </View>

    )
}

const renderContent2 = () => {
    return(
            <View style={styles.grid}>
                
                <View style={styles.gridItem}>
                    <DeviceCard 
                        title="Living Room" 
                        subtitle="Padlock" 
                        icon="lock" 
                        initialStatus={false} 
                    />
                </View>
                
                <View style={styles.gridItem}>
                    <DeviceCard 
                        title="JBL GO 3" 
                        subtitle="Speaker" 
                        icon="speaker" 
                        initialStatus={false} 
                    />
                </View>
                            
                <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('DeviceControl')}>
                    <DeviceCard 
                        title="Samsung y1" 
                        subtitle="Smart TV" 
                        icon="tv" 
                        initialStatus={true} 
                    />
                </TouchableOpacity>
                
                <View style={styles.gridItem}>
                    <DeviceCard 
                        title="Backyard" 
                        subtitle="Smart Door" 
                        icon="sidebar" 
                        initialStatus={false} 
                    />
                </View>
            </View>
    )
}

const HomeScreen = ({ navigation }) => {
  return (
    <ScreenWrapper>
        {renderHeader()}

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
            {renderContent1()}
            {renderContent2()}
        </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
    avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E5E7EB' },
    
    // Tabs
    tabContainer: { marginBottom: 24, flexDirection: 'row' },
    pill: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 30, marginRight: 10, backgroundColor: Colors.white },
    activePill: { backgroundColor: Colors.textPrimary }, 
    activeText: { color: Colors.white, fontWeight: '600' },
    inactiveText: { color: Colors.textSecondary },

    // Camera Header
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
    roomBadge: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: Colors.white, borderRadius: 20 },
    roomBadgeText: { fontSize: 12, fontWeight: '600', color: Colors.textPrimary },

    cameraCard: { height: 180, backgroundColor: '#E5E7EB', padding: 0, overflow:'hidden' },
    liveBadge: { position: 'absolute', top: 12, right: 12, backgroundColor: Colors.white, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, zIndex: 10 },
    liveText: { color: Colors.red, fontSize: 10, fontWeight: 'bold' },

    // Grid Layout
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 12 }, 
    gridItem: { width: '48%' }, 
    
    // Device Card Styles
    deviceCard: { 
        width: '100%', 
        height: 150, 
        justifyContent: 'space-between', 
        padding: 16 
    },
    cardHeader: { flexDirection: 'row', alignItems: 'flex-start' },
    iconBox: { 
        width: 40, height: 40, borderRadius: 20, 
        alignItems: 'center', justifyContent: 'center',
        shadowColor: "#000", shadowOffset: {width:0, height:2}, shadowOpacity:0.1, shadowRadius:3, elevation:2
    },
    textContainer: { marginLeft: 12, flex: 1 },
    deviceTitle: { fontSize: 14, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 2 },
    deviceSubtitle: { fontSize: 12, color: Colors.textSecondary },

    cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    statusText: { fontSize: 12, fontWeight: '600', color: Colors.textSecondary },
});

export default HomeScreen;
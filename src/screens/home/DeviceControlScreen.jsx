import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Feather';


// Components
import ScreenWrapper from '../../components/common/ScreenWrapper';
import Header from '../../components/common/Header';
import IconButton from '../../components/common/IconButton';

const MIN_TEMP = 16;
const MAX_TEMP = 30;

const DeviceControlScreen = ({ navigation }) => {
  const [temp, setTemp] = useState(24);
  const [fanSpeed, setFanSpeed] = useState(2); 

  // --- SIMPLE PERCENTAGE LOGIC ---
  const percentage = ((temp - MIN_TEMP) / (MAX_TEMP - MIN_TEMP)) * 100;
  
  // Circle Config
  const size = 250;
  const strokeWidth = 15;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <ScreenWrapper>
      <Header 
        showBack={true} 
        title="Living Room" 
        rightComponent={<IconButton icon={<Icon name="more-vertical" size={24} color={Colors.textPrimary}/>} />} 
      />

      <View style={{ flex: 1, justifyContent: 'space-between', paddingBottom: 20 }}>
        
        
        <View style={styles.dialContainer}>
            <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
                <Svg width={size} height={size}>
                    {/* 1. Background Gray Ring */}
                    <Circle
                        stroke={Colors.border}
                        fill="none"
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                    />
                    {/* 2. Green Progress Ring */}
                    <Circle
                        stroke={Colors.primary}
                        fill="none"
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                        strokeDasharray={`${circumference} ${circumference}`}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        rotation="-90"
                        origin={`${size / 2}, ${size / 2}`}
                    />
                </Svg>
                
                {/* Center Text */}
                <View style={styles.centerTextContainer}>
                    <Text style={styles.tempText}>{temp}°C</Text>
                    <Text style={styles.statusText}>Heating</Text>
                </View>
            </View>

            {/* Buttons */}
            <View style={styles.controlsOverlay}>
                <IconButton 
                    onPress={() => setTemp(t => Math.max(MIN_TEMP, t - 1))} 
                    icon={<Icon name="minus" size={24} color={Colors.textPrimary}/>} 
                />
                <IconButton 
                    onPress={() => setTemp(t => Math.min(MAX_TEMP, t + 1))} 
                    icon={<Icon name="plus" size={24} color={Colors.textPrimary}/>} 
                />
            </View>
        </View>

        {/* 3. Toggles Row */}
        <View style={styles.toggleRow}>
             <Icon name="sun" size={24} color={Colors.textSecondary} />
             <Icon name="wind" size={24} color={Colors.textSecondary} />
             <View style={styles.activeIcon}>
                <Icon name="loader" size={24} color={Colors.white} />
             </View>
             <Icon name="droplet" size={24} color={Colors.textSecondary} />
        </View>

        {/* 4. Fan Speed & Mode */}
        <View style={styles.bottomSection}>
            <Text style={styles.label}>Fan Speed</Text>
            <View style={styles.fanRow}>
                {[0, 1, 2, 3, 4].map((i) => (
                    <TouchableOpacity 
                        key={i} 
                        style={[
                            styles.fanBar, 
                            { backgroundColor: i <= fanSpeed ? Colors.primary : Colors.border }
                        ]} 
                        onPress={() => setFanSpeed(i)}
                    />
                ))}
            </View>

            <Text style={[styles.label, {marginTop: 24}]}>Mode</Text>
            <View style={styles.modeRow}>
                <View style={[styles.modeCard, { backgroundColor: Colors.primary }]}>
                    <Icon name="clock" size={20} color={Colors.white} />
                    <Text style={[styles.modeText, { color: Colors.white }]}>7 Hours</Text>
                </View>
                <View style={styles.modeCard}>
                    <Icon name="zap" size={20} color={Colors.textPrimary} />
                    <Text style={styles.modeText}>On</Text>
                </View>
                <View style={styles.modeCard}>
                    <Icon name="wind" size={20} color={Colors.textPrimary} />
                    <Text style={styles.modeText}>Fast</Text>
                </View>
            </View>
        </View>

      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  dialContainer: { alignItems: 'center', justifyContent: 'center', height: 300, position: 'relative' },
  
  centerTextContainer: { position: 'absolute', alignItems: 'center' },
  tempText: { fontSize: 48, fontWeight: 'bold', color: Colors.textPrimary },
  statusText: { fontSize: 14, color: Colors.textSecondary, marginTop: 4 },
  
  controlsOverlay: {
      flexDirection: 'row', width: '100%', justifyContent: 'space-between',
      paddingHorizontal: 40, position: 'absolute', bottom: 10,
  },

  toggleRow: {
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      backgroundColor: Colors.white, padding: 12, paddingHorizontal: 32, borderRadius: 24
  },
  activeIcon: { backgroundColor: Colors.primary, padding: 12, borderRadius: 16 },
  
  bottomSection: { marginTop: 10 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 12, color: Colors.textPrimary },
  fanRow: { flexDirection: 'row', gap: 8, height: 48 },
  fanBar: { flex: 1, borderRadius: 12 },
  modeRow: { flexDirection: 'row', gap: 12 },
  modeCard: { 
      flex: 1, backgroundColor: Colors.white, borderRadius: 24, padding: 16, 
      alignItems: 'center', justifyContent: 'center', height: 90 
  },
  modeText: { fontWeight: 'bold', marginTop: 8, color: Colors.textPrimary },
});

export default DeviceControlScreen;
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import ScreenWrapper from '../../components/common/ScreenWrapper';
import Header from '../../components/common/Header';
import IconButton from '../../components/common/IconButton';
import { Colors } from '../../styles/globalStyles';

const MIN_TEMP = 16;
const MAX_TEMP = 30;

const Dial = ({ temp, setTemp }) => {
  const TOTAL_TICKS = 36;
  
  const activeTicks = Math.floor(((temp - MIN_TEMP) / (MAX_TEMP - MIN_TEMP)) * TOTAL_TICKS);

  return (
    <View style={styles.dialContainer}>
  
      <View style={styles.dialCircle}>
        {Array.from({ length: TOTAL_TICKS }).map((_, index) => {
          const rotation = index * (360 / TOTAL_TICKS) - 90; 
          const isActive = index < activeTicks;

          return (
            <View
              key={index}
              style={[
                styles.tickMark,
                {
                  backgroundColor: isActive ? Colors.primary : '#E5E7EB',
                  transform: [
                    { rotate: `${rotation}deg` },
                    { translateX: 130 }, 
                  ],
                },
              ]}
            />
          );
        })}

        {/* 2. Inner White Circle & Text */}
        <View style={styles.innerDial}>
          <Text style={styles.tempText}>{temp}°C</Text>
        </View>
      </View>

      {/* 3. Controls Overlay */}
      <View style={styles.controlsOverlay}>
        <IconButton
          onPress={() => setTemp((t) => Math.max(MIN_TEMP, t - 1))}
          icon={<Icon name="minus" size={24} color={Colors.textPrimary} />}
        />
        <IconButton
          onPress={() => setTemp((t) => Math.min(MAX_TEMP, t + 1))}
          icon={<Icon name="plus" size={24} color={Colors.textPrimary} />}
        />
      </View>
    </View>
  );
};



const Toggles = () => {
  return (
    <View style={styles.toggleRow}>
      <Icon name="sun" size={24} color={Colors.textSecondary} />
      <Icon name="wind" size={24} color={Colors.textSecondary} />
      <View style={styles.activeIcon}>
        <Icon name="loader" size={24} color={Colors.white} />
      </View>
      <Icon name="droplet" size={24} color={Colors.textSecondary} />
    </View>
  );
};


const FanControls = ({ fanSpeed, setFanSpeed }) => {
  return (
    <View style={styles.bottomSection}>
      <Text style={styles.label}>Fan Speed</Text>
      <View style={styles.fanRow}>
        {[0, 1, 2, 3, 4].map((i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.fanBar,
              { backgroundColor: i <= fanSpeed ? Colors.primary : Colors.border },
            ]}
            onPress={() => setFanSpeed(i)}
          />
        ))}
      </View>

      <Text style={[styles.label, { marginTop: 24 }]}>Mode</Text>
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
  );
};


const DeviceControlScreen = ({ navigation }) => {
  const [temp, setTemp] = useState(24);
  const [fanSpeed, setFanSpeed] = useState(2);

  return (
    <ScreenWrapper>
      <View style={{ flex: 1, justifyContent: 'space-between', paddingBottom: 20 }}>
        <Header
          showBack={true}
          title="Living Room"
          rightComponent={
            <IconButton icon={<Icon name="more-vertical" size={24} color={Colors.textPrimary} />} />
          }
        />

        <Dial temp={temp} setTemp={setTemp} />

        <Toggles />
        
        <FanControls fanSpeed={fanSpeed} setFanSpeed={setFanSpeed} />

      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  dialContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    marginTop:-20,
    marginBottom:10
  },
  dialCircle: {
    width: 400,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom:30
  },
  tickMark: {
    position: 'absolute',
    width: 25, // Length of the tick
    height: 10, // Thickness of the tick
    borderRadius: 2,
   
  },
  innerDial: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    // Shadows
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    zIndex: 5,
  },
  tempText: { fontSize: 42, fontWeight: 'bold', color: Colors.textPrimary },
  controlsOverlay: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    position: 'absolute',
    bottom: 10,
  },

  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
  },
  activeIcon: { backgroundColor: Colors.primary, padding: 12, borderRadius: 16 },

  bottomSection: { marginTop: 10 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 12, color: Colors.textPrimary },
  fanRow: { flexDirection: 'row', gap: 8, height: 48 },
  fanBar: { flex: 1, borderRadius: 12 },
  modeRow: { flexDirection: 'row', gap: 12 },
  modeCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 90,
  },
  modeText: { fontWeight: 'bold', marginTop: 8, color: Colors.textPrimary },
});

export default DeviceControlScreen;
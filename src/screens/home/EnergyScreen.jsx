import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, globalStyles, Spacing } from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Feather';
import { BarChart } from "react-native-gifted-charts"; 

import ScreenWrapper from '../../components/common/ScreenWrapper';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';

// 1. Summary Card Helper
const SummaryCard = ({ icon, value, label, unit, color }) => (
    <Card style={styles.summaryCard}>
        {/* the color prop is for the icon and a transparent version(+20) is for the background */}
        <View style={[styles.iconBox, { backgroundColor: color + '20' }]}> 
            <Icon name={icon} size={24} color={color} />
        </View>
        <View>
            <View style={{flexDirection:'row', alignItems:'flex-end'}}>
                <Text style={styles.summaryValue}>{value}</Text>
                {unit && <Text style={styles.summaryUnit}>{unit}</Text>}
            </View>
            <Text style={styles.summaryLabel}>{label}</Text>
        </View>
    </Card>
);

// 2. Usage List Item Helper
const UsageItem = ({ icon, name, percentage, color }) => (
    <Card style={styles.usageCard}>
        <View style={styles.usageLeft}>
            <View style={[styles.smallIcon, { backgroundColor: Colors.background }]}>
                <Icon name={icon} size={18} color={Colors.textPrimary} />
            </View>
            <Text style={styles.usageName}>{name}</Text>
        </View>
        <View style={styles.usageRight}>
            <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: percentage, backgroundColor: color }]} />
            </View>
            <Text style={styles.percentageText}>{percentage}</Text>
        </View>
    </Card>
);

const EnergyScreen = () => {
  const barData = [
    { value: 50, label: 'J', frontColor: Colors.primaryLight },
    { value: 60, label: 'F', frontColor: Colors.primaryLight },
    { value: 75, label: 'M', frontColor: Colors.primary }, 
    { value: 40, label: 'A', frontColor: Colors.primaryLight },
    { value: 65, label: 'M', frontColor: Colors.primaryLight },
    { value: 55, label: 'J', frontColor: Colors.primaryLight },
    { value: 80, label: 'J', frontColor: Colors.primaryLight },
    { value: 45, label: 'A', frontColor: Colors.primaryLight },
    { value: 70, label: 'S', frontColor: Colors.primary }, 
    { value: 90, label: 'O', frontColor: Colors.primaryLight },
    { value: 60, label: 'N', frontColor: Colors.primaryLight },
    { value: 75, label: 'D', frontColor: Colors.primaryLight },
  ];

const renderHeader = () => {
    return(
        <Header 
        title="Energy Consumption"
        showLogo={true} 
        rightComponent={<View style={styles.avatar} />}
      />
    )
}

const renderSummaryRow = () => {
    return(
        <View style={styles.row}>
            <View style={{flex:1, paddingRight:8}}>
                <SummaryCard icon="cloud" value="28" unit="°C" label="Sunny Cloudy" color={Colors.primary} />
            </View>
            <View style={{flex:1, paddingLeft:8}}>
                <SummaryCard icon="zap" value="7" unit="/kWh" label="Consumption" color={Colors.primary} />
            </View>
        </View>
    )
}

const renderChart = () => {
    return(
        <View>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Energy Used</Text>
                <TouchableOpacity style={styles.dropdownBtn}>
                    <Text style={styles.dropdownText}>Month ▾</Text>
                </TouchableOpacity>
            </View>

            <Card style={styles.chartCard}>
                <BarChart
                    data={barData}
                    barWidth={14}
                    spacing={12}
                    initialSpacing={10}
                    roundedTop
                    roundedBottom
                    hideRules
                    hideYAxisText
                    xAxisThickness={0}
                    yAxisThickness={0}
                    yAxisTextStyle={{ color: Colors.textSecondary }}
                    noOfSections={3}
                    maxValue={100}
                    isAnimated
                />
            </Card>
        </View>
    )
}

const renderDeviceUsageList = () => {
    return (
        <View>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Energy Consumption</Text>
                <TouchableOpacity style={styles.dropdownBtn}>
                    <Text style={styles.dropdownText}>Month ▾</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.listContainer}>
                <UsageItem icon="sun" name="Smart Lamp" percentage="44%" color={Colors.primary} />
                <UsageItem icon="tv" name="Smart TV" percentage="56%" color={Colors.primary} />
                <UsageItem icon="speaker" name="Speaker" percentage="23%" color={Colors.primary} />
            </View>
        </View>
    )
    

}

  return (
    <ScreenWrapper>
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {renderSummaryRow()}
        {renderChart()}
        {renderDeviceUsageList()}
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.border },
  row: { flexDirection: 'row', marginBottom: 10 },
  
  summaryCard: { flexDirection: 'row', alignItems: 'center', padding: 16, height: 100 },
  iconBox: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  summaryValue: { fontSize: 24, fontWeight: 'bold', color: Colors.textPrimary },
  summaryUnit: { fontSize: 14, color: Colors.textSecondary, marginBottom: 4, marginLeft: 2 },
  summaryLabel: { fontSize: 12, color: Colors.textSecondary },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  dropdownBtn: { borderWidth: 1, borderColor: Colors.border, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
  dropdownText: { fontSize: 12, color: Colors.textPrimary },

  chartCard: { padding: 10, alignItems: 'center', justifyContent: 'center' },

  listContainer: { gap: 4 },
  usageCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, height: 80 },
  usageLeft: { flexDirection: 'row', alignItems: 'center' },
  smallIcon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  usageName: { fontWeight: '600', color: Colors.textPrimary },
  usageRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  progressBarBg: { width: 80, height: 6, backgroundColor: Colors.background, borderRadius: 3 },
  progressBarFill: { height: '100%', borderRadius: 3 },
  percentageText: { fontSize: 12, fontWeight: 'bold', color: Colors.textPrimary, width: 30, textAlign: 'right' },
});

export default EnergyScreen;
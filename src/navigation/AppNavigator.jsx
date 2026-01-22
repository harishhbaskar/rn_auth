import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../styles/globalStyles';

import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import HomeScreen from '../screens/home/HomeScreen'; 
import EnergyScreen from '../screens/home/EnergyScreen';
import CarouselTestScreen from '../screens/CarouselTestScreen'

import DeviceControlScreen from '../screens/home/DeviceControlScreen';

const Placeholder = () => <View style={{flex:1, backgroundColor: Colors.background}} />;

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { 
            position: 'absolute', 
            bottom: 20, 
            left: 20, 
            right: 20, 
            borderRadius: 30, 
            height: 70, 
            elevation: 5, 
            backgroundColor: Colors.white,
            borderTopWidth: 0,
            paddingBottom: 0,
            paddingTop :15,
            alignItems: 'center',
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={HomeScreen} 
        options={{ tabBarIcon: ({color}) => <Icon name="home" size={24} color={color} /> }}
      />
      
      <Tab.Screen 
        name="Search" 
        component={Placeholder} 
        options={{ tabBarIcon: ({color}) => <Icon name="search" size={24} color={color} /> }}
      />

      <Tab.Screen 
        name="Add" 
        component={Placeholder} 
        options={{ 
            tabBarIcon: () => (
                <View style={{ 
                    backgroundColor: Colors.primary, 
                    width: 50, height: 50, borderRadius: 25, 
                    alignItems: 'center', justifyContent: 'center',
                    marginBottom: 0, elevation: 5 
                }}>
                    <Icon name="plus" size={24} color="#fff" />
                </View>
            )
        }}
      />

      <Tab.Screen 
        name="Schedule" 
        component={Placeholder} 
        options={{ tabBarIcon: ({color}) => <Icon name="clock" size={24} color={color} /> }}
      />

      <Tab.Screen 
        name="Energy" 
        component={EnergyScreen} 
        options={{ tabBarIcon: ({color}) => <Icon name="pie-chart" size={24} color={color} /> }}
      />
    </Tab.Navigator>
  );
}


export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      {/* Auth Flow */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      
      {/* Main App */}
      <Stack.Screen name="MainApp" component={HomeTabs} />

      <Stack.Screen name="DeviceControl" component={DeviceControlScreen} />
      <Stack.Screen name="CarouselTest" component={CarouselTestScreen} />
    </Stack.Navigator>
  );
}
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DataGrid from '../screens/DataGrid';
import GroupsScreen from '../screens/GroupsScreen';
import { Colors } from '../styles/globalStyles';

const Tab = createMaterialTopTabNavigator();

export default function DirectoryNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarIndicatorStyle: { backgroundColor: Colors.primary },
        tabBarStyle: { backgroundColor: Colors.white, marginTop: 40 },
      }}
    >
      <Tab.Screen name="All Employees" component={DataGrid} />
      <Tab.Screen name="Groups" component={GroupsScreen} />
    </Tab.Navigator>
  );
}
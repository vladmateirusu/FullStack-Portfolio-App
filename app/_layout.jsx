import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import resume from './(tabs)/resume';
import meScreen from './(tabs)/me';

const Tab = createBottomTabNavigator();

export default function Layout() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: 'black' },
        tabBarActiveTintColor: 'white',
        headerShown: false,
      }}
    >
      <Tab.Screen name="Resume" component={resume} />
      <Tab.Screen name="About Me" component={meScreen} />
    </Tab.Navigator>
  );
}

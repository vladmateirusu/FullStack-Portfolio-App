import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PostsProvider } from './contexts/PostsContext';
import resume from './(tabs)/resume';
import meScreen from './(tabs)/me';
import createPost from './(tabs)/add';

const Tab = createBottomTabNavigator();

export default function Layout() {
  return (
    <PostsProvider>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: 'black' },
          tabBarActiveTintColor: 'white',
          headerShown: false,
        }}
      >
        <Tab.Screen name="Resume" component={resume} />
        <Tab.Screen name="Create Post" component={createPost} />
        <Tab.Screen name="About Me" component={meScreen} />
      </Tab.Navigator>
    </PostsProvider>
  );
}
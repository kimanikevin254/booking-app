import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WishListScreen from '../../screens/app/WishListScreen'
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import HomeStackNavigation from './HomeStackNavigation';
import ProfileScreenTabNav from './ProfileScreenTabNav';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
            
        },
        tabBarLabelStyle: {
            fontWeight:  '600',
            fontSize: 13,
        },
        tabBarActiveTintColor: '#FE4EDA',
        tabBarShowLabel: false,
    }}>
        <Tab.Screen name="Home" component={HomeStackNavigation} options={{
        tabBarIcon:  ({ focused, color, size }) => (
            <FontAwesome name="search" size={size} color={color} />
        ),
        tabBarLabel: 'Explore'
      }} />
      
      <Tab.Screen name="WishList" component={WishListScreen} options={{
        tabBarIcon:  ({ focused, color, size }) => (
            <Feather name="heart" size={size} color={color} />
        ),
      }} />

        <Tab.Screen name="Profile" component={ProfileScreenTabNav} options={{
                tabBarIcon:  ({ focused, color, size }) => (
                    <Octicons name="person" size={size} color={color} />
                ),
      }} />
      </Tab.Navigator>
  )
}

export default BottomTabNavigation
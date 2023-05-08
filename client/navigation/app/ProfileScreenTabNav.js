import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyAccomodations from '../../screens/app/profile/MyAccomodations';
import MyBookings from '../../screens/app/profile/MyBookings';
import { Text } from 'react-native';
import MyAccomodationsStack from './MyAccomodationsStack';

const Tab = createMaterialTopTabNavigator();

const ProfileScreenTabNav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="MyBookings" component={MyBookings} options={{
        swipeEnabled: false,
        tabBarLabel: ({ focused, color }) => (
            focused ? <Text className='text-[#FE4EDA]'>My Bookings</Text> : <Text>My Bookings</Text>
        ),
      }} />
      
      <Tab.Screen name="MyAccodations" component={MyAccomodationsStack} options={{
        swipeEnabled: false,
        tabBarLabel: ({ focused, color }) => (
            focused ? <Text className='text-[#FE4EDA]'>My Accomodations</Text> : <Text>My Accomodations</Text>
        ),
      }} />
    </Tab.Navigator>
  )
}

export default ProfileScreenTabNav
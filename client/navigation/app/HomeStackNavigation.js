import React from 'react'
import ListingDetailsScreen from '../../screens/app/ListingDetailsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/app/HomeScreen';


const Stack = createNativeStackNavigator();

const HomeStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='ExploreHome' component={HomeScreen} />
      <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />
    </Stack.Navigator>
  )
}

export default HomeStackNavigation
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyAccomodations from '../../screens/app/profile/MyAccomodations';
import MyAccomodationDetails from '../../screens/app/profile/MyAccomodations/MyAccomodationDetails';

const Stack = createNativeStackNavigator();

const MyAccomodationsStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='MyAccomodationsList' component={MyAccomodations} />
        <Stack.Screen name="MyAccomodationDetails" component={MyAccomodationDetails} />
    </Stack.Navigator>
  )
}

export default MyAccomodationsStack
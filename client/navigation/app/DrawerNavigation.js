import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigation from './BottomTabNavigation';
import CustomDrawer from '../../components/CustomDrawer';


const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown: true}} drawerContent={props => <CustomDrawer {...props} />}>
        <Drawer.Screen name='HomeScreen' component={BottomTabNavigation} options={{
            drawerItemStyle: { display: 'none' },
            headerTitle: 'CozySpot'
        }} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigation
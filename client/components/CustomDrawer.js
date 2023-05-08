import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { AuthContext } from '../context/authContext'
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

const CustomDrawer = (props) => {
  const { userInfo, logOut } = useContext(AuthContext)
  // console.log('drawer', userInfo)
  return (
    <DrawerContentScrollView contentContainerStyle={{flex: 1}}>
    <View className='flex-1 relative justify-between'>
        <View>
        <View className='relative'>
          <View className='bg-[#FE4EDA] h-10 w-full' />
          <View className='bg-[#FE4EDA] h-24 w-full rounded-bl-full rounded-br-full' />
          <View className='w-full absolute items-center -bottom-12'>
            <Text className='text-white font-bold text-2xl mb-4'>{userInfo?.name}</Text>
            <View className='items-center justify-center bg-white w-24 h-24 rounded-full shadow-md border border-gray-300'>
              <FontAwesome name="user" size={52} color="#FE4EDA" />
            </View>
          </View>
        </View>

        <View className='mt-20 px-4'>
          <View className='flex-row space-x-8 gap-4 mb-4 items-center'>
            <FontAwesome name="user-o" size={24} color="#FE4EDA" />
            <Text className='text-gray-400 font-semibold'>{userInfo?.name}</Text>
          </View>
          <View className='flex-row space-x-8 gap-4 mb-4 items-center'>
          <Ionicons name="ios-mail-outline" size={24} color="#FE4EDA" />
          <Text className='text-gray-400 font-semibold'>{userInfo?.email}</Text>
          </View>
          <View className='flex-row space-x-8 gap-4 mb-4 items-center'>
          <AntDesign name="phone" size={24} color="#FE4EDA" />
          <Text className='text-gray-400 font-semibold'>Not provided</Text>
          </View>
        </View>
        </View>

        <TouchableOpacity onPress={logOut} className='flex-row w-32 rounded-lg space-x-4 mb-12 px-4 py-2 bg-[#FE4EDA] mx-auto items-center justify-center'>
          <Text className='text-white font-bold text-lg'>Log out</Text>
          <MaterialIcons name="logout" size={24} color="white" />
        </TouchableOpacity>
      <View style={{display: 'none'}}>
        <DrawerItemList {...props} />
      </View>
    </View>
  </DrawerContentScrollView>
  )
}

export default CustomDrawer
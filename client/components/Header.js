import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons';

const Header = () => {
  return (
    <SafeAreaView className='mt-4 mx-4 mb-2 flex-row items-center justify-between py-2 px-4 bg-white hadow-md shadow-gray-300 border border-gray-300 rounded-full'>
        
      <View className='flex-row space-x-6 items-center justify-center'>
        <Feather name="search" size={24} color="black" />
        
        <View className=''>
            <Text className='font-bold text-lg'>Anywhere</Text>
            <View className='flex-row space-x-2'>
                <Text className='text-gray-500'>Any week</Text>
                <Text className='text-gray-500'>•</Text>
                <Text className='text-gray-500'>Add guests</Text>
            </View>
        </View>
      </View>
      <View className='border rounded-full p-2 border-gray-300'>
        <SimpleLineIcons name="equalizer" size={24} color="black" />
      </View>
    </SafeAreaView>
  )
}

export default Header
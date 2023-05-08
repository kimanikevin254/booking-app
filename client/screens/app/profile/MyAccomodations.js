import { Text, SafeAreaView, RefreshControl, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Entypo } from '@expo/vector-icons';
import AddAccomodationModal from '../../../components/Profile/AddAccomodationModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'

import "intl";

import "intl/locale-data/jsonp/en";

const BASE_URL = 'http://192.168.1.6:3000'

const Accomodation = ({id, photo, title, price, address, description}) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('MyAccomodationDetails', {
        id
      })} 
      className='mb-8'>
    <Image
      source = {{
        uri: `${BASE_URL}/temp_uploads/${photo}`
      }}
      className='h-44 w-full rounded'
      resizeMode='contain'
     />
    <Text className='text-xl font-bold'>{title}</Text>
    <Text className='text-gray-500'>{address} • {
      new Intl.NumberFormat('en-US', {  maximumSignificantDigits: 3, style: 'currency', currency: 'KSH' }).format(price)
    }</Text>
    <Text className='text-xs'>{description}</Text>
  </TouchableOpacity>
  )
};

const MyAccomodations = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [myAccomodations, setMyAccomodations] = useState([])
  const [refreshing, setRefreshing] = React.useState(false);

  const getMyAccomodations = async () => {
    const userData = await AsyncStorage.getItem('userInfo')
    const userId = JSON.parse(userData)._id
    try {
      const res = await fetch(`${BASE_URL}/accomodations`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
          userId
        })
      })
      const json =  await res.json()
      setMyAccomodations(json.accomodations)
      console.log(json.accomodations)
    } catch (error) {
      console.log(error)
    }
}

const onRefresh = async () => {
  setRefreshing(true)
  await getMyAccomodations()
  setRefreshing(false)
}

  useEffect(() => {
    getMyAccomodations()

},[])
  
  return (
    <SafeAreaView className='flex-1 relative'>
      <AddAccomodationModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <ScrollView 
        className='px-4 mt-2'
        refreshControl = {
          <RefreshControl refreshing={refreshing} onRefresh={(onRefresh)} />
        }
      >
      
        {
          myAccomodations.length > 0 &&

          myAccomodations.map(accomodation => (
            <Accomodation key={accomodation._id} id={accomodation._id} photo={accomodation.photos[0]} title={accomodation.title} address={accomodation.address} description={accomodation.description} price={accomodation.price} />
          ))
        }
      </ScrollView>
      <TouchableOpacity onPress={() => setModalVisible(true)} className='absolute bottom-8 right-8 bg-[#FE4EDA] p-2 rounded-full'>
        <Entypo name="plus" size={32} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default MyAccomodations
import { View, Text, SafeAreaView, Button, ScrollView, RefreshControl, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Header from '../../components/Header'
import { Entypo } from '@expo/vector-icons';

const BASE_URL = 'http://192.168.1.6:3000'

const Accomodation = ({ id, photos, title, address, price }) => {
  const navigation = useNavigation()
  const [photoIndex, setPhotoIndex] = useState(0)
  return (
    <TouchableOpacity 
      activeOpacity={0.9}
      onPress={() => navigation.navigate('ListingDetails', {
        id
      })}
      className='mb-8'>
    <View className='relative'>
      <Image
        source = {{
          uri: `${BASE_URL}/temp_uploads/${photos[photoIndex]}`
        }}
        className='h-44 w-full rounded'
        resizeMode='contain'
      />
      {
        photos.length > 1 &&

        <>
          <TouchableOpacity 
          onPress={() => {
            photoIndex === 0 ?
            setPhotoIndex(photos.length - 1) :
            setPhotoIndex(photoIndex-1)
          }}
          className='absolute top-1/2 h-8 left-2 bg-white p-1 rounded-full'>
          <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => {
            photoIndex === photos.length - 1 ?
            setPhotoIndex(0) :
            setPhotoIndex(photoIndex+1)
          }}
          className='absolute top-1/2 h-8 right-2 bg-white p-1 rounded-full'>
          <Entypo name="chevron-right" size={24} color="black" />
        </TouchableOpacity>

        <View className='absolute bottom-2 w-full flex-row space-x-2 items-center justify-center'>
          {
            photos.map(photo => (
              <TouchableOpacity 
                key={photos.indexOf(photo)} 
                onPress={() => setPhotoIndex(photos.indexOf(photo))}
                className={photos.indexOf(photo) === photoIndex ? `w-2 h-2 rounded-full bg-[#FE4EDA]` : `w-2 h-2 rounded-full bg-white`}
              />
            ))
          }
        </View>
      </>
      }
    </View>
    <Text className='text-xl font-bold'>{address}</Text>
    <Text className='text-gray-500'>{title}</Text>
    <Text className='font-bold mt-1'>
      {
        new Intl.NumberFormat('en-US', {  maximumSignificantDigits: 3, style: 'currency', currency: 'KSH' }).format(price)
      } per night
    </Text>
  </TouchableOpacity>
  )
};


const HomeScreen = () => {
  const navigation = useNavigation()

  const [accomodations, setAccomodations] = useState(null)
  const [refreshing, setRefreshing] = React.useState(false);

  const getAllAccomodations = async () => {
    try {
      const res = await fetch(`${BASE_URL}/accomodations/getAllAccomodations`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
      })
      const json =  await res.json()
      setAccomodations((json.accomodations))
    } catch (error) {
      console.log(error)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await getAllAccomodations()
    setRefreshing(false)
  }

  useEffect(() => {
    getAllAccomodations()
  }, [])
  return (
    <SafeAreaView className='flex-1'>
      <ScrollView
        refreshControl = {
          <RefreshControl refreshing={refreshing} onRefresh={(onRefresh)} />
        }
        className='px-3 mt-1'
      >
        {
          accomodations &&

          accomodations.map(accomodation => (
            <Accomodation key={accomodation._id} id={accomodation._id} photos={accomodation.photos} title={accomodation.title} address={accomodation.address} price={accomodation.price} />
          ))
        }

      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen
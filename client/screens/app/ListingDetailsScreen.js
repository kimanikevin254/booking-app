import { View, Text, SafeAreaView, ScrollView, RefreshControl, Image, FlatList, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather, FontAwesome, Entypo, EvilIcons } from '@expo/vector-icons'

import DateTimePicker from '@react-native-community/datetimepicker';

const BASE_URL = 'http://192.168.1.6:3000'

const RenderImages = ({image}) => (
  <Image
      source = {{
          uri: `${BASE_URL}/temp_uploads/${image}`
      }}
      alt='img'
      className='h-44 w-80 mr-2 rounded'
      resizeMode='contain'
  />
)

const ListingDetailsScreen = ({route: { params: { id} }}) => {
  const [listingDetails, setListingDetails] = useState(null)
  const [refreshing, setRefreshing] = useState(false);
  const [showActions, setShowActions] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [mydate, setDate] = useState(new Date());
  const [displayInDatePicker, setDisplayInDatePicker] = useState(false)
  const [displayOutDatePicker, setDisplayOutDatePicker] = useState(false)
  const [checkInDate, setCheckInDate] = useState(null)
  const [checkOutDate, setCheckOutDate] = useState(null)
  const [noOfGuests, setNoOfGuests] = useState(1)


  const getListingDetails = async (listingId) => {
        try {
          const res = await fetch(`${BASE_URL}/accomodations/getAnAccomodation`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
              listingId
            })
          })
          const json =  await res.json()
          setListingDetails(json.accomodation)
          console.log(json)
        } catch (error) {
          console.log(error)
        }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await getListingDetails(id)
    setRefreshing(false)
  }

  const handleCheckInDate = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setDisplayInDatePicker(false);
    }
    setCheckInDate(selectedDate.toDateString())
  }

  const handleCheckOutDate = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setDisplayOutDatePicker(false);
    }
    setCheckOutDate(selectedDate.toDateString())
  }

  useEffect(() => {
    if(!id){
      return;
    }

    getListingDetails(id)

  }, [id])
  return (
    listingDetails &&
    <SafeAreaView className='relative h-full'>
      <ScrollView 
        refreshControl = {
          <RefreshControl refreshing={refreshing} onRefresh={(onRefresh)} />
        }
        className='mt-2 mx-2'
      >
        <FlatList
            horizontal
            data = {listingDetails.photos}
            renderItem = {({item}) => <RenderImages image={item} />}
            keyExtractor={item => listingDetails.photos.indexOf(item)}
        />

        <Text className='text-xl font-bold'>{listingDetails.title}</Text>
        <View className='flex-row space-x-2'>
          <View className='flex-row items-center'>
            <EvilIcons name="location" size={18} color="black" />
            <Text className='text-gray-500'>{listingDetails.address}</Text>
          </View>
          <Text>•</Text>
          <View>
            <Text className='text-gray-500'>
            {
              new Intl.NumberFormat('en-US', {  maximumSignificantDigits: 3, style: 'currency', currency: 'KSH' }).format(listingDetails.price)
            } per night
            </Text>
          </View>
        </View>
        <Text className='text-xs'>{listingDetails.description}</Text>

        <View className='mt-4'>
            <Text className='text-lg'>Extra Info</Text>
            <Text className='text-sm'>{listingDetails.extraInfo}</Text>
        </View>

        <View className='mt-4'>
            <Text className='text-lg'>Perks</Text>
            {
                listingDetails.perks.map(perk => (
                    <View key={listingDetails.perks.indexOf(perk)} className='flex-row items-center space-x-2'>
                        <FontAwesome name="check-square-o" size={16} color="black" />
                        <Text className='text-sm'>{perk}</Text>
                    </View>
                ))
            }
        </View>

        <View className='mt-4'>
            <Text className='text-lg'>Max Guests</Text>
            <Text className='text-sm'>{listingDetails.maxGuests}</Text>
        </View>

        <View className='mt-4 flex-row justify-between pb-4'>
            <View>
                <Text className='text-lg'>Check in time</Text>
                <Text>{listingDetails.checkIn}:00</Text>
            </View>
            <View>
                <Text className='text-lg'>Check out time</Text>
                <Text>{listingDetails.checkOut}:00</Text>
            </View>
        </View>
      </ScrollView>

      {
        showActions &&

        <View className='absolute right-20 bottom-16'>
          <TouchableOpacity 
            onPress={() => {
              setShowBookingModal(true)
              setShowActions(false)
            }} 
            className='p-2 bg-[#FE4DEA] mt-1 rounded'
          >
            <Text className='text-white font-bold'>Book Now</Text>
          </TouchableOpacity>
          <TouchableOpacity className='p-2 bg-[#FE4DEA] mt-1 rounded'>
            <Text className='text-white font-bold'>Add to Favorites</Text>
          </TouchableOpacity>
        </View>
      }

      <TouchableOpacity activeOpacity={0.9} onPress={() => setShowActions(!showActions)} className='absolute h-10 w-10 items-center justify-center bottom-8 right-8 bg-[#FE4EDA] p-2 rounded-full'>
          <Entypo name={showActions ? 'cross' : 'plus'} size={24} color="white" />
      </TouchableOpacity>

      {
        showBookingModal && (
          <View 
            className='absolute border-b border-gray-300 w-full bg-white shadow-2xl justify-between rounded-tl-3xl rounded-tr-3xl bottom-0 left-0 p-4'
          >
            <View>
            <Text className='text-lg font-bold text-center'>
              {
                new Intl.NumberFormat('en-US', {  maximumSignificantDigits: 3, style: 'currency', currency: 'KSH' }).format(listingDetails.price)
              } per night
            </Text>

            <View className=''>
              <View className='mt-2 flex-row justify-between'>
                <View>
                  <Text className='text-lg font-semibold'>Check in:</Text>
                  <TouchableOpacity onPress={() => setDisplayInDatePicker(true)}

                  >
                    <Feather name="calendar" size={24} color="#FE4EDA" />
                  </TouchableOpacity>
                  {
                    displayInDatePicker && (
                      <DateTimePicker
                        value={mydate}
                        mode='date'
                        onChange={handleCheckInDate}
                      />
                    )
                  }
                  <Text>{checkInDate ? checkInDate : 'Select a date'}</Text>
                </View>
                <View>
                  <Text className='text-lg font-semibold'>Check out:</Text>
                  <TouchableOpacity onPress={() => setDisplayOutDatePicker(true)}

                  >
                    <Feather name="calendar" size={24} color="#FE4EDA" />
                  </TouchableOpacity>
                  {
                    displayOutDatePicker && (
                      <DateTimePicker
                        value={mydate}
                        mode='date'
                        onChange={handleCheckOutDate}
                      />
                    )
                  }
                  <Text>{checkOutDate ? checkOutDate : 'Select a date'}</Text>
                </View>
              </View>
              <View className='mt-3'>
                <Text className='text-lg font-semibold'>Number of guests:</Text>
                <TextInput 
                    value={noOfGuests}
                    onChangeText={text => setNoOfGuests(text)}
                    placeholder='For example: 2'
                    className='border border-gray-300 rounded-full px-4 py-1 mt-2'
                />
              </View>
            </View>
            </View>

            <View className='mt-2 mb-4'>
              <Text className='text-lg font-semibold'>Price: 
                {
                  checkInDate && checkOutDate &&  (
                    <Text className='font-normal text-sm'>
                      {
                        new Intl.NumberFormat('en-US', {  maximumSignificantDigits: 3, style: 'currency', currency: 'KSH' }).format(((new Date(Date.parse(checkOutDate)).getTime() - new Date(Date.parse(checkInDate)).getTime()) / (24 * 60 * 60 * 1000) * listingDetails.price))
                      }
                    </Text>
                  )
                }
              </Text>
            </View>

            <View className='flex-row items-center justify-center space-x-12'>
              <TouchableOpacity 
                activeOpacity={0.9} 
                onPress={() => setShowBookingModal(false)}
                className='bg-gray-200 px-4 py-2 rounded'
              >
                <Text>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                activeOpacity={0.9}
                className='bg-[#FE4EDA] px-4 py-2 rounded'
              >
                <Text className='text-white'>Book Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }
    </SafeAreaView>
  )
}

export default ListingDetailsScreen
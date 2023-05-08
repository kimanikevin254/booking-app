import { View, Text, Image, SafeAreaView, ScrollView, FlatList, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AddAccomodationModal from '../../../../components/Profile/AddAccomodationModal';

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

const MyAccomodationDetails = ({ route }) => {
    const { id } = route.params
    const [myAccomodationDetails, setMyAccomodationDetails] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [modalData, setModalData] = useState(null)
    const [refreshing, setRefreshing] = useState(false);

    


    const getMyAccomodation = async () => {
        const userData = await AsyncStorage.getItem('userInfo')
        const userId = JSON.parse(userData)._id
        try {
          const res = await fetch(`${BASE_URL}/accomodations/getAccomodation`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
              userId,
              accomodationId: id
            })
          })
          const json =  await res.json()
          setMyAccomodationDetails(json.accomodation)
        //   console.log(json)
        } catch (error) {
          console.log(error)
        }
    }

    useEffect(() => {
        getMyAccomodation()
    },[])

    const onRefresh = async () => {
        setRefreshing(true)
        await getMyAccomodation()
        setRefreshing(false)
      }

    const handlePassModalDataAndOpenModal = () => {
        setModalData(myAccomodationDetails)
        setModalVisible(true)
    }

  return (
    <SafeAreaView className='px-2 pt-2 h-full'>
     {
        myAccomodationDetails &&
        <>
            <AddAccomodationModal modalVisible={modalVisible} setModalVisible={setModalVisible} modalData={modalData} />

            <ScrollView 
                className='pb-4'
                refreshControl = {
                    <RefreshControl refreshing={refreshing} onRefresh={(onRefresh)} />
                  }
            >
                <FlatList
                    horizontal
                    data = {myAccomodationDetails.photos}
                    renderItem = {({item}) => <RenderImages image={item} />}
                    keyExtractor={item => myAccomodationDetails.photos.indexOf(item)}
                />

                <Text className='text-xl font-bold'>{myAccomodationDetails.title}</Text>
                <Text className='text-gray-500'>{myAccomodationDetails.address}</Text>
                <Text className='text-xs'>{myAccomodationDetails.description}</Text>

                <View className='mt-4'>
                    <Text className='text-lg'>Extra Info</Text>
                    <Text className='text-sm'>{myAccomodationDetails.extraInfo}</Text>
                </View>

                <View className='mt-4'>
                    <Text className='text-lg'>Perks</Text>
                    {
                        myAccomodationDetails.perks.map(perk => (
                            <View key={myAccomodationDetails.perks.indexOf(perk)} className='flex-row items-center space-x-2'>
                                <FontAwesome name="check-square-o" size={16} color="black" />
                                <Text className='text-sm'>{perk}</Text>
                            </View>
                        ))
                    }
                </View>

                <View className='mt-4'>
                    <Text className='text-lg'>Max Guests</Text>
                    <Text className='text-sm'>{myAccomodationDetails.maxGuests}</Text>
                </View>

                <View className='mt-4 flex-row justify-between pb-4'>
                    <View>
                        <Text className='text-lg'>Check in time</Text>
                        <Text>{myAccomodationDetails.checkIn}:00</Text>
                    </View>
                    <View>
                        <Text className='text-lg'>Check out time</Text>
                        <Text>{myAccomodationDetails.checkOut}:00</Text>
                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity  onPress={() => handlePassModalDataAndOpenModal()} className='absolute bottom-8 right-8 bg-[#FE4EDA] p-3 rounded-full'>
                <Feather name="edit-3" size={24} color="white" />
            </TouchableOpacity>
        </>
     }
     
    </SafeAreaView>
  )
}

export default MyAccomodationDetails
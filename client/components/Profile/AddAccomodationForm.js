import { View, Text, TouchableOpacity, FlatList, ScrollView, Image, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TextInput } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const BASE_URL = 'http://192.168.1.6:3000'

const RenderImages = ({image, uploadedImages, setUploadedImages}) => {
    const deleteAccomodationImage = (imageName) => {
        setUploadedImages(uploadedImages.filter(image => image !== imageName))
    }

    const makePrimaryImage = (imageName) => {
        let newPhotosOrder = uploadedImages.filter(image => image !== imageName)
        newPhotosOrder.unshift(imageName)
        setUploadedImages(newPhotosOrder)
    }
    return (
        <>
        <Image
            source = {{
                uri: `${BASE_URL}/temp_uploads/${image}`
            }}
            alt='img'
            className='mr-2 rounded'
            style={{
                width: 150,
                height: 100,
            }}
            resizeMode='contain'
        />
        <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => deleteAccomodationImage(image)}
            className='absolute right-3 bottom-1 bg-white h-8 w-8 items-center justify-center rounded-full p-1'
        >
            <FontAwesome name="trash" size={24} color="red" />
        </TouchableOpacity>

        <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => makePrimaryImage(image)}
            className='absolute right-3 top-1 bg-white h-8 w-8 items-center justify-center rounded-full p-1'
        >
            {
                uploadedImages.indexOf(image) === 0 ?

                <AntDesign name="star" size={24} color="#FE4EDA" /> :

                <AntDesign name="staro" size={24} color="black" />
            }
        </TouchableOpacity>
    </>
    )
}

const AddAccomodationForm = ({ modalVisible, setModalVisible, modalData }) => {
    /*
    modalData is the listing details. Prescence of modalData means that the modal has been opened from the accomodation details page and the intention is to update an existing listing.
    You check for the prescence of modalData and prefill the fields as required and display the necessary text and buttons. 
    */

    const [title, setTitle] = useState(modalData?.title || '')
    const [price, setPrice] = useState(modalData?.price || '')
    const [address, setAdress] = useState(modalData?.address || '')
    const [description, setDescription] = useState(modalData?.description || '')
    const [extraInfo, setExtraInfo] = useState(modalData?.extraInfo || '')
    const [maxGuests, setMaxGuests] = useState(modalData?.maxGuests.toString() || '')
    const [checkInTime, setCheckInTime] = useState(modalData?.checkIn.toString() || '')
    const [checkOutTime, setCheckOutTime] = useState(modalData?.checkOut.toString() || '')

    // images
    const [uploadedImages, setUploadedImages] = useState(modalData?.photos || []) // an array of images for the listing
    const [imageLink, setImageLink] = useState('') // link added by the user to "add photo using link"
    const [image, setImage] = useState(null); // image uploaded from device

    // perks -> toggle perks checked state
    const [wifi, setWifi] = useState(modalData?.perks.includes('WiFi') || false)
    const [parking, setParking] = useState(modalData?.perks.includes('Free parking spot') || false)
    const [tv, setTv] = useState(modalData?.perks.includes('TV') || false)
    const [entrance, setEntrance] = useState(modalData?.perks.includes('Private entrance') || false)
    const [pets, setPets] = useState(modalData?.perks.includes('Pets allowed') || false)

    // userData
    const [userId, setUserId] = useState('')

    const addPhotoByLink = () => {
        return fetch(`${BASE_URL}/assets/addPhotoByLink`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                link: imageLink
              })
        })
          .then(response => response.json())
          .then(json => {
                setUploadedImages(prevValue => [...prevValue, json.photoName])
                console.log(json.photoName)
                setImageLink('')
          })
          .catch(error => {
            alert(error.message)
          });
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
            setImage(result);
        }
    }

    const uploadPhoto = () => {
        const filename = image.assets[0].uri.split('/').pop()

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        const formData = new FormData()
        formData.append('photo', {
            uri: image.assets[0].uri,
            type,
            name: filename
        })

        return fetch(`${BASE_URL}/assets/addPhotoFromDevice`, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
              },
        })
          .then(response => response.json())
          .then(json => {
            setUploadedImages(prevValue => [...prevValue, json.photoName])
            setImage(null)
          })
          .catch(error => {
            alert(error.message)
          });
    }

    // handle perks
    let [perks, setPerks] = useState(modalData?.perks || [])
    const handlePerks = (perk) => {
        if(perks.includes(perk)){
            let i = perks.indexOf(perk)
            perks.splice(i,1)
        }else{
            setPerks(prevValue => [...prevValue, perk])
        }
    }

    useEffect(() => {
        const user = async () => {
            const userData = await AsyncStorage.getItem('userInfo')
            const userId = JSON.parse(userData)._id
            setUserId(userId)
        }

        user()

    },[])

    const advertiseAccomodation = () => {
        return fetch(`${BASE_URL}/accomodations/advertise`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId,
                title,
                price,
                address,
                description,
                uploadedImages,
                description,
                perks,
                extraInfo,
                checkInTime,
                checkOutTime,
                maxGuests
              })
        })
          .then(response => response.json())
          .then(json => {
            alert(json.message)
          })
          .catch(error => {
            alert(error.message)
          });
    }

    const updateAccomodation = () => {
        return fetch(`${BASE_URL}/accomodations/update`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                accomodationId: modalData._id,
                userId,
                title,
                price,
                address,
                description,
                uploadedImages,
                description,
                perks,
                extraInfo,
                checkInTime,
                checkOutTime,
                maxGuests
              })
        })
          .then(response => response.json())
          .then(json => {
            setModalVisible(false)
          })
          .catch(error => {
            alert(error.message)
          });
    }

   
  return (
    <SafeAreaView>
        <View className='mt-2 pb-2 flex-row justify-around'>
                {
                    modalData ?

                    <TouchableOpacity 
                        onPress={updateAccomodation}
                        className='px-4 py-2 bg-[#FE4EDA] rounded'
                    >
                        <Text className='text-white font-semibold'>Update</Text>
                    </TouchableOpacity> :

                    <TouchableOpacity 
                        onPress={advertiseAccomodation}
                        className='px-4 py-2 bg-[#FE4EDA] rounded'
                    >
                        <Text className='text-white font-semibold'>Advertise</Text>
                    </TouchableOpacity>
                }

                <TouchableOpacity 
                    onPress={() => setModalVisible(!modalVisible)}
                    className='px-4 py-2 bg-gray-500 rounded'
                >
                    <Text className='text-white font-semibold'>Cancel</Text>
                </TouchableOpacity>
            </View>
        <ScrollView className='space-y-4 mb-20'
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View>
                            <Text className='text-lg'>Title</Text>
                            <Text className='text-xs text-gray-500'>The title for your place. Should be short and catchy</Text>
                            <TextInput 
                                value={title}
                                onChangeText={text => setTitle(text)}
                                placeholder='For example: My lovely apartment'
                                className='border border-gray-300 rounded-full px-4 py-1 mt-2'
                            />
                        </View>

                        <View>
                            <Text className='text-lg'>Address</Text>
                            <Text className='text-xs text-gray-500'>Where is this place located?</Text>
                            <TextInput 
                                value={address}
                                onChangeText={text => setAdress(text)}
                                placeholder='For example: Nairobi, Kenya'
                                className='border border-gray-300 rounded-full px-4 py-1 mt-2'
                            />
                        </View>

                        <View>
                            <Text className='text-lg'>Price</Text>
                            <Text className='text-xs text-gray-500'>Price per night (in Kshs.)</Text>
                            <TextInput 
                                value={price}
                                onChangeText={text => setPrice(text)}
                                placeholder='For example: 10000'
                                className='border border-gray-300 rounded-full px-4 py-1 mt-2'
                            />
                        </View>

                        <View className=''>
                            <Text className='text-lg'>Photos</Text>
                            <Text className='text-xs text-gray-500'>Provide as many as you can :)</Text>
                            <View className='flex-row items-center justify-between'>
                                <TextInput 
                                    value={imageLink}
                                    onChangeText={text => setImageLink(text)}
                                    placeholder='Add using a link'
                                    className='border border-gray-300 rounded-full px-4 py-1 mt-2 w-4/5'
                                />
                                <TouchableOpacity onPress={addPhotoByLink} className='p-2 rounded bg-[#FE4EDA]'>
                                    <Entypo name="plus" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                            <View className='flex-row items-end justify-between'>
                                <TouchableOpacity onPress={pickImage} className='flex-row items-center justify-center space-x-2 border border-gray-400 p-2 mt-3 w-4/5 rounded'>
                                    <Ionicons name="cloud-upload-outline" size={24} color="black" />
                                    <Text>Upload from device</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={uploadPhoto} className='p-2 rounded bg-[#FE4EDA]'>
                                    <FontAwesome name="send" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {
                            uploadedImages.length > 0 &&

                            <FlatList
                                horizontal
                                data = {uploadedImages}
                                renderItem = {({item}) => <RenderImages image={item} uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} />}
                                keyExtractor={item => uploadedImages.indexOf(item)}
                             />
                        }
                        <View>
                            <Text className='text-lg'>Description</Text>
                            <Text className='text-xs text-gray-500'>Describe your place</Text>
                            <TextInput 
                                multiline={true}
                                numberOfLines={6}
                                value={description}
                                onChangeText={text => setDescription(text)}
                                placeholder='For example: A Luxury apartment suitable for 2 adults and 2 kids. There is one bedroom fitted with a queen size bed and en-suite bathroom with a shower only.'
                                className='border border-gray-300 rounded px-4 py-1 mt-2'
                            />
                        </View>
                        <View>
                            <Text className='text-lg'>Perks</Text>
                            <Text className='text-xs text-gray-500'>Select all that apply</Text>
                            <View className='flex-row space-x-2 mt-1'>
                                <Checkbox
                                    value={wifi}
                                    onValueChange={() => {
                                        handlePerks('WiFi')
                                        setWifi(!wifi)
                                    }}
                                    color={wifi ? '#FE4EDA' : undefined}
                                />
                                <AntDesign name="wifi" size={18} color="black" />
                                <Text>WiFi</Text>
                            </View>
                            <View className='flex-row space-x-2 mt-1'>
                                <Checkbox
                                    value={parking}
                                    onValueChange={() => {
                                        handlePerks('Free parking spot')
                                        setParking(!parking)
                                    }}
                                    color={parking ? '#FE4EDA' : undefined}
                                />
                                <MaterialCommunityIcons name="parking" size={18} color="black" />
                                <Text>Free parking spot</Text>
                            </View>
                            <View className='flex-row space-x-2 mt-1'>
                                <Checkbox
                                    value={tv}
                                    onValueChange={() => {
                                        handlePerks('TV')
                                        setTv(!tv)
                                    }}
                                    color={tv ? '#FE4EDA' : undefined}
                                />
                                <Entypo name="tv" size={18} color="black" />
                                <Text>TV</Text>
                            </View>
                            <View className='flex-row space-x-2 mt-1'>
                                <Checkbox
                                    value={entrance}
                                    onValueChange={() => {
                                        handlePerks('Private entrance')
                                        setEntrance(!entrance)
                                    }}
                                    color={entrance ? '#FE4EDA' : undefined}
                                />
                                <MaterialCommunityIcons name="door-sliding-open" size={18} color="black" />
                                <Text>Private entrance</Text>
                            </View>
                            <View className='flex-row space-x-2 mt-1'>
                                <Checkbox
                                    value={pets}
                                    onValueChange={() => {
                                        handlePerks('Pets allowed')
                                        setPets(!pets)
                                    }}
                                    color={pets ? '#FE4EDA' : undefined}
                                />
                                <MaterialIcons name="pets" size={18} color="black" />
                                <Text>Pets allowed</Text>
                            </View>
                        </View>
                        <View>
                            <Text className='text-lg'>Extra info</Text>
                            <Text className='text-xs text-gray-500'>House and apartment rules, etc</Text>
                            <TextInput 
                                multiline={true}
                                numberOfLines={6}
                                value={extraInfo}
                                onChangeText={text => setExtraInfo(text)}
                                className='border border-gray-300 rounded px-4 py-1 mt-2'
                            />
                        </View>
                        <View>
                            <Text className='text-lg'>Check in and out times</Text>
                            <Text className='text-xs text-gray-500'>Remember to have time in between for cleaning the room (use 24H format)</Text>
                            <View className='flex-row space-x-4 justify-between'>
                                <View className='mt-2'>
                                    <Text className='text-md'>Check in</Text>
                                    <TextInput 
                                        value={checkInTime}
                                        onChangeText={text => setCheckInTime(text)}
                                        className='border border-gray-300 rounded px-4 py-1 mt-2 w-32'
                                        placeholder='1400'
                                    />
                                </View>
                                <View className='mt-2'>
                                    <Text className='text-md'>Check out</Text>
                                    <TextInput 
                                        value={checkOutTime}
                                        onChangeText={text => setCheckOutTime(text)}
                                        className='border border-gray-300 rounded px-4 py-1 mt-2 w-32'
                                        placeholder='1300'
                                    />
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text className='text-lg'>Max guests</Text>
                            <Text className='text-xs text-gray-500'>Max number of guests you can allow</Text>
                            <TextInput 
                                value={maxGuests}
                                onChangeText={text => setMaxGuests(text)}
                                placeholder='3'
                                className='border border-gray-300 rounded px-4 py-1 mt-2'
                            />
                        </View>
                        <View className="h-20" />
                    </ScrollView>
    </SafeAreaView>
  )
}

export default AddAccomodationForm
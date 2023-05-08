import { View, Text, SafeAreaView, Button } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/authContext'

const ProfileScreen = ({ navigation }) => {
  const { logOut } = useContext(AuthContext)
  return (
    <SafeAreaView className='flex-1 items-center justify-center'>
      <Text>ProfileListScreen</Text>
      <Button title='Log out' onPress={logOut} />
    </SafeAreaView>
  )
}

export default ProfileScreen
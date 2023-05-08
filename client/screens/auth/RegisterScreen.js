import { View, Text, TextInput, KeyboardAvoidingView, Button, TouchableOpacity } from 'react-native'
import React, {useContext, useState} from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../context/authContext'

const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    const { registerUser } = useContext(AuthContext)
  return (
    <View className='pt-20 items-center justify-start flex-1 bg-white'>
        <View className='mt-12'>
        <Text className='text-3xl font-bold text-center'>Create Account</Text>
        <KeyboardAvoidingView behavior='padding' className='space-y-4 mt-4'>
        <TextInput className='border border-gray-300 py-2 px-4 rounded-full w-60 ' placeholder='your name' value={name} onChangeText={text => setName(text)} />
            <TextInput className='border border-gray-300 py-2 px-4 rounded-full w-60 ' placeholder='your@email.com' value={email} onChangeText={text => setEmail(text)} />
            <TextInput className='border border-gray-300 py-2 px-4 rounded-full w-60 ' placeholder='password' secureTextEntry value={password} onChangeText={text => setPassword(text)} />
            <TouchableOpacity className='items-center py-2 rounded-full bg-[#FE4EDA]' onPress={() => registerUser(name, email, password)}>
                <Text className='text-white font-bold text-lg'>Register</Text>
            </TouchableOpacity>

            <View className='items-center'>
                <Text className='text-md'>Already have an account?</Text>
                <TouchableOpacity className='flex-row items-center justify-center' onPress={() => navigation.navigate('Login')}>
                    <Text className='text-lg font-bold'>Login</Text>
                    <MaterialIcons name="navigate-next" size={24} color="#FE4EDA" className='border' />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        </View>
    </View>
  )
}

export default RegisterScreen
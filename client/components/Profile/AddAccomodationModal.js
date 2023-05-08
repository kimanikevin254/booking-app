import { View, Text, SafeAreaView, Modal, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import AddAccomodationForm from './AddAccomodationForm';

const AddAccomodationModal = ({ modalVisible, setModalVisible, modalData }) => {
  /*
    modalData is the listing details. Prescence of modalData means that the modal has been opened from the accomodation details page and the intention is to update an existing listing.
    You check for the prescence of modalData and prefill the fields as required and display the necessary text and buttons. 
    */
    
    return (
    <SafeAreaView>
      <Modal
        animationType='slide'
        transparent={false}
        visible={modalVisible}
      >
        <View className='flex-1 pt-4'>
            <Text className='text-xl font-semibold text-center'>{modalData ? 'Update' : 'List'} Your Accomodation {modalData ? 'Details' : ''}</Text>
            
            <View className='mt-4 px-4'>
                <KeyboardAvoidingView behavior=''>
                    <AddAccomodationForm modalVisible={modalVisible} setModalVisible={setModalVisible} modalData={modalData} />
                </KeyboardAvoidingView>
            </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default AddAccomodationModal
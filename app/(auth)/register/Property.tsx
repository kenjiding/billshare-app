import React from 'react';
import { Text, TouchableOpacity, View, ScrollView, TextInput } from 'react-native';
import PhotoTaking from '@/components/PhotoTaking';
import AntDesign from '@expo/vector-icons/AntDesign';
import InputSelect from '@/components/Select';

interface IProperty {
  address: string;
  state: string;
  code: string;
  city: string;
  propertyPhotos: string[];
}

type FaceUploadProps = {
  onSetStep?: (step: number) => void;
  onSetFormData?: (data: IProperty) => void;
  onConfirm?: () => void;
  data: IProperty;
};

const list = [
  {
    label: 'SA',
    value: 'SA',
  },
  {
    label: 'NSW',
    value: 'NSW',
  },
  {
    label: 'QLD',
    value: 'QLD',
  },
  {
    label: 'TAS',
    value: 'TAS',
  },
  {
    label: 'VIC',
    value: 'VIC',
  },
  {
    label: 'WA',
    value: 'WA',
  },
];

const FaceUpload: React.FC<FaceUploadProps> = ({
  onSetFormData,
  onConfirm,
  onSetStep,
  data,
}) => {

  const photoChange = (images: string[]) => {
    onSetFormData && onSetFormData({...data, propertyPhotos: images });
  }

  const beforeOnConfirm = () => {
    if (data.propertyPhotos.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    onConfirm && onConfirm();
  }

  return (
    <ScrollView className='p-8'>
      <AntDesign name='arrowleft' size={24} color='black' onPress={() => onSetStep && onSetStep(1)} />
      <Text className='text-center text-3xl font-bold mt-4 mb-4 text-gray-700'>Property Information</Text>
      <Text className='text-center mb-10 text-gray-400'>Please fill in the property information</Text>
      <View>
        <View className='flex-row items-center mb-4'>
          <Text className='w-20 font-sans text-left text-xl mb-2 text-gray-600'>Address</Text>
          <TextInput
            value={data.address}
            onChangeText={(text) => onSetFormData && onSetFormData({...data, address: text })}
            className='text-gray-500 border-b-1 border-gray-300 flex-1 mr-3'>
          </TextInput>
        </View>
        <View className='flex-row items-center'>
          <View className='flex-row items-center mb-4 flex-1 mr-4'>
            <Text className='w-14 font-sans text-left text-xl mb-2 text-gray-600'>State</Text>
            <InputSelect
              value={data.state}
              data={list}
              onSelectChange={(text) => onSetFormData && onSetFormData({...data, state: text })}></InputSelect>

            {/* <TextInput
              value={data.state}
              onChangeText={(text) => onSetFormData && onSetFormData({ ...data, state: text })}
              className='text-gray-500 flex-1 border-b-1 border-gray-300 mr-3'>
            </TextInput> */}
          </View>
          <View className='flex-row items-center mb-4 flex-1'>
            <Text className='w-16 font-sans text-left text-xl mb-2 text-gray-600'>Code</Text>
            <TextInput
              value={data.code}
              onChangeText={(text) => onSetFormData && onSetFormData({ ...data, code: text })}
              className='text-gray-500 flex-1 border-b-1 border-gray-300 mr-3'>
            </TextInput>
          </View>
        </View>
        <View className='flex-row items-center flex-1'>
          <Text className='w-16 font-sans text-left text-xl mb-2 text-gray-600'>City</Text>
          <TextInput
            value={data.city}
            onChangeText={(text) => onSetFormData && onSetFormData({ ...data, city: text })}
            className='text-gray-500 flex-1 border-b-1 border-gray-300 mr-3'>
          </TextInput>
        </View>
      </View>
      <View className='mt-10'>
        <Text className='text-left mb-6 text-gray-500 text-2xl font-serif'>Property Photos</Text>
        <PhotoTaking images={data.propertyPhotos} onPhotoChange={photoChange} maxImages={10}></PhotoTaking>
        <Text className='text-center mt-8 mb-5 text-gray-400'>Up to 10 images can be uploaded</Text>
      </View>
      <TouchableOpacity className='mt-10 bg-blue-500 p-3 rounded-lg mb-40' onPress={beforeOnConfirm}>
        <Text className='text-white text-center text-lg'>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default FaceUpload;
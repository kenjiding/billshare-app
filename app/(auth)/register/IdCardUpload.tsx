import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import PhotoTaking from '@/components/PhotoTaking';
import AntDesign from '@expo/vector-icons/AntDesign';

type IdCardProps = {
  onSetStep?: (step: number) => void;
  onSetImages?: (images: string[]) => void;
  images: string[];
};

const IdCard: React.FC<IdCardProps> = ({
  onSetImages,
  onSetStep,
  images = []
}) => {
  const photoChange = (images: string[]) => {
    onSetImages && onSetImages(images);
  }
  return (
    <ScrollView className='p-8'>
      <AntDesign name='arrowleft' size={24} color='black' onPress={() => onSetStep && onSetStep(1)} />
      <Text className='text-center text-3xl font-bold mb-4 text-gray-700'>Upload Id Card</Text>
      <Text className='text-center mb-5 text-gray-400'>Please upload a full photo ID</Text>
      <View className='justify-center items-center mb-4'>
        <Image
          resizeMode='contain'
          source={require('@/assets/images/upload.png')}
          style={{ width: 270, height: 270 }} />
      </View>
      <PhotoTaking images={images} onPhotoChange={photoChange}></PhotoTaking>
      <TouchableOpacity className='mt-10 mb-40 bg-blue-500 p-3 rounded-lg' onPress={() => onSetStep && onSetStep(3)}>
        <Text className='text-white text-center text-lg'>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default IdCard;
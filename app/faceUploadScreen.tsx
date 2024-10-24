import React from 'react';
import { Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import PhotoTaking from '@/components/PhotoTaking';
import AntDesign from '@expo/vector-icons/AntDesign';

type FaceUploadProps = {
  onSetStep?: (step: number) => void;
  onSetImages?: (images: string[]) => void;
  onConfirm?: () => void;
};

const FaceUpload: React.FC<FaceUploadProps> = ({
  onConfirm,
}) => {
  const [images, setImages] = React.useState<string[]>([]);
  const photoChange = (data: string[]) => {
    setImages(data);
  }

  const beforeOnConfirm = () => {
  }

  return (
    <ScrollView className='p-8'>
      <Text className='text-center text-3xl font-bold mb-4 text-gray-700'>Face Recognition</Text>
      <Text className='text-center mb-10 text-gray-400'>Please upload face photos</Text>
      <View className='justify-center items-center mb-4'>
        <Image
          resizeMode='contain'
          source={require('@/assets/images/faceSnapt.png')}
          style={{width: 250, height: 250}} />
      </View>
      <PhotoTaking
        images={images} 
        onPhotoChange={photoChange}
        maxImages={1}></PhotoTaking>
      <Text className='text-center mt-8 mb-5 text-gray-400'>Up to one images can be uploaded</Text>
      {/* <TouchableOpacity className='mt-10 bg-blue-500 p-3 rounded-lg mb-40' onPress={beforeOnConfirm}>
        <Text className='text-white text-center text-lg'>Upload</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

export default FaceUpload;
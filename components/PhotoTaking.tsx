import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { upload } from '@/service/upload';
import { useUserStore, useGlobalStore } from '@/store';

type PhotoTakingProps = {
  onPhotoChange?: (images: string[]) => void;
  onFileChange?: (file: ImagePicker.ImagePickerAsset) => void;
  maxImages?: number;
  images: string[];
};

const PhotoTaking: React.FC<PhotoTakingProps> = ({
  onPhotoChange,
  onFileChange,
  maxImages = 1,
  images
}) => {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState<boolean | null>(null);
  const { updateLoading } = useGlobalStore();
  const { user } = useUserStore();

  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  const takePhoto = async () => {
    if (!hasCameraPermission || !hasGalleryPermission) {
      // Alert.alert("Permissions required", "Camera and gallery permissions are required to take a photo.");
      return;
    }
    if (images.length >= maxImages) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const photo = result.assets[0];
      if(onFileChange) {
        onFileChange(photo);
      } else if(onPhotoChange) {
        const url = await uploadPhoto(photo.uri, photo.mimeType);
        const TempImages = url ? [...images, url] : [...images];
        onPhotoChange && onPhotoChange(TempImages);
      }
    }
  };

  const uploadPhoto = async (uri: string, mimeType?: string) => {
    const formData = new FormData();
    formData.append('file', {
      uri,
      name: 'photo.jpg',
      type: mimeType,
    } as any);
  
    try {
      updateLoading({
        loading: true,
        text: 'image uploading...'
      });
      const res = await upload(user.userId, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      return res.url;
    } catch (error) {
      console.error('Error uploading photo:', error);
    } finally {
      updateLoading({
        loading: false,
      });
    }
  };
  
  const deletePhoto = (index: number) => {
    const temp = [...images];
    temp.splice(index, 1);
    onPhotoChange && onPhotoChange(temp);
  }

  return (
    <View className={`${images.length ? maxImages === 1 ? 'justify-center' : 'justify-start' : 'justify-center'}
      flex-row items-center flex-wrap`}>
      {
        images.length ?
          images.map((item, i) =>
            <View
              key={i}
              style={{
                position: 'relative',
                width: '46%',
                aspectRatio: 1,
                marginRight: i % 2 === 0 ? 10 : 0,
                marginBottom: i % 2 === 0 ? 10 : 0,
              }}>
              <Image
                resizeMode='contain'
                style={{
                  width: '100%',
                  aspectRatio: 1,
                  borderRadius: 10,
                }}
                source={{ uri: item }} />
              <TouchableOpacity className='absolute -top-2.5 -right-2.5'>
                <Fontisto
                  name='close'
                  color='#cb2542'
                  size={24}
                  onPress={() => deletePhoto(i)} />
              </TouchableOpacity>
            </View>) : null
      }
      {
        images.length < maxImages && <TouchableOpacity
          style={{ width: '46%' }}
          className='justify-center items-center mb-4'
          onPress={takePhoto}>
          <MaterialIcons name='add-a-photo' size={80} color='#7d7d7d' />
        </TouchableOpacity>
      }
    </View>
  );
};

export default PhotoTaking;
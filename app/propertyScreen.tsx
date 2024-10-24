import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Property from '@components/Property';
import GlobalModal from '@components/GlobalModal';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { addProperty, getProperty, removeProperty } from '@/service/property';
import { useUserStore } from '@/store';
import { IProperty } from '@/types/property';
import { defaultProperty } from '@/store/modules/global';

const RightSideModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState<IProperty[]>([]);
  const { user } = useUserStore();

  // propertyId: 66e000ca4bc8ef3d615db675
  // piSerialNumber: fake-serial-1234
  const [propertyData, setPropertyData] = useState<IProperty>({
    ...defaultProperty,
  });

  useEffect(() => {
    getPropertyHandler();
  }, []);

  const getPropertyHandler = async () => {
    const data: any = await getProperty();
    setProperties(data.properties);
    // data.properties.forEach((item: any, i: number) => {
    //   (i > 1) && removeProperty(item.id);
    // })
  }

  const closeModal = () => {
    setIsVisible(false);
  };
  const openModal = () => {
    setIsVisible(true);
  }


  const propertyHandler = async (api: Promise<any>) => {
    setLoading(true);
    await api;
    await getPropertyHandler();
    setLoading(false);
    closeModal();
  }

  const onConfirm = async () => {
    propertyHandler(addProperty({
      ...propertyData,
      managerId: user.userId,
    }));
  }

  const onRemove = (id: string) => {
    propertyHandler(removeProperty(id));
  }

  const propertyClcik = (item: IProperty) => {
    setPropertyData({
      ...propertyData,
      ...item,
    });
    openModal();
  }

  const addPropertyHandler = () => {
    setPropertyData({
      ...defaultProperty,
    });
    openModal();
  }

  return (
    <ScrollView>
      {
        properties.map((property) => (
          <TouchableOpacity
            key={property.propertyId} onPress={() => propertyClcik(property)}>
            <View
              className='mb-0.5 flex-row items-center flex-grow bg-blue-100 p-5 rounded-lg'>
              <View className="w-20 h-20 rounded-lg overflow-hidden">
                <Image
                  className="w-full h-full"
                  source={require('@/assets/images/house.png')}
                  resizeMode="cover"
                />
              </View>
              <View className='ml-4'>
                <Text
                  numberOfLines={1} 
                  ellipsizeMode='tail'
                  className='font-bold text-xl w-72'>{property.address}</Text>
                <Text
                  numberOfLines={1} 
                  ellipsizeMode='tail'
                  className='w-64 mt-1 mb-1 font-sans text-lg text-gray-600'>PropertyId: {property.propertyId}</Text>
                <Text className='font-serif text-lg text-gray-700'>piSerialNo: {property.piSerialNumber}</Text>
              </View>
              <View className='flex-row items-center justify-center ml-auto'>
                <AntDesign name="right" size={20} color="#000" />
              </View>
            </View>
          </TouchableOpacity>
        ))
      }
      <View className='flex-row justify-center items-center mt-8 mb-20'>
        <TouchableOpacity
          onPress={addPropertyHandler}
          className='w-44 rounded-xl flex-row p-4 bg-blue-500 items-center justify-center'>
          <Text className='text-white font-bold mr-3'>Add Property</Text>
          <Ionicons name="add-circle-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <GlobalModal visible={isVisible} onClose={closeModal}>
        <View>
          <Property
            data={propertyData}
            onConfirm={onConfirm}
            onRemove={onRemove}
            loading={loading}
            onSetFormData={(data) => setPropertyData(data)} />
        </View>
      </GlobalModal>
    </ScrollView>
  );
};


export default RightSideModal;

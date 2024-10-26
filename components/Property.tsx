import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, ScrollView, TextInput } from 'react-native';
import PhotoTaking from '@/components/PhotoTaking';
import InputSelect from '@/components/Select';
import { getFacilities, IFacilities } from '@/service/facilities'; // 假设你有 startDevice 和 stopDevice API
import DeviceItem from './DeviceItem';
import { categoryMap } from '@/constants/icon';
import Button from '@/components/Button';
import { IProperty } from '@/types/property';

type FaceUploadProps = {
  onSetStep?: (step: number) => void;
  onSetFormData?: (data: IProperty) => void;
  onConfirm?: () => void;
  onRemove?: (id: string) => void;
  data: IProperty;
  buttonText?: string
  loading?: boolean
};

const list = [
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
    label: 'SA',
    value: 'SA',
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

const formData = (i: number) => {
  const map = {
    0: 'electricity',
    1: 'water',
    2: 'gas',
  };
  // @ts-ignore
  return categoryMap[map[i]];
};

const FaceUpload: React.FC<FaceUploadProps> = ({
  onSetFormData,
  onConfirm,
  onRemove,
  onSetStep,
  data = {
    managerId: '',
    address: '',
    state: '',
    postcode: '',
    piSerialNumber: '',
    city: '',
    photos: [],
    propertyId: '',
    trackableFacilities: [],
    defaultFacilities: [],
  },
  ...rest
}) => {
  const [devices, setDevices] = useState<IFacilities[]>([]);
  const [selectedDevices, setSelectedDevices] = useState<Set<string>>(new Set());

  useEffect(() => {
    getFacilitiesHandler();
  }, []);

  const getFacilitiesHandler = async () => {
    const facilitiesData: any = await getFacilities();
    setDevices(facilitiesData.facilities);
    setSelectedDevices(new Set(data.trackableFacilities));
    console.log('data.propertyId: ', data.propertyId);
  };

  const photoChange = (images: string[]) => {
    onSetFormData && onSetFormData({...data, photos: images });
  }

  const beforeOnConfirm = () => {
    // if (data.photos.length === 0) {
    //   alert('Please upload at least one image');
    //   return;
    // }

    onConfirm && onConfirm();
  }

  const beforeRemove = () => {
    data.propertyId && onRemove && onRemove(data.propertyId);
  }

  const facilityClick = (item: IFacilities) => {
    if (selectedDevices.has(item.id)) {
      selectedDevices.delete(item.id);
      const ids = [...selectedDevices];
      setSelectedDevices(new Set(ids));
      onSetFormData && onSetFormData({...data, trackableFacilities: ids });
      return;
    }
    const ids = new Set([...selectedDevices, item.id])
    setSelectedDevices(ids);
    onSetFormData && onSetFormData({...data, trackableFacilities: [...ids] });
  }

  return (
    <ScrollView>
      <View className='mt-6'>
        <Text className='text-left mb-6 text-gray-900 text-2xl font-serif'>Basic Information</Text>
        <Text className='font-sans text-left text-xl mb-5 text-gray-600'>ID: {data.propertyId}</Text>
        <View className='flex-row items-center mb-6'>
          <Text className='w-20 font-sans text-left text-xl mb-2 text-gray-600'>Address</Text>
          <TextInput
            value={data.address}
            onChangeText={(text) => onSetFormData && onSetFormData({...data, address: text })}
            className='text-gray-500 border-b-1 border-gray-300 flex-1 mr-3'>
          </TextInput>
        </View>
        <View className='flex-row items-center mb-4'>
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
              value={data.postcode}
              onChangeText={(text) => onSetFormData && onSetFormData({ ...data, postcode: text })}
              className='text-gray-500 flex-1 border-b-1 border-gray-300 mr-3'>
            </TextInput>
          </View>
        </View>
        <View className='flex-row items-center flex-1 mb-8'>
          <Text className='w-16 font-sans text-left text-xl mb-2 text-gray-600'>City</Text>
          <TextInput
            value={data.city}
            onChangeText={(text) => onSetFormData && onSetFormData({ ...data, city: text })}
            className='text-gray-500 flex-1 border-b-1 border-gray-300 mr-3'>
          </TextInput>
        </View>
        <View className='flex-row items-center flex-1'>
          <Text className='font-sans text-left text-xl mb-2 mr-4 text-gray-600'>PiSerialNumber</Text>
          <TextInput
            value={data.piSerialNumber}
            onChangeText={(text) => onSetFormData && onSetFormData({ ...data, piSerialNumber: text })}
            className='text-gray-500 flex-1 border-b-1 border-gray-300 mr-3'>
          </TextInput>
        </View>
      </View>

      <View className='mb-10 mt-10'>
        <Text className='text-left mb-6 text-gray-900 text-2xl font-serif'>Select Facilities</Text>
        {
          devices.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => facilityClick(item)}>
                <DeviceItem
                  title={item.name}
                  subtitle={item.id} >
                  <DeviceItem.LeftSlot>
                    { formData(index) }
                  </DeviceItem.LeftSlot>
                  <DeviceItem.RightSlot>
                    <View
                      className={`
                      w-7 h-7 border-1 rounded-full border-gray-400 
                      ${selectedDevices.has(item.id) ? 'bg-blue-300' : 'bg-white'}`}></View>
                  </DeviceItem.RightSlot>
                </DeviceItem>
              </TouchableOpacity>
            );
          })
        }
      </View>
      <View className=''>
        <Text className='text-left mb-6 text-gray-900 text-2xl font-serif'>Property Photos</Text>
        <PhotoTaking images={data.photos} onPhotoChange={photoChange} maxImages={10}></PhotoTaking>
        <Text className='text-center mt-8 mb-5 text-gray-400'>Up to 10 images can be uploaded</Text>
      </View>
      {
        data.managerId ? (
          <View className='flex-row items-center justify-center'>
            <Button
              className='mt-10 bg-blue-500 p-3 rounded-lg mb-40 mr-6 w-36'
              onSubmit={beforeOnConfirm}
              text='edit' {...rest} />
            <Button
              className='mt-10 bg-red-500 p-3 rounded-lg mb-40 w-36'
              onSubmit={beforeRemove}
              text='remove' {...rest} />
          </View>
        ) : 
        <Button
          className='mt-10 bg-blue-500 p-3 rounded-lg mb-40'
          onSubmit={beforeOnConfirm}
          text='save' {...rest} />
      }
      {/* <TouchableOpacity className='mt-10 bg-blue-500 p-3 rounded-lg mb-40' onPress={beforeOnConfirm}>
        <Text className='text-white text-center text-lg'>{buttonText}</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

export default FaceUpload;
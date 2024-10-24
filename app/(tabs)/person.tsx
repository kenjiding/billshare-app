import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import CommonWraper from '@/components/CommonWraper';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUserStore, useGlobalStore } from '@/store';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { defaultProperty } from '@/store/modules/global';

type exploreProps = {
  // props
};

const Menus = [
  {
    icon: <MaterialCommunityIcons name="file-table-outline" size={24} color="#6c6c6c" />,
    name: 'Bill management',
    path: '/billManagementScreen',
    role: ['tenant'],
  },
  {
    icon: <MaterialIcons name="house" size={26} color="#6c6c6c" />,
    name: 'Property management',
    path: '/propertyScreen',
    role: ['manager'],
  },
  {
    icon: <MaterialCommunityIcons name="devices" size={24} color="#6c6c6c" />,
    name: 'Devices management',
    path: '/deveiceScreen',
    role: ['manager', 'tenant'],
  },
  {
    icon: <MaterialIcons name="photo-camera" size={24} color="#6c6c6c" />,
    name: 'Face upload',
    path: '/faceUploadScreen',
    role: ['tenant'],
  },
  {
    icon: <AntDesign name="menufold" size={24} color="#6c6c6c" />,
    name: 'History',
    path: '/resourceUsageScreen',
    role: ['manager', 'tenant'],
  },
  {
    icon: <Ionicons name="notifications-circle-outline" size={24} color="#6c6c6c" />,
    name: 'Applications',
    path: '/apllications',
    role: ['manager'],
  },
  {
    icon: <AntDesign name="barschart" size={24} color="#6c6c6c" />,
    name: 'Resource Usage',
    path: '/resourceUsageScreen',
    role: ['manager', 'tenant'],
  },
];

const Person: React.FC<exploreProps> = (props) => {
  const router = useRouter();
  const { updateUserInfo, user } = useUserStore();
  const { uploadPropertyData } = useGlobalStore();

  const menuClick = (data: any) => {
    router.push(data.path);
  }

  const logout = () => {
    updateUserInfo({
      role: '',
      username: '',
      userId: '',
      phone: '',
      email: '',
      token: '',
    });
    uploadPropertyData({...defaultProperty});
    router.replace('/login');
  }

  return (
    <CommonWraper>
      <View className='p-4'>
        <View className='flex-row items-center flex-grow bg-blue-100 p-5 rounded-lg'>
          <View className="w-24 h-24 rounded-full overflow-hidden">
            <Image
              className="w-full h-full"
              source={require('@/assets/images/default-avator.png')}
              resizeMode="cover"
            />
          </View>
          <View className='ml-4'>
            <Text className='font-bold text-xl'>{user.username}</Text>
            <Text className='mt-2 mb-2 font-sans text-gray-600'>Email: {user.email}</Text>
            <Text 
              numberOfLines={1} 
              ellipsizeMode='tail'
              className='w-56 font-serif text-lg text-gray-700'>Id: {user.userId}</Text>
          </View>
        </View>

        <View className='mt-8 mb-4'>
          {
            Menus.filter(item => item.role.includes(user.role)).map(item => {
              return <TouchableOpacity onPress={() => menuClick(item)} key={item.name}>
                <View className='flex-row items-center p-4 bg-white mt-0.5'>
                  <View className='mr-3'>
                    { item.icon }
                  </View>
                  <Text className='text-left'>
                    { item.name }
                  </Text>
                  <View className='ml-auto'>
                    <AntDesign name="right" size={20} color="#919191" />
                  </View>
              </View>
              </TouchableOpacity>
            })
          }

          <View className='flex-row items-center p-4 bg-white mt-2'>
            <View className='mr-3'>
            <AntDesign name="setting" size={24} color="#6c6c6c" />
            </View>
            <Text className='text-left'>
              Setting
            </Text>
            <View className='ml-auto'>
              <AntDesign name="right" size={20} color="#919191" />
            </View>
          </View>
          <TouchableOpacity onPress={logout}>
            <View className='flex-row items-center p-4 bg-white mt-2'>
              <View className='mr-3'>
                <MaterialIcons name="logout" size={24} color="#6c6c6c" />
              </View>
              
                <Text className='text-left'>
                  Sign out
                </Text>
              <View className='ml-auto'>
                <AntDesign name="right" size={20} color="#919191" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </CommonWraper>
  );
};

export default Person;
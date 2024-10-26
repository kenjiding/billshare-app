import { useState } from 'react';
import {
  KeyboardAvoidingView, ScrollView, Text,
  TextInput, View, TouchableOpacity,
  ImageBackground, Platform
} from 'react-native';
import { Link } from 'expo-router';
import { login } from '@/service/auth';
// import request from '@utils/request';
import { catchError } from '@utils/helper';
import { useUserStore, useGlobalStore } from '@/store';
import { useRouter } from 'expo-router';

export default function Login() {
  const { updateUserInfo, user } = useUserStore();
  const { updateLoading, uploadPropertyData, propertyData } = useGlobalStore();

  const router = useRouter();

  const [loginForm, setLoginForm] = useState({
    phone: '',
    password: '',
    error: '',
  });

  const loginPost = async () => {
    updateLoading({
      loading: true,
      text: 'Logining...'
    });
    const [err, data] = await catchError<any>(login(loginForm));
    console.log('err, data: ', err, data);
    updateLoading({
      loading: false,
    });
    if (err) return;
    uploadPropertyData({
      ...propertyData,
      propertyId: data.propertyId
    });
    console.log('{', {
      ...propertyData,
      propertyId: data.propertyId
    });
    updateUserInfo(data);
    router.replace('/');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='bg-blue-200 h-full'>
      <ScrollView>
        <ImageBackground
          source={require('@assets/images/login.png')}
          resizeMode='cover'
        >
          <View style={{ height: 500 }} className='h-80 w-full'></View>
        </ImageBackground>
        <View
          className='-mt-52 rounded-tl-[40] rounded-tr-[40]
          p-10 bg-white rounded-lg shadow-lg h-full'>
          <Text className='text-center font-weight-bold text-2xl mb-10'>Login</Text>
          <View className='mb-7'>
            {/* <Text className='text-xl mb-3'>phone</Text> */}
            <TextInput
              className='border-b rounded-lg p-3 border-gray-200 text-xl'
              placeholder='phone'
              value={loginForm.phone}
              onChangeText={(text) => setLoginForm({ ...loginForm, phone: text })}>
            </TextInput>
          </View>
          <View>
            {/* <Text className='text-xl mb-3'>Password</Text> */}
            <TextInput
              secureTextEntry={true}
              className='border-b rounded-lg p-3 border-gray-200 text-xl'
              placeholder='Password'
              value={loginForm.password}
              onChangeText={(text) => setLoginForm({ ...loginForm, password: text })}>
            </TextInput>
          </View>
          {loginForm.error ? <View className='mt-5 ml-2'>
            <Text className='text-red-500 mb-3 text-xl'>{loginForm.error}</Text>
          </View> : null
          }
          <TouchableOpacity className='mt-10 bg-blue-500 p-3 rounded-lg' onPress={loginPost}>
            <Text className='text-white text-center text-lg'>Login</Text>
          </TouchableOpacity>

          <View className='flex justify-center items-center mt-10'>
            <Text>
              you don&apos;t have an account? Click
              <Text className='text-blue-500'>
                <Link href='/register'> Register</Link>
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
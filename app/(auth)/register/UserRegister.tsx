
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import React from'react';
// import request from '@utils/request';
// import { catchError } from '@utils/helper';

interface IForm {
  phone: string;
  password: string;
  confirmPassword: string;
  email: string;
  username: string;
  role: string;
  propertyId: string
}

interface RegisterProps {
  onSetStep: (step: number) => void;
  onConfirm: () => Promise<string | void>
  onSetFormData: (formData: IForm) => void;
  data: IForm
}

function validatePhoneNumber(phoneNumber: string) {
  const regex = /^(?:\+?61|0)[2-478](?:[ -]?\d){8}$/;
  return regex.test(phoneNumber);
}

const Register: React.FC<RegisterProps> = ({
  onSetStep,
  onConfirm,
  onSetFormData,
  data,
}) => {
  const [error, setError] = React.useState('');
  const nextHandler = async () => {
    if(data.username.length < 3) {
      setError('Username too short');
      return;
    }

    if(!validatePhoneNumber(data.phone)) {
      setError('Please enter a valid phone number');
      return;
    }

    if(data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if(data.role === 'tenant') {
      onSetStep(2);
    } else {
      if(onConfirm) {
        const msg = await onConfirm();
        console.log('msg: ', msg);
        msg && setError(msg);
      }
    }
  }

  const beforeChangeRole = (role: string) => {
    setError('');
    onSetFormData({ ...data, role });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='bg-blue-200 h-full'>
      <ScrollView>
        <View className='justify-center items-center mb-4'>
          <Image
            style={{ height: 200 }}
            source={require('@/assets/images/login2.png')}
            className='w-full' />
        </View>
        <View
          className='
          rounded-tl-[40] rounded-tr-[40]
          p-10 bg-white rounded-lg shadow-lg h-full w-full'>
          <View className='mt-7'>
            <TextInput
              className='border-b rounded-lg p-3 border-gray-200 text-xl'
              placeholder='username'
              value={data.username}
              onChangeText={(text) => onSetFormData({ ...data, username: text })}>
            </TextInput>
          </View>
          <View className='mt-7'>
            {/* <Text className='text-xl mb-3'>phone</Text> */}
            <TextInput
              className='border-b rounded-lg p-3 border-gray-200 text-xl'
              placeholder='phone'
              value={data.phone}
              onChangeText={(text) => onSetFormData({ ...data, phone: text })}>
            </TextInput>
          </View>
          {/* <View>
            <TextInput
              className='border-b rounded-lg p-3 border-gray-200 text-xl'
              placeholder='Email'
              value={data.email}
              onChangeText={(text) => onSetFormData({ ...data, email: text })}>
            </TextInput>
          </View> */}
          <View className='mb-7 mt-7'>
            {/* <Text className='text-xl mb-3'>Password</Text> */}
            <TextInput
              className='border-b rounded-lg p-3 border-gray-200 text-xl'
              placeholder='Password'
              value={data.password}
              onChangeText={(text) => onSetFormData({ ...data, password: text })}>
            </TextInput>
          </View>
          <View>
            {/* <Text className='text-xl mb-3'>Password</Text> */}
            <TextInput
              className='border-b rounded-lg p-3 border-gray-200 text-xl'
              placeholder='Confirm Password'
              value={data.confirmPassword}
              onChangeText={(text) => onSetFormData({ ...data, confirmPassword: text })}>
            </TextInput>
          </View>
          <View className='p-4 pl-3'>
            <View className='flex-row justify-start items-center mt-5'>
              <TouchableOpacity onPress={() => beforeChangeRole('manager')}>
                <View className='flex-row items-center mr-7'>
                  <Text className='text-gray-400'>Manager</Text>
                  <View
                    className={`rounded-md h-6 w-6 ml-3 ${data.role ==='manager' ? 'bg-blue-500' : 'bg-gray-200'}`}>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => beforeChangeRole('tenant')}>
                <View className='flex-row items-center'>
                  <Text className='text-gray-400'>Tenant</Text>
                  <View
                    className={`rounded-md h-6 w-6 ml-3 ${data.role === 'manager' ? 'bg-gray-200' : 'bg-blue-500'}`}>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            { 
              data.role === 'tenant' &&
              <View className='flex-row justify-start items-center mt-8'>
                <View className='flex-row items-center flex-1'>
                  <Text className='font-sans text-left text-xl mb-2 text-gray-600 mr-4'>PropertyId</Text>
                  <TextInput
                    value={data.propertyId}
                    onChangeText={(text) => onSetFormData({ ...data, propertyId: text })}
                    className='text-gray-500 flex-1 border-b border-gray-200 pb-1 pl-1'>
                  </TextInput>
                </View>
              </View>
            }
          </View>
          {
            error ? <View className='mt-1 ml-2'>
              <Text className='text-red-500 mb-3 text-xl'>{error}</Text>
            </View> : null
          }
          <TouchableOpacity className='mt-10 bg-blue-500 p-3 rounded-lg' onPress={nextHandler}>
            <Text className='text-white text-center text-lg'>Next</Text>
          </TouchableOpacity>
          <View className='flex-row justify-between items-center mt-14 pl-20 pr-20'>
            <Image className='w-10 h-10' source={require('@/assets/images/google.png')}></Image>
            <View className='h-8 bg-gray-200 w-0.5'></View>
            <Image source={require('@/assets/images/facebook.png')} className='w-10 h-10'></Image>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Register;
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text } from 'react-native';

type TanantBillDetailProps = {
  data: {
    water: number;
    electricity: number;
    gas: number;
  },
  linearGradientStyles?: {
    colors: string[],
    start: { x: number, y: number },
    end: { x: number, y: number }
  },
};

const ManagerBillDetail: React.FC<TanantBillDetailProps> = ({
  data,
  linearGradientStyles = {
    colors: ['#FFFAD4', '#FFE560'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 }
  }
}) => {
  return (
    <View className='relative'>
      <LinearGradient
        {...linearGradientStyles}
        style={{
          paddingTop: 18,
          paddingBottom: 15,
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 15,
        }}>
          <View className='flex-row justify-center items-center'>
            <View className='flex-1 flex-col justify-between items-center mb-2'>
              <Text className='text-center text-purple-400 font-bold text-xl mb-2'>Elec</Text>
              <View
                style={{backgroundColor: 'rgba(217, 217, 217, 0.35)'}}
                className='flex-row justify-center items-center
                h-20 w-20 rounded-full border-1 border-white'>
                <Text className='text-center text-blue-400 font-bold text-xl'>{data.electricity}</Text>
                <Text className='text-center text-gray-400 text-sm mt-3'>/kw</Text>
              </View>
            </View>
            <View className='flex-1 flex-col justify-between items-center mb-2'>
              <Text className='text-center text-purple-400 font-bold text-xl mb-2'>Water</Text>
              <View
                style={{backgroundColor: 'rgba(217, 217, 217, 0.35)'}}
                className='flex-row justify-center items-center
                h-20 w-20 rounded-full border-1 border-white'>
                <Text className='text-center text-blue-400 font-bold text-xl'>{data.water}</Text>
                <Text className='text-center text-gray-400 text-sm mt-3'>/kl</Text>
              </View>
            </View>
            <View className='flex-1 flex-col justify-between items-center mb-2'>
              <Text className='text-center text-purple-400 font-bold text-xl mb-2'>Gas</Text>
              <View
                style={{backgroundColor: 'rgba(217, 217, 217, 0.35)'}}
                className='flex-row justify-center items-center
                h-20 w-20 rounded-full border-1 border-white'>
                <Text className='text-center text-blue-400 font-bold text-xl'>{data.gas}</Text>
                <Text className='text-center text-gray-400 text-sm mt-3'>/mj</Text>
              </View>
            </View>
          </View>
      </LinearGradient>
    </View>
  );
};

export default ManagerBillDetail;
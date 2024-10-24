import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';

export interface IBillDetail {
  type: string,
  amount: number,
  date: string
}

type TanantBillDetailProps = {
  data: IBillDetail[]
};

const TanantBillDetail: React.FC<TanantBillDetailProps> = ({
  data = []
}) => {
  const router = useRouter();
  const toBillPaymentPage = () => {
    router.push('/billManagementScreen');
  }

  const amount = data.reduce((t: number, item: IBillDetail) => t + item.amount, 0);

  return (
    <View className='relative'>
      <LinearGradient
        colors={['#d5f0ff', '#78cbf8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 20,
          paddingRight: 20,
          borderRadius: 15,
        }}>
        <View className='flex-row items-center mb-3'>
          <Text className='font-bold text-2xl pr-3 font-sans'>Your bill</Text>
          <AntDesign name="linechart" size={20} color='#cfcfff' />
        </View>
        { data.length <= 0 ?
          <View className='h-20'>
            <Text className='font-sans text-lg mt-7 ml-1 text-gray-500'>No bills found</Text>
          </View> :
          <View className='min-h-20'>
          {
            data.map((item, i) =>
              <View key={i} className='ml-1'>
                <View className='flex-row'>
                  <Text className='min-w-20 pb-2 text-gray-800'>{item.type}</Text>
                  <Text className='font-thin pb-2 ml-3 mr-3'>${item.amount}</Text>
                  {/* <Text className='font-mono'>{item.date}</Text> */}
                </View>
              </View>)
          }
        </View>
        }
        {/* <View className='mt-6'>
          <View>
            <Text className='font-extralight text-xl pb-2'>Date</Text>
          </View>
          <View>
            <Text className='font-mono'>{data.date}</Text>
          </View>
        </View> */}
        <View
          className='absolute right-7 top-10 bg-30-opacity-white border-gray-100 border-1
          rounded-full w-24 h-24 flex items-center justify-center shadow-md'>
          <Text
            onPress={toBillPaymentPage}
            className='text-2xl font-sans text-gray-600 font-bold'>${amount}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default TanantBillDetail;
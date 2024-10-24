import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import CommonWraper from '@/components/CommonWraper';
import ManagerBillDetail from '@components/ManagerBillDetail';
import DateCalendar from '@components/DateCalendar';
import { IBill, addBill, triggerBill } from '@/service/bill';
import { useGlobalStore } from '@/store';
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import { catchError } from '@/utils/helper';

type billProps = {
  // props
};

const getAfterAnyDays = (days: number = 14) => {
  const today = dayjs();
  const twoWeeksLater = today.add(days, 'day');
  return twoWeeksLater.format('YYYY-MM-DD');
}

const fakeData = [
  {
    name: 'Monica',
    id: 'sgdggf0',
    ele: '12',
    water: '7',
    gas: '4'
  },
  {
    name: 'Rolita',
    id: 'dcsvd788',
    ele: '5',
    water: '2',
    gas: '12'
  },
];

const Bill: React.FC<billProps> = (props) => {
  const router = useRouter();
  const billDate = useRef({
    start: '',
    end: '',
  });
  const { propertyData, updateLoading } = useGlobalStore();
  const [tanantIdSelected, setTanantIdSelected] = useState<string[]>([]);
  const [form, setForm] = useState<IBill>({
    propertyId: '',
    utilityType: '',
    totalCost: '',
    billingPeriod: {
      startDate: '',
      endDate: '',
    },
    dueDate: '',
    isPaid: false,
  });

  const [sourceForm, setSourceForm] = useState({
    electricity: '',
    water: '',
    gas: '',
  });

  const postBill = async () => {
    if (!billDate.current.start || !billDate.current.end) {
      Alert.alert('Please select date');
      return;
    }
    const reqList: Promise<any>[] = [];
    Object.keys(sourceForm).forEach(key => {
      const value = sourceForm[key as keyof typeof sourceForm];
      if(value) {
        const data: any = {
          propertyId: propertyData ? propertyData.propertyId : '',
          utilityType: key,
          totalCost: value,
          billingPeriod: {
            startDate: billDate.current.start,
            endDate: billDate.current.end,
          },
          dueDate: getAfterAnyDays(14),
        };
        reqList.push(addBill(data));
      }
    });
    updateLoading({
      loading: true,
      text: 'posting bill...'
    });
    await Promise.all(reqList);
    triggerBillData();
    updateLoading({
      loading: false,
    });
    router.push('/person');
  }

  const triggerBillData = async () => {
    if(!propertyData.propertyId) return;
    ['water', 'gas', 'electricity'].forEach(item => {
      triggerBill(propertyData.propertyId, item);
    });
    // Promise.all(reqs).catch((err) => console.error(err));
  }

  const onDateChange = (date: any) => {
    billDate.current.start = date.start.dateString;
    billDate.current.end = date.end.dateString;
  }

  const itemClick = (item: any) => {
    const set = new Set<string>(tanantIdSelected);
    if(set.has(item.id)) {
      set.delete(item.id);
    } else {
      set.add(item.id);
    }
    setTanantIdSelected(Array.from(set));
  }

  return (
    <CommonWraper>
      <ScrollView className='pt-5 pb-5 pl-8 pr-8'>
        <ManagerBillDetail data={{
          water: 100,
          electricity: 200,
          gas: 300,
        }} />
        <View>
          <DateCalendar onDateChange={onDateChange} />
          <View className='mt-5 flex-row items-center'>
            <Text className='pl-1 w-24 text-lg font-serif mr-2 text-gray-600'>elec bill</Text>
            <TextInput
              className='p-3 border-1 bg-white border-gray-300 rounded-md flex-1 text-right text-gray-600'
              onChangeText={val => setSourceForm({ ...sourceForm, electricity: val})}
              value={sourceForm.electricity}
              placeholder="please input electric bill" />
            <Text className='text-lg font-light ml-2 text-gray-600'>$</Text>
          </View>
          <View className='mt-5 flex-row items-center'>
            <Text className='pl-1 w-24 text-lg font-serif mr-2 text-gray-600'>water bill</Text>
            <TextInput
              className='p-3 border-1 bg-white border-gray-300 rounded-md flex-1 text-right text-gray-600'
              onChangeText={val => setSourceForm({ ...sourceForm, water: val})}
              value={sourceForm.water}
              placeholder="please input water bill" />
            <Text className='text-lg font-light ml-2 text-gray-600'>$</Text>
          </View>
          <View className='mt-5 flex-row items-center'>
            <Text className='pl-1 w-24 text-lg font-serif mr-2 text-gray-600'>gas bill</Text>
            <TextInput
              className='p-3 border-1 bg-white border-gray-300 rounded-md flex-1 text-right text-gray-600'
              onChangeText={val => setSourceForm({ ...sourceForm, gas: val})}
              value={sourceForm.gas}
              placeholder="please input gas bill" />
            <Text className='text-lg font-light ml-2 text-gray-600'>$</Text>
          </View>
        </View>
        <View className='mt-5 mb-14'>
          {
            fakeData.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => itemClick(item)}>
              <View className='border-b-1 border-gray-200 pb-8 pt-6'>
                <View className='flex-row items-center justify-between'>
                  <View className='flex-row items-center'>
                    <View className="w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        className="w-full h-full"
                        source={require('@/assets/images/default-avator.png')}
                        resizeMode="cover"
                      />
                    </View>
                    <Text className='ml-2 font-bold'>{item.name}</Text>
                  </View>
                  <View className={`w-7 h-7 rounded-full border-1
                  border-gray-300 ${tanantIdSelected.includes(item.id) ? 'bg-blue-400' : 'bg-gray-100'}`}></View>
                </View>
                <View className='flex-row items-center justify-center'>
                  <View className='flex-1'>
                    <Text className='text-center text-md text-gray-600'>elec</Text>
                    <Text className='text-xl font-sans text-center'>{item.ele}kw</Text>
                  </View>
                  <View className='flex-1 border-l-1 border-gray-200 border-r-1'>
                    <Text className='text-center text-md text-gray-600'>water</Text>
                    <Text className='text-xl font-sans text-center'>{item.water}kj</Text>
                  </View>
                  <View className='flex-1'>
                    <Text className='text-center text-md text-gray-600'>elec</Text>
                    <Text className='text-xl font-sans text-center'>{item.gas}mj</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>))
          }
        </View>
        <TouchableOpacity onPress={postBill}>
          <View className='flex-row items-center justify-center border-1
          border-gray-300 rounded-md py-4 w-full bg-blue-400 mb-24'>
            <Text className='text-white text-lg font-bold'>post bill</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </CommonWraper>
  );
};

export default Bill;
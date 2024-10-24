import React, { useCallback, useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { TouchableOpacity, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import dayjs from 'dayjs';
import DateCalendar from './DateCalendar';
import { categoryMap } from '@/constants/icon';
import BillUtility, { CategoryEnum } from './BillUtility';

export interface resourceUsage {
  id?: number;
  category: CategoryEnum;
  amount: number;
  date: string;
  username?: string;
  duration?: number;
  unit?: string;
}

type ResourceUsageProps = {
  needDate?: boolean,
  resourceUsageList: resourceUsage[],
  enableRoute?: boolean
};

const ResourceUsage: React.FC<ResourceUsageProps> = ({
  resourceUsageList = [],
  needDate,
  enableRoute = true
}) => {
  const [category, setCategory] = useState('');
  const [usages, setUsages] = useState<resourceUsage[]>([]);
  const [date, setDate] = useState(() => {
    const currentDate = dayjs().format('MM/DD/YYYY');
    return {
      start: currentDate,
      end: currentDate,
    }
  });
  const router = useRouter();

  useEffect(() => {
    setUsages([...resourceUsageList]);
  }, [resourceUsageList]);

  useEffect(() => {
    // console.log('getResouceUsageByDate: ', {
    //   ...date,
    //   category,
    // });
  }, [category, date]);

  const handlePress = () => {
    enableRoute && router.push('/resourceUsageScreen');
  };

  const categoryHandlePress = (category: CategoryEnum) => {
    setCategory(category);
    const temp = resourceUsageList.filter(item => item.category === category);
    setUsages(temp);
  }

  const onDateChange = (dateData: any) => {
    setDate({...dateData});
  }

  const touchableComponent = (item: resourceUsage) => {
    const ItemCom = <View className='flex-row items-center justify-between border-b border-gray-100'>
      <View className={`flex-row items-center justify-between pt-3 pb-4 ${enableRoute ? 'mt-3' : 'mt-1'}`}>
        { item.category && categoryMap[item.category] }
        <View className=''>
          { item.username && <Text className='ml-4 mb-3 font-bold'>{item.username}</Text> }
          <Text className='ml-4 text-gray-500'>{dayjs(item.date).format('MM/DD/YYYY')}</Text>
        </View>
      </View>
      <View className='flex-row items-center justify-center mt-1'>
        <Text className='font-bold text-xl' style={{color: '#6270EE'}}>{item.amount}</Text>
        <Text className='text-gray-500 ml-2 mr-3'>{item.unit || 'A'}</Text>
        { enableRoute && <AntDesign name="right" size={20} color="#dddcdc" /> }
      </View>
    </View>;

    return enableRoute ? <TouchableOpacity onPress={handlePress}>{ItemCom}</TouchableOpacity> : ItemCom;
  }

  return (
    <View>
      <BillUtility onUtilityChange={categoryHandlePress}></BillUtility>
      {
        needDate && <DateCalendar onDateChange={onDateChange} />
      }
      <View className='bg-white rounded-xl mt-5 pl-7 pr-7 pb-4'>
        {
          usages.map((item, i) => {
            return (
              <View key={i}>
                { touchableComponent(item) }
              </View>
            )
          })
        }
      </View>
    </View>
  );
};

export default ResourceUsage;
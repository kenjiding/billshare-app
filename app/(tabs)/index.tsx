import { Image, ScrollView, Text, View, TouchableOpacity, RefreshControl } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useUserStore, useGlobalStore } from '@/store';
import TanantBillDetail, { IBillDetail } from '@/components/TanantBillDetail';
import ManagerBillDetail from '@/components/ManagerBillDetail';
import ResourceUsageList from '@/components/ResourceUsage';
import CommonWraper from '@/components/CommonWraper';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import GlobalOpacityModal from '@/components/GlobalOpacityModal';
import Button from '@/components/Button';
import useProperty from '@/hooks/useProperty';
import { IProperty } from '@/types/property';
import { Entypo } from '@expo/vector-icons';
import { useSocket } from '../../hooks/useSocket'; // 确保路径正确
import { resourceUsage } from '@/components/ResourceUsage';
import { catchJsonExep } from '@utils/helper';
import { CategoryEnum } from '@/components/BillUtility';

const mockResourceUsageList = [
  {
    id: 1,
    category: 'water' as CategoryEnum,
    amount: 2.124,
    date: '02/04/2024',
  },
  // {
  //   id: 2,
  //   category: 'electricity' as CategoryEnum,
  //   amount: 12.124,
  //   date: '02/04/2024',
  // },
  // {
  //   id: 3,
  //   category: 'gas' as CategoryEnum,
  //   amount: 3.4,
  //   date: '02/04/2024',
  // },
  // {
  //   id: 1,
  //   category: 'water' as CategoryEnum,
  //   amount: 2.124,
  //   date: '02/04/2024',
  // },
  // {
  //   id: 2,
  //   category: 'electricity' as CategoryEnum,
  //   amount: 12.124,
  //   date: '02/04/2024',
  // },
  // {
  //   id: 3,
  //   category: 'gas' as CategoryEnum,
  //   amount: 3.4,
  //   date: '02/04/2024',
  // },
  // {
  //   id: 1,
  //   category: 'water' as CategoryEnum,
  //   amount: 2.124,
  //   date: '02/04/2024',
  // },
  // {
  //   id: 2,
  //   category: 'electricity' as CategoryEnum,
  //   amount: 12.124,
  //   date: '02/04/2024',
  // },
  // {
  //   id: 3,
  //   category: 'gas' as CategoryEnum,
  //   amount: 3.4,
  //   date: '02/04/2024',
  // },
];

export default function HomeScreen() {
  const { user, isManager } = useUserStore();
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const { propertyData, uploadPropertyData } = useGlobalStore();
  const [usageList, setUsageList] = useState<resourceUsage[]>(mockResourceUsageList);
  const [propertyVisible, setPropertyVisible] = useState(false);
  const [billPayments, setBillPayments] = useState<{}>({});
  const [tenantData, setTenantData] = useState<IBillDetail[]>([]);
  const [managerData, setManagerData] = useState({
    water: 0,
    electricity: 0,
    gas: 0,
  });
  const { propertyList, reload } = useProperty();
  const [curProperty, setCurProperty] = useState<Pick<IProperty, 'propertyId' | 'address'>>({
    propertyId: '',
    address: ''
  });
  const socket = useSocket({});
  const propertyId = propertyData ? propertyData.propertyId : '';

  // 监听树莓派传过来的水电煤使用情况的socket事件
  useEffect(() => {
    const electricityEventName = `${propertyId}/electricity`;
    const waterEventName = `${propertyId}/water`;
    const gasEventName = `${propertyId}/gas`;
    console.log('propertyId: ', propertyId);

    function updateUsageList() {
      return (data: any) => {
        setUsageList([...usageList, {
          username: data.tenantName,
          category: data.facilityName,
          amount: data.amount,
          date: data.date,
          duration: data.duration,
          unit: data.unit,
        }]);
      }
    }
    socket.on(electricityEventName, updateUsageList());
    socket.on(waterEventName, updateUsageList());
    socket.on(gasEventName, updateUsageList());

    return () => {
      socket.off(gasEventName);
      socket.off(waterEventName);
      socket.off(electricityEventName);
    };
  }, [socket, usageList, propertyId]);

  // 监听后端传过来的share bill的socket 事件
  useEffect(() => {
    if (user.role !== 'tenant') return;
    if (!user.userId) return;
    // 测试逻辑
    // const electricityEventName = 'bill/electricity/66f937983ff9b42ba26ffdbb';
    // 正常逻辑
    const electricityEventName = `bill/electricity/${user.userId}`;
    const waterEventName = `bill/water/${user.userId}`;
    const gasEventName = `bill/gas/${user.userId}`;

    function updateBillPayments(type: string) {
      return (data: any) => {
        const result = catchJsonExep(data, 'parse');
        setTenantData([
          ...tenantData, 
          {
            type,
            amount: result.cost,
            date: result.dueDate
          }
        ]);
      }
    }
    socket.on(electricityEventName, updateBillPayments('electricity'));
    socket.on(waterEventName, updateBillPayments('water'));
    socket.on(gasEventName, updateBillPayments('gas'));

    return () => {
      socket.off(electricityEventName);
      socket.off(waterEventName);
      socket.off(gasEventName);
    }
  }, [user, tenantData]);


  useEffect(() => {
    if(user.role !== 'manager') return;
    const firstProperty = propertyList[0];
    if(!curProperty.propertyId && firstProperty) {
      setCurProperty({
        propertyId: firstProperty?.propertyId,
        address: firstProperty?.address
      });
      uploadPropertyData(firstProperty);
    }
  }, [propertyList]); 

  useEffect(() => {
    if(!user.token) {
      setTimeout(() => {
        router.replace('/login');
      });
    }
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const changeProperty = () => {
    setPropertyVisible((propertyVisible) => {
      return !propertyVisible;
    });
    reload();
  }

  const selectProperty = (item: IProperty) => {
    item.propertyId && setCurProperty(item);
    uploadPropertyData(item);
    setPropertyVisible(false);
    onRefresh();
    // updateLoading({
    //   loading: true,
    //   text: 'update data...',
    // });

    // setTimeout(() => {
    //   updateLoading({
    //     loading: false,
    //   });
    // }, 2000);
  }

  return (
    <CommonWraper>
      <GlobalOpacityModal
        title='Select Property'
        visible={propertyVisible}
        onClose={() => setPropertyVisible(false)}>
          <ScrollView className='min-h-60 max-h-96'>
            <View>
              {
                propertyList.map(item => 
                  <TouchableOpacity
                    key={item.propertyId}
                    onPress={() => selectProperty(item)}
                    className='min-w-[90%] mt-3 pl-6 pr-6 pt-3 pb-3 bg-white rounded-md border border-gray-300'>
                    <View>
                      <Text className='text-center text-lg font-serif'>Address: {item.address}</Text>
                      <Text className='text-center text-sm text-gray-500'>ID: {item.propertyId}</Text>
                    </View>
                  </TouchableOpacity>)
              }
            </View>
          </ScrollView>
      </GlobalOpacityModal>
      <ScrollView
        className='pl-6 pr-6'
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View className='flex-row h-24'>
          <View className='flex-row items-center flex-grow'>
            <View className="w-20 h-20 rounded-full overflow-hidden">
              <Image
                className="w-full h-full"
                source={require('@/assets/images/default-avator.png')}
                resizeMode="cover"
              />
            </View>
            <View>
              <Text className='font-sans'>Hello { user.role === 'tenant' ? 'Tenant' : 'Manager'}</Text>
              <Text className='pt-3 font-bold text-lg'>{user.username}</Text>
            </View>
          </View>
          {

            isManager ? <TouchableOpacity
              onPress={changeProperty}
              className='flex-row items-center justify-end pr-4 -mt-6'>
                <Text 
                  numberOfLines={1} 
                  ellipsizeMode='tail'
                  className='w-36 text-right'>{curProperty.address}</Text>
                <AntDesign
                  className='mt-1 ml-2'
                  name={propertyVisible ? 'up' : 'down'}
                  size={16}
                  color='#b2b2b2' />
            </TouchableOpacity> :
            <View className='flex-row items-center justify-end pr-4'>
              <Entypo className='mr-2' name="bell" size={24} color='#b30b0b' />
              <AntDesign name="setting" size={24} color="black" />
            </View>
          }
        </View>
        {
          isManager ? 
          <View className='mt-3'>
            <ManagerBillDetail data={managerData}></ManagerBillDetail>
          </View> :
          <View className='mt-3'>
            <TanantBillDetail  data={tenantData}></TanantBillDetail>
          </View>
        }
        
        <View className='mt-8'>
          <Text className='text-2xl font-sans'>Resource Usage</Text>
          <ResourceUsageList resourceUsageList={usageList} />
        </View>
      </ScrollView>
    </CommonWraper>
  );
}







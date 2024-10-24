import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { getBill, IBill, payBill } from '@/service/bill';
import { useGlobalStore } from '@/store';
import BillUtility from '@/components/BillUtility';
import CommonWraper from '@/components/CommonWraper';
import DateCalendar from '@/components/DateCalendar';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Button from '@/components/Button';
import dayjs from 'dayjs';

type BillManagementScreenProps = {
  // props
};

type ITempBill = IBill & {loading: boolean};

const iconMap = {
  water: <Entypo name="water" size={25} color="#1ad732" />,
  electricity: <MaterialIcons name="electric-bolt" size={30} color="#f2d452" />,
  gas: <Entypo name="air" size={25} color="#f37e3d" />,
}

const BillManagementScreen: React.FC<BillManagementScreenProps> = (props) => {
  const [bills, setBills] = useState<ITempBill[]>([]);
  const { propertyData, uploadPropertyData } = useGlobalStore();

  useEffect(() => {
    getBillData();
  }, []);

  async function getBillData(data?: any) {
    const billData = await getBill({
      ...data,
      propertyId: propertyData.propertyId,
    });
    setBills((billData.bills || []).map((item: ITempBill) => ({...item, loading: false})));
  }

  const onUtilityChange = (utility: string) => {
    getBillData({
      utilityType: utility,
    });
  }

  const onDateChange = (data: any) => {
    getBillData({
      startDate: data.start.dateString,
      endDate: data.end.dateString,
    });
  }

  const payBillHandler = async (data: any) => {
    setBills(bills.map((item) => {
      // @ts-ignore
      if (item._id === data._id) {
        item.loading = true;
      }
      return item;
    }));
    await payBill(data._id);
    getBillData();
  }

  return (
    <CommonWraper>
      <ScrollView className='pl-6 pr-6 pt-2 pb-4'>
        <DateCalendar onDateChange={onDateChange} />
        <BillUtility onUtilityChange={onUtilityChange}></BillUtility>
        <View className='mt-4 mb-4'>
          {
            bills.map((item) =>
              // @ts-ignore
              <View key={item._id} className='mb-4'>
                <View className='
                  border border-gray-100 rounded-md
                  flex flex-row justify-between items-center
                  bg-white pt-4 pb-4 pl-2 pr-2'>
                  <View className='w-14 flex justify-center items-center'>
                    {item.utilityType && iconMap[item.utilityType]}
                  </View>
                  <View className='flex-1'>
                    <View className='flex flex-row items-center mb-2'>
                      <Text className='font-serif text-xl'>{item.utilityType} bill</Text>
                    </View>
                    <Text className='text-gray-600'>dueDate: {dayjs(item.dueDate).format('DD/MM/YYYY')}</Text>
                    <Text className='mt-2 text-gray-600'>
                      date:
                      {dayjs(item.billingPeriod.startDate).format('DD/MM/YYYY')} -  
                      {dayjs(item.billingPeriod.endDate).format('DD/MM/YYYY')}
                    </Text>
                  </View>
                  <View>
                    <Text className='font-bold text-2xl ml-2 mr-3'>${item.totalCost}</Text>
                  </View>
                </View>
                <Button
                  loading={item.loading}
                  disabeld={item.isPaid}
                  text={item.isPaid ? 'Paid' : 'Pay'}
                  onSubmit={() => payBillHandler(item)}
                  className={`rounded-t-none ${item.isPaid ? 'bg-gray-200' : 'bg-orange-400'}`}></Button>
              </View>)
          }
        </View>
      </ScrollView>
    </CommonWraper>
  );
};

export default BillManagementScreen;
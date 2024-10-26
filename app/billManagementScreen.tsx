import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { getBill, IBill, payBill } from '@/service/bill';
import { useGlobalStore } from '@/store';
import BillUtility from '@/components/BillUtility';
import CommonWraper from '@/components/CommonWraper';
import DateCalendar from '@/components/DateCalendar';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Button from '@/components/Button';
import dayjs from 'dayjs';
import { useToast } from 'react-native-toast-notifications';

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
  const [selectedData, setSelectedData] = useState<Set<any>>(new Set());
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

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

  const payBillHandler = async () => {
    if(selectedData.size === 0) {
      toast.show('Please select bill to pay', {
        type: 'error',
        duration: 2000,
      });
      return;
    }
    setLoading(true);
    const proList: Promise<any>[] = [];
    selectedData.forEach(async (data) => {
      proList.push(payBill(data._id));
    });
    await Promise.all(proList);
    setLoading(false);
    setSelectedData(new Set());
    setTotal(0);
    getBillData();
  }

  const setTotalCost = (bills: ITempBill[] = []) => {
    const total = bills.reduce((acc, cur) => acc + Number(cur.totalCost), 0);
    setTotal(total);
  }

  const itemClick = (data: ITempBill) => {
    if (data.isPaid) return;
    const tempData = new Set([...selectedData]);
    if (tempData.has(data)) {
      tempData.delete(data);
    } else {
      tempData.add(data);
    }
    setSelectedData(tempData);
    setTotalCost(Array.from(tempData));
  }

  const selectedAll = () => {
    if(selectedData.size === 0) {
      const tempData = bills.filter(item => !item.isPaid);
      if (tempData.length) {
        setSelectedData(new Set(tempData));
        setTotalCost(Array.from(tempData));
      } 
    } else {
      setSelectedData(new Set());
      setTotal(0);
    }
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
              <TouchableOpacity onPress={() => itemClick(item)} key={item._id}>
                <View
                  className='mb-4'>
                  <View className={
                    `
                    ${item.isPaid ? 'bg-gray-100 border-l-8 border-green-400' : 'bg-white'}
                    ${selectedData.has(item) ? 'border-l-8 border-blue-500 ' : ''}
                    rounded-md
                    flex flex-row justify-between items-center
                    pt-4 pb-4 pl-2 pr-2`}>
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
                  {/* <Button
                    loading={item.loading}
                    disabeld={item.isPaid}
                    text={item.isPaid ? 'Paid' : 'Pay'}
                    onSubmit={() => payBillHandler(item)}
                    className={`rounded-t-none ${item.isPaid ? 'bg-gray-200' : 'bg-orange-400'}`}></Button> */}
                </View>
              </TouchableOpacity>)
          }
        </View>
      </ScrollView>

      <View className='
        absolute bottom-0 left-0 right-0 w-full h-16
        border-t-1 border-gray-200
        flex-row justify-between items-center bg-white'>
        <View className='flex-1 flex-row items-center'>
          <Text className='ml-4 text-lg font-bold text-gray-600'>Total: </Text>
          <Text className='ml-2 text-2xl font-bold'>${total}</Text>
        </View>
        <View>
          <Button
            text={<Text className='text-gray-600 text-xl font-bold'>All</Text>}
            loading={loading}
            className='rounded-none bg-gray-200 m-0 p-0 w-24 text-xl h-full flex-1 items-center justify-center'
            onSubmit={selectedAll} />
        </View>
        <View>
          <Button
            text={<Text className='text-xl font-bold'>Pay</Text>}
            loading={loading}
            className='rounded-none m-0 p-0 w-24 text-xl h-full flex-1 items-center justify-center'
            onSubmit={payBillHandler} />
        </View>
      </View>
    </CommonWraper>
  );
};

export default BillManagementScreen;
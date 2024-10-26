import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getFacilities } from '@/service/facilities'; // 假设你有 startDevice 和 stopDevice API
import CommonWraper from '@/components/CommonWraper';
import { categoryMap } from '@/constants/icon';
import DeviceItem from '@/components/DeviceItem';
import { useUserStore } from '@/store';
import Ionicons from '@expo/vector-icons/Ionicons';

type DeviceScreenProps = {
  // props
};

const DeviceScreen: React.FC<DeviceScreenProps> = (props) => {
  const { isManager } = useUserStore();
  const [devices, setDevices] = useState<any[]>([]);
  const [loadingStart, setLoadingStart] = useState<string | null>(null); // 控制 start 按钮的 loading 状态
  const [loadingStop, setLoadingStop] = useState<string | null>(null); // 控制 stop 按钮的 loading 状态

  useEffect(() => {
    getFacilitiesHandler();
  }, []);

  const getFacilitiesHandler = async () => {
    const data: any = await getFacilities();
    setDevices(data.facilities);
  };

  // 处理 start 按钮的点击事件
  const handleStart = async (deviceId: string) => {
    setLoadingStart(deviceId);
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
    } catch (error) {
      console.error('Error starting device:', error);
    } finally {
      setLoadingStart(null);
    }
  };

  // 处理 stop 按钮的点击事件
  const handleStop = async (deviceId: string) => {
    setLoadingStop(deviceId);
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
    } catch (error) {
      console.error('Error stopping device:', error);
    } finally {
      setLoadingStop(null); // 无论成功或失败都取消 loading 状态
    }
  };

  const formData = (i: number) => {
    const map = {
      0: 'electric',
      1: 'water',
      2: 'gas',
    };
    // @ts-ignore
    return categoryMap[map[i]];
  };

  return (
    <CommonWraper>
      <View className='p-5'>
        {
          devices.map((item, index) => {
            return (
              <DeviceItem title={item.name} subtitle={item.id} key={index} >
                <DeviceItem.LeftSlot>
                  { formData(index) }
                </DeviceItem.LeftSlot>
                <DeviceItem.RightSlot>
                  { !isManager &&
                    <TouchableOpacity onPress={() => handleStart(item.id)} disabled={loadingStart === item.id}>
                    <View className='mr-3 w-11 h-11 rounded-full bg-green-400 flex justify-center items-center'>
                      {
                        loadingStart === item.id ? (
                          <ActivityIndicator color="#fff" />
                        ) : (
                          <Text className='text-sm text-white'>Start</Text>
                        )
                      }
                    </View>
                  </TouchableOpacity>
                  }
                  <TouchableOpacity onPress={() => handleStop(item.id)} disabled={loadingStop === item.id}>
                    <View className='w-11 h-11 rounded-full bg-red-400 flex justify-center items-center'>
                      {
                        loadingStop === item.id ? (
                          <ActivityIndicator color="#fff" />
                        ) : (
                          <Text className='text-sm text-white'>{ isManager? 'del' : 'Stop'}</Text>
                        )
                      }
                    </View>
                  </TouchableOpacity>
                </DeviceItem.RightSlot>
              </DeviceItem>
            );
          })
        }
      </View>

      { isManager && 
          <View className='flex-row justify-center items-center mt-8 mb-20'>
            <TouchableOpacity
              className='w-44 rounded-xl flex-row p-4 bg-blue-500 items-center justify-center'>
              <Text className='text-white font-bold mr-3'>Add Device</Text>
              <Ionicons name="add-circle-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
      }
    </CommonWraper>
  );
};

export default DeviceScreen;

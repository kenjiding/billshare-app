import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getFacilities } from '@/service/facilities'; // 假设你有 startDevice 和 stopDevice API
import CommonWraper from '@/components/CommonWraper';
import { categoryMap } from '@/constants/icon';
import Toast from 'react-native-toast-message'; // 引入 Toast
import DeviceItem from '@/components/DeviceItem';
import { useUserStore } from '@/store';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getAvailablePi } from '@/service/device';

type DeviceScreenProps = {
  // props
};

const DeveicePiScreen: React.FC<DeviceScreenProps> = (props) => {
  const { isManager } = useUserStore();
  const [devices, setDevices] = useState<any[]>([]);
  const [loadingStart, setLoadingStart] = useState<string | null>(null); // 控制 start 按钮的 loading 状态
  const [loadingStop, setLoadingStop] = useState<string | null>(null); // 控制 stop 按钮的 loading 状态

  useEffect(() => {
    getFacilitiesHandler();
  }, []);

  const getFacilitiesHandler = async () => {
    const data: any = await getAvailablePi();
    setDevices(data.available);
  };

  // 处理 start 按钮的点击事件
  const handleStart = async (deviceId: string) => {
    setLoadingStart(deviceId);
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      Toast.show({
        type: 'success',
        text1: 'Start deveice successfully',
        visibilityTime: 2000,
        position: 'bottom',
        autoHide: true,
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
      Toast.show({
        type: 'success',
        text1: 'Stop deveice successfully',
        visibilityTime: 2000,
        position: 'bottom',
        autoHide: true,
      });
    } catch (error) {
      console.error('Error stopping device:', error);
    } finally {
      setLoadingStop(null); // 无论成功或失败都取消 loading 状态
    }
  };

  const formData = (i: number) => {
    const map = {
      0: 'electricity',
      1: 'water',
      2: 'gas',
    };
    // @ts-ignore
    return categoryMap[map[i]];
  };

  return (
    <CommonWraper>
      <Toast />
      <View className='p-5'>
        {
          devices.map((item, index) => {
            return (
              <DeviceItem title={item} subtitle={Math.random().toString(36).substring(2, 15)} key={index}>
                <DeviceItem.RightSlot>
                  { !isManager &&
                    <TouchableOpacity onPress={() => handleStart(item)} disabled={loadingStart === item}>
                    <View className='mr-3 w-11 h-11 rounded-full bg-green-400 flex justify-center items-center'>
                      {
                        loadingStart === item ? (
                          <ActivityIndicator color="#fff" />
                        ) : (
                          <Text className='text-sm text-white'>Start</Text>
                        )
                      }
                    </View>
                  </TouchableOpacity>
                  }
                  <TouchableOpacity onPress={() => handleStop(item)} disabled={loadingStop === item}>
                    <View className='w-11 h-11 rounded-full bg-red-400 flex justify-center items-center'>
                      {
                        loadingStop === item ? (
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
    </CommonWraper>
  );
};

export default DeveicePiScreen;

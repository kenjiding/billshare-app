import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { getFacilities } from '@/service/facilities'; // 假设你有 startDevice 和 stopDevice API
import CommonWraper from '@/components/CommonWraper';
import { categoryMap } from '@/constants/icon';
import DeviceItem from '@/components/DeviceItem';

type DeviceListProps = {
  // props
};

const DeviceList: React.FC<DeviceListProps> = (props) => {
  const [devices, setDevices] = useState<any[]>([]);

  useEffect(() => {
    getFacilitiesHandler();
  }, []);

  const getFacilitiesHandler = async () => {
    const data: any = await getFacilities();
    setDevices(data.facilities);
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
      <View className='p-5'>
        {
          devices.map((item, index) => {
            return (
              <DeviceItem title={item.name} subtitle={item.id} key={index} >
                <DeviceItem.LeftSlot>
                  { formData(index) }
                </DeviceItem.LeftSlot>
              </DeviceItem>
            );
          })
        }
      </View>
    </CommonWraper>
  );
};

export default DeviceList;

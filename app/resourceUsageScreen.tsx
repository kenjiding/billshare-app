import React from 'react';
import ResourceUsageList from '@/components/ResourceUsage';
import { View, SafeAreaView } from 'react-native';
import CommonWraper from '@/components/CommonWraper';
import { CategoryEnum } from '@/components/BillUtility';

type resourceUsageScreenProps = {
  // props
};

const mockResourceUsageList = [
  {
    id: 1,
    category: 'water' as CategoryEnum,
    amount: 2.124,
    date: '02/04/2024',
    username: 'Monica',
  },
  {
    id: 2,
    category: 'electricity' as CategoryEnum,
    amount: 12.124,
    date: '02/04/2024',
    username: 'Monica',
  },
  {
    id: 3,
    category: 'gas' as CategoryEnum,
    amount: 3.4,
    date: '02/04/2024',
    username: 'Monica',
  },
  {
    id: 1,
    category: 'water' as CategoryEnum,
    amount: 2.124,
    date: '02/04/2024',
    username: 'Monica',
  },
  {
    id: 2,
    category: 'electricity' as CategoryEnum,
    amount: 12.124,
    date: '02/04/2024',
    username: 'Monica',
  },
  {
    id: 3,
    category: 'gas' as CategoryEnum,
    amount: 3.4,
    date: '02/04/2024',
    username: 'Monica',
  },
];
const resourceUsageScreen: React.FC<resourceUsageScreenProps> = (props) => {
  return (
    <CommonWraper>
      <View className='pl-6 pr-6 pt-2 pb-4'>
        <ResourceUsageList enableRoute={false} resourceUsageList={mockResourceUsageList} needDate />
      </View>
    </CommonWraper>
  );
};

export default resourceUsageScreen;
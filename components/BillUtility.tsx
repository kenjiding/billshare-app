import React, { useCallback, useEffect, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { TouchableOpacity, View, Text } from 'react-native';

type BillCategoryProps = {
  // props
  onUtilityChange?: (category: CategoryEnum) => void;
};

export enum CategoryEnum {
  electricity = 'electricity',
  water = 'water',
  gas = 'gas',
}

const categoryStyles = 'rounded-lg flex-1 h-10 items-center justify-center flex-row border-1 border-blue-200';

const BillUtility: React.FC<BillCategoryProps> = ({
  onUtilityChange
}) => {

  const categoryHandlePress = (category: CategoryEnum) => {
    onUtilityChange && onUtilityChange(category);
  }
  return (
    <View className='flex-row items-center justify-between mt-4'>
    <TouchableOpacity
      style={{backgroundColor: 'rgba(129, 218, 237, 0.5)'}}
      className={`${categoryStyles} mr-4`}
      onPress={() => categoryHandlePress(CategoryEnum.electricity)} >
      <MaterialIcons name="electric-bolt" size={20} color="#f2d452" />
      <Text className='ml-1'>elec</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={{backgroundColor: 'rgba(129, 218, 237, 0.5)'}}
      className={`${categoryStyles} mr-4`}
      onPress={() => categoryHandlePress(CategoryEnum.water)} >
      <Entypo name="water" size={18} color="#1ad732" />
      <Text className='ml-2'>water</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={{backgroundColor: 'rgba(129, 218, 237, 0.5)'}}
      className={categoryStyles}
      onPress={() => categoryHandlePress(CategoryEnum.gas)}>
      <Entypo name="air" size={18} color="#f37e3d" />
      <Text className='ml-2'>gas</Text>
    </TouchableOpacity>
  </View>
  );
};

export default BillUtility;
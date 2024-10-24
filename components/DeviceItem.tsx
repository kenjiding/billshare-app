import React from 'react';
import { View, Text } from 'react-native';
import { categoryMap } from '@/constants/icon';

interface DeviceItemProps {
  icon?: React.ReactNode | null;
  title: string;
  subtitle?: string;
  children?: React.ReactNode | null;
};

interface ItemSlotProps {
  children: React.ReactNode;
}

const DeviceItem: React.FC<DeviceItemProps> & {
  RightSlot: React.FC<ItemSlotProps>,
  LeftSlot: React.FC<ItemSlotProps>
} = ({
  icon,
  title = '',
  subtitle = '',
  children,
}) => {
  let leftContent: React.ReactNode = null;
  let rightContent: React.ReactNode = null;
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === DeviceItem.RightSlot) {
        rightContent = child.props.children;
      } else if (child.type === DeviceItem.LeftSlot) {
        leftContent = child.props.children;
      }
    }
  });

  return (
    <View
      className='flex-row items-center p-4 pl-5 pr-5 rounded-md mb-1 bg-blue-100'>
      <View className='mr-3'>
        { leftContent }
      </View>
      <View>
        <Text className='text-left font-bold text-xl'>{title}</Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className='text-gray-500 w-40 truncate text-left'>
          {subtitle}
        </Text>
      </View>
      <View className='ml-auto flex-row items-center'>
        { rightContent }
      </View>
    </View>
  );
};

DeviceItem.LeftSlot = ({ children }) => {
  return children;
};

DeviceItem.RightSlot = ({ children }) => {
  return children;
};

export default DeviceItem;
import React, { useState } from 'react';
import { TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';

type ButtonProps = {
  disabeld?: boolean;
  onSubmit?: () => void;
  reqHandler?: () => Promise<any>;
  text?: string | JSX.Element;
  className?: string;
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  onSubmit,
  reqHandler,
  disabeld,
  text,
  className,
  loading
}) => {

  const beforeSubmit = async () => {
    onSubmit && onSubmit();
  }
  return (
    <TouchableOpacity
      className={`bg-blue-500 rounded-lg py-2 px-4 ${className}`}
      onPress={beforeSubmit} disabled={disabeld || loading}>
      <View className={'flex-row justify-center items-center'}>
        {
          loading ? <ActivityIndicator color="#fff" /> : 
          typeof text === 'function' ? text : <Text className='text-lg text-white'>{text}</Text>
        }
        
      </View>
    </TouchableOpacity>
  );
};

export default Button;
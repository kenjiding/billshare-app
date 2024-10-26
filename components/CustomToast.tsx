import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface CustomToastProps {
  toast: any;
}

const CustomToast: React.FC<CustomToastProps> = ({ toast }) => {
  const { type, message } = toast;
  const icons: any = {
    success: 'checkmark-circle-outline',
    error: 'close-circle-outline',
    warning: 'warning-outline',
    info: 'information-circle-outline',
  };

  const backgroundColors: any = {
    success: '#4caf50',
    error: '#f44336',
    warning: '#ff9800',
    info: '#2196f3',
  };

  return (
    <View style={[styles.container, { backgroundColor: backgroundColors[type] }]}>
      <Ionicons name={icons[type]} size={24} color="#fff" className='mr-2' />
      <Text className='text-lg text-white text-center'>{message}</Text>
    </View>
  );
};

export default CustomToast;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 10,
  },
});

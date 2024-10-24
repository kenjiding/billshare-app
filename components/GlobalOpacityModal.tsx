import React, { useEffect, useState } from 'react';
import { Modal, View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const GlobalOpacityModal = ({
  children,
  visible,
  title,
  onClose,
  onCheck,
}: React.PropsWithChildren<{
  visible: boolean;
  title?: string;
  onClose?: () => void;
  onCheck?: () => void;
}>) => {
  const [isVisible, setIsVisible] = useState(false); // 控制Modal是否显示

  useEffect(() => {
    if (visible) openModal();
    else closeModal();
  }, [visible]);

  const openModal = () => {
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false); 
    onClose && onClose();
  };
  
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {console.log()}}
    >
      <View style={styles.modalHBackground}>
        <View style={styles.modalHContainer}>
          <View className='border-b-1 mb-1 border-gray-200 w-full flex-row justify-between items-center pb-3'>
            <TouchableOpacity>
              { onCheck && <AntDesign name="checkcircleo" size={24} color="#5f5f5f" onPress={onCheck} /> }
            </TouchableOpacity>
            <Text className='text-xl font-bold'>{title}</Text>
            <TouchableOpacity>
              { onClose && <AntDesign name="closecircleo" size={24} color="#5f5f5f" onPress={onClose} /> }
            </TouchableOpacity>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalHBackground: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
  },
  modalHContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 350,
  },
});

export default GlobalOpacityModal;

import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AntDesign from '@expo/vector-icons/AntDesign';

interface ISelectProps {
  onSelectChange?: (val: string) => void;
  onSelectedDone?: (val: string) => void;
  label?: string;
  buttonText?: string;
  value: any;
  data: {label: string; value: string}[];
}

export default function App({
  data = [],
  value,
  label,
  buttonText,
  onSelectChange,
  onSelectedDone,
}: ISelectProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const selectHandler = () => {
    setModalVisible(false);
    onSelectedDone && onSelectedDone(value);
  }

  return (
    <View style={styles.container}>
      <View className='flex-row justify-start items-center'>
        { label ? <Text className='mr-4'>{ label }</Text> : null }
        <TouchableOpacity className='border-b-1 flex-1 border-gray-300' onPress={() => setModalVisible(true)}>
          <View className='relative'>
            <Text className='text-gray-500 pb-1 pl-2'>{ value }</Text>
          </View>
          <AntDesign
            className='absolute right-0 top-0'
            name={modalVisible ? 'down' : 'right'}
            size={16}
            color='#b2b2b2' />
        </TouchableOpacity>
      </View>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onSelectChange && onSelectChange(itemValue)}
              style={styles.picker}
            >
              {
                data.map((item, i) => (
                  <Picker.Item key={i} label={item.label} value={item.value} />
                ))
              }
            </Picker>
            <View className='mt-7'>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={selectHandler}
              >
                <Text style={styles.closeButtonText}>{ buttonText || 'Done'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  modalBackground: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 350,
  },
  picker: {
    height: 150,
    width: '100%',
  },
});

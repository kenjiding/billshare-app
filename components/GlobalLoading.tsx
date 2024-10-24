import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal, Text } from 'react-native';
import { useGlobalStore } from '@/store';

const GlobalLoading = () => {
  const { loadingData } = useGlobalStore();
  return (
    <Modal transparent={true} animationType='none' visible={loadingData.loading}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          {
            loadingData.text && <Text className='text-2xl text-white mt-5'>{loadingData.text}...</Text>
          }
          <ActivityIndicator animating={loadingData.loading} size='large' color='#0000ff' />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  activityIndicatorWrapper: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  modalBackground: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
  },
});

export default GlobalLoading;

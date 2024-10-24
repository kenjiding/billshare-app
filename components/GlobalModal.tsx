import React, { useEffect, useState } from 'react';
import { Modal, View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';
import Feather from '@expo/vector-icons/Feather';
const { width } = Dimensions.get('window');

const GlobalModal = ({
  children,
  visible,
  onClose
}: React.PropsWithChildren<{
  visible: boolean;
  onClose?: () => void;
}>) => {
  const [isVisible, setIsVisible] = useState(false); // 控制Modal是否显示
  const translateX = useSharedValue(width); // 动画状态

  useEffect(() => {
    if (visible) openModal();
    else closeModal();
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const openModal = () => {
    setIsVisible(true); // 先设置Modal可见
    // 开始执行动画，将translateX从width变为0
    translateX.value = withSpring(0, { damping: 15 });
  };

  const closeModal = () => {
    translateX.value = withSpring(width, { damping: 15 }, () => {
      // 使用 runOnJS 调用 setIsVisible
      runOnJS(setIsVisible)(false); 
      onClose && runOnJS(onClose)();
    });
  };
  
  return (
    <Modal transparent visible={isVisible} animationType="none">
      <View style={styles.modalBackground}>
        <Animated.View style={[styles.modalContent, animatedStyle]}>
          <View className='h-full pt-10'>
            <Feather name="arrow-left" size={24} color="black" onPress={closeModal} />
            <ScrollView>
              { children }
            </ScrollView>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    width: width,
    height: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    right: 0,
    padding: 20,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default GlobalModal;

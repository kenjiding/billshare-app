import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import React, { PropsWithChildren } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useUserStore } from '@/store';

type CommonBgProps = {
  // props
  linearGradientConf?: LinearGradientProps;
  className?: string;
} & PropsWithChildren;

const defaultLinearGradientConf: LinearGradientProps = {
  colors: ['#FFFFFF', '#C7EBFB'],
  start: { x: 0.5, y: 0 },
  end: { x: 0.5, y: 1 }
};

const CommonWraper: React.FC<CommonBgProps> = ({
  children,
  className,
  linearGradientConf = defaultLinearGradientConf
}) => {
  const { isManager } = useUserStore();
  linearGradientConf.colors = [linearGradientConf.colors[0], isManager ?'#FBE9C7' : '#C7EBFB'];
  return (
    <SafeAreaView>
      <LinearGradient {...linearGradientConf}>
        <View className={`min-h-full min-w-full ${className}`}>{children}</View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default CommonWraper;
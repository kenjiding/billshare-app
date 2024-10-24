import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useUserStore } from '@/store';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { isManager } = useUserStore();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bill"
        options={{
          tabBarLabel: '',
          tabBarIcon: (props) => (
            <TouchableOpacity
              className='absolute -top-10'
              {...props}
              onPress={() => {
                router.push(isManager ? '/bill' : '/billManagementScreen');
              }}>
                <View className={`h-20 w-20 rounded-full border-1 border-white
                justify-center items-center shadow-gray-300 shadow-sm 
                ${isManager ? 'bg-orange-400' : 'bg-blue-400'}`}>
                  <Text className='font-serif text-white text-2xl'>Bill</Text>
                </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="person"
        options={{
          title: 'Me',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

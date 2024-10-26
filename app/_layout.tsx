import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../styles/global.css';
import { useColorScheme } from '@/hooks/useColorScheme';
import GlobalLoading from '@/components/GlobalLoading';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { ToastProvider } from 'react-native-toast-notifications'
import { View, Text } from 'react-native';
import CustomToast from '@/components/CustomToast';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const HeaderBackButton = () => {
  const navigation = useNavigation();

  return (
    <AntDesign 
      name="arrowleft" 
      size={24} 
      color="black" 
      onPress={() => navigation.goBack()} // 点击时返回上一屏
    />
  );
};

export default function RootLayout() {
  // const router = useRouter();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    // router.replace('/login');
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ToastProvider
          placement="top"
          duration={3000}
          animationType='slide-in'
          animationDuration={250}
          successColor="green"
          dangerColor="red"
          warningColor="orange"
          normalColor="gray"
          textStyle={{ fontSize: 20 }}
          offset={50}
          offsetTop={50}
          offsetBottom={40}
          swipeEnabled={true}
          renderToast={(toastOptions) => <CustomToast toast={toastOptions} />}
      >
        <GlobalLoading></GlobalLoading>
        <Stack
          screenOptions={{
            headerStyle: {
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen name='(tabs)' options={{ headerShown: false, title: 'home' }} />
          <Stack.Screen name='deveiceScreen' options={{
            headerShown: true,
            title: 'deveices',
            headerLeft: () => <HeaderBackButton />, 
          }} />
          <Stack.Screen name='resourceUsageScreen' options={{ headerShown: true, title: 'ResourceUsage' }} />
          <Stack.Screen name='propertyScreen' options={{ headerShown: true, title: 'property management' }} />
          <Stack.Screen name='(auth)/login/index'
            options={{ headerShown: false, title: 'Login' }} />
          <Stack.Screen name='(auth)/register/index' options={{
            headerShown: false,
            // headerTitle: props => <Text {...props}></Text>, 
            // headerLeft: () => <AntDesign name="arrowleft" size={24} color="black" />,
          }} />
          <Stack.Screen name='+not-found' options={{ headerShown: false }} />
        </Stack>
      </ToastProvider>
    </ThemeProvider>
  );
}
function uploadPropertyData(arg0: any) {
  throw new Error('Function not implemented.');
}


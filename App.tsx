import React, { useEffect } from 'react';
import { Text, TextInput } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { AuthOnboardingNavigator } from './src/features/auth/navigation/AuthOnboardingNavigator';

SplashScreen.preventAutoHideAsync();

const TextAny = Text as any;
TextAny.defaultProps = TextAny.defaultProps || {};
TextAny.defaultProps.style = [{ fontFamily: 'Inter_400Regular' }, TextAny.defaultProps.style];

const TextInputAny = TextInput as any;
TextInputAny.defaultProps = TextInputAny.defaultProps || {};
TextInputAny.defaultProps.style = [{ fontFamily: 'Inter_400Regular' }, TextInputAny.defaultProps.style];

const AppTheme = {
  ...DefaultTheme,
  fonts: {
    light:{ fontFamily: 'Inter_300Light', fontWeight: '300' as const},
    regular: { fontFamily: 'Inter_400Regular', fontWeight: '400' as const },
    medium: { fontFamily: 'Inter_500Medium', fontWeight: '500' as const },
    bold: { fontFamily: 'Inter_600SemiBold', fontWeight: '600' as const },
    heavy: { fontFamily: 'Inter_700Bold', fontWeight: '700' as const },
  },
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={AppTheme}>
        <StatusBar style="dark" />
        <AuthOnboardingNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

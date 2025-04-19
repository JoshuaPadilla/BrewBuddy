import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import "./globals.css";
import { images } from "@/constants/images";
import React from "react";
import { Dimensions, ScrollView, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/useAuth";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { checkAuth } = useAuthStore();

  const [loaded, error] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-italic": require("../assets/fonts/Poppins-Italic.ttf"),
    "Poppins-MediumItalic": require("../assets/fonts/Poppins-MediumItalic.ttf"),
    "Judson-Italic": require("../assets/fonts/Judson-Italic.ttf"),
    "Jomhuria-Regular": require("../assets/fonts/Jomhuria-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    checkAuth();
  }, [loaded, error]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" backgroundColor="#73C088" translucent />
      <Stack>
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth_screens)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}

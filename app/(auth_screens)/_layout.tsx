import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import socket from "@/lib/socket";

const AuthScreensLayout = () => {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
      console.log("Socket connected globally in RootLayout");
    }

    return () => {
      if (socket.connected) {
        socket.disconnect();
        console.log("Socket disconnected globally in RootLayout");
      }
    };
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(staff)" options={{ headerShown: false }} />
      <Stack.Screen name="(utility_screens)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(ordering_screens)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default AuthScreensLayout;

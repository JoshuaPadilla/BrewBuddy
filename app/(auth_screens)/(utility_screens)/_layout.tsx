import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuthStore } from "@/store/useAuth";

const OrderingScreensLayout = () => {
  const { authUser } = useAuthStore();

  if (!authUser) return <Redirect href="/(onboarding)/welcome" />;

  return (
    <Stack>
      <Stack.Screen name="account_settings" options={{ headerShown: false }} />
      <Stack.Screen name="faq" options={{ headerShown: false }} />
      <Stack.Screen name="help_center" options={{ headerShown: false }} />
      <Stack.Screen name="voucher_rewards" options={{ headerShown: false }} />
      <Stack.Screen name="edit_profile" options={{ headerShown: false }} />
    </Stack>
  );
};

export default OrderingScreensLayout;

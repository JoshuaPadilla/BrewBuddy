import React from "react";
import { Stack } from "expo-router";

const OrderingScreensLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="checkout" options={{ headerShown: false }} />
      <Stack.Screen name="thank_you" options={{ headerShown: false }} />
    </Stack>
  );
};

export default OrderingScreensLayout;

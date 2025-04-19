import { View, Text } from "react-native";
import React from "react";
import { useAuthStore } from "@/store/useAuth";
import CustomButton from "@/components/custom_button";
import { SafeAreaView } from "react-native-safe-area-context";

const StaffAccount = () => {
  const { logout } = useAuthStore();

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <CustomButton title="Logout" onPress={logout} />
    </SafeAreaView>
  );
};

export default StaffAccount;

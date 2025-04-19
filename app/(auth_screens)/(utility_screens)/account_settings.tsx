import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import { util_icons } from "@/constants/icons";
import { goBack, goToEditProfile } from "@/helpers/router_function";
import { useAuthStore } from "@/store/useAuth";

const AccountSettings = () => {
  const { logout, checkAuth } = useAuthStore();

  const handleLogout = () => {
    logout();
    checkAuth();
  };

  return (
    <SafeAreaView className="flex-1 items-start">
      <CustomButton
        iconLeft={util_icons.back_icon}
        title="Account Settings"
        btnClassname="flex-row items-center p-6 gap-3"
        textClassname="font-poppins-semibold text-black-100 text-xl"
        onPress={goBack}
      />

      <View className="p-4 w-full px-6 rounded-xl gap-2">
        <CustomButton
          iconLeft={util_icons.edit_profile}
          title="Edit Profile"
          btnClassname="flex-row items-center bg-primary-100/80 px-4 py-4 gap-3 w-full rounded-xl"
          textClassname="font-poppins-semibold text-black-100 text-xl"
          iconRight={util_icons.caret_right}
          iconRightClassName="size-4 absolute right-4"
          onPress={goToEditProfile}
        />

        <CustomButton
          iconLeft={util_icons.logout_icon}
          title="Logout"
          btnClassname="flex-row items-center bg-primary-100/80 px-4 py-4 gap-3 w-full rounded-xl"
          textClassname="font-poppins-semibold text-black-100 text-xl"
          onPress={handleLogout}
        />
      </View>
    </SafeAreaView>
  );
};

export default AccountSettings;

import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import { useAuthStore } from "@/store/useAuth";
import { util_icons } from "@/constants/icons";
import {
  goToAccountSettings,
  goToEditProfile,
  goToFAQ,
  goToHelpCenter,
  goToVoucherAndReward,
} from "@/helpers/router_function";

const StaffAccount = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <SafeAreaView className="flex-1 items-start">
      {/* circle */}
      <View className="w-full h-[25%] bg-primary-100 items-center">
        <View className="absolute -bottom-16 bg-gray-200 size-36 rounded-full items-center justify-center">
          <Text className="font-poppins-bold text-primary-100 text-5xl">
            {authUser?.firstName.at(0)?.toUpperCase()}
            {authUser?.lastName.at(0)?.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Info */}
      <View className="gap-4 mt-16 px-8 pb-6 w-full border-b-4 border-black-100/20">
        <View className="items-center justify-center w-full p-4">
          <Text className="font-poppins-semibold text-black-100 text-3xl">
            {authUser?.firstName.toUpperCase()}{" "}
            {authUser?.lastName.toUpperCase()}
          </Text>
        </View>

        <View>
          <Text className="font-poppins-bold text-black-100 text-xl">
            Phone Number:
          </Text>
          <Text className="font-poppins-regular text-black-100/80 text-lg">
            {authUser?.number}
          </Text>
        </View>

        <View>
          <Text className="font-poppins-bold text-black-100 text-xl">
            Email Address:
          </Text>
          <Text className="font-poppins-regular text-black-100/80 text-lg">
            {authUser?.email}
          </Text>
        </View>
      </View>

      <View className="px-8 pb-6 gap-4 mt-8">
        <CustomButton
          iconLeft={util_icons.edit_profile}
          title="Edit Profile"
          btnClassname="flex-row gap-2 items-center"
          iconSize="size-8"
          textClassname="font-poppins-medium text-black-100 text-lg"
          onPress={goToEditProfile}
        />

        <CustomButton
          iconLeft={util_icons.logout_icon}
          title="Logout"
          btnClassname="flex-row gap-2 items-center"
          iconSize="size-8"
          textClassname="font-poppins-medium text-black-100 text-lg"
          onPress={logout}
        />
      </View>
    </SafeAreaView>
  );
};

export default StaffAccount;

import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import { util_icons } from "@/constants/icons";
import { goBack } from "@/helpers/router_function";
import { Image } from "expo-image";

const VoucherAndRewards = () => {
  return (
    <SafeAreaView className="flex-1 items-start">
      {/* Headings */}

      <CustomButton
        iconLeft={util_icons.back_icon}
        title="Voucher & Rewards"
        btnClassname="flex-row items-center p-6 gap-3"
        textClassname="font-poppins-semibold text-black-100 text-xl"
        onPress={goBack}
      />

      <View className="p-20 items-center text-center">
        <View className="size-20 overflow-hidden">
          <Image
            source={util_icons.under_repair}
            style={{ width: "100%", height: "100%" }}
          />
        </View>

        <Text className="text-center font-poppins-regular text-black-100/80 text-m">
          We are still working on this page.Thank you for your patience our
          dearest customer!
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default VoucherAndRewards;

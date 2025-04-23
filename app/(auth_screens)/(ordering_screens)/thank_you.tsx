import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants/images";
import CustomButton from "@/components/custom_button";
import { goToHome } from "@/helpers/router_function";

const ThankYou = () => {
  return (
    <SafeAreaView className="flex flex-1 bg-primary-100 py-8 items-center">
      <View className="p-16 items-center">
        <Image source={images.logo} className="size-28" />
      </View>

      <View className="p-8 items-center">
        <Text className="font-poppins-bold text-white text-5xl">
          Thank you!
        </Text>

        <Text className="text-center font-poppins-regular text-white text-m">
          Your order has been successfully placed.Sit tight—your milk tea is
          being prepared and will be ready soon!
        </Text>
      </View>

      <CustomButton
        title="Back to home"
        btnClassname="w-[80%] bg-white items-center p-4 rounded-full absolute bottom-40"
        textClassname="font-poppins-bold text-xl text-primary-100"
        onPress={goToHome}
      />
    </SafeAreaView>
  );
};

export default ThankYou;

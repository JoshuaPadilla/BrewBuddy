import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import { util_icons } from "@/constants/icons";
import { goBack } from "@/helpers/router_function";

const FAQ = () => {
  return (
    <SafeAreaView className="flex-1 items-start">
      {/* Headings */}

      <CustomButton
        iconLeft={util_icons.back_icon}
        title="FAQ"
        btnClassname="flex-row items-center p-6 gap-3"
        textClassname="font-poppins-semibold text-black-100 text-xl"
        onPress={goBack}
      />

      <View className="p-4 text-center w-full">
        <Text className="font-poppins-semibold text-black-100 text-2xl mb-8">
          Frequetly Asked Question
        </Text>

        <CustomButton
          title="How does this app work?"
          btnClassname="flex-row justify-start w-full mb-2"
          textClassname="font-poppins-medium text-black-100 text-lg"
        />

        <CustomButton
          title="How are you?"
          btnClassname="flex-row justify-start w-full"
          textClassname="font-poppins-medium text-black-100 text-lg"
        />
      </View>
    </SafeAreaView>
  );
};

export default FAQ;

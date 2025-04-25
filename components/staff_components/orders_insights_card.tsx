import { View, Text } from "react-native";
import React from "react";
import CustomButton from "../custom_button";

interface ComponentProps {
  quantity: number | string;
  title: string;
  bgColor: string;
  onView?: () => void;
}

const OrdersInsightsCard = ({
  quantity,
  title,
  bgColor,
  onView,
}: ComponentProps) => {
  return (
    <View className={`p-4 rounded-lg w-[48%] ${bgColor} gap-2`}>
      <View className="flex-row justify-between items-start">
        <Text className="font-poppins-bold text-2xl text-black-100">
          {quantity}
        </Text>

        {onView && (
          <CustomButton
            title="view"
            textClassname="text-white"
            onPress={onView}
          />
        )}
      </View>

      <Text className="font-poppins-semibold text-m text-black-100/70">
        {title}
      </Text>
    </View>
  );
};

export default OrdersInsightsCard;

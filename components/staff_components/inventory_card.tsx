import { View, Text } from "react-native";
import React from "react";
import CustomButton from "../custom_button";
import { util_icons } from "@/constants/icons";

interface ComponentProps {
  item: InventoryItem;
  onEditPress: () => void;
}

const InventoryCard = ({ item, onEditPress }: ComponentProps) => {
  let borderColor;

  switch (item.status) {
    case "low":
      borderColor = "#F75555";
      break;
    case "in":
      borderColor = "#73C088";
      break;
    case "out":
      borderColor = "#ffcc80";
      break;
    default:
      break;
  }

  return (
    <View
      className={`flex-row bg-white p-4 rounded-lg border-l-2 justify-between`}
      style={{ borderColor: borderColor }}
    >
      {/* name and quantity */}
      <View className="gap-2">
        <Text className="font-poppins-semibold text-xl text-black-100 max-w-64">
          {item.name}
        </Text>

        <View className="flex-row gap-1">
          <Text className="font-poppins-medium text-sm text-black-100/50">
            Qty:{" "}
          </Text>

          <Text className="font-poppins-bold text-black-100">
            {item.quantity}
          </Text>
        </View>
      </View>

      {/* buttons */}
      <View className="gap-2 items-end">
        <CustomButton
          title="Edit"
          textClassname="font-poppins-regular text-black-300"
          btnClassname="flex-row gap-1 items-center"
          iconRight={util_icons.edit_icon}
          iconRightClassName="size-4"
          tintColor="#8C8E98"
          onPress={onEditPress}
        />

        <View className="flex-row gap-1">
          <Text
            className="font-poppins-medium text-black-100 text-lg"
            style={{ color: borderColor }}
          >
            {item.status === "in"
              ? `${item.status} stock`
              : `${item.status} on stock`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default InventoryCard;

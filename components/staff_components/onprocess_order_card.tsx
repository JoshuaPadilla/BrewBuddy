import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import CustomButton from "../custom_button";
import { priceFormatted } from "@/helpers/utils";

interface ComponentProps {
  order: Order;
  onComplete?: () => void;
  onViewDetails: () => void;
}

const OnProcessOrderCard = ({
  order,
  onComplete,
  onViewDetails,
}: ComponentProps) => {
  const imageURLs = order.items
    .slice(0, 14)
    .map((item) => item.productID.productImageUrl);

  const remainingItems = order.items.length - imageURLs.length;

  return (
    <View className="bg-primary-100 p-6 rounded-lg">
      {/* Headings (name and button) */}
      <View className="flex-row justify-between">
        <Text className="font-poppins-bold text-white text-xl">
          {order.userID?.firstName} {order.userID?.lastName}
        </Text>

        <CustomButton
          title="View details"
          textClassname="font-poppins-semibold text-white/60 text-sm mb-4"
          onPress={onViewDetails}
        />
      </View>

      {/* items and product */}
      <View className="flex-row pt-4">
        <View
          className="flex-row justify-between mt-4"
          style={{ width: 14 * 35 + 10 }}
        >
          {imageURLs.map((url, index) => (
            <Image
              source={url}
              style={{
                width: 35,
                height: 35,
                borderRadius: 999,
                position: "absolute",
                left: index * 20,
                bottom: 0,
                borderColor: "#fff",
                borderWidth: 2,
              }}
              key={index}
            />
          ))}
        </View>

        {remainingItems ? (
          <Text className="font-poppins-medium text-lg">
            +{remainingItems}...
          </Text>
        ) : (
          <Text className="font-poppins-medium text-lg"></Text>
        )}
      </View>

      <View className=" py-4">
        <Text className="font-poppins-regular text-white">
          {order.items.length} {order.items.length > 1 ? "items" : "item"}
        </Text>

        <Text className="font-poppins-medium text-xl text-white">
          Total: {priceFormatted(order.totalPrice)}
        </Text>
      </View>

      {onComplete && (
        <CustomButton
          title="Complete"
          btnClassname="items-center justify-center p-4 bg-white rounded-lg"
          textClassname="font-poppins-medium text-lg text-black-100"
          onPress={onComplete}
        />
      )}
    </View>
  );
};

export default OnProcessOrderCard;

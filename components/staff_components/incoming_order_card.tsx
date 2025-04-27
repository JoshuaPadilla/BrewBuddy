import { View, Text, Platform } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { priceFormatted, textShortener } from "@/helpers/utils";

interface ComponentProps {
  order: Order;
  isNext?: boolean;
}

const IncomingOrderCard = ({ order, isNext }: ComponentProps) => {
  const imageURLs = order.items
    .slice(0, 3)
    .map((item) => item.productID.productImageUrl);

  const remainingItems = order.items.length - imageURLs.length;

  return (
    <View
      className={`p-4 bg-white rounded-b-xl  ${
        isNext && "border-t-2 border-primary-100"
      }`}
    >
      <View className="flex-row justify-between mb-4">
        <Text className="font-poppins-medium text-black-100 text-lg">
          {textShortener(
            `${order.userID?.firstName} ${order.userID?.lastName}`,
            20
          )}
        </Text>
      </View>

      <View className="flex-row pt-4">
        <View className="flex-row justify-between mt-4" style={{ width: 80 }}>
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

      <View className="flex-row justify-between py-4">
        <Text className="font-poppins-regular text-black-100/50">
          {order.items.length} {order.items.length > 1 ? "items" : "item"}
        </Text>

        <Text className="font-poppins-medium text-m text-primary-100">
          Total: {priceFormatted(order.totalPrice)}
        </Text>
      </View>
    </View>
  );
};

export default IncomingOrderCard;

import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { images } from "@/constants/images";
import OrderItem from "./order_item";
import { dateTimeFormatted, priceFormatted } from "@/helpers/utils";
import CustomButton from "./custom_button";
import { util_icons } from "@/constants/icons";
import { goToViewOrder } from "@/helpers/router_function";

interface ComponentProps {
  order: Order;
  onPress: () => void;
}

const OrderActivityCard = ({ order, onPress }: ComponentProps) => {
  const [showItems, setShowItems] = useState(false);

  return (
    <View className="p-4 bg-white rounded-lg">
      {/* Headings */}
      <View className="flex-row items-center justify-between w-full ">
        <Text className="font-poppins-medium text-black-100 text-m">
          {order.status.toUpperCase()}
        </Text>

        <CustomButton
          title="See order"
          textClassname="text-primary-100/80 text-sm"
          onPress={onPress}
        />
      </View>

      {!showItems ? (
        <OrderItem item={order.items[0]} />
      ) : (
        order.items.map((item, index) => <OrderItem item={item} key={index} />)
      )}

      <View className="flex-row justify-between items-center pt-2">
        {order.items.length > 1 ? (
          <CustomButton
            title={
              showItems
                ? `hide ${order.items.length - 1} items`
                : `show ${order.items.length - 1} items`
            }
            iconLeft={
              showItems ? util_icons.dropdown_hide : util_icons.dropdown_icon
            }
            iconSize="size-4"
            textClassname="font-poppins regular text-primary-100"
            btnClassname="flex-row gap-1 items-center"
            onPress={() => setShowItems((prev) => (prev = !prev))}
          />
        ) : (
          <CustomButton />
        )}

        <View className="flex-row justify-end gap-2 items-center">
          <Text className="font-poppins-medium">Order Total:</Text>
          <Text className="font-poppins-bold text-primary-100 text-lg">
            {priceFormatted(order.totalPrice)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OrderActivityCard;

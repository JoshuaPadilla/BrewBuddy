import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useOrderStore } from "@/store/useOrders";
import OrderItem from "@/components/order_item";
import {
  dateTimeFormatted,
  getOrderStatusColor,
  priceFormatted,
} from "@/helpers/utils";
import CustomButton from "@/components/custom_button";
import { SafeAreaView } from "react-native-safe-area-context";
import { util_icons } from "@/constants/icons";
import { goBack } from "@/helpers/router_function";

const ViewOrder = () => {
  const { selectedOrder } = useOrderStore();
  const { createOrder, isCreating } = useOrderStore();

  const statusColor = getOrderStatusColor(selectedOrder?.status);

  const handleReOrder = () => {
    const newOrder: OrderForm = {
      items: selectedOrder?.items || [],
      totalPrice: selectedOrder?.totalPrice || 0,
    };

    createOrder(newOrder);
  };

  return (
    <SafeAreaView className="flex-1 px-6 py-8">
      <View className="flex-row items-center justify-between mb-8">
        <CustomButton iconLeft={util_icons.back_icon} onPress={goBack} />

        <Text className="font-poppins-semibold text-black-100">View Order</Text>

        <CustomButton />
      </View>

      <ScrollView
        contentContainerClassName="pb-[100px]"
        showsVerticalScrollIndicator={false}
      >
        <View className="p-4 bg-white rounded-lg">
          <View className="flex-row justify-between mb-2">
            <Text className="font-poppins-medium text-black-100 text-sm">
              {dateTimeFormatted(selectedOrder?.orderDate?.toString() || "")}
            </Text>

            <Text
              className="font-poppins-medium"
              style={{ color: statusColor }}
            >
              {selectedOrder?.status.toUpperCase()}
            </Text>
          </View>
          {selectedOrder?.items.map((item, index) => (
            <OrderItem item={item} key={index} />
          ))}

          <View className="flex-row justify-end gap-2 items-center mb-2">
            <Text className="font-poppins-medium">Order Total:</Text>
            <Text className="font-poppins-bold text-primary-100 text-lg">
              {priceFormatted(selectedOrder?.totalPrice)}
            </Text>
          </View>

          {selectedOrder?.status === "completed" && (
            <CustomButton
              title="Order Again"
              btnClassname="self-end px-6 py-4 bg-primary-100 rounded-lg"
              textClassname="font-poppins-semibold text-white"
              onPress={handleReOrder}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewOrder;

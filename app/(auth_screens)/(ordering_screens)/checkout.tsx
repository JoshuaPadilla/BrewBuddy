import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useCartStore } from "@/store/useCart";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import { util_icons } from "@/constants/icons";
import CheckoutItemCard from "@/components/checkout_item_card";
import { goBack } from "@/helpers/router_function";
import { priceFormatted } from "@/helpers/utils";
import { useOrderStore } from "@/store/useOrders";

const Checkout = () => {
  const { selectedItems, removeItem, setSelectedItems } = useCartStore();
  const { createOrder, isCreating } = useOrderStore();

  let total = selectedItems.reduce((acc, currItem) => {
    return (acc += currItem.itemTotalPrice);
  }, 0);

  const handleOnSubmitOrder = () => {
    const newOrder: OrderForm = {
      items: selectedItems,
      totalPrice: total,
    };

    createOrder(newOrder);

    selectedItems.forEach((item) => {
      removeItem(item._id || "");
    });

    setSelectedItems([]);
    total = 0;
  };

  return (
    <SafeAreaView className="flex-1 gap-4">
      {/* Headings */}

      <CustomButton
        iconLeft={util_icons.back_icon}
        title="Back to cart"
        btnClassname="flex-row items-center p-6 gap-3"
        textClassname="font-poppins-semibold text-black-100 text-xl"
        onPress={goBack}
      />

      <Text className="font-poppins-bold px-6 text-xl">Your order</Text>

      <ScrollView
        contentContainerClassName="pb-[100px] gap-1"
        showsVerticalScrollIndicator={false}
      >
        {isCreating && (
          <ActivityIndicator className="p-16" color="#73C088" size={"large"} />
        )}
        {selectedItems.map((item) => (
          <CheckoutItemCard item={item} key={item._id} />
        ))}
      </ScrollView>

      {!isCreating && (
        <View className="flex-row bg-white absolute w-full px-6 py-8 bottom-0 self-center rounded-xl justify-between">
          <View>
            <Text className="font-poppins-regular text-black-300 text-sm">
              Total:
            </Text>
            <Text className="font-poppins-bold text-primary-100 text-2xl">
              {priceFormatted(total)}
            </Text>
          </View>

          <TouchableOpacity
            className="bg-primary-100 py-2 px-4 rounded-lg items-center justify-center"
            onPress={handleOnSubmitOrder}
          >
            <Text className="font-poppins-medium text-white text-lg">
              Place Order ({selectedItems.length}{" "}
              {selectedItems.length > 1 ? "items" : "item"})
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Checkout;

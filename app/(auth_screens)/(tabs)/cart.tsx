import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import CartItem from "@/components/cart_item";
import { useCartStore } from "@/store/useCart";
import Spinner from "react-native-loading-spinner-overlay";
import { priceFormatted } from "@/helpers/utils";
import { goToCheckout } from "@/helpers/router_function";

const Cart = () => {
  const {
    cart,
    isLoading,
    fetchUserCartitems,
    removeItem,
    setSelectedItems: setCartSelectedItems,
  } = useCartStore();
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);

  const [total, setTotal] = useState(0);

  const calculateTotal = () => {
    setTotal(
      selectedItems.reduce((acc, currItem) => {
        return acc + currItem.itemTotalPrice;
      }, 0)
    );
  };

  const handleSelectItem = (item: OrderItem) => {
    setSelectedItems((prev) => [...prev, item]);
  };

  const handleUnselectItem = (id: string) => {
    setSelectedItems((prev) => prev.filter((item) => item._id !== id));
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const handleOnCheckoutSelected = () => {
    setCartSelectedItems(selectedItems);
    goToCheckout();
  };

  const handleOnCheckoutOne = (item: OrderItem) => {
    setCartSelectedItems([item]);
    goToCheckout();

    setIsSelecting(false);
  };

  useEffect(() => {
    fetchUserCartitems();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [selectedItems]);
  return (
    <SafeAreaView className="flex-1 px-4 py-8 gap-8">
      {/* headings */}
      <View className="flex-row justify-between">
        <Text className="font-poppins-bold text-black-100 text-xl">
          Your Cart
        </Text>
        <CustomButton
          title={isSelecting ? "Cancel" : "Select"}
          textClassname="font-poppins-medium text-primary-100"
          onPress={() => setIsSelecting((prev) => (prev = !prev))}
        />
      </View>

      {/* main */}

      <ScrollView
        contentContainerClassName="pb-[100px] gap-2"
        showsVerticalScrollIndicator={false}
      >
        {cart && cart.length > 0 ? (
          isLoading ? (
            <ActivityIndicator
              className="p-16"
              color="#73C088"
              size={"large"}
            />
          ) : (
            cart.map((orderItem, index) => (
              <CartItem
                orderItem={orderItem}
                key={index}
                isSelecting={isSelecting}
                onSelect={() => handleSelectItem(orderItem)}
                onUnselect={() => handleUnselectItem(orderItem._id || "")}
                onRemove={() => handleRemoveItem(orderItem._id || "")}
                onCheckout={() => handleOnCheckoutOne(orderItem)}
              />
            ))
          )
        ) : (
          <Text className="font-poppins-regular text-black-100/50 text-xl text-center">
            No Items in your cart
          </Text>
        )}
      </ScrollView>

      {isSelecting && (
        <View className="flex-row bg-white absolute w-full p-4 bottom-[90px] self-center rounded-xl justify-between">
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
            onPress={handleOnCheckoutSelected}
          >
            <Text className="font-poppins-medium text-white text-lg">
              Check out ({selectedItems.length}{" "}
              {selectedItems.length > 1 ? "items" : "item"})
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Cart;

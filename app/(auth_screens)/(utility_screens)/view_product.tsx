import {
  View,
  Text,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProductStore } from "@/store/useProduct";
import { Image } from "expo-image";
import { priceFormatted, showToast } from "@/helpers/utils";
import RadioButtonGroup from "@/components/radio_button_group";
import { ADD_ONS, SIZES, SWEETNESS } from "@/constants/cart_constants";
import CustomButton from "@/components/custom_button";
import { tab_icons, util_icons } from "@/constants/icons";
import { goBack, goToCart, goToProductForm } from "@/helpers/router_function";
import QuatityButton from "@/components/quantity_button";
import { useAuthStore } from "@/store/useAuth";
import { useCartStore } from "@/store/useCart";
import { Toast } from "react-native-toast-notifications";
import { useOrderStore } from "@/store/useOrders";
import TabbedSelector from "@/components/tabbed_selector";
import { useInventoryStore } from "@/store/useInventory";

const ViewProduct = () => {
  const { isAdmin } = useAuthStore();
  const { addOns } = useInventoryStore();

  const {
    selectedProduct,
    deleteProduct,
    changeAvailability,
    isUpdating,
    setAction,
  } = useProductStore();
  const { addToCart, cart, setSelectedItems } = useCartStore();

  const { createOrder } = useOrderStore();

  const [orderItem, setOrderItem] = useState<OrderItemForm>({
    quantity: 1,
    itemSize: { name: "Regular", price: 0 },
    addOns: { name: "", price: 0 },
    sweetnessLevel: {
      name: "Original",
      price: 0,
    },
    itemTotalPrice: selectedProduct!.productBasePrice,
  });

  function calculateTotal() {
    const newTotal =
      (selectedProduct!.productBasePrice +
        orderItem.addOns.price +
        orderItem.itemSize.price) *
      orderItem.quantity;

    setOrderItem((prev) => ({ ...prev, itemTotalPrice: newTotal }));
  }

  const availabilityRef = useRef(
    selectedProduct?.isAvailable ? "available" : "not available"
  );

  useEffect(() => {
    calculateTotal();
  }, [orderItem.addOns.name, orderItem.quantity, orderItem.itemSize.name]);

  const handleAddOnsSelect = (value: OptionItem) => {
    value === orderItem.addOns
      ? setOrderItem((prev) => ({ ...prev, addOns: { name: "", price: 0 } }))
      : setOrderItem((prev) => ({ ...prev, addOns: value }));
  };
  const handleSelectSize = (value: OptionItem) => {
    setOrderItem((prev) => ({
      ...prev,
      itemSize: value,
    }));
  };
  const handleAddQuantity = () => {
    setOrderItem(
      (prev) => (prev = { ...prev, quantity: (prev.quantity += 1) })
    );
  };
  const handleSubQuantity = () => {
    if (orderItem.quantity <= 1) return;

    setOrderItem(
      (prev) => (prev = { ...prev, quantity: (prev.quantity -= 1) })
    );
  };

  const handleAddToCart = () => {
    addToCart({ ...orderItem, productID: selectedProduct?._id });
    setOrderItem({
      quantity: 1,
      itemSize: { name: "Regular", price: 0 },
      addOns: { name: "", price: 0 },
      sweetnessLevel: {
        name: "Original",
        price: 0,
      },
      itemTotalPrice: selectedProduct!.productBasePrice,
    });

    showToast("Added to cart", "success");
  };

  const handleDeleteproduct = () => {
    deleteProduct(selectedProduct?._id || "");

    goBack();
  };

  const handleOnSubmitOrder = () => {
    const orderItemForm: OrderItem = {
      addOns: orderItem.addOns,
      itemSize: orderItem.itemSize,
      itemTotalPrice: orderItem.itemTotalPrice,
      quantity: orderItem.quantity,
      sweetnessLevel: orderItem.sweetnessLevel,
      productID: selectedProduct!,
    };

    const newOrder: OrderForm = {
      items: [orderItemForm],
      totalPrice: orderItem.itemTotalPrice,
    };

    createOrder(newOrder);

    setSelectedItems([]);
  };

  const handleEditProduct = () => {
    setAction("edit");

    goToProductForm();
  };

  const handleChangeAvailability = (status: string) => {
    availabilityRef.current = status;
    changeAvailability(selectedProduct?._id || "", status);
  };

  return (
    <View className="flex-1 bg-primary-100">
      <View className="flex-row justify-between p-6 items-center absolute py-16 z-10 w-full">
        <CustomButton
          iconLeft={util_icons.back_icon}
          onPress={goBack}
          tintColor="#fff"
        />

        {!isAdmin && (
          <View>
            <CustomButton
              iconLeft={tab_icons.tab_cart}
              onPress={goToCart}
              tintColor="#fff"
              iconSize="size-10"
            />

            <Text className="font-poppins-bold text-xs absolute -right-2 bg-blue-400 px-2 rounded-full -top-2 text-white">
              {cart.length}
            </Text>
          </View>
        )}
      </View>

      <View className="w-full h-[50%]">
        <Image
          source={selectedProduct?.productImageUrl}
          style={{ width: "100%", height: "100%" }}
          contentFit="fill"
        />
      </View>

      {/* Product Desc */}
      <View className="flex-1 bg-background pt-32">
        {/* total of order only for customer */}
        {!isAdmin && (
          <View className="flex-row justify-between px-6 pt-4">
            <Text className="font-poppins-bold text-black-100 text-2xl">
              Total:
            </Text>

            <Text className="font-poppins-bold text-primary-100 text-2xl">
              {priceFormatted(orderItem.itemTotalPrice)}
            </Text>
          </View>
        )}

        <View
          className="w-[90%] h-40 p-4 absolute -top-10 z-10 bg-white rounded-xl self-center"
          style={
            Platform.OS === "ios"
              ? {
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                }
              : { elevation: 4 }
          }
        >
          <View className="flex-row justify-between p-2 items-baseline">
            <Text className="font-poppins-semibold text-black-100 text-2xl">
              {selectedProduct?.productName}
            </Text>
            <Text className="font-poppins-bold text-primary-100 text-lg">
              {priceFormatted(selectedProduct?.productBasePrice)}
            </Text>
          </View>

          <View className="px-2">
            <Text className="font-poppins-medium text-black-100/80 text-lg">
              {selectedProduct?.productDescription}
            </Text>
          </View>
        </View>

        <ScrollView
          contentContainerClassName="pb-[100px] show p-4"
          showsVerticalScrollIndicator={false}
        >
          {/* options selection for customer and edit options for admin*/}
          {!isAdmin ? (
            <View className="px-4 py-2 gap-4">
              {/* size */}
              <View className="gap-4">
                <View className="flex-row gap-2 items-center">
                  <Text className="font-poppins-medium text-black-100 text-lg">
                    Brew Buddy size
                  </Text>

                  <Text className="font-poppins-regular text-black-300 text-md">
                    (Choose one)
                  </Text>
                </View>

                <RadioButtonGroup
                  options={SIZES}
                  onValueChange={(value) => handleSelectSize(value)}
                  selectedValue={orderItem.itemSize.name}
                />
              </View>

              {/* Sweetness */}
              <View className="gap-4">
                <View className="flex-row gap-2 items-center">
                  <Text className="font-poppins-medium text-black-100 text-lg">
                    Taste Preference
                  </Text>

                  <Text className="font-poppins-regular text-black-300 text-md">
                    (optional)
                  </Text>
                </View>

                <RadioButtonGroup
                  options={SWEETNESS}
                  onValueChange={(value) =>
                    setOrderItem((prev) => ({ ...prev, sweetnessLevel: value }))
                  }
                  selectedValue={orderItem.sweetnessLevel.name}
                />
              </View>

              {/* addOns */}
              <View className="gap-4">
                <View className="flex-row gap-2 items-center">
                  <Text className="font-poppins-medium text-black-100 text-lg">
                    Add Ons
                  </Text>

                  <Text className="font-poppins-regular text-black-300 text-md">
                    (optional)
                  </Text>
                </View>

                <RadioButtonGroup
                  options={addOns}
                  onValueChange={(value) => handleAddOnsSelect(value)}
                  selectedValue={orderItem.addOns.name}
                />
              </View>
            </View>
          ) : isUpdating ? (
            <ActivityIndicator
              className="p-16"
              color="#73C088"
              size={"large"}
            />
          ) : (
            // buttons for product actions
            <View className="p-4 gap-4">
              {/* for changing availability */}
              <View className="items-center justify-center">
                <TabbedSelector
                  data={["available", "not available"]}
                  onSelect={(selectedValue) =>
                    handleChangeAvailability(selectedValue)
                  }
                  defaultSelected={availabilityRef.current}
                />
              </View>

              <View>
                {/* for editing */}
                <CustomButton
                  title="Edit Product"
                  btnClassname=" flex-row gap-2 justify-center items-center bg-primary-100 rounded-lg p-4 mt-4"
                  textClassname="text-white font-poppins-semibold text-lg"
                  iconLeft={util_icons.edit_icon}
                  tintColor="#fff"
                  onPress={handleEditProduct}
                />

                {/* for deleting */}
                <CustomButton
                  title="Delete Product"
                  btnClassname=" flex-row gap-2 justify-center items-center bg-primary-100 rounded-lg p-4 mt-4"
                  textClassname="text-white font-poppins-semibold text-lg"
                  iconLeft={util_icons.trash_icon}
                  tintColor="#F75555"
                  onPress={handleDeleteproduct}
                />
              </View>
            </View>
          )}
        </ScrollView>

        {/* Buttons */}
        {!isAdmin && (
          <View className="flex-row bg-white w-full sticky pb-8 pt-2 px-6 bottom-0 z-50 gap-4 justify-between items-center">
            {/* quantity */}
            <View className="flex-row items-center justify-between">
              <CustomButton
                title="-"
                textClassname="font-poppins-bold text-white"
                btnClassname="items-center py-2 px-4 bg-primary-100 rounded-lg"
                onPress={handleSubQuantity}
              />

              <View className="px-5">
                <Text className="font-poppins-bold text-primary-100 text-xl">
                  {orderItem.quantity}
                </Text>
              </View>

              <CustomButton
                title="+"
                textClassname="font-poppins-bold text-white"
                btnClassname="items-center py-2 px-4 bg-primary-100 rounded-lg"
                onPress={handleAddQuantity}
              />
            </View>

            {/* Buttons */}
            <View className="flex-row gap-2">
              <CustomButton
                title="Add to cart"
                btnClassname="px-4 py-2 items-center justify-center border-primary-100 border-2 mt-4 rounded-xl"
                textClassname="font-poppins-semibold text-primary-100 text-lg"
                onPress={handleAddToCart}
              />

              <CustomButton
                title="Buy now"
                btnClassname="px-4 py-2 items-center justify-center bg-primary-100 mt-4 rounded-xl"
                textClassname="font-poppins-semibold text-white text-lg"
                onPress={handleOnSubmitOrder}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default ViewProduct;

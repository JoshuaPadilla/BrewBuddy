import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import { useProductStore } from "@/store/useProduct";
import { priceFormatted } from "@/helpers/utils";
import QuatityButton from "./quantity_button";
import RadioButtonGroup from "./radio_button_group";
import { ADD_ONS, SIZES, SWEETNESS } from "@/constants/cart_constants";
import CustomButton from "./custom_button";
import { useCartStore } from "@/store/useCart";
import { Image } from "expo-image";
import { useInventoryStore } from "@/store/useInventory";

interface Props {
  onSubmit: () => void;
}

const BottomSheetComponent = ({ onSubmit }: Props) => {
  const { selectedProduct } = useProductStore();
  const { addToCart } = useCartStore();
  const { addOns } = useInventoryStore();

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

  const handleAddOnsSelect = (value: OptionItem) => {
    value === orderItem.addOns
      ? setOrderItem((prev) => ({ ...prev, addOns: { name: "", price: 0 } }))
      : setOrderItem((prev) => ({ ...prev, addOns: value }));
  };

  function calculateTotal() {
    const newTotal =
      (selectedProduct!.productBasePrice +
        orderItem.addOns.price +
        orderItem.itemSize.price) *
      orderItem.quantity;

    setOrderItem((prev) => ({ ...prev, itemTotalPrice: newTotal }));
  }

  const handleAddQuantity = () => {
    setOrderItem((prev) => ({
      ...prev,
      quantity: (prev.quantity += 1),
    }));
  };

  const handleSubQuantity = () => {
    if (orderItem.quantity <= 1) return;
    setOrderItem((prev) => ({
      ...prev,
      quantity: (prev.quantity -= 1),
    }));
  };

  const handleSelectSize = (value: OptionItem) => {
    setOrderItem((prev) => ({
      ...prev,
      itemSize: value,
    }));
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
    onSubmit();
  };

  useEffect(() => {
    calculateTotal();
  }, [orderItem.addOns.name, orderItem.quantity, orderItem.itemSize.name]);
  return (
    <View>
      <ScrollView
        contentContainerClassName="pb-[150px] px-4 gap-4 "
        showsVerticalScrollIndicator={false}
      >
        {/* product */}
        <View className="flex-row gap-4 ">
          <View className="size-40 rounded-lg overflow-hidden">
            <Image
              source={selectedProduct?.productImageUrl}
              contentFit="cover"
              key={selectedProduct?.productName}
              style={{ width: "100%", height: "100%" }}
            />
          </View>

          {/* info and quantity*/}
          <View className="justify-between">
            <View>
              <Text className="font-poppins-semibold text-black-100 text-xl max-w-[200px]">
                {selectedProduct?.productName}
              </Text>

              <Text>
                Base price: {priceFormatted(selectedProduct?.productBasePrice)}
              </Text>
            </View>

            <View className="gap-2">
              <Text className="font-poppins-regular">Quantity</Text>

              <QuatityButton
                currentValue={orderItem.quantity}
                onAdd={handleAddQuantity}
                onSub={handleSubQuantity}
              />
            </View>
          </View>
        </View>

        {/* Total */}
        <View className="flex-row justify-between px-4 pt-4">
          <Text className="font-poppins-bold text-black-100 text-2xl">
            Total:
          </Text>

          <Text className="font-poppins-bold text-primary-100 text-2xl">
            {priceFormatted(orderItem.itemTotalPrice)}
          </Text>
        </View>

        {/* options selection */}
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

        <CustomButton
          title="Add to cart"
          btnClassname="p-4 items-center justify-center bg-primary-100 mt-4 rounded-xl"
          textClassname="font-poppins-semibold text-white text-lg"
          onPress={handleAddToCart}
        />
      </ScrollView>
    </View>
  );
};

export default BottomSheetComponent;

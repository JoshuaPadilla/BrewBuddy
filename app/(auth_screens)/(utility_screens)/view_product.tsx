import { View, Text, Platform, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProductStore } from "@/store/useProduct";
import { Image } from "expo-image";
import { priceFormatted } from "@/helpers/utils";
import RadioButtonGroup from "@/components/radio_button_group";
import { ADD_ONS, SIZES, SWEETNESS } from "@/constants/cart_constants";
import CustomButton from "@/components/custom_button";
import { util_icons } from "@/constants/icons";
import { goBack } from "@/helpers/router_function";

const ViewProduct = () => {
  const { selectedProduct } = useProductStore();

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
  const handleSelectSize = (value: OptionItem) => {
    setOrderItem((prev) => ({
      ...prev,
      itemSize: value,
    }));
  };

  return (
    <View className="flex-1 bg-primary-100">
      <CustomButton
        iconLeft={util_icons.back_icon}
        btnClassname="flex-row items-center p-6 gap-3 absolute px-4 py-14 z-10"
        textClassname="font-poppins-semibold text-black-100 text-xl"
        onPress={goBack}
        tintColor="#fff"
      />

      <View className="w-full h-[50%]">
        <Image
          source={selectedProduct?.productImageUrl}
          style={{ width: "100%", height: "100%" }}
          contentFit="fill"
        />
      </View>

      {/* Product Desc */}
      <View className="flex-1 bg-background pt-32">
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
          {/* Name and base price */}
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
                options={ADD_ONS}
                onValueChange={(value) => handleAddOnsSelect(value)}
                selectedValue={orderItem.addOns.name}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ViewProduct;

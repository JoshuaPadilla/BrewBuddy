import { View, Text } from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import { images } from "@/constants/images";
import CustomButton from "./custom_button";
import QuatityButton from "./quantity_button";
import { priceFormatted } from "@/helpers/utils";
import { util_icons } from "@/constants/icons";
import { blurhash } from "@/constants";

interface ComponentProps {
  orderItem: OrderItem;
  isSelecting: boolean;
  onSelect: () => void;
  onUnselect: () => void;
  onRemove: () => void;
  onCheckout: () => void;
}

const CartItem = ({
  orderItem,
  isSelecting,
  onUnselect,
  onSelect,
  onRemove,
  onCheckout,
}: ComponentProps) => {
  const [selected, setSelected] = useState(false);

  const handleOnSelect = () => {
    setSelected(true);
    onSelect();
  };

  const handleUnselet = () => {
    setSelected(false);
    onUnselect();
  };

  const handleOnRemove = () => {
    onRemove();
  };

  const handleOnCheckout = () => {
    onCheckout();
  };

  return (
    <View>
      <View className="flex-row gap-4 bg-white py-4 pl-4 rounded-lg">
        <View className="size-32 rounded-lg overflow-hidden">
          <Image
            source={
              orderItem.productID.productImageUrl
                ? orderItem.productID.productImageUrl
                : undefined
            }
            style={{ width: "100%", height: "100%" }}
            placeholder={{ blurhash }}
            contentFit="cover"
          />
        </View>

        <View className="gap-2 flex-row justify-between flex-1">
          {/* title and options */}
          <View className="">
            <Text className="font-poppins-semibold text-black-100 text-lg max-w-32">
              {orderItem.productID.productName}
            </Text>

            {/*order options */}
            <View className="flex items-start gap-1">
              {/* size */}
              <View className="flex-row items-end gap-1">
                <Text className="font-poppins-light text-black-300 text-xs">
                  size:
                </Text>
                <Text className="font-poppins-medium text-black-100 text-sm">
                  {orderItem.itemSize.name}
                </Text>
              </View>

              {/* Sweetness */}
              <View className="flex-row items-end gap-1">
                <Text className="font-poppins-light text-black-300 text-xs">
                  sweet:
                </Text>
                <Text className="font-poppins-medium text-black-100 text-xs">
                  {orderItem.sweetnessLevel.name}
                </Text>
              </View>

              {/* add ons */}
              <View className="flex-row items-end gap-1 ">
                <Text className="font-poppins-light text-black-300 text-xs">
                  add on:
                </Text>
                <Text className="font-poppins-medium text-black-100 text-xs">
                  {orderItem.addOns.name || "None"}
                </Text>
              </View>
            </View>
          </View>

          {/* price quant and button */}
          <View className="absolute right-4 items-end justify-between h-full pb-2">
            {isSelecting ? (
              <View className="flex-row">
                {selected ? (
                  <CustomButton
                    iconLeft={util_icons.check_icon}
                    btnClassname="rounded-full bg-primary-100 p-1 items-center justify-center size-6"
                    iconSize="size-4"
                    tintColor="#FFFFFF"
                    onPress={handleUnselet}
                  />
                ) : (
                  <CustomButton
                    btnClassname="rounded-full border border-primary-100 p-1 items-center justify-center size-6"
                    iconSize="size-4"
                    onPress={handleOnSelect}
                  />
                )}
              </View>
            ) : (
              <CustomButton
                title="checkout"
                btnClassname="py-1 px-2 bg-primary-100 rounded-lg"
                onPress={handleOnCheckout}
                textClassname="text-white font-poppins-medium text-sm"
              />
            )}

            <View className="items-end">
              <Text className="font-poppins-semibold text-primary-100 text-xl ">
                {priceFormatted(orderItem.itemTotalPrice)}
              </Text>

              {/* qty */}
              <View className="flex-row items-end gap-1">
                <Text className="font-poppins-bold text-primary-100 text-md">
                  {orderItem.quantity} items
                </Text>
              </View>
            </View>

            <CustomButton
              iconLeft={util_icons.trash_icon}
              tintColor="#8C8E98"
              onPress={handleOnRemove}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

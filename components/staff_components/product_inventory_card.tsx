import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import CustomButton from "../custom_button";
import { priceFormatted } from "@/helpers/utils";

interface ComponentProps {
  product: Product;
}

const ProductInventoryCard = ({ product }: ComponentProps) => {
  return (
    <View className="bg-white p-4 rounded-lg flex-row gap-4 items-start h-[132px]">
      <Image
        source={product.productImageUrl}
        style={{ width: 100, height: 100, borderRadius: 5 }}
      />
      <View className="flex-1 h-full justify-between py-2">
        <View className="flex-row items-start justify-between">
          <Text className="font-poppins-semibold text-black-100 text-xl max-w-32">
            {product.productName.replace("Milk Tea", "")}
          </Text>

          <CustomButton
            title="View"
            textClassname="font-poppins-semibold text-sm text-primary-100/70"
          />
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="font-poppins-semibold text-black-100/70 text-sm">
            {product.productCategory}
          </Text>

          <Text className="font-poppins-bold text-primary-100 text-lg">
            {priceFormatted(product.productBasePrice)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProductInventoryCard;

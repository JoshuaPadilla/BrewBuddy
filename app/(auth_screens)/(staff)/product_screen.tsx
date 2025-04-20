import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import { util_icons } from "@/constants/icons";
import { useProductStore } from "@/store/useProduct";
import ProductInventoryCard from "@/components/staff_components/product_inventory_card";

const ProductScreen = () => {
  const { products } = useProductStore();
  return (
    <SafeAreaView className="flex-1 py-6 bg-primary-100">
      {/* headigns */}
      <View className="flex-row justify-between px-6">
        <Text className="font-poppins-medium text-white text-3xl">Product</Text>

        <CustomButton
          iconLeft={util_icons.plus_icon}
          title="Add"
          btnClassname="flex-row gap-2 items-center px-4 py-2 rounded-xl"
          textClassname="font-poppins-semibold text-white"
          iconSize="size-4"
        />
      </View>

      <View className="flex-row gap-2 pt-2 px-6 items-baseline">
        <Text className="font-poppins-regular text-white/80">
          Total Product:
        </Text>
        <Text className="font-poppins-semibold text-xl text-white">
          {products.length}
        </Text>
      </View>

      <View className="rounded-t-[20px] bg-background mt-2 px-4 py-8 overflow-visible">
        <ScrollView
          contentContainerClassName="pb-[150px] gap-4 p-2"
          showsVerticalScrollIndicator={false}
        >
          {products.map((product, index) => (
            <View className="shadow" key={index}>
              <ProductInventoryCard product={product} />
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProductScreen;

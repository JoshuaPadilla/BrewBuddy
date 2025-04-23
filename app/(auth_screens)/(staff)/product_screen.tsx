import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import { util_icons } from "@/constants/icons";
import { useProductStore } from "@/store/useProduct";
import ProductInventoryCard from "@/components/staff_components/product_inventory_card";
import { goToProductForm } from "@/helpers/router_function";

const ProductScreen = () => {
  const {
    products,
    fetchAllProducts,
    isLoading,
    isAdding,
    isDeleting,
    setAction,
    selectedProduct,
  } = useProductStore();

  const handleAddproduct = () => {
    setAction("add");
    goToProductForm();
  };

  useEffect(() => {
    fetchAllProducts();
  }, [selectedProduct]);

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
          onPress={handleAddproduct}
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

      <View className="rounded-t-[20px] bg-background mt-2 px-4 py-8 overflow-visible h-full">
        {isLoading ? (
          <View className="items-center justify-start p-16">
            <ActivityIndicator
              className="p-16"
              color="#73C088"
              size={"large"}
            />
          </View>
        ) : (
          <ScrollView
            contentContainerClassName="pb-[150px] gap-4 p-2"
            showsVerticalScrollIndicator={false}
          >
            {(isAdding || isDeleting) && (
              <ActivityIndicator
                className="p-16"
                color="#73C088"
                size={"large"}
              />
            )}
            {products.map((product, index) => (
              <View className="shadow" key={index}>
                <ProductInventoryCard product={product} />
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProductScreen;

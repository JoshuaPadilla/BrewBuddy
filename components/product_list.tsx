import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import ProductCard from "./product_card";

interface ComponentProps {
  list: Product[];
  isLoading?: boolean;
  onAddToCartPress?: () => void;
  title: string;
}

const ProductList = ({
  list,
  isLoading,
  onAddToCartPress,
  title,
}: ComponentProps) => {
  return (
    <View className="overflow-hidden w-full">
      <Text className="font-poppins-bold text-black-100 text-2xl self-start">
        {title}
      </Text>

      {isLoading ? (
        <ActivityIndicator color={"#73C088"} className="p-32" size={"large"} />
      ) : (
        <View className="flex-row justify-between flex-wrap overflow-hidden">
          {list.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              onAddToCartPress={onAddToCartPress}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default ProductList;

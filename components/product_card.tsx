import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { images } from "@/constants/images";
import { useProductStore } from "@/store/useProduct";
import { textShortener } from "@/helpers/utils";
import CustomButton from "./custom_button";
import { util_icons } from "@/constants/icons";
import { useAuthStore } from "@/store/useAuth";
import { goToLogin, goToViewProduct } from "@/helpers/router_function";
import { Image } from "expo-image";
import { blurhash } from "@/constants";

interface ProductCardProps {
  product: Product;
  onAddToCartPress?: () => void;
}

const ProductCard = ({ product, onAddToCartPress }: ProductCardProps) => {
  const { authUser } = useAuthStore();
  const { setSelectedProduct } = useProductStore();

  const handleProductPress = () => {
    if (!authUser) {
      return goToLogin();
    }

    if (!product.isAvailable) return;

    setSelectedProduct(product);
    goToViewProduct();
  };

  const handleAddToCart = () => {
    if (!product.isAvailable) return;

    setSelectedProduct(product);
    onAddToCartPress && onAddToCartPress();
  };

  return (
    <>
      <View className="px-2 w-[48%] h-[250px] mb-4 items-center gap-2 overflow-hidden">
        {!product.isAvailable && (
          <View className="flex-row absolute z-10 px-4 p-1 top-2 -left-1 bg-danger rounded-r-xl">
            <Text className="text-white font-poppins-medium text-sm">
              Not Available
            </Text>
          </View>
        )}
        <View className={`${!product.isAvailable && "opacity-50 "}`}>
          {/* product image */}
          <TouchableOpacity
            className="w-52 h-52 p-2 rounded-lg"
            onPress={handleProductPress}
          >
            <Image
              source={
                product.productImageUrl ? product.productImageUrl : undefined
              }
              contentFit="cover"
              style={{ width: "100%", height: "100%", borderRadius: 5 }}
              placeholder={{ blurhash }}
            />
          </TouchableOpacity>

          {/* product name and price */}
          <View className="flex-row justify-between w-full items-end pl-4">
            <View>
              <Text className="font-poppins-medium">
                {textShortener(product.productName, 16)}
              </Text>
              <Text className="font-poppins-semibold text-primary-100">
                &#8369; {product.productBasePrice.toFixed(2)}
              </Text>
            </View>

            <CustomButton
              iconLeft={util_icons.add_to_cart_icon}
              iconSize="size-6"
              onPress={handleAddToCart}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default ProductCard;

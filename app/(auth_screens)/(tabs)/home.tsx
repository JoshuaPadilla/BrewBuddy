import {
  ActivityIndicator,
  Button,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "@/components/product_card";
import SearchBar from "@/components/search_bar";
import CustomButton from "@/components/custom_button";
import { images } from "@/constants/images";
import { useProductStore } from "@/store/useProduct";
import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";
import BottomSheetComponent from "@/components/bottomSheetContent";
import { useCartStore } from "@/store/useCart";
import ProductList from "@/components/product_list";
import socket from "@/lib/socket";

const HomeTab = () => {
  const sheetRef = useRef<BottomSheetMethods>(null);

  const { products, isLoading, fetchAllProducts, selectedProduct } =
    useProductStore();

  useEffect(() => {
    fetchAllProducts();

    socket.on("refreshProduct", () => {
      fetchAllProducts();
    });
  }, []);

  const classicProducts = products.filter(
    (product) => product.productCategory === "Classic"
  );

  const fruitFlavored = products.filter(
    (product) => product.productCategory === "Fruit-Flavored"
  );

  const dessert = products.filter(
    (product) => product.productCategory === "Dessert-Inspired"
  );

  const handleCartPress = () => {
    sheetRef.current?.open();
  };

  const handleAddToCartSubmit = () => {
    sheetRef.current?.close();
  };

  const [query, setQuery] = useState("");

  return (
    <>
      <SafeAreaView className="px-4 py-8 flex-1">
        {/* headings */}
        <View className="flex-row mt-4 mb-4 justify-between items-center">
          <Text className="font-poppins-bold text-black-100 text-xl">
            Ready to Place an order?
          </Text>

          <CustomButton iconLeft={images.sample_avatar} iconSize="size-12" />
        </View>

        {/* search bar */}
        <View className="p-2 mb-4">
          <SearchBar
            onSubmit={() => {}}
            placeholder="search"
            queryValue={query}
            setQuery={setQuery}
          />
        </View>

        {/* Product Lists */}

        <ScrollView
          contentContainerClassName="pb-[100px] gap-4"
          showsVerticalScrollIndicator={false}
        >
          {/* Classic Milk Teas */}

          <ProductList
            onAddToCartPress={handleCartPress}
            list={classicProducts}
            isLoading={isLoading}
            title="Classic Milk Teas"
          />

          <ProductList
            onAddToCartPress={handleCartPress}
            list={fruitFlavored}
            isLoading={isLoading}
            title="Fruit Flavored Milk Teas"
          />

          <ProductList
            onAddToCartPress={handleCartPress}
            list={dessert}
            isLoading={isLoading}
            title="Dessert Inspired Milk Teas"
          />
        </ScrollView>
      </SafeAreaView>
      <BottomSheet
        ref={sheetRef}
        height="90%"
        modal={false}
        closeDuration={100}
        style={{ backgroundColor: "#FFFFFF" }}
        disableBodyPanning={true}
      >
        <View>
          {selectedProduct && (
            <BottomSheetComponent onSubmit={handleAddToCartSubmit} />
          )}
        </View>
      </BottomSheet>
    </>
  );
};

export default HomeTab;

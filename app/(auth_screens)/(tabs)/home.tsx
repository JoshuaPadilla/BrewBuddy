import {
  ActivityIndicator,
  Button,
  Keyboard,
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
import { useInventoryStore } from "@/store/useInventory";
import { goToProfile } from "@/helpers/router_function";
import { useAuthStore } from "@/store/useAuth";

const HomeTab = () => {
  const sheetRef = useRef<BottomSheetMethods>(null);
  const { authUser } = useAuthStore();

  const { products, isLoading, fetchAllProducts, selectedProduct } =
    useProductStore();
  const { getAllItems } = useInventoryStore();

  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchAllProducts();
    getAllItems();

    socket.on("refreshProduct", () => {
      fetchAllProducts();
    });

    socket.on("refreshItems", () => {
      getAllItems();
    });
  }, []);

  const classicProducts = query
    ? products.filter(
        (product) =>
          product.productCategory === "Classic" &&
          product.productName.toLowerCase().includes(query.toLowerCase())
      )
    : products.filter((product) => product.productCategory === "Classic");

  const fruitFlavored = query
    ? products.filter(
        (product) =>
          product.productCategory === "Fruit-Flavored" &&
          product.productName.toLowerCase().includes(query.toLowerCase())
      )
    : products.filter(
        (product) => product.productCategory === "Fruit-Flavored"
      );

  const dessert = query
    ? products.filter(
        (product) =>
          product.productCategory === "Dessert-Inspired" &&
          product.productName.toLowerCase().includes(query.toLowerCase())
      )
    : products.filter(
        (product) => product.productCategory === "Dessert-Inspired"
      );

  const handleCartPress = () => {
    sheetRef.current?.open();
  };

  const handleAddToCartSubmit = () => {
    sheetRef.current?.close();
  };

  return (
    <>
      <SafeAreaView className="px-4 py-8 flex-1">
        {/* headings */}
        <View className="flex-row mt-4 mb-4 justify-between items-center">
          <Text className="font-poppins-bold text-black-100 text-xl">
            Ready to Place an order?
          </Text>

          <CustomButton
            title={`${authUser?.firstName
              .at(0)
              ?.toUpperCase()} ${authUser?.lastName.at(0)?.toUpperCase()}`}
            onPress={goToProfile}
            textClassname="font-poppins-bold text-primary-100 text-xl"
            btnClassname="bg-gray-white size-10 rounded-full items-center justify-center border-2 border-primary-100"
          />
        </View>

        {/* search bar */}
        <View className="p-2 mb-4">
          <SearchBar
            onSubmit={Keyboard.dismiss}
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

          {classicProducts.length > 0 && (
            <ProductList
              onAddToCartPress={handleCartPress}
              list={classicProducts}
              isLoading={isLoading}
              title="Classic Milk Teas"
            />
          )}

          {fruitFlavored.length > 0 && (
            <ProductList
              onAddToCartPress={handleCartPress}
              list={fruitFlavored}
              isLoading={isLoading}
              title="Fruit Flavored Milk Teas"
            />
          )}

          {dessert.length > 0 && (
            <ProductList
              onAddToCartPress={handleCartPress}
              list={dessert}
              isLoading={isLoading}
              title="Dessert Inspired Milk Teas"
            />
          )}
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

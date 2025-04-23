import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Image as RNImage,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants/images";
import { util_icons } from "@/constants/icons";
import ProductCard from "@/components/product_card";
import CustomButton from "@/components/custom_button";
import { goToHome, goToLogin } from "@/helpers/router_function";
import { useProductStore } from "@/store/useProduct";
import { Image } from "expo-image";
import ProductList from "@/components/product_list";
import socket from "@/lib/socket";

const Welcome = () => {
  const totalScreenHeight = Dimensions.get("screen").height;
  const totalScreenWidth = Dimensions.get("screen").width;
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

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="pb-[100px]" showsVerticalScrollIndicator={false}>
        <View className="bg-primary-100 pt-20">
          <View
            className={`bg-primary-100 items-center pt-10`}
            style={{ height: totalScreenHeight * 0.55 }}
          >
            {/* Headings */}
            <View className="items-center justify-center">
              <Text className="font-jomhuria-regular text-7xl text-white">
                BrewBuddy
              </Text>
              {/* Image */}
              <View className="shadow drop-shadow-2xl ">
                <Image
                  source={images.banner}
                  contentFit="contain"
                  style={{
                    width: totalScreenWidth,
                    height: 250,
                    borderRadius: 30,
                  }}
                />
              </View>
            </View>

            {/* main */}
            <View className="bg-white h-60 w-5/6 absolute -bottom-32 rounded-2xl p-4 shadow">
              {/* text */}
              <View className="items-center gap-[-20px]">
                <Text
                  className="font-jomhuria-regular text-primary-100 "
                  style={{
                    fontSize: 32,
                    margin: 0,
                    padding: 0,
                    lineHeight: 25,
                  }}
                >
                  Welcome To
                </Text>
                <Text
                  className="font-jomhuria-regular"
                  style={{
                    fontSize: 48,
                    margin: 0,
                    padding: 0,
                    lineHeight: 40,
                  }}
                >
                  BREW BUDDY
                </Text>
                <Text
                  className="font-judson-italic"
                  style={{
                    fontSize: 16,
                    margin: 0,
                    padding: 0,
                    lineHeight: 15,
                  }}
                >
                  Brewing Happiness, Just for you
                </Text>
              </View>

              {/* tab */}
              <View className="items-center mt-4">
                <View className="rounded-full w-[80%] h-[50px] bg-primary-200 overflow-hidden flex-row justify-between">
                  <View className="items-center justify-center h-full w-[50%] bg-primary-100 rounded-full">
                    <Text className="font-poppins-medium text-white text-sm">
                      SELF PICK-UP
                    </Text>
                  </View>

                  <View className="items-center justify-center h-full w-[50%] bg-primary-200 rounded-full">
                    <Text className="font-poppins-medium text-primary-100 text-sm">
                      DELIVERY
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-row gap-2 items-center justify-center mt-3">
                <RNImage source={util_icons.clock} className="size-8" />

                <Text className="font-poppins-semibold text-black-100 text-sm">
                  Self pick-up: ASAP (15-30 mins)
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          className="items-center justify-center gap-2
          "
          style={{ height: totalScreenHeight * 0.4 }}
        >
          <CustomButton
            title="Login to Brew Buddy"
            btnClassname={`border-2 border-primary-100 rounded-xl w-[80%] items-center justify-center p-4`}
            textClassname="font-poppins-bold text-primary-100 text-xl"
            onPress={goToLogin}
          />
        </View>

        {/* Menu Items */}

        {isLoading ? (
          <ActivityIndicator
            color={"#73C088"}
            className="p-32"
            size={"large"}
          />
        ) : (
          <View className="px-4 pb-[50px]">
            <ProductList
              onAddToCartPress={goToLogin}
              list={classicProducts}
              isLoading={isLoading}
              title="Classic Milk Teas"
            />

            <ProductList
              onAddToCartPress={goToLogin}
              list={fruitFlavored}
              isLoading={isLoading}
              title="Fruit Flavored Milk Teas"
            />

            <ProductList
              onAddToCartPress={goToLogin}
              list={dessert}
              isLoading={isLoading}
              title="Dessert Inspired Milk Teas"
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;

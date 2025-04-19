import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderActivityCard from "@/components/order_activity_card";
import OrdersInsightsCard from "@/components/staff_components/orders_insights_card";
import { useOrderStore } from "@/store/useOrders";
import IncomingOrderCard from "@/components/staff_components/incoming_order_card";
import CustomButton from "@/components/custom_button";
import OnProcessOrderCard from "@/components/staff_components/onprocess_order_card";
import socket from "@/lib/socket";
import { util_icons } from "@/constants/icons";

const OrdersScreen = () => {
  const {
    pendingOrders,
    processingOrders,
    completedOrders,
    getAllOrders,
    moveItemToProcessing,
    completeOrder,
    isCompleting,
  } = useOrderStore();

  useEffect(() => {
    getAllOrders();

    // Listen for incoming 'chat message' event
    socket.on("orderProcessed", (order: Order) => {
      getAllOrders();
    });

    socket.on("newIncomingOrder", (order: Order) => {
      getAllOrders();
    });

    socket.on("onCompleteOrder", (order: Order) => {
      getAllOrders();
    });

    // Clean up the connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures this runs only once on mount and unmount

  const handleAddProcess = () => {
    if (pendingOrders.length < 1) return;

    moveItemToProcessing(pendingOrders.at(0)?._id || "");
  };

  const handleOnCompleteOrder = async (orderID: string) => {
    completeOrder(orderID);
  };

  return (
    <SafeAreaView className="flex-1 py-8 bg-background">
      {/*  */}
      <View className="px-6">
        <Text className="font-jomhuria-regular text-primary-100 text-5xl">
          BrewBuddy.
        </Text>
      </View>

      <View className="px-6">
        <View className="flex-row justify-between mb-6">
          <OrdersInsightsCard
            quantity={pendingOrders.length}
            title="Pending Orders"
            bgColor="bg-status-pending"
          />
          <OrdersInsightsCard
            quantity={completedOrders.length}
            title="Completed Orders"
            bgColor="bg-status-completed"
          />
        </View>
      </View>

      {/* Order queue */}
      <View className="pl-6">
        <Text className="font-poppins-medium text-black-100 text-lg mb-2">
          Order queue:{" "}
          {pendingOrders.length > 0
            ? `${pendingOrders.length} ${
                pendingOrders.length > 1 ? "items" : "item"
              }`
            : "no pending order"}
        </Text>

        <View className="mb-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="pr-[100px] gap-2 overflow-visible"
          >
            {pendingOrders.length >= 1 ? (
              pendingOrders.map((order, index) => {
                return (
                  <IncomingOrderCard
                    order={order}
                    key={index}
                    isNext={index === 0}
                  />
                );
              })
            ) : (
              <View className="w-full items-center justify-center p-8">
                <Text className="font-poppins-medium text-black-100/50 text-xl">
                  No Incoming Orders
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>

      <View className="flex-1 px-6">
        <View className="flex-row justify-between items-center pb-4">
          <Text className="font-poppins-medium text-black-100 text-lg mb-4">
            Proccessing Orders: {processingOrders.length}
          </Text>

          <CustomButton
            title="Add Process"
            onPress={handleAddProcess}
            btnClassname="px-4 py-2 bg-primary-100 items-center rounded-xl justify-center flex-row gap-2"
            iconLeft={util_icons.plus_icon}
            iconSize="size-4"
            textClassname="font-poppins-medium text-white text-m"
          />
        </View>

        <ScrollView
          contentContainerClassName="gap-2 pb-[70px]"
          showsVerticalScrollIndicator={false}
        >
          {isCompleting && (
            <ActivityIndicator
              className="p-16"
              color="#73C088"
              size={"large"}
            />
          )}

          {processingOrders.map((order, index) => (
            <OnProcessOrderCard
              order={order}
              key={index}
              onComplete={() => handleOnCompleteOrder(order._id)}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default OrdersScreen;

import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TabSelect from "@/components/tab_select";
import { useOrderStore } from "@/store/useOrders";
import OrderActivityCard from "@/components/order_activity_card";
import { goToViewOrder } from "@/helpers/router_function";
import DatePickerModal from "@/components/date_picker_modal";
import moment from "moment";
import CustomButton from "@/components/custom_button";
import { util_icons } from "@/constants/icons";
import { dateTimeFormatted } from "@/helpers/utils";
import socket from "@/lib/socket";

const ACTIVITY_OPTIONS = ["ON GOING", "COMPLETED"];

const Activities = () => {
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [currDate, setCurrDate] = useState(moment().format("YYYY-MM-DD"));
  const { orders, getUserOrders, setSelectedOrder } = useOrderStore();

  const [filter, setFilter] = useState("ON GOING");

  const filteredOrders =
    filter === "ON GOING"
      ? orders.filter(
          (order) =>
            order.status !== "cancelled" && order.status !== "completed"
        )
      : orders.filter(
          (order) => order.status !== "pending" && order.status !== "processing"
        );

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);

    goToViewOrder();
  };

  useEffect(() => {
    getUserOrders(currDate);
  }, [currDate, getUserOrders]);

  useEffect(() => {
    socket.on("orderProcessed", () => {
      getUserOrders(moment().format("YYYY-MM-DD"));
    });
    socket.on("onCompleteOrder", () => {
      getUserOrders(moment().format("YYYY-MM-DD"));
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 gap-8">
      <DatePickerModal
        modalVisible={dateModalVisible}
        setModalVisible={setDateModalVisible}
        setDate={setCurrDate}
        maxDate={moment().format("YYYY-MM-DD")}
      />

      <TabSelect
        options={ACTIVITY_OPTIONS}
        selected={filter}
        setSelected={(value) => setFilter(value)}
      />

      {filter !== "ON GOING" && (
        <View className="px-6 flex-row items-center justify-between">
          <Text className="font-poppins-bold text-primary-100 text-xl">
            {moment(currDate).format("MMMM DD YYYY")}
          </Text>

          <CustomButton
            iconLeft={util_icons.calendar_icon}
            tintColor="#73C088"
            iconSize="size-8"
            onPress={() => setDateModalVisible(true)}
          />
        </View>
      )}

      <ScrollView
        contentContainerClassName="pb-[100px] px-6 gap-2 items-center"
        showsVerticalScrollIndicator={false}
      >
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => (
            <OrderActivityCard
              key={index}
              order={order}
              onPress={() => handleViewOrder(order)}
            />
          ))
        ) : (
          <Text className="font-poppins-regular text-black-100/50 text-xl">
            No Items
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Activities;

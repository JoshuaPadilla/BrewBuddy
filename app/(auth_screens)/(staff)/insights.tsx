import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrdersInsightsCard from "@/components/staff_components/orders_insights_card";
import DatePickerModal from "@/components/date_picker_modal";
import moment from "moment";
import CustomButton from "@/components/custom_button";
import { util_icons } from "@/constants/icons";
import { useInsightsStore } from "@/store/useInsigths";
import { priceFormatted } from "@/helpers/utils";
import { useOrderStore } from "@/store/useOrders";
import OnProcessOrderCard from "@/components/staff_components/onprocess_order_card";
import { goToViewOrderDetails } from "@/helpers/router_function";

const Insights = () => {
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [currDate, setCurrDate] = useState(moment().format("YYYY-MM-DD"));

  const { setSelectedOrder } = useOrderStore();

  const { getInsightsByDate, isLoading, ordersByDate, totalSales } =
    useInsightsStore();

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);

    goToViewOrderDetails();
  };

  useEffect(() => {
    getInsightsByDate(currDate);
  }, [currDate]);

  return (
    <SafeAreaView className="flex-1 py-8 bg-background">
      <DatePickerModal
        modalVisible={dateModalVisible}
        setModalVisible={setDateModalVisible}
        setDate={setCurrDate}
        maxDate={moment().format("YYYY-MM-DD")}
      />

      {/* headings */}
      <View className="px-6 mb-4 flex-row items-center justify-between">
        <Text className="font-jomhuria-regular text-primary-100 text-5xl">
          Daily Insights
        </Text>

        <CustomButton
          iconLeft={util_icons.calendar_icon}
          tintColor="#73C088"
          iconSize="size-8"
          onPress={() => setDateModalVisible(true)}
        />
      </View>

      {/* Main */}
      {isLoading ? (
        <ActivityIndicator color={"#73C088"} className="p-32" size={"large"} />
      ) : ordersByDate.length > 0 ? (
        <View>
          <View className="px-6">
            <View className="flex-row justify-between mb-6">
              <OrdersInsightsCard
                quantity={ordersByDate.length}
                title="Completed Orders"
                bgColor="bg-status-pending"
              />
              <OrdersInsightsCard
                quantity={priceFormatted(totalSales)}
                title="Total Sales"
                bgColor="bg-status-completed"
              />
            </View>
          </View>

          <ScrollView
            contentContainerClassName="pb-[300px] px-4 gap-2"
            showsVerticalScrollIndicator={false}
          >
            {ordersByDate.map((order, index) => (
              <OnProcessOrderCard
                order={order}
                key={index}
                onViewDetails={() => handleViewDetails(order)}
              />
            ))}
          </ScrollView>
        </View>
      ) : (
        <View className="p-8 justify-center items-center">
          <Text className="font-poppins-semibold text-black-100/80 text-xl">
            No Orders on this day
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Insights;

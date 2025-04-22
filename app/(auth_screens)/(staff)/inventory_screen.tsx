import {
  View,
  Text,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import { util_icons } from "@/constants/icons";
import { useInventoryStore } from "@/store/useInventory";
import InventoryCard from "@/components/staff_components/inventory_card";
import NewInventoryItemModal from "@/components/staff_components/new_inventory_item_modal";
import TabbedFilter from "@/components/tabbed_filter";
import { INVENTORY_FILTER } from "@/constants/filters";

const InventoryScreen = () => {
  const actionRef = useRef("");

  const [filter, setFilter] = useState("All");

  const [modalVisible, setModalVisible] = useState(false);

  const { getAllItems, inventoryItems, isAdding, setSelectedItem, isLoading } =
    useInventoryStore();

  useEffect(() => {
    getAllItems();
  }, []);

  const filteredInventoryItems =
    filter === "All"
      ? inventoryItems
      : inventoryItems.filter((item) => item.status === filter);

  const outOfStockItem = inventoryItems.reduce((acc, currItem) => {
    return currItem.status === "out" ? acc + 1 : acc;
  }, 0);

  const inStockItem = inventoryItems.reduce((acc, currItem) => {
    return currItem.status === "in" ? acc + 1 : acc;
  }, 0);

  const lowStockItem = inventoryItems.reduce((acc, currItem) => {
    return currItem.status === "low" ? acc + 1 : acc;
  }, 0);

  const handleOnEditItem = (item: InventoryItem) => {
    actionRef.current = "edit";
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleAddItem = () => {
    actionRef.current = "add";
    setModalVisible(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-100">
      <NewInventoryItemModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        action={actionRef.current}
      />

      {/* headigns */}
      <View className="items py-6 px-6">
        <View className="flex-row justify-between  mb-16">
          <Text className="font-poppins-medium text-white text-3xl">
            Inventory
          </Text>

          <CustomButton
            iconLeft={util_icons.plus_icon}
            title="Add"
            btnClassname="flex-row gap-2 items-center px-4 py-2 rounded-xl"
            textClassname="font-poppins-semibold text-white"
            iconSize="size-4"
            onPress={handleAddItem}
          />
        </View>

        {/* Totals */}
        <View
          className="flex-row justify-around absolute w-full bg-white p-4 rounded-lg -bottom-8 z-50 self-center"
          style={
            Platform.OS === "ios"
              ? {
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                }
              : { elevation: 4 }
          }
        >
          <TotalItems quantity={inventoryItems.length} title="total" />
          <TotalItems
            quantity={outOfStockItem}
            title="out of stock"
            color="#F75555"
          />
          <TotalItems
            quantity={lowStockItem}
            title="low stock"
            color="#ffcc80"
          />
          <TotalItems quantity={inStockItem} title="In stock" color="#a5d6a7" />
        </View>
      </View>

      {/* List */}
      <View className="flex-1 bg-background px-6 pb-[50px]">
        {/* headings */}
        <View className="flex-row justify-between items-center mt-14 mb-8">
          <Text className="font-poppins-semibold text-m text-black-200/50">
            Inventory Items:
          </Text>

          {/* <CustomButton
            title="Sort by"
            btnClassname="flex-row items-center gap-2"
            textClassname="font-poppins-semibold text-m text-black-200/50"
            iconRight={util_icons.sort_icon}
            iconRightClassName="size-4"
            tintColor="#73C088"
          /> */}
        </View>

        {/* filter */}
        <View>
          <TabbedFilter
            filterCategory={INVENTORY_FILTER}
            setValue={setFilter}
            value={filter}
          />
        </View>

        <ScrollView
          contentContainerClassName="gap-1"
          showsVerticalScrollIndicator={false}
        >
          {(isAdding || isLoading) && (
            <ActivityIndicator
              className="p-16"
              color="#73C088"
              size={"large"}
            />
          )}
          {filteredInventoryItems.reverse().map((item, index) => (
            <InventoryCard
              item={item}
              key={index}
              onEditPress={() => handleOnEditItem(item)}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

interface TotalItemsProps {
  quantity: number;
  title: string;
  color?: string;
}

const TotalItems = ({ quantity, title, color }: TotalItemsProps) => {
  return (
    <View className="items-center">
      <Text
        className="font-poppins-semibold text-xl"
        style={{ color: color || "#1E1E1E" }}
      >
        {quantity}
      </Text>
      <Text
        className="font-poppins-regular  text-black-100/70 text-sm"
        style={{ color: color || "#1E1E1E" }}
      >
        {title}
      </Text>
    </View>
  );
};

export default InventoryScreen;

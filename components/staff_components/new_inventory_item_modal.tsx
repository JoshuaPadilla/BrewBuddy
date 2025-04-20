import { View, Text, Modal, ScrollView, TextInput } from "react-native";
import React, { useState } from "react";
import CustomButton from "../custom_button";
import { util_icons } from "@/constants/icons";
import Dropdown from "../dropdown";

interface ModalComponentProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

const NewInventoryItemModal = ({
  modalVisible,
  setModalVisible,
}: ModalComponentProps) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("0");
  const [unit, setUnit] = useState("pcs");

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View className="flex-1 justify-center items-center bg-black-100/70 p-6 overflow-hidden">
        <View className="bg-white w-full rounded-lg px-6 pt-6 pb-10 max-h-[70%] overflow-hidden">
          <View className="flex-row justify-between">
            <Text className="font-poppins-bold text-xl text-black-100 mb-6 self-start">
              New Medication
            </Text>

            <CustomButton
              iconLeft={util_icons.cancel_icon}
              onPress={() => setModalVisible(false)}
              iconSize="size-6"
            />
          </View>

          <ScrollView
            contentContainerClassName="pb-[50px] gap-4"
            showsVerticalScrollIndicator={false}
          >
            {/* name */}
            <View className="gap-2">
              <Text className="font-poppins-medium-medium text-md text-black-200">
                *Item Name
              </Text>

              <View className="">
                <TextInput
                  className="border border-primary-100 rounded-lg p-4"
                  value={name}
                  multiline
                  onChangeText={setName}
                />
              </View>
            </View>

            {/* Quantity and measuement */}
            <View className="flex-row justify-between gap-4 items-center">
              <View className="gap-2 w-[66%]">
                <Text className="font-poppins-medium-medium text-md text-black-200">
                  *Quantity
                </Text>

                <View className="">
                  <TextInput
                    className="border border-primary-100 rounded-lg p-4"
                    value={quantity}
                    multiline
                    keyboardType="numeric"
                    onChangeText={setQuantity}
                  />
                </View>
              </View>

              <View className="gap-2 w-[30%]">
                <Text className="font-poppins-medium-medium text-md text-black-200">
                  Unit
                </Text>
                <Dropdown
                  data={["kg", "liters", "pcs"]}
                  onSelect={(selectedItem) => setUnit(selectedItem)}
                  title="Unit"
                  iconLeft={util_icons.dropdown_icon}
                  height={250}
                  defaultValue={unit}
                />
              </View>
            </View>

            <CustomButton
              title="Add Item"
              btnClassname="justify-center items-center bg-primary-100 rounded-lg p-4 mt-4"
              textClassname="text-white font-poppins-semibold text-lg"
              // onPress={handleAddRestriction}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default NewInventoryItemModal;

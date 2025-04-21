import { View, Text, Modal, ScrollView, TextInput, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../custom_button";
import { util_icons } from "@/constants/icons";
import Dropdown from "../dropdown";
import { useInventoryStore } from "@/store/useInventory";

interface ModalComponentProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  action?: string;
}

const NewInventoryItemModal = ({
  modalVisible,
  setModalVisible,
  action,
}: ModalComponentProps) => {
  const { addItem, selectedItem, setSelectedItem, editItem, deleteItem } =
    useInventoryStore();

  const [form, setForm] = useState<InventoryItemForm>({
    name: selectedItem?.name || "",
    quantity: selectedItem?.quantity || 0,
    unitOfMeasurement: selectedItem?.unitOfMeasurement || "pcs",
  });

  const resetForm = () => {
    setForm({
      name: "",
      quantity: 0,
      unitOfMeasurement: "pcs",
    });
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
    resetForm();
  };

  const handleSubmit = () => {
    if (!form.name) Alert.alert("inventory item must have a name");

    action === "edit" ? editItem(selectedItem?._id || "", form) : addItem(form);

    handleCloseModal();
  };

  const handleDelete = () => {
    deleteItem(selectedItem?._id || "");
    handleCloseModal();
  };

  useEffect(() => {
    if (selectedItem) {
      setForm({
        name: selectedItem.name || "",
        quantity: selectedItem.quantity || 0,
        unitOfMeasurement: selectedItem.unitOfMeasurement || "pcs",
      });
    }
  }, [selectedItem]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
      className="absolute"
    >
      <View className="flex-1 justify-center items-center bg-black-100/70 p-6 overflow-hidden">
        <View className="bg-white w-full rounded-lg px-6 pt-6 pb-10 max-h-[70%] overflow-hidden">
          {/* headings */}
          <View className="flex-row justify-between">
            <Text className="font-poppins-bold text-xl text-black-100 mb-6 self-start">
              {action === "edit" ? "Edit Item" : "Add Item"}
            </Text>

            <View className="flex-row gap-3">
              {action === "edit" && (
                <CustomButton
                  iconLeft={util_icons.trash_icon}
                  onPress={handleDelete}
                  iconSize="size-6"
                />
              )}
              <CustomButton
                iconLeft={util_icons.cancel_icon}
                onPress={handleCloseModal}
                iconSize="size-6"
              />
            </View>
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
                  value={form.name}
                  multiline
                  onChangeText={(value) =>
                    setForm((prev) => (prev = { ...prev, name: value }))
                  }
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
                    value={form.quantity.toString()}
                    multiline
                    keyboardType="numeric"
                    onChangeText={(value) =>
                      setForm(
                        (prev) => (prev = { ...prev, quantity: Number(value) })
                      )
                    }
                  />
                </View>
              </View>

              <View className="gap-2 w-[30%]">
                <Text className="font-poppins-medium-medium text-md text-black-200">
                  Unit
                </Text>
                <Dropdown
                  data={["kg", "liters", "pcs"]}
                  onSelect={(selectedItem) =>
                    setForm(
                      (prev) =>
                        (prev = { ...prev, unitOfMeasurement: selectedItem })
                    )
                  }
                  title="Unit"
                  iconLeft={util_icons.dropdown_icon}
                  height={250}
                  defaultValue={form.unitOfMeasurement}
                />
              </View>
            </View>

            <CustomButton
              title={action === "edit" ? "Save Item" : "Add Item"}
              btnClassname="justify-center items-center bg-primary-100 rounded-lg p-4 mt-4"
              textClassname="text-white font-poppins-semibold text-lg"
              onPress={handleSubmit}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default NewInventoryItemModal;

import { View, Text, Modal, Pressable } from "react-native";
import React, { useState } from "react";
import { Calendar, DateData } from "react-native-calendars";
import CustomButton from "./custom_button";

interface DatePickerModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  setDate: (date: string) => void;
  maxDate?: string;
}

const DatePickerModal = ({
  modalVisible,
  setModalVisible,
  setDate,
  maxDate,
}: DatePickerModalProps) => {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleClose = () => {
    if (selectedDate) {
      setDate(selectedDate);
    }

    setModalVisible(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleClose}
    >
      <Pressable className="flex-1 justify-center items-center bg-black-100/70 overflow-hidden">
        <View className="w-[90%] bg-white p-4 rounded-lg gap-6">
          <Calendar
            onDayPress={(day: DateData) => {
              setSelectedDate(day.dateString);
            }}
            markedDates={{
              [selectedDate]: {
                selected: true,
                selectedColor: "#73C088",
              },
            }}
            maxDate={maxDate || null}
            theme={{
              backgroundColor: "#ffffff",
              calendarBackground: "#ffffff",
              textSectionTitleColor: "#000000",
              selectedDayBackgroundColor: "#73C088",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#73C088",
              dayTextColor: "#2d4150",
              textDisabledColor: "#d9e1e8",
              dotColor: "#73C088",
              selectedDotColor: "#ffffff",
              arrowColor: "#73C088",
              monthTextColor: "#000000",
              textDayFontFamily: "Rubik-Regular",
              textMonthFontFamily: "Rubik-Bold",
              textDayHeaderFontFamily: "Rubik-Medium",
            }}
          />

          <View className="flex-row px-8 justify-between py-4">
            <CustomButton
              title="cancel"
              textClassname="text-danger font-rubik-semibold text-lg"
              onPress={() => setModalVisible(false)}
            />

            <CustomButton
              title="Apply"
              textClassname="text-primary-100 font-rubik-semibold text-lg"
              onPress={handleClose}
            />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default DatePickerModal;

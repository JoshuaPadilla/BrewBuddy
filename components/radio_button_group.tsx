import { View, Text } from "react-native";
import React from "react";
import RadioButton from "./radio_button";

interface RadioButtonGroupProps {
  options: any[];
  selectedValue: any;
  onValueChange: (value: any) => void;
}

const RadioButtonGroup = ({
  options,
  selectedValue,
  onValueChange,
}: RadioButtonGroupProps) => {
  return (
    <View className="gap-2">
      {options.map((option) => {
        if (!option) return;

        return (
          <RadioButton
            key={option.name}
            label={option.name}
            price={option.price}
            selected={selectedValue === option.name}
            onPress={() => onValueChange(option)}
          />
        );
      })}
    </View>
  );
};

export default RadioButtonGroup;

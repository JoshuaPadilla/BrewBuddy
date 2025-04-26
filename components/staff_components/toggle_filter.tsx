import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";

interface ComponentProps {
  trueValue: string;
  falseValue: string;

  onPress: () => void;
}

const ToggleFilter = ({ trueValue, falseValue, onPress }: ComponentProps) => {
  const [value, setValue] = useState(true);

  const toggle = () => {
    setValue((val) => !val);
    onPress();
  };

  return (
    <Pressable
      className="flex-row px-1 py-1 bg-primary-100 rounded-[20px]"
      onPress={() => toggle()}
    >
      <Text
        className={`px-4 py-2 text-center ${
          value
            ? "font-poppins-bold text-sm text-primary-100 bg-white rounded-[20px]"
            : "text-white"
        }`}
      >
        {trueValue}
      </Text>

      <Text
        className={`px-4 py-2 text-center ${
          !value
            ? "font-poppins-bold text-sm text-primary-100 bg-white rounded-[20px]"
            : "text-white"
        }`}
      >
        {falseValue}
      </Text>
    </Pressable>
  );
};

export default ToggleFilter;

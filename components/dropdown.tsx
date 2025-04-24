import { View, Text, ImageSourcePropType, Image } from "react-native";
import React from "react";
import SelectDropdown from "react-native-select-dropdown";

interface DropdownProps {
  data: any[];
  onSelect: (selectedItem: any) => void;
  iconLeft?: ImageSourcePropType;
  iconRight?: ImageSourcePropType;
  dropdownButtonClassName?: string;
  title: string;
  height: number;
  defaultValue?: string;
}

const Dropdown = ({
  data,
  onSelect,
  iconLeft,
  iconRight,
  dropdownButtonClassName,
  title,
  height,
  defaultValue,
  ...props
}: DropdownProps) => {
  return (
    <SelectDropdown
      data={data}
      onSelect={onSelect}
      defaultValue={defaultValue}
      renderButton={(selectedItem) => (
        <View
          className={`h-[50px] border-primary-100 border rounded-xl flex-row p-4 justify-between items-center ${dropdownButtonClassName}`}
        >
          <Text
            className={`font-poppins-regular text-lg ${
              selectedItem ? "text-black-100" : "text-black-200"
            }`}
          >
            {selectedItem ? selectedItem : title}
          </Text>

          <Image source={iconLeft} className="size-4" tintColor={"#1E1E1E"} />
        </View>
      )}
      renderItem={(item, index, isSelected) => (
        <View
          className={`${isSelected && "bg-primary-100"} p-4 m-2 rounded-lg`}
        >
          <Text className="text-lg">{item}</Text>
        </View>
      )}
      dropdownStyle={{ borderRadius: 12, height: height }}
      {...props}
    />
  );
};

export default Dropdown;

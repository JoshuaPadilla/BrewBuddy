import { Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";

interface TabbedFilterProps {
  filterCategory: string[];
  value: string;
  setValue: (value: string) => void;
}

const TabbedFilter = ({
  filterCategory,
  value,
  setValue,
}: TabbedFilterProps) => {
  const selectFilter = (selectedFilter: string) => {
    if (selectedFilter === value) {
      setValue("All");
    } else {
      setValue(selectedFilter);
    }
  };

  return (
    <ScrollView
      contentContainerClassName="flex-row gap-4 pr-6 mb-6"
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {filterCategory.map((filter: string) => (
        <TouchableOpacity
          key={filter}
          onPress={() => selectFilter(filter)}
          className={`flex items-center justify-center py-2 px-4 rounded-xl ${
            filter === value ? "bg-primary-100 " : "border border-primary-100"
          }`}
        >
          <Text
            className={
              filter === value
                ? "font-rubik-medium text-lg text-accent-100"
                : "font-rubik-regular text-m text-black-100"
            }
          >
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default TabbedFilter;

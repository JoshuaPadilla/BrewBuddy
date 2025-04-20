import { BASE_URL } from "@/constants";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert } from "react-native";

interface StoreState {
  inventoryItems: InventoryItem[];
  isLoading: boolean;

  getAllItems: () => void;
}

export const useInventoryStore = create<StoreState>((set) => ({
  inventoryItems: [],
  isLoading: false,

  getAllItems: async () => {
    try {
      set({ isLoading: true });

      const token = await AsyncStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/inventory`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Add this line
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.status === "success") {
        set({ inventoryItems: data.inventoryItems });
      } else {
        Alert.alert("failed to fetch inventory items");
      }
    } catch (error) {
      console.log("Fetching inventory items: ", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

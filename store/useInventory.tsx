import { BASE_URL } from "@/constants";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert } from "react-native";

interface StoreState {
  inventoryItems: InventoryItem[];
  selectedItem: InventoryItem | null;
  isLoading: boolean;
  isAdding: boolean;

  getAllItems: () => void;
  addItem: (form: InventoryItemForm) => void;
  editItem: (itemID: string, form: InventoryItemForm) => void;
  deleteItem: (itemID: string) => void;
  setSelectedItem: (item: InventoryItem | null) => void;
}

export const useInventoryStore = create<StoreState>((set) => ({
  inventoryItems: [],
  selectedItem: null,
  isLoading: false,
  isAdding: false,

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

  addItem: async (form) => {
    try {
      set({ isAdding: true });

      const token = await AsyncStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/inventory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Add this line
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.status === "success") {
        set((state) => ({
          inventoryItems: [...state.inventoryItems, data.newItem],
        }));
      } else {
        Alert.alert("failed to add new inventory item");
      }
    } catch (error) {
      console.log("adding inventory items: ", error);
    } finally {
      set({ isAdding: false });
    }
  },

  editItem: async (itemID, form) => {
    try {
      set({ isLoading: true });

      const token = await AsyncStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/inventory/${itemID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // Add this line
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.status === "success") {
        set((state) => ({
          inventoryItems: [
            ...state.inventoryItems.filter((item) => item._id !== itemID),
            data.updateItem,
          ],
        }));
      } else {
        Alert.alert("failed to add new inventory item");
      }
    } catch (error) {
      console.log("adding inventory items: ", error);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteItem: async (itemID) => {
    try {
      set({ isLoading: true });

      const token = await AsyncStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/inventory/${itemID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // Add this line
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.status === "success") {
        set((state) => ({
          inventoryItems: [
            ...state.inventoryItems.filter((item) => item._id !== itemID),
          ],
        }));
      } else {
        Alert.alert("failed to add new inventory item");
      }
    } catch (error) {
      console.log("adding inventory items: ", error);
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedItem: (item) => {
    set({ selectedItem: item });
  },
}));

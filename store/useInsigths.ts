import { BASE_URL } from "@/constants";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

interface StoreState {
  totalSales: number;
  ordersByDate: Order[];
  isLoading: boolean;

  getInsightsByDate: (date: string) => void;
}

export const useInsightsStore = create<StoreState>((set) => ({
  totalSales: 0,
  ordersByDate: [],
  isLoading: false,

  getInsightsByDate: async (date) => {
    try {
      set({ isLoading: true });

      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/insights/day/${date}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Add this line
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.status === "success") {
        set({
          totalSales: data.totalSales,
          ordersByDate: data.orders,
        });
      } else {
        Alert.alert("failed to fetch insights");
      }
    } catch (error) {
      console.log("add to cart: ", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

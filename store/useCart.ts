import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@/constants";
import { Alert } from "react-native";
import OrderItem from "@/components/order_item";

interface StoreState {
  cart: OrderItem[];
  selectedItems: OrderItem[];
  isAdding: boolean;
  isLoading: boolean;

  addToCart: (orderItem: OrderItemForm) => void;
  fetchUserCartitems: () => void;
  removeItem: (itemID: string) => void;
  setSelectedItems: (items: OrderItem[]) => void;
}

export const useCartStore = create<StoreState>((set) => ({
  cart: [],
  selectedItems: [],
  isAdding: false,
  isLoading: false,

  fetchUserCartitems: async () => {
    try {
      set({ isLoading: true });

      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Add this line
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.status === "success") {
        set({
          cart: data.userCart.filter(
            (order: OrderItem) => order.productID !== null
          ),
        });
      } else {
        Alert.alert("failed to fetch cart item");
      }
    } catch (error) {
      console.log("add to cart: ", error);
    } finally {
      set({ isLoading: false });
    }
  },

  addToCart: async (orderItem) => {
    try {
      set({ isAdding: true });

      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Add this line
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderItem),
      });

      const data = await res.json();

      if (data.status === "success") {
        useCartStore.getState().fetchUserCartitems();
      } else {
        Alert.alert("failed to add item to cart");
      }
    } catch (error) {
      console.log("add to cart: ", error);
    } finally {
      set({ isAdding: false });
    }
  },

  removeItem: async (Id) => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/cart/${Id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // Add this line
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      set((state) => ({
        cart: state.cart.filter((item) => item._id !== Id),
      }));

      if (data.status !== "success") {
        Alert.alert("failed to add item to cart");
      }
    } catch (error) {
      console.log("add to cart: ", error);
    }
  },

  setSelectedItems: (items) => {
    set({ selectedItems: items });
  },
}));

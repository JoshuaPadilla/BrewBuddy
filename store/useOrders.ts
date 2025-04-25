import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@/constants";
import { Alert } from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "./useAuth";

interface StoreState {
  orders: Order[];
  staffOrders: Order[];
  completedOrders: Order[];
  pendingOrders: Order[];
  processingOrders: Order[];
  selectedOrder: Order | null;
  isCreating: boolean;
  isLoading: boolean;
  isCompleting: boolean;
  setSelectedOrder: (order: Order) => void;
  createOrder: (order: OrderForm) => void;
  getUserOrders: (dateString?: string) => void;
  getAllOrders: () => void;
  moveItemToProcessing: (orderID: string) => void;
  completeOrder: (orderID: string) => void;
  addToCompletedOrders: (orders: Order) => void;
  addToPendingOrders: (orders: Order) => void;
  addToProcessing: (orders: Order) => void;
}

export const useOrderStore = create<StoreState>((set) => ({
  orders: [],
  staffOrders: [],
  pendingOrders: [],
  completedOrders: [],
  processingOrders: [],
  selectedOrder: null,
  isCreating: false,
  isLoading: false,
  isCompleting: false,

  createOrder: async (order) => {
    try {
      set({ isCreating: true });

      if (order.items.length < 1) throw new Error("order is empty");

      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Add this line
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(order),
      });

      const data = await res.json();

      if (data.status === "success") {
        router.replace("/(auth_screens)/(ordering_screens)/thank_you");
      } else {
        Alert.alert("failed to place your order, please try again");
      }
    } catch (error) {
      console.log("Creating order: ", error);
    } finally {
      set({ isCreating: false });
    }
  },

  getUserOrders: async (date) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userID = useAuthStore.getState().authUser?._id;

      const res = await fetch(`${BASE_URL}/order/${userID}/${date}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Add this line
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.status === "success") {
        set({ orders: data.userOrders });
      } else {
        Alert.alert("failed to fetch your orders");
      }
    } catch (error) {
      console.log("Fetching orders: ", error);
    }
  },

  getAllOrders: async () => {
    try {
      set({ isLoading: true });

      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/order`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Add this line
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.status === "success") {
        // filter the orders
        const orderOnProcess = data.orders.filter(
          (order: Order) => order.status === "processing"
        );
        const pending = data.orders.filter(
          (order: Order) => order.status === "pending"
        );
        const completed = data.orders.filter(
          (order: Order) => order.status === "completed"
        );

        // set the states
        set({
          pendingOrders: pending,
          processingOrders: orderOnProcess,
          completedOrders: completed,
        });
      } else {
        console.log("failed to fetch orders in getAllOrders (useOrdersStore)");
      }
    } catch (error) {
      console.log("Fetching orders: ", error);
    } finally {
      set({ isLoading: false });
    }
  },

  moveItemToProcessing: async (orderID) => {
    try {
      set({ isLoading: true });

      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/order/process/${orderID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // Add this line
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.status !== "success") {
        Alert.alert("failed to process order");
      }
    } catch (error) {
      console.log("Moving order to processing: ", error);
    } finally {
      set({ isLoading: false });
    }
  },

  completeOrder: async (orderID) => {
    try {
      set({ isCompleting: true });

      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/order/completed/${orderID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // Add this line
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.status !== "success") {
        Alert.alert("failed to process order");
      }
    } catch (error) {
      console.log("Moving order to processing: ", error);
    } finally {
      set({ isCompleting: false });
    }
  },

  addToCompletedOrders: (order) => {
    set((state) => ({ completedOrders: [...state.completedOrders, order] }));
  },
  addToPendingOrders: (order) => {
    set((state) => ({ pendingOrders: [...state.pendingOrders, order] }));
  },

  addToProcessing: (order) => {
    set((state) => ({ processingOrders: [...state.processingOrders, order] }));
  },

  setSelectedOrder: (order) => {
    set({ selectedOrder: order });
  },
}));

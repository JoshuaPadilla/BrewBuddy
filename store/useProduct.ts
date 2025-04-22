import ProductCard from "@/components/product_card";
import { BASE_URL } from "@/constants";
import { showToast } from "@/helpers/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface StoreState {
  products: Product[];
  selectedProduct: Product | null;
  isLoading: boolean;
  isAdding: boolean;
  isDeleting: boolean;
  isUpdating: boolean;
  action: "add" | "edit";

  fetchAllProducts: () => void;
  addProduct: (form: ProductForm) => void;
  deleteProduct: (productID: string) => void;
  EditProduct: (productID: string, form: ProductForm) => void;
  changeAvailability: (productID: string, status: string) => void;
  setSelectedProduct: (product: Product | null) => void;
  setAction: (actionString: "edit" | "add") => void;
}

export const useProductStore = create<StoreState>((set) => ({
  products: [],
  selectedProduct: null,
  isLoading: true,
  isAdding: false,
  isDeleting: false,
  isUpdating: false,
  action: "add",

  fetchAllProducts: async () => {
    try {
      set({ isLoading: true });

      const res = await fetch(`${BASE_URL}/product`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Add this line
        },
      });

      const data = await res.json();

      if (data.status === "success") {
        set({ products: data.products });
      } else {
        console.log("failed to fetch all products");
      }
    } catch (error) {
      console.log("error in fetching all products", error);
    } finally {
      set({ isLoading: false });
    }
  },

  addProduct: async (form) => {
    try {
      set({ isAdding: true });

      const formData = new FormData();

      formData.append("productName", form.productName);
      formData.append("productBasePrice", form.productBasePrice.toString());
      formData.append("productCategory", form.productCategory);
      formData.append("productDescription", form.productDescription);

      // Append the profile picture file
      if (form.ProductImage) {
        formData.append("productImage", {
          uri: form.ProductImage.uri,
          type: "image/jpeg",
          name: form.productName || `profile-${Date.now()}.jpg`,
        } as any);
      }

      // console.log(updatedForm.profilePicture);
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.log("No token found.");
        return;
      }

      const res = await fetch(`${BASE_URL}/product`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.status === "success") {
        set((state) => ({ products: [...state.products, data.newProduct] }));
        showToast("New Product Added", "success");
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isAdding: false });
    }
  },

  deleteProduct: async (productID) => {
    try {
      set({ isDeleting: true });

      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.log("No token found.");
        return;
      }

      const res = await fetch(`${BASE_URL}/product/${productID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.status === "success") {
        set((state) => ({
          products: state.products.filter(
            (product) => product._id !== productID
          ),
        }));
        showToast("Product Deleted", "success");
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isDeleting: false });
    }
  },

  changeAvailability: async (productID, status) => {
    try {
      set({ isUpdating: true });

      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.log("No token found.");
        return;
      }

      const res = await fetch(`${BASE_URL}/product/${productID}/${status}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.status === "success") {
        set({ selectedProduct: data.updatedProduct });
        showToast("Product updated", "success");
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isUpdating: false });
    }
  },

  EditProduct: async (productID, form) => {
    try {
      set({ isUpdating: true });

      const formData = new FormData();

      formData.append("productName", form.productName);
      formData.append("productBasePrice", form.productBasePrice.toString());
      formData.append("productCategory", form.productCategory);
      formData.append("productDescription", form.productDescription);

      // Append the profile picture file if it is new
      if (
        form.ProductImage &&
        form.ProductImage?.uri !==
          useProductStore.getState().selectedProduct?.productImageUrl
      ) {
        formData.append("productImage", {
          uri: form.ProductImage.uri,
          type: "image/jpeg",
          name: form.productName || `profile-${Date.now()}.jpg`,
        } as any);
      }

      // console.log(updatedForm.profilePicture);
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.log("No token found.");
        return;
      }

      const res = await fetch(`${BASE_URL}/product/${productID}`, {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.status === "success") {
        set((state) => ({
          products: [
            ...state.products.filter((product) => product._id !== productID),
            data.updatedProduct,
          ],
          selectedProduct: data.updatedProduct,
        }));
        showToast("New Product Added", "success");
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isUpdating: false });
    }
  },

  setSelectedProduct: (product) => {
    set({ selectedProduct: product });
  },

  setAction: (actionString: "edit" | "add") => {
    set({ action: actionString });
  },
}));

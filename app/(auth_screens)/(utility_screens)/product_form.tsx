import {
  View,
  Text,
  Alert,
  Pressable,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "@/components/custom_button";
import { useProductStore } from "@/store/useProduct";
import { util_icons } from "@/constants/icons";
import { goBack } from "@/helpers/router_function";
import { Image } from "expo-image";
import { images } from "@/constants/images";
import InputField from "@/components/input_field";
import Dropdown from "@/components/dropdown";
import { PRODUCT_CATEGORY } from "@/constants";
import { isValidProductForm } from "@/helpers/utils";

const ProductForm = () => {
  const { addProduct, action, selectedProduct, EditProduct } =
    useProductStore();

  const [form, setForm] = useState<ProductForm>({
    productBasePrice:
      action === "edit" ? selectedProduct?.productBasePrice || 0 : 0,
    productCategory:
      action === "edit"
        ? selectedProduct?.productCategory || "Classic"
        : "Classic",
    productDescription:
      action === "edit" ? selectedProduct?.productDescription || "" : "",
    ProductImage:
      action === "edit" && selectedProduct?.productImageUrl
        ? {
            fileName: "selected product",
            type: "jpeg",
            uri: selectedProduct.productImageUrl,
          }
        : null,
    productName: action === "edit" ? selectedProduct?.productName || "" : "",
  });

  const selectImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Please allow access to your photo library to select an image."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Use "Images" for images only
        allowsEditing: true,
        aspect: [2, 2], // Square aspect ratio for profile pictures
        quality: 0.8, // Highest quality
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newImageUri = result.assets[0]; // Get the first selected image

        setForm((prev) => ({
          ...prev,
          ProductImage: {
            uri: newImageUri.uri,
            type: newImageUri.type || "image/jpeg", // Default to 'image/jpeg' if type is not provided
            fileName: newImageUri.fileName || `${Date.now()}.jpg`, // Generate a unique filename if not provided
          },
        }));
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const handleSubmit = () => {
    if (!isValidProductForm(form)) return;

    action === "add"
      ? addProduct(form)
      : EditProduct(selectedProduct?._id || "", form);

    goBack();
  };

  const handleBack = () => {
    goBack();
  };
  return (
    <SafeAreaView className="flex-1 bg-background px-6 py-8">
      {/* Headings */}

      <View className="flex-row justify-between items-center">
        <CustomButton iconLeft={util_icons.back_icon} onPress={handleBack} />

        <Text className="font-poppins-semibold text-black-100 text-xl">
          {action === "add" ? "New Product" : "Edit Product"}
        </Text>

        <CustomButton />
      </View>

      <ScrollView contentContainerClassName="pb-[400px]">
        {/* main */}
        <View className="items-center pt-16">
          {form.ProductImage ? (
            <View className="size-60 rounded-xl overflow-hidden">
              <Image
                source={form.ProductImage?.uri}
                style={{ width: "100%", height: "100%" }}
              />

              <CustomButton
                iconLeft={util_icons.edit_pic_icon}
                btnClassname="absolute bottom-2 right-2 z-10"
                iconSize="size-10"
                onPress={selectImage}
              />
            </View>
          ) : (
            <TouchableOpacity
              className="size-56 rounded-xl overflow-hidden"
              onPress={selectImage}
            >
              <Image
                source={util_icons.add_picture_icon}
                style={{ width: "100%", height: "100%" }}
                contentFit="cover"
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Form */}
        <View className="py-16 gap-4">
          <InputField
            placeholder="Product Name"
            value={form.productName}
            onChange={(value) =>
              setForm({ ...form, productName: value.nativeEvent.text })
            }
            label="*Product Name"
          />

          {/* Price and Category b */}
          <View className="flex-row justify-between gap-4 items-center">
            <View className="gap-2 w-[30%]">
              <Text className="font-poppins-medium-medium text-md text-black-200">
                *Base price
              </Text>

              <View className="">
                <TextInput
                  className="border border-primary-100 rounded-lg p-4"
                  value={form.productBasePrice.toString()}
                  multiline
                  keyboardType="numeric"
                  onChangeText={(value) =>
                    setForm(
                      (prev) =>
                        (prev = { ...prev, productBasePrice: Number(value) })
                    )
                  }
                />
              </View>
            </View>

            <View className="gap-2 w-[66%]">
              <Text className="font-poppins-medium-medium text-md text-black-200">
                Unit
              </Text>
              <Dropdown
                data={PRODUCT_CATEGORY}
                onSelect={(selectedItem) =>
                  setForm(
                    (prev) =>
                      (prev = { ...prev, productCategory: selectedItem })
                  )
                }
                title="Unit"
                iconLeft={util_icons.dropdown_icon}
                height={250}
                defaultValue={form.productCategory}
              />
            </View>
          </View>

          {/* Product Desc */}
          <InputField
            placeholder="Product Description"
            value={form.productDescription}
            onChange={(value) =>
              setForm({ ...form, productDescription: value.nativeEvent.text })
            }
            label="*Product Description"
            multiline
          />

          <CustomButton
            title={action === "edit" ? "Save Changes" : "Add Product"}
            btnClassname="justify-center items-center bg-primary-100 rounded-lg p-4 mt-4"
            textClassname="text-white font-poppins-semibold text-lg"
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductForm;

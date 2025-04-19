import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import { util_icons } from "@/constants/icons";
import { goBack } from "@/helpers/router_function";
import InputField from "@/components/input_field";
import { useAuthStore } from "@/store/useAuth";

const EditProfile = () => {
  const { authUser, updateUser } = useAuthStore();

  const [form, setForm] = useState<UpdateForm>({
    firstName: authUser?.firstName || "",
    lastName: authUser?.lastName || "",
    number: authUser?.number || "",
  });

  const handleUpdate = () => {
    if (!form.firstName || !form.lastName || !form.number) {
      return Alert.alert("fill in all fields");
    }
    updateUser(form);
    goBack();
  };

  return (
    <SafeAreaView className="flex-1 items-start">
      <CustomButton
        iconLeft={util_icons.back_icon}
        title="Edit Profile"
        btnClassname="flex-row items-center p-6 gap-3"
        textClassname="font-poppins-semibold text-black-100 text-xl"
        onPress={goBack}
      />

      {/* circle */}
      <View className="w-full p-4 items-center">
        <View className="bg-gray-200 size-28 rounded-full items-center justify-center">
          <Text className="font-poppins-bold text-primary-100 text-5xl">
            {authUser?.firstName.at(0)?.toUpperCase()}
            {authUser?.lastName.at(0)?.toUpperCase()}
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView className="w-full">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {/* form */}
          <View className="flex h-full w-full bg-background-100 rounded-[20px] p-8 gap-4">
            <InputField
              placeholder="first name"
              value={form.firstName}
              onChange={(value) =>
                setForm({ ...form, firstName: value.nativeEvent.text })
              }
              label="Enter your firstName"
            />

            <InputField
              placeholder="last name"
              value={form.lastName}
              onChange={(value) =>
                setForm({ ...form, lastName: value.nativeEvent.text })
              }
              label="Enter your lastname"
            />

            <InputField
              placeholder="09*********"
              value={form.number}
              onChange={(value) =>
                setForm({ ...form, number: value.nativeEvent.text })
              }
              label="Enter your mobile number"
              keyboardType="number-pad"
            />

            <CustomButton
              title="Save Changes"
              btnClassname="flex-row justify-center items-center flex bg-primary-100 p-4 rounded-xl mt-2"
              textClassname="w-fit text-white font-poppins-medium text-xl"
              onPress={handleUpdate}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfile;

import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants/images";
import CustomButton from "@/components/custom_button";
import InputField from "@/components/input_field";
import { goToLogin, goToWelcome } from "@/helpers/router_function";
import { isRegistrationFormValid } from "@/helpers/utils";
import { useAuthStore } from "@/store/useAuth";
import Spinner from "react-native-loading-spinner-overlay";
import { Redirect } from "expo-router";

const Register = () => {
  const { authUser } = useAuthStore();

  const { register, isRegistering } = useAuthStore();

  const [form, setForm] = useState<RegistrationForm>({
    firstName: "",
    lastName: "",
    number: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegistration = () => {
    if (!isRegistrationFormValid(form)) return;

    register(form);
  };

  if (authUser?.role === "user")
    return <Redirect href="/(auth_screens)/(tabs)/home" />;
  if (authUser?.role === "admin")
    return <Redirect href="/(auth_screens)/(staff)/orders_screen" />;

  return (
    <SafeAreaView className="flex flex-1">
      <Spinner
        visible={isRegistering}
        textContent={"Submitting..."}
        textStyle={{ color: "#FFF" }}
      />
      <ScrollView
        contentContainerClassName="pb-[150px]"
        showsVerticalScrollIndicator={false}
      >
        {/* Headings */}
        <Pressable className="p-4 items-center" onPress={goToWelcome}>
          <Image source={images.logo_green} className="size-20" />
        </Pressable>

        <KeyboardAvoidingView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {/* form */}
            <View className="flex h-full w-full bg-background-100 rounded-[20px] p-8 gap-4">
              <Text className="font-poppins-medium text-2xl text-black-100">
                Create an account
              </Text>

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

              <InputField
                placeholder="juan@email.com"
                value={form.email}
                onChange={(value) =>
                  setForm({ ...form, email: value.nativeEvent.text })
                }
                label="Enter your email"
              />

              <InputField
                placeholder="*****"
                value={form.password}
                onChange={(value) =>
                  setForm({ ...form, password: value.nativeEvent.text })
                }
                label="Provide a password"
              />

              <InputField
                placeholder="*****"
                value={form.confirmPassword}
                onChange={(value) =>
                  setForm({ ...form, confirmPassword: value.nativeEvent.text })
                }
                label="Confirm password"
              />

              <CustomButton
                title="Submit"
                btnClassname="flex-row justify-center items-center flex bg-primary-100 p-4 rounded-xl mt-2"
                textClassname="w-fit text-white font-poppins-medium text-xl"
                onPress={handleRegistration}
              />

              <View className="w-full flex-row justify-center gap-2 items-center">
                <Text className="font-rubik-regular text-m text-black-200">
                  Already a User?
                </Text>

                <CustomButton
                  title="Login"
                  textClassname="font-poppins-semibold text-primary-100"
                  onPress={goToLogin}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

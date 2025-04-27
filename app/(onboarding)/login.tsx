import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  KeyboardAvoidingView,
  Alert,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants/images";
import CustomButton from "@/components/custom_button";
import { util_icons } from "@/constants/icons";
import InputField from "@/components/input_field";
import { goToRegister, goToWelcome } from "@/helpers/router_function";
import { useAuthStore } from "@/store/useAuth";
import Spinner from "react-native-loading-spinner-overlay";
import { Redirect } from "expo-router";

const Login = () => {
  const { login, isLoggingIn, authUser } = useAuthStore();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  if (authUser?.role === "admin")
    return <Redirect href="/(auth_screens)/(staff)/orders_screen" />;
  if (authUser?.role === "user")
    return <Redirect href="/(auth_screens)/(tabs)/home" />;

  const handlelogIn = () => {
    if (!form.email || !form.password) {
      Alert.alert("fill in all fields");
    }

    login({ email: form.email, password: form.password });
  };

  return (
    <SafeAreaView className="flex flex-1">
      <Spinner
        visible={isLoggingIn}
        textContent={"Loggin in..."}
        textStyle={{ color: "#FFF" }}
      />

      {/* Headings */}
      <Pressable className="p-16 items-center" onPress={goToWelcome}>
        <Image source={images.logo_green} className="size-28" />
      </Pressable>

      <KeyboardAvoidingView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {/* form */}
          <View className="flex h-full w-full bg-background-100 rounded-[20px] p-8 gap-4">
            <Text className="font-poppins-medium text-2xl text-black-100">
              Login to Brew Buddy
            </Text>

            <InputField
              placeholder="email"
              icon={util_icons.signin_email}
              value={form.email}
              onChange={(value) =>
                setForm({ ...form, email: value.nativeEvent.text })
              }
            />
            <InputField
              secureTextEntry={true}
              placeholder="password"
              icon={util_icons.signin_password}
              value={form.password}
              onChange={(value) =>
                setForm({ ...form, password: value.nativeEvent.text })
              }
            />

            <View className="w-full flex-row justify-center">
              <Text className="font-rubik-regular text-m text-black-200">
                Forgot Password
              </Text>
            </View>

            <CustomButton
              title="login"
              btnClassname="flex-row justify-center items-center flex bg-primary-100 p-4 rounded-xl"
              textClassname="w-fit text-white font-poppins-medium text-xl "
              onPress={handlelogIn}
            />

            <View className="w-full flex-row justify-center gap-2 items-center">
              <Text className="font-rubik-regular text-m text-black-200">
                New to Brew Buddy?
              </Text>

              <CustomButton
                title="Register here"
                textClassname="font-poppins-semibold text-primary-100"
                onPress={goToRegister}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

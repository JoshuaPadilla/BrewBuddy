import { View, Text, Image } from "react-native";
import React from "react";
import { util_icons } from "@/constants/icons";

const ToastSuccessIcon = () => {
  return <Image source={util_icons.success_icon} className="size-6" />;
};

export default ToastSuccessIcon;

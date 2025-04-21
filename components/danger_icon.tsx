import React from "react";
import { util_icons } from "@/constants/icons";
import { Image } from "react-native";

const ToastDangerIcon = () => {
  return <Image source={util_icons.danger_icon} className="size-6" />;
};

export default ToastDangerIcon;

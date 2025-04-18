import {
  Text,
  ImageSourcePropType,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

interface CustomButtonProps {
  title?: string;
  iconLeft?: ImageSourcePropType;
  iconRight?: ImageSourcePropType;
  iconSize?: string;
  iconRightClassName?: string;
  btnClassname?: string;
  textClassname?: string;
  tintColor?: string;
  onPress?: () => void;
  disabled?: boolean;
}

const CustomButton = ({
  title,
  onPress,
  iconLeft,
  iconRight,
  iconSize,
  btnClassname,
  textClassname,
  tintColor,
  disabled,
  iconRightClassName,
  ...props
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={btnClassname}
      disabled={disabled}
      style={{ opacity: disabled ? 0.5 : 1 }}
      hitSlop={8}
    >
      {iconLeft && (
        <Image
          source={iconLeft}
          className={iconSize ? ` ${iconSize}` : "size-6"}
          tintColor={tintColor}
        />
      )}
      {title && <Text className={`${textClassname}`}>{title}</Text>}
      {iconRight && (
        <Image
          source={iconRight}
          className={iconRightClassName}
          resizeMode="contain"
          style={{ tintColor: tintColor }}
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

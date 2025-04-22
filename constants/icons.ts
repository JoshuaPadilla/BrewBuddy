import { ImageSourcePropType } from "react-native";

import tab_account from "@/assets/icons/tab_icons/tab_account.png";
import tab_activities from "@/assets/icons/tab_icons/tab_activities.png";
import tab_cart from "@/assets/icons/tab_icons/tab_cart.png";
import tab_home from "@/assets/icons/tab_icons/tab_home.png";
import clock from "@/assets/icons/util_icons/icon_clock.png";
import search from "@/assets/icons/util_icons/search_icon.png";
import signin_email from "@/assets/icons/util_icons/signin_email.png";
import signin_password from "@/assets/icons/util_icons/signin_password.png";
import add_to_cart_icon from "@/assets/icons/util_icons/add_to_cart_icon.png";
import trash_icon from "@/assets/icons/util_icons/trash_icon.png";
import check_icon from "@/assets/icons/util_icons/check_icon.png";
import back_icon from "@/assets/icons/util_icons/back_icon.png";
import dropdown_icon from "@/assets/icons/util_icons/drop_down_icon.png";
import dropdown_hide from "@/assets/icons/util_icons/dropdown_hide.png";
import account_settings_icon from "@/assets/icons/util_icons/account_settings_icon.png";
import voucher_icon from "@/assets/icons/util_icons/voucher_icon.png";
import help_center_icon from "@/assets/icons/util_icons/help_center_icon.png";
import faq_icon from "@/assets/icons/util_icons/faq_icon.png";
import under_repair from "@/assets/icons/util_icons/under_repair.png";
import logout_icon from "@/assets/icons/util_icons/logout_icon.png";
import edit_profile from "@/assets/icons/util_icons/edit_profile.png";
import caret_right from "@/assets/icons/util_icons/caret_right.png";
import plus_icon from "@/assets/icons/util_icons/plus_icon.png";
import sort_icon from "@/assets/icons/util_icons/sort_icon.png";
import edit_icon from "@/assets/icons/util_icons/edit_icon.png";
import cancel_icon from "@/assets/icons/util_icons/cancel.png";
import success_icon from "@/assets/icons/util_icons/success_icon.png";
import danger_icon from "@/assets/icons/util_icons/danger_icon.png";
import edit_pic_icon from "@/assets/icons/util_icons/edit_pic_icon.png";
import add_picture_icon from "@/assets/icons/util_icons/add_picture_icon.png";

import inventory_icon from "@/assets/icons/tab_icons/inventory_icon.png";
import orders_icon from "@/assets/icons/tab_icons/orders_icon.png";
import products_icon from "@/assets/icons/tab_icons/products_icon.png";

interface TabIconsProps {
  tab_account: ImageSourcePropType;
  tab_activities: ImageSourcePropType;
  tab_cart: ImageSourcePropType;
  tab_home: ImageSourcePropType;
  inventory_icon: ImageSourcePropType;
  orders_icon: ImageSourcePropType;
  products_icon: ImageSourcePropType;
}

interface UtilIconsProps {
  add_picture_icon: ImageSourcePropType;
  edit_pic_icon: ImageSourcePropType;
  danger_icon: ImageSourcePropType;
  success_icon: ImageSourcePropType;
  cancel_icon: ImageSourcePropType;
  clock: ImageSourcePropType;
  search: ImageSourcePropType;
  signin_email: ImageSourcePropType;
  signin_password: ImageSourcePropType;
  add_to_cart_icon: ImageSourcePropType;
  trash_icon: ImageSourcePropType;
  check_icon: ImageSourcePropType;
  back_icon: ImageSourcePropType;
  dropdown_icon: ImageSourcePropType;
  dropdown_hide: ImageSourcePropType;
  account_settings_icon: ImageSourcePropType;
  voucher_icon: ImageSourcePropType;
  help_center_icon: ImageSourcePropType;
  faq_icon: ImageSourcePropType;
  under_repair: ImageSourcePropType;
  logout_icon: ImageSourcePropType;
  edit_profile: ImageSourcePropType;
  caret_right: ImageSourcePropType;
  plus_icon: ImageSourcePropType;
  sort_icon: ImageSourcePropType;
  edit_icon: ImageSourcePropType;
}

export const util_icons: UtilIconsProps = {
  add_picture_icon,
  edit_pic_icon,
  success_icon,
  cancel_icon,
  clock,
  search,
  signin_email,
  signin_password,
  add_to_cart_icon,
  trash_icon,
  check_icon,
  back_icon,
  dropdown_icon,
  dropdown_hide,
  account_settings_icon,
  voucher_icon,
  help_center_icon,
  faq_icon,
  under_repair,
  logout_icon,
  edit_profile,
  caret_right,
  plus_icon,
  sort_icon,
  edit_icon,
  danger_icon,
};

export const tab_icons: TabIconsProps = {
  tab_account,
  tab_activities,
  tab_cart,
  tab_home,
  inventory_icon,
  orders_icon,
  products_icon,
};

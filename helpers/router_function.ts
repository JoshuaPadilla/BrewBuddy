import { router } from "expo-router";

export const goBack = () => {
  router.back();
};

export const goToHome = () => {
  router.replace("/(auth_screens)/(tabs)/home");
};

export const goToLogin = () => {
  router.replace("/(onboarding)/login");
};

export const goToRegister = () => {
  router.replace("/(onboarding)/register");
};

export const goToCheckout = () => {
  router.push("/(auth_screens)/(ordering_screens)/checkout");
};

export const goToVoucherAndReward = () => {
  router.push("/(auth_screens)/(utility_screens)/voucher_rewards");
};

export const goToAccountSettings = () => {
  router.push("/(auth_screens)/(utility_screens)/account_settings");
};

export const goToHelpCenter = () => {
  router.push("/(auth_screens)/(utility_screens)/help_center");
};

export const goToEditProfile = () => {
  router.push("/(auth_screens)/(utility_screens)/edit_profile");
};

export const goToViewProduct = () => {
  router.push("/(auth_screens)/(utility_screens)/view_product");
};

export const goToCart = () => {
  router.push("/(auth_screens)/(tabs)/cart");
};

export const goToProductForm = () => {
  router.push("/(auth_screens)/(utility_screens)/product_form");
};

export const goToViewOrder = () => {
  router.push("/(auth_screens)/(utility_screens)/view_order");
};

export const goToViewOrderDetails = () => {
  router.push("/(auth_screens)/(utility_screens)/view_order_details");
};

export const goToProfile = () => {
  router.push("/(auth_screens)/(tabs)/account");
};

export const goToWelcome = () => {
  router.push("/(onboarding)/welcome");
};

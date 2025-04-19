import { router } from "expo-router";

export const goBack = () => {
  router.back();
};

export const goToHome = () => {
  router.push("/(auth_screens)/(tabs)/cart");
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

export const goToFAQ = () => {
  router.push("/(auth_screens)/(utility_screens)/faq");
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

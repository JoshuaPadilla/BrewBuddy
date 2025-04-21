import { tab_icons } from "@/constants/icons";
import { useAuthStore } from "@/store/useAuth";
import { useCartStore } from "@/store/useCart";
import { Redirect, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";

const TabIcon = ({
  focused,
  icon,
  title,
  indicatorNumber,
}: {
  focused: boolean;
  icon?: any;
  title: string;
  indicatorNumber?: number;
}) => {
  return (
    <View className="flex-1 mt-3 flex flex-col items-center">
      {!focused && indicatorNumber ? (
        <Text className="font-poppins-bold text-xs absolute -right-2 bg-blue-400 px-2 rounded-full -top-2 text-white z-10">
          {indicatorNumber}
        </Text>
      ) : null}

      {icon && (
        <Image
          source={icon}
          tintColor={focused ? "#73C088" : "#666876"}
          resizeMode="contain"
          className="size-6"
        />
      )}
      <Text
        className={`${
          focused
            ? "text-primary-100 font-poppins-medium"
            : "text-black-200 font-poppins-regular"
        } text-xs w-full text-center mt-1`}
      >
        {title}
      </Text>
    </View>
  );
};

export default function TabLayout() {
  const { authUser } = useAuthStore();
  const { cart } = useCartStore();

  if (!authUser) return <Redirect href="/(onboarding)/welcome" />;
  return (
    <>
      <StatusBar style="dark" translucent />
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#F6F4F0",
            position: "absolute",
            borderTopColor: "#0061FF1A",
            borderTopWidth: 1,
            height: 70,
          },
        }}
      >
        <Tabs.Screen
          key="home"
          name="home"
          options={{
            title: "HomeTab",
            headerShown: false,
            tabBarIcon: ({ focused }: { focused: boolean }) => (
              <TabIcon
                icon={tab_icons.tab_home}
                focused={focused}
                title="Home"
              />
            ),
          }}
        />

        <Tabs.Screen
          key="activities"
          name="activities"
          options={{
            title: "Activities",
            headerShown: false,
            tabBarIcon: ({ focused }: { focused: boolean }) => (
              <TabIcon
                icon={tab_icons.tab_activities}
                focused={focused}
                title="Activities"
              />
            ),
          }}
        />

        <Tabs.Screen
          key="cart"
          name="cart"
          options={{
            title: "Cart",
            headerShown: false,
            tabBarIcon: ({ focused }: { focused: boolean }) => (
              <TabIcon
                icon={tab_icons.tab_cart}
                focused={focused}
                title="Cart"
                indicatorNumber={cart.length}
              />
            ),
          }}
        />

        <Tabs.Screen
          key="account"
          name="account"
          options={{
            title: "Account",
            headerShown: false,
            tabBarIcon: ({ focused }: { focused: boolean }) => (
              <TabIcon
                icon={tab_icons.tab_account}
                focused={focused}
                title="Account"
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

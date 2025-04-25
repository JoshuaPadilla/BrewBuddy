import { tab_icons, util_icons } from "@/constants/icons";
import { useAuthStore } from "@/store/useAuth";
import { useOrderStore } from "@/store/useOrders";
import { Redirect, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
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
}) => (
  <View className="flex-1 mt-3 flex flex-col items-center">
    {indicatorNumber && !focused ? (
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

export default function StaffTabLayout() {
  const { pendingOrders } = useOrderStore();

  const { authUser } = useAuthStore();

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
          key="orders"
          name="orders_screen"
          options={{
            title: "Orders",
            headerShown: false,
            tabBarIcon: ({ focused }: { focused: boolean }) => (
              <TabIcon
                icon={tab_icons.orders_icon}
                focused={focused}
                title="Orders"
                indicatorNumber={pendingOrders.length}
              />
            ),
          }}
        />

        <Tabs.Screen
          key="products"
          name="product_screen"
          options={{
            title: "Products",
            headerShown: false,
            tabBarIcon: ({ focused }: { focused: boolean }) => (
              <TabIcon
                icon={tab_icons.products_icon}
                focused={focused}
                title="Products"
              />
            ),
          }}
        />

        <Tabs.Screen
          key="inventory"
          name="inventory_screen"
          options={{
            title: "Inventory",
            headerShown: false,
            tabBarIcon: ({ focused }: { focused: boolean }) => (
              <TabIcon
                icon={tab_icons.inventory_icon}
                focused={focused}
                title="Inventory"
              />
            ),
          }}
        />

        <Tabs.Screen
          key="account"
          name="staff_account"
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

        <Tabs.Screen
          key="sales"
          name="insights"
          options={{
            title: "insights",
            headerShown: false,
            tabBarIcon: ({ focused }: { focused: boolean }) => (
              <TabIcon
                icon={util_icons.sales_icon}
                focused={focused}
                title="Sales"
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

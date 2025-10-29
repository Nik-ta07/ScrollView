import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTheme } from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import React from "react";

export default function DrawerLayout() {
  const { colors } = useTheme();
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.text,
        drawerStyle: {
          backgroundColor: "#ffffff",
        },
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: "#ffffff",
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Home",
          headerTitle: "Home",
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <IconSymbol name="house.fill" color={color} size={size ?? 24} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: "Profile",
          headerTitle: "Profile",
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <IconSymbol name="person.fill" color={color} size={size ?? 24} />
          ),
        }}
      />
    </Drawer>
  );
}

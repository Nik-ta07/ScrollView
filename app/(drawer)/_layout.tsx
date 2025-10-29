import { IconSymbol } from "@/components/ui/icon-symbol";
import { useThemeLocal } from "@/contexts/ThemeContext";
import { useTheme } from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { Switch, View } from "react-native";

export default function DrawerLayout() {
  const { colors } = useTheme();
  const { scheme, toggle } = useThemeLocal();
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
        headerRight: () => (
          <View style={{ paddingRight: 12 }}>
            <Switch value={scheme === "dark"} onValueChange={toggle} />
          </View>
        ),
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

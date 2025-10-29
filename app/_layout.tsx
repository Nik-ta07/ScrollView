import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import "react-native-reanimated";

import { ThemeProviderLocal, useThemeLocal } from "@/contexts/ThemeContext";

export const unstable_settings = {
  anchor: "login",
};

function RootLayoutInner() {
  const { scheme } = useThemeLocal();
  return (
    <ThemeProvider value={scheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ title: "Register" }} />
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal", title: "Modal" }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProviderLocal>
      <RootLayoutInner />
    </ThemeProviderLocal>
  );
}

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider } from "../contexts/AuthContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen
            name="(ticket)/BuyScreen"
            options={{
              headerShown: true,
              headerTitle: "Mua vé",
            }}
          />
          <Stack.Screen
            name="(news)/NewsDetailsScreen"
            options={{
              headerShown: true,
              headerTitle: "Chi tiết tin tức",
            }}
          />
          <Stack.Screen
            name="(ticket)/MyPurchase"
            options={{
              headerShown: true,
              headerTitle: "Vé của tôi",
            }}
          />
          <Stack.Screen
            name="(auth)/LoginScreen"
            options={{
              headerShown: true,
              headerTitle: "Đăng nhập",
            }}
          />
          <Stack.Screen
            name="(auth)/RegisterScreen"
            options={{
              headerShown: true,
              headerTitle: "Đăng ký",
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}

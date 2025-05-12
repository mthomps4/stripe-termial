import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import "react-native-reanimated";
import * as SplashScreen from "expo-splash-screen";

import { CurrentUserProvider } from "@/contexts/CurrentUserProvider";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Slot } from "expo-router";
import { useEffect } from "react";
import { CartProvider } from "@/contexts/CartProvider";

const queryClient = new QueryClient();
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <CurrentUserProvider>
          <CartProvider>
            <Slot />
          </CartProvider>
        </CurrentUserProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import "react-native-reanimated";

import { CurrentUserProvider } from "@/contexts/CurrentUserProvider";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";

const queryClient = new QueryClient();

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
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <CurrentUserProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="connect-warning" />
            <Stack.Screen name="+not-found" />
          </Stack>
        </CurrentUserProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

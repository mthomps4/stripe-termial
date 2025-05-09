import { Stack, Redirect } from "expo-router";

import { useCurrentUser } from "@/contexts/CurrentUserProvider";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function Home() {
  const { user, isLoading } = useCurrentUser();

  // Show loading state while checking authentication
  if (isLoading) {
    return null; // Or return a loading spinner
  }

  // If no user, redirect to login
  if (!user) {
    return <Redirect href="/account" />;
  }

  // If user exists, show main app
  return (
    <View>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="connect-warning" />
      </Stack>
      <StatusBar style="auto" />
    </View>
  );
}

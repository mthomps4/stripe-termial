import { Stack } from "expo-router";

export default function SweetCutsCartProvider() {
  return (
    <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{ title: "Cart", headerTitle: "Sweet Cuts" }}
      />
      <Stack.Screen
        name="checkout"
        options={{ title: "Checkout", headerTitle: "Sweet Cuts" }}
      />
    </Stack>
  );
}

import { useGetConnectionToken } from "@/hooks/terminal/useGetConnectionToken";
import {
  StripeTerminalProvider,
  useStripeTerminal,
} from "@stripe/stripe-terminal-react-native";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function StripeTerminalWrapper() {
  const { data: connectionToken, isLoading, error } = useGetConnectionToken();

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const secret = connectionToken?.secret;

  if (!secret || error) {
    return (
      <View>
        <Text>No connection token...</Text>
      </View>
    );
  }

  const tokenProvider = () => Promise.resolve(secret);

  return (
    <StripeTerminalProvider tokenProvider={tokenProvider}>
      <CartStackLayout />
    </StripeTerminalProvider>
  );
}

const CartStackLayout = () => {
  const { initialize } = useStripeTerminal();

  useEffect(() => {
    initialize();
  }, [initialize]);

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
};

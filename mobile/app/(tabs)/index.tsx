import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useCurrentUser } from "@/contexts/CurrentUserProvider";
import { useGetProducts } from "@/hooks/products/useGetProducts";
import { Redirect } from "expo-router";

export default function HomeScreen() {
  const { user } = useCurrentUser();

  const {
    data: products,
    isLoading,
    error,
  } = useGetProducts({
    searchParam: "",
    page: 1,
    perPage: 10,
  });

  // TODO: Equiv of withAuth hook?
  if (!user) {
    return <Redirect href="/account" />;
  }

  if (isLoading) {
    return (
      <View style={styles.mainContainer}>
        <ThemedText>Loading...</ThemedText>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.mainContainer}>
        <ThemedText>Error: {error.message}</ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <ThemedText type="title">Welcome!</ThemedText>
      {products?.products.map((product) => (
        <ThemedText key={product.id}>{product.name}</ThemedText>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

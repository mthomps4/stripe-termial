import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useGetProducts } from "@/hooks/products/useGetProducts";

export default function HomeScreen() {
  const {
    data: products,
    isLoading,
    error,
  } = useGetProducts({
    searchParam: "",
    page: 1,
    perPage: 10,
  });

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

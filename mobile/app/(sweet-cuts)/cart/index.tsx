import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useGetProducts } from "@/hooks/products/useGetProducts";
import { useCart } from "@/contexts/CartProvider";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

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

  const { items, total, addItem, removeItem, updateQuantity, clearCart } =
    useCart();

  const handleRemoveItem = (productId: string, productName: string) => {
    Alert.alert(
      "Remove Item",
      `Are you sure you want to remove ${productName} from your cart?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          onPress: () => removeItem(productId),
          style: "destructive",
        },
      ]
    );
  };

  const handleClearCart = () => {
    Alert.alert(
      "Clear Cart",
      "Are you sure you want to clear your entire cart?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          onPress: clearCart,
          style: "destructive",
        },
      ]
    );
  };

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
    <View style={styles.container}>
      <ScrollView
        style={styles.productList}
        contentContainerStyle={{ paddingBottom: total > 0 ? 120 : 0 }} // Increased padding to accommodate tab nav
      >
        <ThemedText type="title" style={styles.welcomeText}>
          Welcome!
        </ThemedText>
        {products?.products.map((product) => {
          const cartItem = items.find((item) => item.product.id === product.id);
          return (
            <View key={product.id} style={styles.productRow}>
              <View style={styles.productInfo}>
                <ThemedText style={styles.productName}>
                  {product.name}
                  {cartItem && (
                    <ThemedText style={styles.quantity}>
                      {" "}
                      (x{cartItem.quantity})
                    </ThemedText>
                  )}
                </ThemedText>
                <ThemedText style={styles.price}>${product.price}</ThemedText>
              </View>

              {cartItem ? (
                <View style={styles.controlsContainer}>
                  <View style={styles.quantityControls}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() =>
                        updateQuantity(
                          product.id.toString(),
                          cartItem.quantity - 1
                        )
                      }
                    >
                      <ThemedText style={styles.quantityButtonText}>
                        -
                      </ThemedText>
                    </TouchableOpacity>

                    <ThemedText style={styles.quantityText}>
                      {cartItem.quantity}
                    </ThemedText>

                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() =>
                        updateQuantity(
                          product.id.toString(),
                          cartItem.quantity + 1
                        )
                      }
                    >
                      <ThemedText style={styles.quantityButtonText}>
                        +
                      </ThemedText>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.trashButton}
                    onPress={() =>
                      handleRemoveItem(product.id.toString(), product.name)
                    }
                  >
                    <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addItem(product)}
                >
                  <ThemedText style={styles.addButtonText}>
                    Add to Cart
                  </ThemedText>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>

      {total > 0 && (
        <View style={styles.checkoutContainer}>
          <View style={styles.checkoutRow}>
            <TouchableOpacity
              style={[
                styles.checkoutButton,
                {
                  backgroundColor: "#007AFF",
                  padding: 16,
                  borderRadius: 8,
                  flex: 1,
                },
              ]}
              onPress={() => router.push("/(sweet-cuts)/cart/checkout")}
            >
              <ThemedText
                style={[
                  styles.checkoutText,
                  { color: "#fff", textAlign: "center", fontSize: 16 },
                ]}
              >
                Checkout (${total.toFixed(2)})
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.clearCartButton}
              onPress={handleClearCart}
            >
              <Ionicons name="trash-outline" size={24} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productList: {
    flex: 1,
    padding: 16,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quantity: {
    fontWeight: "normal",
    color: "#666",
  },
  price: {
    marginTop: 4,
    color: "#666",
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 4,
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 16,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityText: {
    marginHorizontal: 12,
    fontSize: 16,
  },
  trashButton: {
    padding: 8,
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  checkoutContainer: {
    position: "absolute",
    bottom: 80, // Increased bottom position to appear above tab nav
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  checkoutRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkoutButton: {
    backgroundColor: "#34C759",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  clearCartButton: {
    padding: 12,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
  },
});

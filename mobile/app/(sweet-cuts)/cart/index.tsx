import { ThemedText } from "@/components/ThemedText";
import { brandColors } from "@/constants/Colors";
import { useCart } from "@/contexts/CartProvider";
import { useGetProducts } from "@/hooks/products/useGetProducts";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

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
                    <Ionicons
                      name="trash-outline"
                      size={20}
                      color={brandColors.neutral[900]}
                    />
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
              style={styles.checkoutButton}
              onPress={() => router.push("/(sweet-cuts)/cart/checkout")}
            >
              <ThemedText style={styles.checkoutText}>
                Checkout (${total.toFixed(2)})
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.clearCartButton}
              onPress={handleClearCart}
            >
              <Ionicons
                name="trash-outline"
                size={24}
                color={brandColors.neutral[900]}
              />
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
    borderBottomColor: brandColors.neutral[300],
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: brandColors.neutral[900],
  },
  quantity: {
    fontWeight: "normal",
    color: brandColors.sky[900],
  },
  price: {
    marginTop: 4,
    color: brandColors.sky[900],
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: brandColors.neutral[200],
    borderRadius: 8,
    padding: 4,
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: brandColors.neutral[300],
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
    backgroundColor: brandColors.sky[700],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: brandColors.neutral[50],
    fontWeight: "bold",
  },
  checkoutContainer: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: brandColors.neutral[50],
    borderTopWidth: 2,
    borderTopColor: brandColors.neutral[300],
  },
  checkoutRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  checkoutButton: {
    flex: 1,
    backgroundColor: brandColors.sky[700],
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutText: {
    color: brandColors.neutral[50],
    fontSize: 18,
    fontWeight: "bold",
  },
  clearCartButton: {
    padding: 12,
    backgroundColor: brandColors.neutral[100],
    borderRadius: 8,
  },
});

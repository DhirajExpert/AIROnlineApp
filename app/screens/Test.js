import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from "react-native";

const products = [
  { id: 1, name: "Professional Online", rate: 18000 },
  { id: 2, name: "Judgment Download Package", rate: 2500 },
  { id: 3, name: "Supreme Court of India + Andhra Pradesh HC", rate: 8390 },
  { id: 4, name: "Judgment Download Package 10 Downloads", rate: 900 },
  { id: 5, name: "Judgment Download Package 15 Downloads", rate: 1250 },
  // Add more products as needed...
];

const GST_RATE = 0.18;

const ProductRow = ({ product, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (newQuantity) => {
    const numericQuantity = parseInt(newQuantity) || 0;
    setQuantity(numericQuantity);
    onQuantityChange(product.id, numericQuantity);
  };

  return (
    <View style={styles.row}>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.rate}>{`₹${product.rate}`}</Text>
      <TextInput
        style={styles.quantityInput}
        keyboardType="numeric"
        value={quantity.toString()}
        onChangeText={handleQuantityChange}
      />
      <Text style={styles.totalAmount}>{`₹${product.rate * quantity}`}</Text>
    </View>
  );
};

const Test = () => {
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prev) => ({ ...prev, [productId]: quantity }));
  };

  const calculateTotal = () => {
    return products.reduce(
      (total, product) =>
        total + (quantities[product.id] || 0) * product.rate,
      0
    );
  };

  const totalAmount = calculateTotal();
  const gstAmount = totalAmount * GST_RATE;
  const grandTotal = totalAmount + gstAmount;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shop Product</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Product</Text>
        <Text style={styles.tableHeaderText}>Rate/Qty ₹</Text>
        <Text style={styles.tableHeaderText}>Quantity</Text>
        <Text style={styles.tableHeaderText}>Total Amount ₹</Text>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductRow
            product={item}
            onQuantityChange={handleQuantityChange}
          />
        )}
      />
      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total:</Text>
          <Text style={styles.summaryValue}>{`₹${totalAmount.toFixed(2)}`}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>GST [18%]:</Text>
          <Text style={styles.summaryValue}>{`₹${gstAmount.toFixed(2)}`}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Grand Total:</Text>
          <Text style={styles.summaryValue}>{`₹${grandTotal.toFixed(2)}`}</Text>
        </View>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Contact Us: All India Reporter Pvt. Ltd.</Text>
        <Text style={styles.footerText}>Terms & Conditions</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    backgroundColor: "#e0e0e0",
    padding: 10,
  },
  tableHeaderText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  productName: {
    flex: 2,
    textAlign: "left",
  },
  rate: {
    flex: 1,
    textAlign: "center",
  },
  quantityInput: {
    flex: 1,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    height: 35,
    paddingHorizontal: 5,
  },
  totalAmount: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  summary: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  summaryValue: {
    fontSize: 16,
  },
  submitButton: {
    marginTop: 10,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#555",
  },
});

export default Test;

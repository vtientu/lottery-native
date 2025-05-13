import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function BuyScreen() {
  const [ticketCode, setTicketCode] = useState("");

  const handleBuy = () => {
    if (!/^\d{6}$/.test(ticketCode)) {
      Alert.alert("Lỗi", "Vui lòng nhập đúng 6 chữ số.");
      return;
    }

    // TODO: Gọi API hoặc xử lý mua vé ở đây
    Alert.alert("Thành công", `Bạn đã nhập mã: ${ticketCode}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mua vé</Text>

      <Text style={styles.label}>Nhập mã gồm 6 chữ số:</Text>
      <TextInput
        style={styles.input}
        value={ticketCode}
        onChangeText={(text) => {
          // Chỉ cho phép số, giới hạn 6 ký tự
          const cleaned = text.replace(/[^0-9]/g, "").slice(0, 6);
          setTicketCode(cleaned);
        }}
        placeholder="Nhập mã 6 số"
        keyboardType="numeric"
        maxLength={6}
      />

      <TouchableOpacity style={styles.button} onPress={handleBuy}>
        <Text style={styles.buttonText}>Mua vé</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 18,
    letterSpacing: 10,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#e60000",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

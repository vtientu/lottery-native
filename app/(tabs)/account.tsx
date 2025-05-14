import { useAuth } from "@/contexts/AuthContext";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AccountScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.username}>Xin chào, {user?.fullName}</Text>
      <Text style={styles.balance}>
        Số dư: {user?.balance?.toLocaleString()}đ
      </Text>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  username: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  balance: { fontSize: 16, marginBottom: 24 },
  logoutButton: {
    backgroundColor: "#e60000",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  logoutText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useAuth } from "../../contexts/AuthContext";

const LoginScreen = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ username?: string; password?: string }>(
    {}
  );

  const handleLogin = async () => {
    let err: any = {};
    if (!username) err.username = "Vui lòng nhập username";
    if (!password) err.password = "Vui lòng nhập mật khẩu";
    setError(err);
    if (Object.keys(err).length > 0) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Vui lòng nhập đầy đủ thông tin.",
      });
      return;
    }
    setLoading(true);
    await login({ username, password });
    setLoading(false);
  };

  const handleRegister = () => {
    router.replace("/(auth)/RegisterScreen");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f4f6fb" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <MaterialCommunityIcons
            name="account-circle"
            size={56}
            color="#1976d2"
            style={{ alignSelf: "center", marginBottom: 8 }}
          />
          <Text style={styles.title}>Đăng nhập</Text>
          <View
            style={[styles.inputGroup, error.username && styles.inputError]}
          >
            <Feather
              name="user"
              size={20}
              color="#1976d2"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={(t) => {
                setUsername(t);
                setError((e) => ({ ...e, username: undefined }));
              }}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor="#aaa"
            />
          </View>
          {error.username && (
            <Text style={styles.errorText}>{error.username}</Text>
          )}
          <View
            style={[styles.inputGroup, error.password && styles.inputError]}
          >
            <Feather
              name="lock"
              size={20}
              color="#1976d2"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              value={password}
              onChangeText={(t) => {
                setPassword(t);
                setError((e) => ({ ...e, password: undefined }));
              }}
              secureTextEntry={!showPassword}
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity onPress={() => setShowPassword((v) => !v)}>
              <Feather
                name={showPassword ? "eye" : "eye-off"}
                size={20}
                color="#888"
              />
            </TouchableOpacity>
          </View>
          {error.password && (
            <Text style={styles.errorText}>{error.password}</Text>
          )}
          <TouchableOpacity
            onPress={handleLogin}
            style={[styles.loginButton, loading && { opacity: 0.7 }]}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginText}>Đăng nhập</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleRegister}
            style={styles.registerButton}
          >
            <Text style={styles.registerText}>
              Chưa có tài khoản?{" "}
              <Text
                style={{ color: "#1976d2", textDecorationLine: "underline" }}
              >
                Đăng ký
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6fb",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 28,
    width: "100%",
    maxWidth: 370,
    shadowColor: "#1976d2",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    alignItems: "stretch",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#1976d2",
    textAlign: "center",
    letterSpacing: 1,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#cfd8dc",
    paddingHorizontal: 12,
    marginBottom: 18,
    height: 48,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#222",
    backgroundColor: "transparent",
  },
  inputError: {
    borderColor: "#e60000",
  },
  errorText: {
    color: "#e60000",
    fontSize: 13,
    marginBottom: 6,
    marginLeft: 8,
  },
  loginButton: {
    backgroundColor: "#1976d2",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#1976d2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 3,
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    letterSpacing: 1,
  },
  registerButton: {
    marginTop: 18,
    alignItems: "center",
  },
  registerText: {
    color: "#888",
    fontSize: 15,
  },
});

export default LoginScreen;

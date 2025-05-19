import { useAuth } from "@/contexts/AuthContext";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const RegisterScreen = () => {
  const router = useRouter();
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{
    username?: string;
    fullName?: string;
    phone?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleRegister = async () => {
    let err: any = {};
    if (!username) err.username = "Vui lòng nhập username";
    if (!fullName) err.fullName = "Vui lòng nhập họ tên";
    if (!phone) err.phone = "Vui lòng nhập số điện thoại";
    if (!email) err.email = "Vui lòng nhập email";
    if (!password) err.password = "Vui lòng nhập mật khẩu";
    if (!confirmPassword) err.confirmPassword = "Vui lòng xác nhận mật khẩu";
    if (password && confirmPassword && password !== confirmPassword) {
      err.confirmPassword = "Mật khẩu xác nhận không khớp";
    }
    setError(err);
    if (Object.keys(err).length > 0) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Vui lòng kiểm tra lại thông tin.",
      });
      return;
    }
    setLoading(true);
    await register({ username, fullName, phone, email, password });
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f4f6fb" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <MaterialCommunityIcons
            name="account-plus"
            size={52}
            color="#1976d2"
            style={{ alignSelf: "center", marginBottom: 8 }}
          />
          <Text style={styles.title}>Đăng ký</Text>
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
            style={[styles.inputGroup, error.fullName && styles.inputError]}
          >
            <Feather
              name="user-check"
              size={20}
              color="#1976d2"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Họ tên"
              value={fullName}
              onChangeText={(t) => {
                setFullName(t);
                setError((e) => ({ ...e, fullName: undefined }));
              }}
              placeholderTextColor="#aaa"
            />
          </View>
          {error.fullName && (
            <Text style={styles.errorText}>{error.fullName}</Text>
          )}
          <View style={[styles.inputGroup, error.phone && styles.inputError]}>
            <Feather
              name="phone"
              size={20}
              color="#1976d2"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Số điện thoại"
              value={phone}
              onChangeText={(t) => {
                setPhone(t);
                setError((e) => ({ ...e, phone: undefined }));
              }}
              keyboardType="phone-pad"
              placeholderTextColor="#aaa"
            />
          </View>
          {error.phone && <Text style={styles.errorText}>{error.phone}</Text>}
          <View style={[styles.inputGroup, error.email && styles.inputError]}>
            <Feather
              name="mail"
              size={20}
              color="#1976d2"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(t) => {
                setEmail(t);
                setError((e) => ({ ...e, email: undefined }));
              }}
              keyboardType="email-address"
              placeholderTextColor="#aaa"
            />
          </View>
          {error.email && <Text style={styles.errorText}>{error.email}</Text>}
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
          <View
            style={[
              styles.inputGroup,
              error.confirmPassword && styles.inputError,
            ]}
          >
            <Feather
              name="lock"
              size={20}
              color="#1976d2"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Xác nhận mật khẩu"
              value={confirmPassword}
              onChangeText={(t) => {
                setConfirmPassword(t);
                setError((e) => ({ ...e, confirmPassword: undefined }));
              }}
              secureTextEntry={!showConfirmPassword}
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword((v) => !v)}>
              <Feather
                name={showConfirmPassword ? "eye" : "eye-off"}
                size={20}
                color="#888"
              />
            </TouchableOpacity>
          </View>
          {error.confirmPassword && (
            <Text style={styles.errorText}>{error.confirmPassword}</Text>
          )}
          <TouchableOpacity
            style={[styles.registerButton, loading && { opacity: 0.7 }]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <Text style={styles.registerText}>Đang đăng ký...</Text>
            ) : (
              <Text style={styles.registerText}>Đăng ký</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/(auth)/LoginScreen")}
            style={styles.loginButton}
          >
            <Text style={styles.loginText}>
              Đã có tài khoản?{" "}
              <Text
                style={{ color: "#1976d2", textDecorationLine: "underline" }}
              >
                Đăng nhập
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
  registerButton: {
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
  registerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    letterSpacing: 1,
  },
  loginButton: {
    marginTop: 18,
    alignItems: "center",
  },
  loginText: {
    color: "#888",
    fontSize: 15,
  },
  errorText: { color: "#e60000", fontSize: 13, marginBottom: 8, marginLeft: 4 },
  inputError: { borderColor: "#e60000" },
});

export default RegisterScreen;

import {
  getProfile,
  loginService,
  registerService,
} from "@/services/auth.service";
import { removeToken, saveToken } from "@/utils/tokenStorage";
import { router, useSegments } from "expo-router";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Toast from "react-native-toast-message";

interface AuthContextType {
  isLoggedIn: boolean;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  login: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  register: ({
    username,
    fullName,
    phone,
    email,
    password,
  }: {
    username: string;
    fullName: string;
    phone: string;
    email: string;
    password: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const segments = useSegments();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const profile = await getProfile();
        setIsLoggedIn(true);
        setUser(profile);
        // Nếu đang ở trang login hoặc register thì chuyển vào tabs

        const segArr = [...segments];
        if (
          segArr.includes("LoginScreen") ||
          segArr.includes("RegisterScreen")
        ) {
          router.push("/(tabs)");
        }
      } catch {
        setIsLoggedIn(false);
        setUser(null);
      }
    };
    checkAuth();
  }, [segments]);

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await loginService({
        username,
        password,
      });
      setIsLoggedIn(true);
      setUser(response.user);
      saveToken(response.token);
      router.push("/(tabs)");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Đăng nhập thất bại",
        text2: error?.response?.data?.message || "Vui lòng thử lại.",
      });
    }
  };

  const register = async ({
    username,
    fullName,
    phone,
    email,
    password,
  }: {
    username: string;
    fullName: string;
    phone: string;
    email: string;
    password: string;
  }) => {
    try {
      await registerService({
        username,
        fullName,
        phone,
        email,
        password,
      });
      Toast.show({ type: "success", text1: "Đăng ký thành công" });
      router.push("/(auth)/LoginScreen");
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Đăng ký thất bại",
        text2: error?.response?.data?.message || "Vui lòng thử lại.",
      });
    }
  };

  const logout = async () => {
    await removeToken();
    setIsLoggedIn(false);
    setUser(null);
    router.replace("/(auth)/LoginScreen");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, setUser, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext };

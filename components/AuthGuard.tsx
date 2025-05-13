import { useRouter } from "expo-router";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const auth = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!auth?.isLoggedIn) {
      router.replace("/(auth)/LoginScreen");
    } else {
      router.replace("/(tabs)");
    }
  }, [auth?.isLoggedIn, router]);

  if (!auth?.isLoggedIn) {
    return null;
  }

  return <>{children}</>;
};

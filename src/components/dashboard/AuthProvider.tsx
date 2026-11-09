"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { mockUser } from "@/lib/dashboard/mock-data";
import type { User } from "@/lib/dashboard/types";

interface AuthContextValue {
  user: User;
  updateProfile: (data: Pick<User, "fullName" | "email" | "phone">) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Hozircha foydalanuvchi sessiyasi simulyatsiya qilinadi.
 * auth-xosting ulanganda `user` sessiyadan olinadi va `signOut` haqiqiy chiqishni bajaradi.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User>(mockUser);

  const updateProfile = useCallback<AuthContextValue["updateProfile"]>((data) => {
    setUser((current) => ({ ...current, ...data, name: data.fullName.trim().split(/\s+/)[0] || current.name }));
  }, []);

  const signOut = useCallback(() => {
    router.replace("/");
  }, [router]);

  const value = useMemo(() => ({ user, updateProfile, signOut }), [user, updateProfile, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth faqat AuthProvider ichida ishlatiladi");
  return context;
}

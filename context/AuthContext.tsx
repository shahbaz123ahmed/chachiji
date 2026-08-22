"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (emailOrPhone: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  signup: (name: string, email: string, phone: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  login: async () => ({ success: false, message: "Authentication service initializing" }),
  signup: async () => ({ success: false, message: "Authentication service initializing" }),
  logout: () => {},
  updateProfile: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("chachiji_customer_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error("Failed to load user from localStorage", e);
    }
    setIsHydrated(true);
  }, []);

  const login = async (emailOrPhone: string, password?: string) => {
    if (!emailOrPhone.trim()) {
      return { success: false, message: "Please enter your email or phone number." };
    }

    const existingUsersRaw = localStorage.getItem("chachiji_registered_users");
    const registeredUsers: UserProfile[] = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];

    const found = registeredUsers.find(
      (u) => u.email?.toLowerCase() === emailOrPhone.toLowerCase() || u.phone === emailOrPhone
    );

    const loggedUser: UserProfile = found || {
      id: `usr_${Date.now()}`,
      name: emailOrPhone.includes("@") ? emailOrPhone.split("@")[0] : "Chachiji Customer",
      email: emailOrPhone.includes("@") ? emailOrPhone : `${emailOrPhone}@chachiji.in`,
      phone: !emailOrPhone.includes("@") ? emailOrPhone : "9876543210",
    };

    setUser(loggedUser);
    localStorage.setItem("chachiji_customer_user", JSON.stringify(loggedUser));
    return { success: true };
  };

  const signup = async (name: string, email: string, phone: string, password?: string) => {
    if (!name.trim() || !email.trim()) {
      return { success: false, message: "Please provide both name and email." };
    }

    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
    };

    const existingUsersRaw = localStorage.getItem("chachiji_registered_users");
    const registeredUsers: UserProfile[] = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];
    registeredUsers.push(newUser);
    localStorage.setItem("chachiji_registered_users", JSON.stringify(registeredUsers));

    setUser(newUser);
    localStorage.setItem("chachiji_customer_user", JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("chachiji_customer_user");
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem("chachiji_customer_user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context || defaultAuthContext;
}

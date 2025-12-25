import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "customer" | "barber" | "admin";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  setRole: (role: UserRole) => void;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Mock login - in production, this would call your API
    const mockUser: User = {
      id: "1",
      name: "John Doe",
      email,
      role: "customer", // This would come from the API
    };
    setUser(mockUser);
  };

  const register = async (data: RegisterData) => {
    // Mock register - in production, this would call your API
    const newUser: User = {
      id: "1",
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const setRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

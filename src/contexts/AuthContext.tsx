import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type UserRole = "customer" | "barber" | "admin";

export interface User {
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
  selectedRole: UserRole | null;
  isLoading: boolean;
  error: string | null;
  selectRole: (role: UserRole) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for different roles
const mockUsers: Record<UserRole, User> = {
  customer: {
    id: "cust-1",
    name: "John Customer",
    email: "customer@example.com",
    phone: "+1234567890",
    role: "customer",
  },
  barber: {
    id: "barber-1",
    name: "Mike Barber",
    email: "barber@example.com",
    phone: "+1234567891",
    role: "barber",
  },
  admin: {
    id: "admin-1",
    name: "Admin User",
    email: "admin@example.com",
    phone: "+1234567892",
    role: "admin",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectRole = useCallback((role: UserRole) => {
    setSelectedRole(role);
    setError(null);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    if (!selectedRole) {
      setError("Please select a role first");
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock validation - in production, this would call your API
      if (password.length < 6) {
        setError("Invalid credentials");
        return false;
      }

      // Create user with selected role
      const newUser: User = {
        ...mockUsers[selectedRole],
        email,
      };

      setUser(newUser);
      return true;
    } catch (err) {
      setError("Login failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [selectedRole]);

  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    if (!selectedRole) {
      setError("Please select a role first");
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create new user with registration data
      const newUser: User = {
        id: `${selectedRole}-${Date.now()}`,
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: selectedRole,
      };

      setUser(newUser);
      return true;
    } catch (err) {
      setError("Registration failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [selectedRole]);

  const logout = useCallback(() => {
    setUser(null);
    setSelectedRole(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        selectedRole,
        isLoading,
        error,
        selectRole,
        login,
        register,
        logout,
        clearError,
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

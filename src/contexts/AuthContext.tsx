import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { apiService } from "@/services/api";

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

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        setIsLoading(true);
        try {
          const response = await apiService.getProfile(token);
          const userData = response.data.user;

          const profile = userData.customer || userData.barber || userData.admin;

          setUser({
            id: userData.id,
            email: userData.email,
            name: profile?.name || userData.email.split('@')[0],
            role: userData.role.toLowerCase() as UserRole,
            phone: profile?.phone,
          });
          setSelectedRole(userData.role.toLowerCase() as UserRole);
        } catch (err) {
          console.error('Auth initialization failed:', err);
          localStorage.removeItem('authToken');
        } finally {
          setIsLoading(false);
        }
      }
    };

    initAuth();
  }, []);

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
      const response = await apiService.login(selectedRole, { email, password });

      // Store token in localStorage
      localStorage.setItem('authToken', response.token);

      // Create user object from response
      const newUser: User = {
        id: response.data.user.id,
        email: response.data.user.email,
        name: email.split('@')[0], // Temporary, should come from backend
        role: selectedRole,
      };

      setUser(newUser);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed. Please try again.";
      setError(errorMessage);
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
      const response = await apiService.register(selectedRole, data);

      // Store token in localStorage
      localStorage.setItem('authToken', response.token);

      // Create user object from response
      const newUser: User = {
        id: response.data.user.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: selectedRole,
      };

      setUser(newUser);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Registration failed. Please try again.";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [selectedRole]);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
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

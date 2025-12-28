import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { AuthProvider } from "@/contexts/AuthContext";
import { muiTheme } from "./theme/muiTheme";

// Auth Pages
import SplashScreen from "./pages/auth/SplashScreen";
import WelcomeScreen from "./pages/auth/WelcomeScreen";
import RoleSelectScreen from "./pages/auth/RoleSelectScreen";
import LoginScreen from "./pages/auth/LoginScreen";
import RegisterScreen from "./pages/auth/RegisterScreen";
import ForgotPasswordScreen from "./pages/auth/ForgotPasswordScreen";
import OTPVerifyScreen from "./pages/auth/OTPVerifyScreen";

// Customer Pages
import CustomerHome from "./pages/customer/CustomerHome";
import ShopDetail from "./pages/customer/ShopDetail";
import QueueStatus from "./pages/customer/QueueStatus";
import CustomerProfile from "./pages/customer/CustomerProfile";
import ExploreShops from "./pages/customer/ExploreShops";

// Barber Pages
import BarberDashboard from "./pages/barber/BarberDashboard";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/" element={<SplashScreen />} />
            <Route path="/welcome" element={<WelcomeScreen />} />
            <Route path="/role-select" element={<RoleSelectScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
            <Route path="/otp-verify" element={<OTPVerifyScreen />} />

            {/* Customer Routes */}
            <Route path="/customer" element={<CustomerHome />} />
            <Route path="/customer/explore" element={<ExploreShops />} />
            <Route path="/customer/shop/:id" element={<ShopDetail />} />
            <Route path="/customer/queue" element={<QueueStatus />} />
            <Route path="/customer/chat" element={<QueueStatus />} />
            <Route path="/customer/profile" element={<CustomerProfile />} />

            {/* Barber Routes */}
            <Route path="/barber" element={<BarberDashboard />} />
            <Route path="/barber/queue" element={<BarberDashboard />} />
            <Route path="/barber/services" element={<BarberDashboard />} />
            <Route path="/barber/chat" element={<BarberDashboard />} />
            <Route path="/barber/settings" element={<BarberDashboard />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminDashboard />} />
            <Route path="/admin/barbers" element={<AdminDashboard />} />
            <Route path="/admin/shops" element={<AdminDashboard />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

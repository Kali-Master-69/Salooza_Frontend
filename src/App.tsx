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
import QueueConfirmation from "./pages/customer/QueueConfirmation";
import CustomerProfile from "./pages/customer/CustomerProfile";
import ExploreShops from "./pages/customer/ExploreShops";
import CustomerChat from "./pages/customer/CustomerChat";

// Barber Pages
import BarberDashboard from "@/pages/barber/BarberDashboard";
import ShopSetup from "@/pages/barber/ShopSetup";
import AddWalkIn from "@/pages/barber/AddWalkIn";
import ServicesManagement from "@/pages/barber/ServicesManagement";
import BarberSettings from "@/pages/barber/BarberSettings";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
            <Route path="/customer/queue-join" element={<QueueConfirmation />} />
            <Route path="/customer/chat" element={<CustomerChat />} />
            <Route path="/customer/profile" element={<CustomerProfile />} />

            {/* Barber Routes */}
            <Route path="/barber" element={<BarberDashboard />} />
            <Route path="/barber/shop-setup" element={<ShopSetup />} />
            <Route path="/barber/queue" element={<BarberDashboard />} />
            <Route path="/barber/add-walkin" element={<AddWalkIn />} />
            <Route path="/barber/services" element={<ServicesManagement />} />
            <Route path="/barber/chat" element={<BarberDashboard />} />
            <Route path="/barber/settings" element={<BarberSettings />} />

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

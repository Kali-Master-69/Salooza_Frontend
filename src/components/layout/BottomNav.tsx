import { useNavigate, useLocation } from "react-router-dom";
import { Paper, BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAuth } from "@/contexts/AuthContext";

const customerTabs = [
  { path: "/customer", icon: <HomeIcon />, label: "Home" },
  { path: "/customer/explore", icon: <SearchIcon />, label: "Explore" },
  { path: "/customer/queue", icon: <CalendarMonthIcon />, label: "Queue" },
  { path: "/customer/chat", icon: <ChatIcon />, label: "Chat" },
  { path: "/customer/profile", icon: <PersonIcon />, label: "Profile" },
];

const barberTabs = [
  { path: "/barber", icon: <HomeIcon />, label: "Dashboard" },
  { path: "/barber/queue", icon: <CalendarMonthIcon />, label: "Queue" },
  { path: "/barber/services", icon: <ContentCutIcon />, label: "Services" },
  { path: "/barber/chat", icon: <ChatIcon />, label: "Chat" },
  { path: "/barber/settings", icon: <SettingsIcon />, label: "Settings" },
];

const adminTabs = [
  { path: "/admin", icon: <HomeIcon />, label: "Dashboard" },
  { path: "/admin/users", icon: <PersonIcon />, label: "Users" },
  { path: "/admin/barbers", icon: <ContentCutIcon />, label: "Barbers" },
  { path: "/admin/shops", icon: <CalendarMonthIcon />, label: "Shops" },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const tabs =
    user?.role === "admin"
      ? adminTabs
      : user?.role === "barber"
        ? barberTabs
        : customerTabs;

  // Find the exact match or default to first
  const currentPath = location.pathname;
  // If we are in /customer/shop/123, we probably want "Explore" or "Home" to be active?
  // For now simple match.

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={currentPath}
        onChange={(_, newValue) => {
          navigate(newValue);
        }}
        sx={{
          bgcolor: 'background.paper',
          height: 64, // Taller for better touch target
        }}
      >
        {tabs.map((tab) => (
          <BottomNavigationAction
            key={tab.path}
            label={tab.label}
            icon={tab.icon}
            value={tab.path}
            sx={{
              minWidth: 0, // Allow shrinking
              '&.Mui-selected': {
                color: 'primary.main',
              },
            }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}

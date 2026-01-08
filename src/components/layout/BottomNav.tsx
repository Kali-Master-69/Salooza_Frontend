import { useNavigate, useLocation } from "react-router-dom";
import { Paper, BottomNavigation, BottomNavigationAction, Box, alpha } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import StoreIcon from "@mui/icons-material/Store";
import { useAuth } from "@/contexts/AuthContext";

const customerTabs = [
  { path: "/customer", icon: <HomeIcon />, label: "Home" },
  { path: "/customer/explore", icon: <SearchIcon />, label: "Explore" },
  { path: "/customer/queue", icon: <CalendarMonthIcon />, label: "Queue" },
  { path: "/customer/chat", icon: <ChatIcon />, label: "Chat" },
  { path: "/customer/profile", icon: <PersonIcon />, label: "Profile" },
];

const barberTabs = [
  { path: "/barber", icon: <DashboardIcon />, label: "Dashboard" },
  { path: "/barber/queue", icon: <CalendarMonthIcon />, label: "Queue" },
  { path: "/barber/services", icon: <ContentCutIcon />, label: "Services" },
  { path: "/barber/chat", icon: <ChatIcon />, label: "Chat" },
  { path: "/barber/settings", icon: <SettingsIcon />, label: "Settings" },
];

const adminTabs = [
  { path: "/admin", icon: <DashboardIcon />, label: "Dashboard" },
  { path: "/admin/users", icon: <PersonIcon />, label: "Users" },
  { path: "/admin/barbers", icon: <ContentCutIcon />, label: "Barbers" },
  { path: "/admin/shops", icon: <StoreIcon />, label: "Shops" },
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

  // Route-based active tab detection
  const currentPath = location.pathname;

  // Sort tabs by path length (longest first) to match more specific routes first
  // This prevents /customer from matching before /customer/explore
  const sortedTabs = [...tabs].sort((a, b) => b.path.length - a.path.length);

  // Find the active tab based on current route
  const activeTab = sortedTabs.find(tab => {
    // Exact match
    if (tab.path === currentPath) return true;
    // For nested routes (e.g., /customer/shop/123 should NOT highlight any tab)
    // Only match if it's a direct child route
    if (currentPath.startsWith(tab.path + '/')) return true;
    return false;
  });

  const activeValue = activeTab ? activeTab.path : currentPath;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        pb: 'env(safe-area-inset-bottom, 0px)', // Safe area for iOS devices
        px: 2,
        pointerEvents: 'none', // Allow clicks to pass through the container
      }}
    >
      <Paper
        elevation={8}
        sx={{
          pointerEvents: 'auto', // Re-enable clicks on the Paper
          borderRadius: '30px',
          mb: 2,
          overflow: 'hidden',
          bgcolor: (theme) => alpha(theme.palette.background.paper, 0.95),
          backdropFilter: 'blur(20px)',
          border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          boxShadow: (theme) => `
            0 8px 32px ${alpha('#000000', 0.4)},
            0 0 0 1px ${alpha(theme.palette.primary.main, 0.1)}
          `,
        }}
      >
        <BottomNavigation
          showLabels
          value={activeValue}
          onChange={(_, newValue) => {
            navigate(newValue);
          }}
          sx={{
            bgcolor: 'transparent',
            height: 70,
            '& .MuiBottomNavigationAction-root': {
              minWidth: 0,
              maxWidth: 'none',
              px: 1,
              py: 1.5,
              color: (theme) => alpha(theme.palette.text.primary, 0.5),
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

              '& .MuiBottomNavigationAction-label': {
                fontSize: '0.7rem',
                fontWeight: 500,
                opacity: 0.7,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                mt: 0.5,
              },

              '& .MuiSvgIcon-root': {
                fontSize: '1.5rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              },

              '&.Mui-selected': {
                color: 'primary.main',

                '& .MuiBottomNavigationAction-label': {
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  opacity: 1,
                },

                '& .MuiSvgIcon-root': {
                  fontSize: '1.75rem',
                  transform: 'translateY(-2px)',
                  filter: (theme) => `drop-shadow(0 0 8px ${alpha(theme.palette.primary.main, 0.4)})`,
                },
              },

              '&:hover:not(.Mui-selected)': {
                color: (theme) => alpha(theme.palette.text.primary, 0.8),

                '& .MuiSvgIcon-root': {
                  transform: 'scale(1.1)',
                },
              },
            },
          }}
        >
          {tabs.map((tab) => (
            <BottomNavigationAction
              key={tab.path}
              label={tab.label}
              icon={tab.icon}
              value={tab.path}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  Button,
  Avatar,
  Stack,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  alpha,
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SettingsIcon from "@mui/icons-material/Settings";
import SupportIcon from "@mui/icons-material/HelpOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { BottomNav } from "@/components/layout/BottomNav";
import { useAuth } from "@/contexts/AuthContext";
import barberPortrait from "@/assets/barber-portrait.jpg";

const menuItems = [
  { icon: <PersonIcon />, label: "Edit Profile", path: "/customer/profile/edit" },
  { icon: <SettingsIcon />, label: "Settings", path: "/customer/settings" },
  { icon: <SupportIcon />, label: "Support", path: "/customer/support" },
];

export default function CustomerProfile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 12 }}>
      {/* Header */}
      <Box sx={{ px: 3, pt: 6, pb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Profile
        </Typography>
      </Box>

      {/* Profile Card */}
      <Box sx={{ px: 3, mb: 4 }}>
        <Card sx={{ borderRadius: 3, position: "relative", overflow: "visible" }}>
          <IconButton
            size="small"
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <Box sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <Box
              sx={{
                p: 0.5,
                bgcolor: "background.paper",
                borderRadius: "50%",
                border: 1,
                borderColor: "primary.main",
                mb: 2,
              }}
            >
              <Avatar
                src={barberPortrait}
                alt="Profile"
                sx={{ width: 96, height: 96 }}
              />
            </Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {user?.name || "John Doe"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email || "john@example.com"}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1, color: "text.secondary" }}>
              <PhoneIcon fontSize="small" />
              <Typography variant="caption">{user?.phone || "+1 234 567 890"}</Typography>
            </Stack>
            <Box
              sx={{
                mt: 2,
                px: 2,
                py: 0.75,
                borderRadius: 4,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                color: "primary.main",
                typography: "caption",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              {user?.role || "Customer"}
            </Box>
          </Box>
        </Card>
      </Box>

      {/* Menu */}
      <Box sx={{ px: 3 }}>
        <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
          <List disablePadding>
            {menuItems.map((item, index) => (
              <Box key={item.label}>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate(item.path)} sx={{ py: 2 }}>
                    <ListItemIcon sx={{ minWidth: 40, color: "action.active" }}>
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: 2,
                          bgcolor: "action.hover",
                          display: "flex",
                        }}
                      >
                        {item.icon}
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ fontWeight: "medium" }}
                    />
                    <ChevronRightIcon color="action" />
                  </ListItemButton>
                </ListItem>
                {index < menuItems.length - 1 && <Divider component="li" variant="inset" />}
              </Box>
            ))}
          </List>
        </Card>

        <Card sx={{ mt: 3, borderRadius: 3, overflow: "hidden" }}>
          <ListItemButton onClick={handleLogout} sx={{ py: 2 }}>
            <ListItemIcon sx={{ minWidth: 40, color: "error.main" }}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
                  display: "flex",
                }}
              >
                <LogoutIcon color="error" />
              </Box>
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{ fontWeight: "medium", color: "error.main" }}
            />
            <ChevronRightIcon color="action" />
          </ListItemButton>
        </Card>
      </Box>

      <BottomNav />
    </Box>
  );
}

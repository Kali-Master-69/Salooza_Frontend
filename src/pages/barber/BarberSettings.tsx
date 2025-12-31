import { useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Stack,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemButton,
    alpha,
    Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BottomNav } from "@/components/layout/BottomNav";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LockIcon from "@mui/icons-material/Lock";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";

import { useAuth } from "@/contexts/AuthContext";

export default function BarberSettings() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const settingsItems = [
        {
            title: "Shop Profile",
            subtitle: "Update name, address, and hours",
            icon: <StorefrontIcon color="primary" />,
            path: "/barber/shop-setup",
        },
        {
            title: "Services & Pricing",
            subtitle: "Manage your haircut services",
            icon: <ContentCutIcon color="primary" />,
            path: "/barber/services",
        },
        {
            title: "Security",
            subtitle: "Change password and account settings",
            icon: <LockIcon color="primary" />,
            path: "#",
        },
        {
            title: "Notifications",
            subtitle: "Manage alerts and sounds",
            icon: <NotificationsIcon color="primary" />,
            path: "#",
        },
    ];

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 12 }}>
            {/* Header with Back Button */}
            <Box sx={{ px: 3, pt: 6, pb: 4, display: "flex", alignItems: "flex-start", gap: 2 }}>
                <IconButton
                    onClick={() => navigate(-1)}
                    sx={{ mt: -1, ml: -1.5 }}
                    aria-label="go back"
                >
                    <ArrowBackIcon />
                </IconButton>
                <Box>
                    <Typography variant="h4" fontWeight="bold">
                        Settings
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Manage your account and shop preferences
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ px: 3 }}>
                <Card sx={{ borderRadius: 4, overflow: 'hidden' }}>
                    <List sx={{ p: 0 }}>
                        {settingsItems.map((item, index) => (
                            <Box key={item.title}>
                                <ListItem
                                    disablePadding
                                    sx={{ py: 0 }}
                                >
                                    <ListItemButton
                                        onClick={() => navigate(item.path)}
                                        sx={{ py: 2 }}
                                    >
                                        <ListItemIcon>
                                            <Box sx={{
                                                p: 1,
                                                borderRadius: 2,
                                                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                                                display: 'flex'
                                            }}>
                                                {item.icon}
                                            </Box>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.title}
                                            secondary={item.subtitle}
                                            primaryTypographyProps={{ fontWeight: 'bold' }}
                                        />
                                        <ChevronRightIcon color="action" />
                                    </ListItemButton>
                                </ListItem>
                                {index < settingsItems.length - 1 && <Divider sx={{ mx: 2 }} />}
                            </Box>
                        ))}
                    </List>
                </Card>

                <Card sx={{ borderRadius: 4, mt: 4, overflow: 'hidden' }}>
                    <List sx={{ p: 0 }}>
                        <ListItem
                            disablePadding
                        >
                            <ListItemButton
                                onClick={handleLogout}
                                sx={{ py: 2 }}
                            >
                                <ListItemIcon>
                                    <Box sx={{
                                        p: 1,
                                        borderRadius: 2,
                                        bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
                                        display: 'flex'
                                    }}>
                                        <LogoutIcon color="error" />
                                    </Box>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Logout"
                                    primaryTypographyProps={{ fontWeight: 'bold', color: 'error.main' }}
                                />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Card>

                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 4 }}>
                    App Version 1.0.0
                </Typography>
            </Box>

            <BottomNav />
        </Box>
    );
}

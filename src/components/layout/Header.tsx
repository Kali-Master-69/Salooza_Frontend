import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Box, Badge, alpha } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  showNotifications?: boolean;
  transparent?: boolean;
  className?: string; // Kept for compatibility but mostly unused
}

export function Header({
  title,
  showBack = false,
  showSearch = false,
  showNotifications = false,
  transparent = false,
}: HeaderProps) {
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        bgcolor: transparent ? "transparent" : (theme) => alpha(theme.palette.background.default, 0.8),
        backdropFilter: transparent ? "none" : "blur(10px)",
        borderBottom: transparent ? "none" : 1,
        borderColor: "divider",
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", minHeight: 56 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {showBack && (
            <IconButton onClick={() => navigate(-1)} edge="start" color="inherit">
              <ArrowBackIcon />
            </IconButton>
          )}
          {title && (
            <Typography variant="h6" component="div" fontWeight="bold">
              {title}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {showSearch && (
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
          )}
          {showNotifications && (
            <IconButton color="inherit">
              <Badge badgeContent={1} color="primary" variant="dot">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

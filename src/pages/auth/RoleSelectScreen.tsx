import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Stack,
  IconButton,
  alpha,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useAuth, UserRole } from "@/contexts/AuthContext";

const roles: { id: UserRole; title: string; description: string; icon: React.ReactNode }[] = [
  {
    id: "customer",
    title: "Customer",
    description: "Browse shops, join queues, and manage your appointments",
    icon: <PersonIcon sx={{ fontSize: 40 }} />,
  },
  {
    id: "barber",
    title: "Barber",
    description: "Manage your shop, services, and customer queue",
    icon: <ContentCutIcon sx={{ fontSize: 40 }} />,
  },
  {
    id: "admin",
    title: "Admin",
    description: "Oversee platform operations and manage users",
    icon: <AdminPanelSettingsIcon sx={{ fontSize: 40 }} />,
  },
];

export default function RoleSelectScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { selectRole } = useAuth();

  const mode = searchParams.get("mode") || "register";
  const isLogin = mode === "login";

  const handleRoleSelect = (role: UserRole) => {
    selectRole(role);
    navigate(isLogin ? `/login?role=${role}` : `/register?role=${role}`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: 2,
      }}
    >
      <Container maxWidth="sm">
        {/* Header */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
          <IconButton
            onClick={() => navigate("/")}
            sx={{ color: "text.primary" }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" sx={{ color: "text.primary" }}>
            {isLogin ? "Sign In" : "Create Account"}
          </Typography>
        </Stack>

        {/* Role Selection */}
        <Typography
          variant="h4"
          sx={{ color: "text.primary", mb: 1, textAlign: "center" }}
        >
          Who are you?
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", mb: 4, textAlign: "center" }}
        >
          Select your role to continue
        </Typography>

        <Stack spacing={2}>
          {roles.map((role) => (
            <Card
              key={role.id}
              sx={{
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: (theme) =>
                    `0 8px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
                },
              }}
            >
              <CardActionArea onClick={() => handleRoleSelect(role.id)}>
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Box
                      sx={{
                        width: 72,
                        height: 72,
                        borderRadius: 2,
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "primary.main",
                      }}
                    >
                      {role.icon}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{ color: "text.primary", mb: 0.5 }}
                      >
                        {role.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {role.description}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>

        {/* Toggle Mode */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Typography
              component="span"
              variant="body2"
              sx={{
                color: "primary.main",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() =>
                navigate(`/auth/role-select?mode=${isLogin ? "register" : "login"}`)
              }
            >
              {isLogin ? "Sign up" : "Sign in"}
            </Typography>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  alpha,
  Paper,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import heroBarber from "@/assets/hero-barber.jpg";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, selectRole, selectedRole } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Ensure role is selected
  useEffect(() => {
    const roleParam = searchParams.get("role") as UserRole;
    if (roleParam) {
      selectRole(roleParam);
    } else if (!selectedRole) {
      // Redirect to role select if no role is active or in params
      navigate("/role-select?mode=login");
    }
  }, [searchParams, selectedRole, selectRole, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        navigate(selectedRole === "barber" ? "/barber" : selectedRole === "admin" ? "/admin" : "/customer");
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedRole) return null; // Or a loader

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        bgcolor: "background.default",
      }}
    >
      {/* Left Side - Image */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "block" },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={heroBarber}
          alt="Barber"
          sx={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 40,
            left: 40,
            right: 40,
            color: "common.white",
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.8 }}>
            Manage your appointments and style with ease.
          </Typography>
        </Box>
      </Box>

      {/* Right Side - Form */}
      <Box
        sx={{
          flex: { xs: 1, md: 0.8 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: { xs: 3, md: 6 },
        }}
      >
        <Container maxWidth="xs">
          <IconButton onClick={() => navigate("/role-select")} sx={{ mb: 4 }}>
            <ArrowBackIcon />
          </IconButton>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Sign In
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Login to your {selectedRole} account
            </Typography>
          </Box>

          <form onSubmit={handleLogin}>
            <Stack spacing={3}>
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Link
                  component="button"
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  underline="hover"
                  color="primary"
                >
                  Forgot Password?
                </Link>
              </Box>

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isLoading}
                sx={{ py: 1.5 }}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              <Typography variant="body2" align="center" color="text.secondary">
                Don't have an account?{" "}
                <Link
                  component="button"
                  type="button"
                  onClick={() => navigate(`/register?role=${selectedRole}`)}
                  fontWeight="bold"
                  underline="hover"
                >
                  Sign Up
                </Link>
              </Typography>
            </Stack>
          </form>
        </Container>
      </Box>
    </Box>
  );
}

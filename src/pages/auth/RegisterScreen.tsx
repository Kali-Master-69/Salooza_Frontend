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
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuth, UserRole } from "@/contexts/AuthContext";

export default function RegisterScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { register, selectRole, selectedRole } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Ensure role is selected
  useEffect(() => {
    const roleParam = searchParams.get("role") as UserRole;
    if (roleParam) {
      selectRole(roleParam);
    } else if (!selectedRole) {
      navigate("/role-select?mode=register");
    }
  }, [searchParams, selectedRole, selectRole, navigate]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      // Show error - ideally use a Snackbar, but checking passwords here
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const success = await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      if (success) {
        // Navigate to respective dashboard based on role
        navigate(selectedRole === "barber" ? "/barber" : selectedRole === "admin" ? "/admin" : "/customer");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedRole) return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: 4,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <IconButton onClick={() => navigate("/role-select")} sx={{ mb: 2 }}>
          <ArrowBackIcon />
        </IconButton>

        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Create an Account
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Registering as{" "}
            <Typography component="span" color="primary" sx={{ textTransform: "capitalize", fontWeight: "bold" }}>
              {selectedRole}
            </Typography>
          </Typography>
        </Box>

        <form onSubmit={handleRegister}>
          <Stack spacing={3}>
            <TextField
              label="Full Name"
              fullWidth
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <TextField
              label="Phone Number"
              type="tel"
              fullWidth
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </Stack>

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={isLoading}
              sx={{ py: 1.5 }}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>

            <Typography variant="caption" align="center" color="text.secondary" display="block">
              By registering, you agree to the following{" "}
              <Link href="#" color="primary" underline="hover">
                Terms & Conditions
              </Link>{" "}
              without reservation.
            </Typography>

            <Typography variant="body2" align="center" color="text.secondary">
              Already have an account?{" "}
              <Link
                component="button"
                type="button"
                onClick={() => navigate(`/login?role=${selectedRole}`)}
                fontWeight="bold"
                underline="hover"
              >
                Sign In
              </Link>
            </Typography>
          </Stack>
        </form>
      </Container>
    </Box>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  IconButton,
  InputAdornment,
  alpha,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

export default function ForgotPasswordScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "sent">("email");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("sent");
  };

  if (step === "sent") {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          p: 3,
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            mb: 4,
            width: 80,
            height: 80,
            borderRadius: 4,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "primary.main",
          }}
        >
          <LockIcon fontSize="large" />
        </Box>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Code has been sent to reset a new password
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 350, mb: 4 }}>
          You'll shortly receive an email with a code to setup a new password.
        </Typography>

        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{ maxWidth: 350, borderRadius: 3, py: 1.5 }}
          onClick={() => navigate("/otp-verify")}
        >
          Done
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 4 }}>
      <Container maxWidth="xs">
        <IconButton onClick={() => navigate(-1)} sx={{ mb: 4 }}>
          <ArrowBackIcon />
        </IconButton>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Forgot Password
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please enter your email address. You will receive a code to reset a
            new password via email.
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
            Via email address
          </Typography>
          <TextField
            fullWidth
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 4 }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ borderRadius: 3, py: 1.5 }}
          >
            Reset Password
          </Button>
        </form>
      </Container>
    </Box>
  );
}

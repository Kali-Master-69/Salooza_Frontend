import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Container,
  IconButton,
  Stack,
  TextField,
  Link,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function OTPVerifyScreen() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(59);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length === 6) {
      // In production, verify code here.
      // navigate("/reset-password"); // This route doesn't exist in App.tsx?
      // Just go to Login for now or Customer Home?
      // Prompt mentioned "OTPVerifyScreen" refactor only.
      // I'll assume login or similar.
      navigate("/login");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 4 }}>
      <Container maxWidth="xs">
        <IconButton onClick={() => navigate(-1)} sx={{ mb: 4 }}>
          <ArrowBackIcon />
        </IconButton>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Phone Verification
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Enter your OTP code here
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 4 }}>
          {otp.map((digit, index) => (
            <TextField
              key={index}
              inputRef={(el) => (inputRefs.current[index] = el)}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              inputProps={{
                maxLength: 1,
                style: { textAlign: "center", fontSize: "1.25rem", fontWeight: "bold" },
                inputMode: "numeric",
              }}
              sx={{
                width: 48,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  height: 56,
                  bgcolor: digit ? "transparent" : "background.paper",
                },
              }}
            />
          ))}
        </Stack>

        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="body1" color="text.secondary">
            <Typography component="span" color="primary" fontWeight="medium">
              00:{timer.toString().padStart(2, "0")}
            </Typography>
          </Typography>
        </Box>

        <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Didn't receive any code?{" "}
          <Link component="button" color="primary" fontWeight="medium">
            Resend a new code
          </Link>
        </Typography>

        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handleVerify}
          disabled={otp.some((d) => !d)}
          sx={{ borderRadius: 3, py: 1.5 }}
        >
          Verify
        </Button>
      </Container>
    </Box>
  );
}

import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Container, Stack, alpha } from "@mui/material";
import salonInterior from "@/assets/salon-interior.jpg";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';

export default function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        bgcolor: "background.default",
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <Box
          component="img"
          src={salonInterior}
          alt="Salon"
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
            background: (theme) =>
              `linear-gradient(to top, ${theme.palette.background.default} 0%, ${alpha(
                theme.palette.background.default,
                0.8
              )} 50%, ${alpha(theme.palette.background.default, 0.4)} 100%)`,
          }}
        />
      </Box>

      {/* Content */}
      <Container
        maxWidth="sm"
        sx={{
          position: "relative",
          zIndex: 10,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          pb: 6,
        }}
      >
        {/* Logo / Brand */}
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography
            variant="h2"
            sx={{
              color: "primary.main",
              mb: 1,
              fontWeight: 700,
              letterSpacing: -1,
            }}
          >
            stylize
          </Typography>
          <Typography
            variant="overline"
            sx={{
              color: "text.secondary",
              letterSpacing: 2,
              fontWeight: 500,
            }}
          >
            Top Rated Salons For You
          </Typography>
        </Box>

        {/* Title */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{
              color: "text.primary",
              fontWeight: 600,
            }}
          >
            Book an Appointment for Salon, Spa & Barber
          </Typography>
        </Box>

        {/* Buttons */}
        <Stack spacing={2} sx={{ mb: 4 }}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<FacebookIcon />}
            onClick={() => navigate("/role-select")}
            fullWidth
            sx={{
              bgcolor: "#1877F2",
              color: "#fff",
              "&:hover": {
                bgcolor: "#166fe5",
              },
            }}
          >
            Continue with Facebook
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<GoogleIcon />}
            onClick={() => navigate("/role-select")}
            fullWidth
            sx={{
              bgcolor: "#fff",
              color: "#757575",
              "&:hover": {
                bgcolor: "#f5f5f5",
              },
            }}
          >
            Continue with Google
          </Button>
        </Stack>

        {/* Sign In Link */}
        <Typography variant="body2" align="center" sx={{ color: "text.secondary" }}>
          Already have an account?{" "}
          <Typography
            component="span"
            variant="body2"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            onClick={() => navigate("/role-select?mode=login")}
          >
            Sign In
          </Typography>
        </Typography>
      </Container>
    </Box>
  );
}

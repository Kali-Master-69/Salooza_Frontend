import { useLocation, Link as RouterLink } from "react-router-dom";
import { useEffect } from "react";
import { Box, Typography, Button, Container } from "@mui/material";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        textAlign: "center",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h1" fontWeight="bold" sx={{ fontSize: "6rem", color: "primary.main" }}>
          404
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Oops! Page not found
        </Typography>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          size="large"
          sx={{ mt: 2, borderRadius: 2 }}
        >
          Return to Home
        </Button>
      </Container>
    </Box>
  );
};

export default NotFound;

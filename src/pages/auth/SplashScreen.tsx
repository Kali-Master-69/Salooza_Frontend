import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Stack, IconButton, alpha, useTheme } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import heroBarber from "@/assets/hero-barber.jpg";
import salonInterior from "@/assets/salon-interior.jpg";
import barberPortrait from "@/assets/barber-portrait.jpg";

const slides = [
  {
    image: heroBarber,
    title: "The Professional Specialists In Nearby",
    description: "Get an overview of how you are performing & motivate yourself to achieve even more.",
  },
  {
    image: salonInterior,
    title: "Find Near By Salons & Book Services",
    description: "Get an overview of how you are performing & motivate yourself to achieve even more.",
  },
  {
    image: barberPortrait,
    title: "Style That Fit Your Daily Lifestyle",
    description: "Get an overview of how you are performing & motivate yourself to achieve even more.",
  },
];

export default function SplashScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      navigate("/welcome");
    }
  };

  const handleSkip = () => {
    navigate("/welcome");
  };

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
      {/* Background Images */}
      {slides.map((slide, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            inset: 0,
            opacity: currentSlide === index ? 1 : 0,
            transition: "opacity 0.7s ease-in-out",
            zIndex: 0,
          }}
        >
          <Box
            component="img"
            src={slide.image}
            alt="Slide"
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
              background: `linear-gradient(to top, ${theme.palette.background.default} 0%, ${alpha(
                theme.palette.background.default,
                0.6
              )} 50%, transparent 100%)`,
            }}
          />
        </Box>
      ))}

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          justifyContent: "flex-end",
          p: 3,
          pb: 6,
        }}
      >
        <Box sx={{ mb: 4, transition: "all 0.5s ease" }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: "text.primary",
              maxWidth: "md",
            }}
          >
            {slides[currentSlide].title}
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: "sm" }}>
            {slides[currentSlide].description}
          </Typography>
        </Box>

        {/* Navigation */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 2 }}
        >
          {/* Dots */}
          <Stack direction="row" spacing={1}>
            {slides.map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrentSlide(index)}
                sx={{
                  height: 8,
                  width: index === currentSlide ? 32 : 8,
                  borderRadius: 4,
                  bgcolor: index === currentSlide ? "primary.main" : alpha(theme.palette.text.secondary, 0.3),
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </Stack>

          {/* Next Button */}
          <IconButton
            onClick={handleNext}
            sx={{
              bgcolor: "primary.main",
              color: "primary.contrastText",
              width: 56,
              height: 56,
              "&:hover": {
                bgcolor: "primary.light",
              },
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Stack>

        {/* Skip */}
        <Button
          onClick={handleSkip}
          variant="text"
          sx={{ mt: 3, alignSelf: "center", color: "text.secondary" }}
        >
          Skip to Get Started
        </Button>
      </Box>
    </Box>
  );
}

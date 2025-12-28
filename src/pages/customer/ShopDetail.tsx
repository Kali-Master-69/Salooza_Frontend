import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Card,
  CardContent,
  CardActionArea,
  Avatar,
  Stack,
  alpha,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneIcon from "@mui/icons-material/Phone";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

import salonInterior from "@/assets/salon-interior.jpg";
import barberPortrait from "@/assets/barber-portrait.jpg";

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
}

const services: Service[] = [
  { id: "1", name: "Haircut", duration: 30, price: 25 },
  { id: "2", name: "Beard Trim", duration: 15, price: 15 },
  { id: "3", name: "Hair Wash", duration: 10, price: 10 },
  { id: "4", name: "Shave", duration: 20, price: 20 },
  { id: "5", name: "Hair Color", duration: 60, price: 50 },
  { id: "6", name: "Facial", duration: 45, price: 35 },
];

const barbers = [
  { id: "1", name: "James", available: true, image: barberPortrait },
  { id: "2", name: "Mike", available: true, image: barberPortrait },
  { id: "3", name: "John", available: false, image: barberPortrait },
];

export default function ShopDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const totalDuration = services
    .filter((s) => selectedServices.includes(s.id))
    .reduce((acc, s) => acc + s.duration, 0);

  const totalPrice = services
    .filter((s) => selectedServices.includes(s.id))
    .reduce((acc, s) => acc + s.price, 0);

  const handleJoinQueue = () => {
    navigate("/customer/queue", { state: { selectedServices, shopId: id } });
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 16 }}>
      {/* Hero Image */}
      <Box sx={{ position: "relative", height: 256 }}>
        <Box
          component="img"
          src={salonInterior}
          alt="Shop"
          sx={{ height: "100%", width: "100%", objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
          }}
        />

        {/* Top Actions */}
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            right: 16,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            onClick={() => navigate(-1)}
            sx={{ bgcolor: "background.paper", "&:hover": { bgcolor: "background.default" } }}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={() => setIsFavorite(!isFavorite)}
              sx={{ bgcolor: "background.paper", "&:hover": { bgcolor: "background.default" } }}
            >
              {isFavorite ? <FavoriteIcon color="error" fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
            </IconButton>
            <IconButton
              sx={{ bgcolor: "background.paper", "&:hover": { bgcolor: "background.default" } }}
            >
              <ShareIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ px: 2, mt: -4, position: "relative", zIndex: 10 }}>
        {/* Shop Info */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Stylish Barber Shop
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <StarIcon fontSize="small" color="primary" />
              <Typography variant="body2" fontWeight="bold">4.5</Typography>
              <Typography variant="body2" color="text.secondary">(120 reviews)</Typography>
            </Stack>
            <Stack spacing={1} sx={{ mt: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOnIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">127 Nature Lodge, Chicago</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <AccessTimeIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">Open: 9:00 AM - 9:00 PM</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <PhoneIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">+1 234 567 890</Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* Barbers */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Our Barbers
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              overflowX: "auto",
              pb: 1,
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
            }}
          >
            {barbers.map((barber) => (
              <Box key={barber.id} sx={{ textAlign: "center", minWidth: 70 }}>
                <Box
                  sx={{
                    position: "relative",
                    display: "inline-block",
                    borderRadius: "50%",
                    p: 0.3,
                    border: 2,
                    borderColor: barber.available ? "success.main" : "text.disabled",
                  }}
                >
                  <Avatar src={barber.image} sx={{ width: 60, height: 60 }} />
                </Box>
                <Typography variant="body2" fontWeight="medium" sx={{ mt: 1 }}>
                  {barber.name}
                </Typography>
                <Typography
                  variant="caption"
                  color={barber.available ? "success.main" : "text.secondary"}
                >
                  {barber.available ? "Available" : "Busy"}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Services */}
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Select Services
          </Typography>
          <Stack spacing={1.5}>
            {services.map((service) => {
              const isSelected = selectedServices.includes(service.id);
              return (
                <Card
                  key={service.id}
                  sx={{
                    borderRadius: 2,
                    border: 1,
                    borderColor: isSelected ? "primary.main" : "divider",
                    bgcolor: isSelected ? (theme) => alpha(theme.palette.primary.main, 0.05) : "background.paper",
                  }}
                >
                  <CardActionArea onClick={() => toggleService(service.id)} sx={{ p: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="subtitle1" fontWeight="medium">{service.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{service.duration} min</Typography>
                      </Box>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="h6" color="primary.main" fontWeight="bold">
                          ${service.price}
                        </Typography>
                        {isSelected ? (
                          <CheckCircleIcon color="primary" />
                        ) : (
                          <CircleOutlinedIcon color="disabled" />
                        )}
                      </Stack>
                    </Stack>
                  </CardActionArea>
                </Card>
              );
            })}
          </Stack>
        </Box>
      </Box>

      {/* Bottom Bar */}
      {selectedServices.length > 0 && (
        <Paper
          elevation={4}
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            p: 3,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            zIndex: 100, // Above bottom nav if present, but ShopDetail usually covers it?
            // Actually BottomNav is z-index 1000. Wait, ShopDetail covers full screen?
            // Yes usually sub-pages cover nav or have their own.
            // But if BottomNav is fixed z-1000, this might be behind it.
            // I'll adjust z-index to 1200 or assume Detail page shouldn't show global BottomNav?
            // User flow: Detail page -> Queue.
            // I'll put zIndex high.
            zIndex: 1200,
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                {selectedServices.length} service(s) • {totalDuration} min
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                ${totalPrice}
              </Typography>
            </Box>
          </Stack>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleJoinQueue}
            sx={{ borderRadius: 3, py: 1.5, fontSize: "1.1rem" }}
          >
            Join Queue
          </Button>
        </Paper>
      )}
    </Box>
  );
}

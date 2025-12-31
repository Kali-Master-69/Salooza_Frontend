import { useState, useEffect } from "react";
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
import { BottomNav } from "@/components/layout/BottomNav";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneIcon from "@mui/icons-material/Phone";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { apiService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";


import salonInterior from "@/assets/salon-interior.jpg";
import barberPortrait from "@/assets/barber-portrait.jpg";

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
}


export default function ShopDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [shop, setShop] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchShopData = async () => {
      if (!id) return;
      try {
        // Get token from localStorage for authenticated requests
        const token = localStorage.getItem('authToken');
        const shopRes = await apiService.getShopDetails(id, token || undefined);
        const servicesRes = await apiService.getServices(id, token || undefined);
        setShop(shopRes.data);
        setServices(servicesRes.data);
      } catch (error: any) {
        console.error("Failed to fetch shop data:", error);
        if (error.message?.includes('not available') || error.message?.includes('not found')) {
          navigate('/customer/home'); // Redirect if shop becomes unavailable
        }
      } finally {
        setLoading(false);
      }
    };
    fetchShopData();
  }, [id, navigate]);

  const isQueuePaused = shop?.status === "PAUSED";


  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const totalDuration = services
    .reduce((acc, s) => {
      const duration = s.durations.find((d: any) => selectedServices.includes(d.id));
      return acc + (duration ? duration.duration : 0);
    }, 0);

  const totalPrice = services
    .reduce((acc, s) => {
      const duration = s.durations.find((d: any) => selectedServices.includes(d.id));
      return acc + (duration ? parseFloat(duration.price) : 0);
    }, 0);

  const handleJoinQueue = () => {
    navigate("/customer/queue", { 
      state: { 
        selectedServices, 
        shopId: id,
        shop,
        services 
      } 
    });
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
              {shop?.name || "Loading..."}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <StarIcon fontSize="small" color="primary" />
              <Typography variant="body2" fontWeight="bold">4.5</Typography>
              <Typography variant="body2" color="text.secondary">(120 reviews)</Typography>
            </Stack>
            <Stack spacing={1} sx={{ mt: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOnIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">{shop?.address || "No address provided"}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <AccessTimeIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">Open: {shop?.openTime} - {shop?.closeTime}</Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* Services */}
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Select Services
          </Typography>
          {loading ? (
            <Typography color="text.secondary">Loading services...</Typography>
          ) : services.length === 0 ? (
            <Typography color="text.secondary">Services not added yet</Typography>
          ) : (
            <Stack spacing={1.5}>
              {services.flatMap((s) => s.durations.map((duration: any) => {
                const isSelected = selectedServices.includes(duration.id);
                return (
                  <Card
                    key={duration.id}
                    sx={{
                      borderRadius: 2,
                      border: 1,
                      borderColor: isSelected ? "primary.main" : "divider",
                      bgcolor: isSelected ? (theme) => alpha(theme.palette.primary.main, 0.05) : "background.paper",
                    }}
                  >
                    <CardActionArea onClick={() => toggleService(duration.id)} sx={{ p: 2 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="subtitle1" fontWeight="medium">{s.name} - {duration.name}</Typography>
                          <Typography variant="body2" color="text.secondary">{duration.duration} min</Typography>
                        </Box>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="h6" color="primary.main" fontWeight="bold">
                            ${duration.price}
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
              }))}
            </Stack>
          )}
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
            disabled={isQueuePaused}
            onClick={handleJoinQueue}
            sx={{ borderRadius: 3, py: 1.5, fontSize: "1.1rem" }}
          >
            {isQueuePaused ? "Queue Paused" : "Join Queue"}
          </Button>
        </Paper>
      )}
      <BottomNav />
    </Box>
  );
}

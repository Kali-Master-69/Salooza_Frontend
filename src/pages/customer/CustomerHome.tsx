import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Card,
  CardContent,
  CardActionArea,
  Avatar,
  Stack,
  alpha,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { BottomNav } from "@/components/layout/BottomNav";
import { apiService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

import barberPortrait from "@/assets/barber-portrait.jpg";
import salonInterior from "@/assets/salon-interior.jpg";


export default function CustomerHome() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await apiService.getShops();
        setShops(response.data);
      } catch (error) {
        console.error("Failed to fetch shops:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchShops();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 10 }}>
      {/* Header */}
      <Box sx={{ px: 3, pt: 6, pb: 2 }}>
        <Typography variant="body2" color="text.secondary">Hi {user?.name || "Guest"},</Typography>
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 0.5 }}>
          <LocationOnIcon fontSize="small" color="primary" />
          <Typography variant="body2" color="text.secondary">324 Chicago</Typography>
        </Stack>
      </Box>

      {/* Search */}
      <Box sx={{ px: 3, mt: 1, display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          placeholder="Find a salon, specialists..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            sx: { borderRadius: 4, bgcolor: "background.paper" }
          }}
          variant="outlined"
          size="small"
        />
        <IconButton sx={{ bgcolor: "background.paper", borderRadius: 2 }}>
          <FilterListIcon />
        </IconButton>
      </Box>

      {/* Promo Banner */}
      <Box sx={{ px: 3, mt: 3 }}>
        <Card
          sx={{
            background: (theme) =>
              `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.2)}, ${alpha(
                theme.palette.primary.main,
                0.05
              )})`,
            position: "relative",
            overflow: "hidden",
            borderRadius: 3,
          }}
        >
          <CardContent>
            <Typography variant="h6" fontWeight="bold">30% Off On</Typography>
            <Typography variant="body1">Facial Treatments</Typography>
            <Button
              variant="contained"
              size="small"
              sx={{ mt: 2, borderRadius: 2 }}
            >
              Explore
            </Button>
          </CardContent>
        </Card>
      </Box>

      {/* Nearest To You */}
      <Box sx={{ mt: 4 }}>
        <Box sx={{ px: 3, display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">Nearest To You</Typography>
          <Button endIcon={<ChevronRightIcon />} size="small" color="primary">See all</Button>
        </Box>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            overflowX: "auto",
            px: 3,
            pb: 2,
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          {loading ? (
            <Typography color="text.secondary">Loading...</Typography>
          ) : shops.length === 0 ? (
            <Typography color="text.secondary">No barbers available</Typography>
          ) : shops.map((shop) => (
            <Card
              key={shop.id}
              sx={{ minWidth: 200, borderRadius: 3, flexShrink: 0 }}
            >
              <CardActionArea onClick={() => navigate(`/customer/shop/${shop.id}`)}>
                <Box sx={{ height: 120, width: "100%" }}>
                  <Box
                    component="img"
                    src={shop.image || salonInterior}
                    alt={shop.name}
                    sx={{ height: "100%", width: "100%", objectFit: "cover" }}
                  />
                </Box>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="subtitle2" noWrap>{shop.name}</Typography>
                  <Typography variant="caption" color="text.secondary" display="block" noWrap>
                    {shop.address || "No address"}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <StarIcon sx={{ fontSize: 14, color: "primary.main" }} />
                      <Typography variant="caption" fontWeight="bold">
                        {shop.rating || "4.5"}
                      </Typography>
                    </Stack>
                    <Typography variant="caption" color="text.secondary">•</Typography>
                    <Typography variant="caption" color="text.secondary">{shop.distance || "0.5 Km"}</Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      </Box>



      {/* Salons Near By (Vertical List) */}
      <Box sx={{ mt: 3, px: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">Salon Near by</Typography>
          <Button endIcon={<ChevronRightIcon />} size="small" color="primary">Map View</Button>
        </Box>
        <Stack spacing={2}>
          {loading ? (
            <Typography color="text.secondary">Loading...</Typography>
          ) : shops.map((shop) => (
            <Card key={shop.id} sx={{ borderRadius: 3 }}>
              <CardActionArea
                onClick={() => navigate(`/customer/shop/${shop.id}`)}
                sx={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", p: 1.5 }}
              >
                <Box
                  component="img"
                  src={shop.image || salonInterior}
                  alt={shop.name}
                  sx={{ width: 80, height: 80, borderRadius: 2, objectFit: "cover" }}
                />
                <Box sx={{ ml: 2, flex: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold">{shop.name}</Typography>
                  <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                    {shop.address || "No address"}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 0.5 }}>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <StarIcon sx={{ fontSize: 14, color: "primary.main" }} />
                      <Typography variant="caption" fontWeight="bold">
                        {shop.rating || "4.5"}
                      </Typography>
                    </Stack>
                    <Typography variant="caption" color="text.secondary">{shop.distance || "0.5 Km"}</Typography>
                  </Stack>
                </Box>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      </Box>

      <BottomNav />
    </Box>
  );
}

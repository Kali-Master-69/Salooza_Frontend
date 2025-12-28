import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Card,
  CardActionArea,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import { BottomNav } from "@/components/layout/BottomNav";
import barberPortrait from "@/assets/barber-portrait.jpg";
import salonInterior from "@/assets/salon-interior.jpg";

const shops = [
  {
    id: 1,
    name: "Brett Denny's Shop",
    address: "127 Nature Lodge",
    rating: 4.5,
    distance: "4.5 Km",
    image: salonInterior,
  },
  {
    id: 2,
    name: "Gyrobald Hair Style",
    address: "89 Sunset Lodge",
    rating: 4.3,
    distance: "3.2 Km",
    image: barberPortrait,
  },
  {
    id: 3,
    name: "Beauty Women Salon",
    address: "456 Main Street",
    rating: 4.8,
    distance: "2.1 Km",
    image: salonInterior,
  },
  {
    id: 4,
    name: "Kozuki Barber Shop",
    address: "789 Oak Avenue",
    rating: 4.2,
    distance: "5.5 Km",
    image: barberPortrait,
  },
  {
    id: 5,
    name: "Badewa Barber Shop",
    address: "321 Pine Road",
    rating: 4.6,
    distance: "1.8 Km",
    image: salonInterior,
  },
];

export default function ExploreShops() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredShops = shops.filter((shop) =>
    shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 10 }}>
      {/* Header */}
      <Box sx={{ px: 3, pt: 6, pb: 2 }}>
        <Typography variant="h4" fontWeight="bold">
          Explore
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Find nearby salons
        </Typography>
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

      {/* Shops List */}
      <Stack spacing={2} sx={{ px: 3, mt: 3 }}>
        {filteredShops.map((shop) => (
          <Card key={shop.id} sx={{ borderRadius: 3 }}>
            <CardActionArea
              onClick={() => navigate(`/customer/shop/${shop.id}`)}
              sx={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", p: 1.5 }}
            >
              <Box
                component="img"
                src={shop.image}
                alt={shop.name}
                sx={{ width: 90, height: 90, borderRadius: 2, objectFit: "cover" }}
              />
              <Box sx={{ ml: 2, flex: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">{shop.name}</Typography>
                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 0.5, mb: 1 }}>
                  <LocationOnIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                  <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: 200 }}>
                    {shop.address}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={2}>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <StarIcon sx={{ fontSize: 14, color: "primary.main" }} />
                    <Typography variant="caption" fontWeight="bold">
                      {shop.rating}
                    </Typography>
                  </Stack>
                  <Typography variant="caption" color="text.secondary">•</Typography>
                  <Typography variant="caption" color="text.secondary">{shop.distance}</Typography>
                </Stack>
              </Box>
            </CardActionArea>
          </Card>
        ))}
        {filteredShops.length === 0 && (
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
            No shops found matching "{searchQuery}"
          </Typography>
        )}
      </Stack>

      <BottomNav />
    </Box>
  );
}

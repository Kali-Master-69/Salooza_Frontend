import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    Stack,
    IconButton,
    Alert,
    CircularProgress,
    alpha,
    Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { BottomNav } from "@/components/layout/BottomNav";
import { apiService } from "@/services/api";

export default function ShopSetup() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        openTime: "09:00",
        closeTime: "18:00",
    });

    useEffect(() => {
        fetchShopData();
    }, []);

    const fetchShopData = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        try {
            const response = await apiService.getMyShop(token);
            if (response.data) {
                setFormData({
                    name: response.data.name || "",
                    address: response.data.address || "",
                    openTime: response.data.openTime || "09:00",
                    closeTime: response.data.closeTime || "18:00",
                });
            }
        } catch (err) {
            console.error("Failed to fetch shop:", err);
            setError("Failed to load shop details");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        setIsSaving(true);
        setError(null);
        setSuccess(false);

        try {
            await apiService.updateMyShop(token, formData);
            setSuccess(true);
            // If we are coming from a "Setup required" state, we might want to stay here or go back
            setTimeout(() => navigate("/barber"), 1500);
        } catch (err: any) {
            setError(err.message || "Failed to update shop");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 12 }}>
            {/* Header */}
            <Box sx={{ px: 3, pt: 6, pb: 2 }}>
                <IconButton onClick={() => navigate(-1)} sx={{ mb: 2, ml: -1 }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" fontWeight="bold">
                    Shop Setup
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Complete your shop profile to start accepting customers
                </Typography>
            </Box>

            <Box sx={{ px: 3 }}>
                {error && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                        Shop details updated successfully!
                    </Alert>
                )}

                <Card sx={{ borderRadius: 4, mb: 3 }}>
                    <CardContent sx={{ p: 3 }}>
                        <Stack spacing={3}>
                            <Box>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                                    <StorefrontIcon color="primary" fontSize="small" />
                                    <Typography variant="subtitle2" fontWeight="bold" color="primary">
                                        Basic Info
                                    </Typography>
                                </Stack>
                                <TextField
                                    fullWidth
                                    label="Shop Name"
                                    variant="outlined"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. Gentlemen's Cut"
                                    sx={{ mb: 2 }}
                                />
                            </Box>

                            <Box>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                                    <LocationOnIcon color="primary" fontSize="small" />
                                    <Typography variant="subtitle2" fontWeight="bold" color="primary">
                                        Location
                                    </Typography>
                                </Stack>
                                <TextField
                                    fullWidth
                                    label="Address"
                                    variant="outlined"
                                    multiline
                                    rows={2}
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    placeholder="Street name, City, Postcode"
                                />
                            </Box>

                            <Divider />

                            <Box>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                                    <AccessTimeIcon color="primary" fontSize="small" />
                                    <Typography variant="subtitle2" fontWeight="bold" color="primary">
                                        Opening Hours
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <TextField
                                        fullWidth
                                        label="Open Time"
                                        type="time"
                                        value={formData.openTime}
                                        onChange={(e) => setFormData({ ...formData, openTime: e.target.value })}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Close Time"
                                        type="time"
                                        value={formData.closeTime}
                                        onChange={(e) => setFormData({ ...formData, closeTime: e.target.value })}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Stack>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>

                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                    onClick={handleSave}
                    disabled={isSaving || !formData.name || !formData.address}
                    sx={{
                        borderRadius: 3,
                        py: 2,
                        textTransform: "none",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        boxShadow: (theme) => `0 8px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
                    }}
                >
                    {isSaving ? "Saving..." : "Save Shop Details"}
                </Button>

                <Typography variant="caption" color="text.secondary" sx={{ display: "block", textAlign: "center", mt: 2 }}>
                    Note: You also need to add services before your shop can go active.
                </Typography>
            </Box>

            <BottomNav />
        </Box>
    );
}

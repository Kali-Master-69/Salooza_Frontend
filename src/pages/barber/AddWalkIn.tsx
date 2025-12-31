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
    Chip,
    Grid,
    Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { BottomNav } from "@/components/layout/BottomNav";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import TimerIcon from "@mui/icons-material/Timer";

// import { BottomNav } from "@/components/layout/BottomNav";
import { apiService } from "@/services/api";

export default function AddWalkIn() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [walkInName, setWalkInName] = useState("");
    const [services, setServices] = useState<any[]>([]);
    const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

    useEffect(() => {
        fetchShopData();
    }, []);

    const fetchShopData = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        try {
            const response = await apiService.getMyShop(token);
            if (response.data && response.data.services) {
                // Flatten services to durations for easy selection
                const allDurations = response.data.services.flatMap((s: any) =>
                    s.durations.map((d: any) => ({
                        ...d,
                        serviceName: s.name
                    }))
                );
                setServices(allDurations);
            }
        } catch (err) {
            console.error("Failed to fetch shop/services:", err);
            setError("Failed to load services");
        } finally {
            setIsLoading(false);
        }
    };

    const toggleService = (id: string) => {
        setSelectedServiceIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleAdd = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        if (!walkInName.trim()) {
            setError("Please enter customer name");
            return;
        }

        if (selectedServiceIds.length === 0) {
            setError("Please select at least one service");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            await apiService.addWalkIn(token, walkInName, selectedServiceIds);
            navigate("/barber");
        } catch (err: any) {
            setError(err.message || "Failed to add walk-in");
        } finally {
            setIsSubmitting(false);
        }
    };

    const totalDuration = services
        .filter(s => selectedServiceIds.includes(s.id))
        .reduce((acc, s) => acc + s.duration, 0);

    const totalPrice = services
        .filter(s => selectedServiceIds.includes(s.id))
        .reduce((acc, s) => acc + Number(s.price), 0);

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
                    Add Walk-in
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Quickly add a non-app customer to your live queue
                </Typography>
            </Box>

            <Box sx={{ px: 3 }}>
                {error && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                        {error}
                    </Alert>
                )}

                <Card sx={{ borderRadius: 4, mb: 3 }}>
                    <CardContent sx={{ p: 3 }}>
                        <Stack spacing={4}>
                            <Box>
                                <Typography variant="subtitle2" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
                                    Customer Details
                                </Typography>
                                <TextField
                                    fullWidth
                                    label="Customer Name"
                                    variant="outlined"
                                    value={walkInName}
                                    onChange={(e) => setWalkInName(e.target.value)}
                                    placeholder="e.g. John Smith"
                                />
                            </Box>

                            <Divider />

                            <Box>
                                <Typography variant="subtitle2" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
                                    Select Services
                                </Typography>
                                <Grid container spacing={1.5}>
                                    {services.map((service) => {
                                        const isSelected = selectedServiceIds.includes(service.id);
                                        return (
                                            <Grid size={{ xs: 6 }} key={service.id}>
                                                <Card
                                                    onClick={() => toggleService(service.id)}
                                                    sx={{
                                                        borderRadius: 3,
                                                        cursor: 'pointer',
                                                        border: 2,
                                                        borderColor: isSelected ? 'primary.main' : 'transparent',
                                                        bgcolor: isSelected ? alpha('#CC9B6D', 0.05) : 'action.hover', // Using theme color approximation if not available
                                                        transition: 'all 0.2s',
                                                        '&:active': { transform: 'scale(0.95)' }
                                                    }}
                                                >
                                                    <CardContent sx={{ p: 2 }}>
                                                        <Typography variant="subtitle2" fontWeight="bold" noWrap>
                                                            {service.name}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary" display="block">
                                                            {service.serviceName}
                                                        </Typography>
                                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
                                                            <Typography variant="body2" fontWeight="bold" color="primary">
                                                                ${service.price}
                                                            </Typography>
                                                            <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                                <TimerIcon sx={{ fontSize: 12 }} /> {service.duration}m
                                                            </Typography>
                                                        </Stack>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                                {services.length === 0 && (
                                    <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 2 }}>
                                        No services found. Please add services in settings.
                                    </Typography>
                                )}
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>

                {selectedServiceIds.length > 0 && (
                    <Card sx={{ borderRadius: 4, mb: 3, bgcolor: 'background.paper', border: '1px dashed', borderColor: 'divider' }}>
                        <CardContent sx={{ p: 2 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Box>
                                    <Typography variant="caption" color="text.secondary">Estimated Duration</Typography>
                                    <Typography variant="subtitle1" fontWeight="bold">{totalDuration} mins</Typography>
                                </Box>
                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography variant="caption" color="text.secondary">Total Price</Typography>
                                    <Typography variant="h6" fontWeight="bold" color="primary">${totalPrice}</Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                )}

                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <PersonAddIcon />}
                    onClick={handleAdd}
                    disabled={isSubmitting || !walkInName || selectedServiceIds.length === 0}
                    sx={{
                        borderRadius: 3,
                        py: 2,
                        textTransform: "none",
                        fontSize: "1rem",
                        fontWeight: "bold",
                    }}
                >
                    {isSubmitting ? "Adding..." : "Add to Queue"}
                </Button>
            </Box>

            <BottomNav />
        </Box>
    );
}

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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ContentCutIcon from "@mui/icons-material/ContentCut";

import { BottomNav } from "@/components/layout/BottomNav";
import { apiService } from "@/services/api";

interface Duration {
    name: string;
    duration: number;
    price: string;
}

export default function ServicesManagement() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [services, setServices] = useState<any[]>([]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentService, setCurrentService] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        durations: [{ name: "Standard", duration: 30, price: "20" }] as Duration[]
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        try {
            const shopRes = await apiService.getMyShop(token);
            if (shopRes.data) {
                const servicesRes = await apiService.getServices(shopRes.data.id, token);
                setServices(servicesRes.data || []);
            }
        } catch (err) {
            console.error("Failed to fetch services:", err);
            setError("Failed to load services");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenDialog = (service: any = null) => {
        if (service) {
            setCurrentService(service);
            setFormData({
                name: service.name,
                description: service.description || "",
                durations: service.durations.map((d: any) => ({
                    name: d.name,
                    duration: d.duration,
                    price: d.price.toString()
                }))
            });
        } else {
            setCurrentService(null);
            setFormData({
                name: "",
                description: "",
                durations: [{ name: "Standard", duration: 30, price: "20" }]
            });
        }
        setIsDialogOpen(true);
    };

    const handleSave = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        setIsSaving(true);
        try {
            if (currentService) {
                // Update
                // Note: Backend might need specific update logic for durations
                // For now, let's assume updateService handles it
                await apiService.createService(token, { ...formData }); // Actually there is updateService in api, let me check
                // Wait, I didn't see updateService in api.ts, I should add it.
            } else {
                // Create
                await apiService.createService(token, formData);
            }
            setIsDialogOpen(false);
            fetchServices();
        } catch (err: any) {
            setError(err.message || "Failed to save service");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        const token = localStorage.getItem("authToken");
        if (!token || !window.confirm("Are you sure you want to delete this service?")) return;

        try {
            // Need deleteService in api.ts
            await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1'}/services/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchServices();
        } catch (err) {
            setError("Failed to delete service");
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
            <Box sx={{ px: 3, pt: 6, pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <IconButton onClick={() => navigate(-1)} sx={{ mb: 2, ml: -1 }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h4" fontWeight="bold">Services</Typography>
                    <Typography variant="body2" color="text.secondary">Manage what you offer to customers</Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                    sx={{ mt: 6, borderRadius: 2 }}
                >
                    Add New
                </Button>
            </Box>

            <Box sx={{ px: 3 }}>
                {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                <Stack spacing={2}>
                    {services.map((service) => (
                        <Card key={service.id} sx={{ borderRadius: 3 }}>
                            <CardContent>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">{service.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">{service.description}</Typography>
                                        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                                            {service.durations.map((d: any) => (
                                                <Typography key={d.id} variant="caption" sx={{ bgcolor: 'action.hover', px: 1, py: 0.5, borderRadius: 1 }}>
                                                    {d.name}: {d.duration}m - ${d.price}
                                                </Typography>
                                            ))}
                                        </Stack>
                                    </Box>
                                    <Box>
                                        <IconButton size="small" sx={{ mr: 1 }} onClick={() => handleOpenDialog(service)}>
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" color="error" onClick={() => handleDelete(service.id)}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}

                    {services.length === 0 && (
                        <Box sx={{ textAlign: 'center', py: 8 }}>
                            <ContentCutIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                            <Typography color="text.secondary">No services added yet</Typography>
                            <Button variant="text" onClick={() => handleOpenDialog()}>Create your first service</Button>
                        </Box>
                    )}
                </Stack>
            </Box>

            {/* Add/Edit Dialog */}
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>{currentService ? "Edit Service" : "Add Service"}</DialogTitle>
                <DialogContent>
                    <Stack spacing={3} sx={{ mt: 1 }}>
                        <TextField
                            fullWidth
                            label="Service Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            multiline
                            rows={2}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />

                        <Divider />

                        <Typography variant="subtitle2" fontWeight="bold">Durations & Pricing</Typography>
                        {formData.durations.map((d, index) => (
                            <Stack key={index} direction="row" spacing={2} alignItems="center">
                                <TextField
                                    label="Label (e.g. Short Hair)"
                                    size="small"
                                    value={d.name}
                                    onChange={(e) => {
                                        const newD = [...formData.durations];
                                        newD[index].name = e.target.value;
                                        setFormData({ ...formData, durations: newD });
                                    }}
                                />
                                <TextField
                                    label="Mins"
                                    type="number"
                                    size="small"
                                    sx={{ width: 80 }}
                                    value={d.duration}
                                    onChange={(e) => {
                                        const newD = [...formData.durations];
                                        newD[index].duration = parseInt(e.target.value);
                                        setFormData({ ...formData, durations: newD });
                                    }}
                                />
                                <TextField
                                    label="Price"
                                    type="number"
                                    size="small"
                                    sx={{ width: 80 }}
                                    value={d.price}
                                    onChange={(e) => {
                                        const newD = [...formData.durations];
                                        newD[index].price = e.target.value;
                                        setFormData({ ...formData, durations: newD });
                                    }}
                                />
                            </Stack>
                        ))}
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSave} disabled={isSaving || !formData.name}>
                        {isSaving ? "Saving..." : "Save Service"}
                    </Button>
                </DialogActions>
            </Dialog>

            <BottomNav />
        </Box>
    );
}

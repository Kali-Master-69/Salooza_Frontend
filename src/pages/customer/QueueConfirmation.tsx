import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Divider,
  TextField,
  CircularProgress,
  Alert,
  IconButton,
  alpha,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { BottomNav } from "@/components/layout/BottomNav";
import { apiService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

export default function QueueConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [tokenNumber, setTokenNumber] = useState<number | null>(null);

  // Get data from navigation state
  const state = location.state as {
    selectedServices: string[];
    shopId: string;
    shop?: any;
    services?: any[];
  };

  if (!state) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", p: 3, textAlign: "center", pt: 6 }}>
        <Typography variant="h6">Invalid Request</Typography>
        <Button onClick={() => navigate("/customer/explore")} sx={{ mt: 3 }}>
          Go Back to Shops
        </Button>
      </Box>
    );
  }

  const { selectedServices, shopId, shop, services = [] } = state;

  // Calculate totals
  const serviceDetails = services.flatMap((s) =>
    s.durations
      .filter((d: any) => selectedServices.includes(d.id))
      .map((d: any) => ({ ...d, serviceName: s.name }))
  );

  const totalDuration = serviceDetails.reduce((acc, s) => acc + s.duration, 0);
  const totalPrice = serviceDetails.reduce((acc, s) => acc + parseFloat(s.price), 0);

  const handleJoinQueue = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No authentication token found. Please login again.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiService.joinQueue(token, shopId, selectedServices);
      console.log("Queue join response:", response);

      // Show success dialog with token number
      setTokenNumber(response.data.tokenNumber);
      setSuccessDialogOpen(true);

      // Navigate to queue status after 2 seconds
      setTimeout(() => {
        navigate("/customer/queue-status", {
          state: { 
            joinedSuccessfully: true, 
            queueItem: response.data,
            tokenNumber: response.data.tokenNumber
          },
        });
      }, 2000);
    } catch (err: any) {
      console.error("Failed to join queue:", err);
      setError(err.message || "Failed to join queue. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 12 }}>
      {/* Header */}
      <Box sx={{ px: 3, pt: 3, pb: 2, display: "flex", alignItems: "center" }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight="bold" sx={{ flex: 1 }}>
          Confirm Booking
        </Typography>
      </Box>

      {/* Shop Info */}
      {shop && (
        <Box sx={{ px: 3, mb: 3 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {shop.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {shop.address}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Open: {shop.openTime} - {shop.closeTime}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Services Summary */}
      <Box sx={{ px: 3, mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Selected Services
        </Typography>
        <Card sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 2 }}>
            <Stack spacing={1.5}>
              {serviceDetails.map((service, idx) => (
                <Box key={service.id}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" fontWeight="500">
                        {service.serviceName} - {service.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {service.duration} minutes
                      </Typography>
                    </Box>
                    <Typography variant="h6" color="primary.main" fontWeight="bold" sx={{ ml: 2 }}>
                      ${service.price}
                    </Typography>
                  </Stack>
                  {idx < serviceDetails.length - 1 && <Divider sx={{ my: 1 }} />}
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Booking Summary */}
      <Box sx={{ px: 3, mb: 3 }}>
        <Card
          sx={{
            borderRadius: 3,
            background: (theme) =>
              `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(
                theme.palette.primary.main,
                0.05
              )} 100%)`,
            borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
            borderWidth: 1,
            borderStyle: "solid",
          }}
        >
          <CardContent sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  Total Duration:
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {totalDuration} minutes
                </Typography>
              </Stack>
              <Divider />
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6" fontWeight="bold">
                  Total Price:
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="primary.main">
                  ${totalPrice.toFixed(2)}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Booking Notes */}
      <Box sx={{ px: 3, mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Booking Notes (Optional)
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Add any special requests or notes for the barber..."
          variant="outlined"
          sx={{ borderRadius: 2 }}
        />
      </Box>

      {/* Error Alert */}
      {error && (
        <Box sx={{ px: 3, mb: 3 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {/* Info Card */}
      <Box sx={{ px: 3, mb: 4 }}>
        <Card sx={{ borderRadius: 3, bgcolor: (theme) => alpha(theme.palette.info.main, 0.05) }}>
          <CardContent sx={{ p: 2 }}>
            <Stack direction="row" spacing={1.5} alignItems="flex-start">
              <CheckCircleIcon color="success" sx={{ mt: 0.5 }} />
              <Box>
                <Typography variant="body2" fontWeight="500">
                  You will receive a token number after confirmation
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Track your position in the queue in real-time
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          px: 3,
          pb: 4,
          position: "sticky",
          bottom: 0,
          bgcolor: "background.default",
          borderTopColor: "divider",
          borderTopWidth: 1,
          borderTopStyle: "solid",
          py: 2,
        }}
      >
        <Stack spacing={2}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            disabled={loading}
            onClick={handleJoinQueue}
            sx={{ borderRadius: 3, py: 1.5, fontSize: "1.1rem" }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Confirm & Join Queue"}
          </Button>
          <Button
            variant="outlined"
            size="large"
            fullWidth
            disabled={loading}
            onClick={() => navigate(-1)}
            sx={{ borderRadius: 3 }}
          >
            Cancel
          </Button>
        </Stack>
      </Box>

      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onClose={() => setSuccessDialogOpen(false)}>
        <DialogTitle sx={{ textAlign: "center" }}>
          <CheckCircleIcon sx={{ fontSize: 48, color: "success.main", display: "block", mx: "auto", mb: 2 }} />
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Successfully Joined Queue!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Your token number is:
          </Typography>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
              color: "primary.main",
              fontSize: "2rem",
              fontWeight: "bold",
              mb: 2,
            }}
          >
            #{tokenNumber}
          </Box>
          <Typography variant="body2" color="text.secondary">
            You will be redirected to your queue status shortly...
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            variant="contained"
            onClick={() => {
              setSuccessDialogOpen(false);
              navigate("/customer/queue-status");
            }}
          >
            View Queue Status
          </Button>
        </DialogActions>
      </Dialog>
      <BottomNav />
    </Box>
  );
}

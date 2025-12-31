import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Stack,
  alpha,
  Divider,
  CircularProgress,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupIcon from "@mui/icons-material/Group";
import RoomIcon from "@mui/icons-material/Room";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BottomNav } from "@/components/layout/BottomNav";
import { apiService } from "@/services/api";

export default function QueueStatus() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [queueData, setQueueData] = useState<any>(null);
  const [leavingQueue, setLeavingQueue] = useState(false);

  const fetchQueueStatus = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await apiService.getCustomerQueueStatus(token);
      setQueueData(response.data);
    } catch (error) {
      console.error("Failed to fetch queue status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveQueue = async () => {
    if (!queueData || !queueData.item) return;

    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    setLeavingQueue(true);
    try {
      await apiService.leaveQueue(token, queueData.item.id);
      // After successfully leaving, redirect to explore shops
      navigate("/customer/explore", { 
        state: { message: "You have left the queue" } 
      });
    } catch (error) {
      console.error("Failed to leave queue:", error);
      alert("Failed to leave queue. Please try again.");
    } finally {
      setLeavingQueue(false);
    }
  };

  useEffect(() => {
    fetchQueueStatus();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!queueData) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 12 }}>
        <Box sx={{ px: 3, pt: 6, pb: 4, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold">Queue Status</Typography>
          <Typography variant="body1" sx={{ mt: 4, mb: 4 }}>You are not currently in any queue.</Typography>
          <Button variant="contained" onClick={() => navigate("/customer/explore")}>Explore Shops</Button>
        </Box>
        <BottomNav />
      </Box>
    );
  }

  const { item, shop, currentPosition, tokenNumber, estimatedWaitTime, peopleAhead, fullQueue } = queueData;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 12 }}>
      {/* Header */}
      <Box sx={{ px: 3, pt: 6, pb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Queue Status
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Track your position at {shop.name}
        </Typography>
      </Box>

      {/* Position Card - Display Current Position (Dynamic) */}
      <Box sx={{ px: 3, mb: 4 }}>
        <Card
          sx={{
            background: (theme) =>
              `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(
                theme.palette.primary.main,
                0.05
              )} 100%)`,
            borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: 3,
            p: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Your Position in Queue
          </Typography>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 96,
              height: 96,
              borderRadius: "50%",
              bgcolor: "primary.main",
              color: "primary.contrastText",
              fontSize: "2.25rem",
              fontWeight: "bold",
              mb: 2,
              boxShadow: (theme) => `0 8px 24px ${alpha(theme.palette.primary.main, 0.4)}`,
            }}
          >
            #{currentPosition}
          </Box>
          <Typography variant="h5" fontWeight="bold">
            {shop.name}
          </Typography>
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5} sx={{ mt: 1, color: "text.secondary" }}>
            <RoomIcon fontSize="small" />
            <Typography variant="body2">{shop.address}</Typography>
          </Stack>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: "block" }}>
            Token: #{tokenNumber} (for reference)
          </Typography>
        </Card>
      </Box>

      {/* Wait Info */}
      <Box sx={{ px: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <Card sx={{ borderRadius: 3, textAlign: "center", p: 2 }}>
              <AccessTimeIcon fontSize="large" color="primary" sx={{ mb: 1 }} />
              <Typography variant="h5" fontWeight="bold">
                ~{estimatedWaitTime} <Typography component="span" variant="caption">min</Typography>
              </Typography>
              <Typography variant="caption" color="text.secondary">Estimated Wait</Typography>
            </Card>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Card sx={{ borderRadius: 3, textAlign: "center", p: 2 }}>
              <GroupIcon fontSize="large" color="primary" sx={{ mb: 1 }} />
              <Typography variant="h5" fontWeight="bold">
                {peopleAhead}
              </Typography>
              <Typography variant="caption" color="text.secondary">People Ahead</Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Services */}
      <Box sx={{ px: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Your Services
        </Typography>
        <Card sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 2 }}>
            <Stack spacing={2}>
              {item.services.map((s: any) => (
                <Stack key={s.id} direction="row" justifyContent="space-between">
                  <Typography variant="body1">{s.service?.name || s.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{s.duration} min • ${s.price}</Typography>
                </Stack>
              ))}
              <Divider />
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle1" fontWeight="bold">Total</Typography>
                <Typography variant="subtitle1" fontWeight="bold" color="primary.main">
                  ${item.services.reduce((acc: number, s: any) => acc + parseFloat(s.price), 0)}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Live Queue */}
      <Box sx={{ px: 3, mb: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">Live Queue</Typography>
          <ExpandMoreIcon color="action" />
        </Stack>
        <Stack spacing={2}>
          {fullQueue.map((qItem: any, idx: number) => {
            const isMe = qItem.id === item.id;
            return (
              <Card
                key={qItem.id}
                sx={{
                  borderRadius: 2,
                  p: 2,
                  border: 1,
                  borderColor: isMe ? "primary.main" : "transparent",
                  bgcolor: isMe ? (theme) => alpha(theme.palette.primary.main, 0.05) : "background.paper",
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        bgcolor: isMe ? "primary.main" : "action.selected",
                        color: isMe ? "primary.contrastText" : "text.secondary",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.875rem",
                        fontWeight: "bold",
                      }}
                    >
                      {idx + 1}
                    </Box>
                    <Typography variant="body2" fontWeight="medium">
                      {isMe ? "You" : qItem.isWalkIn ? "Walk-in" : "Customer"}
                    </Typography>
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    {qItem.status}
                  </Typography>
                </Stack>
              </Card>
            );
          })}
        </Stack>
      </Box>

      {/* Actions */}
      <Box sx={{ px: 3, mb: 2 }}>
        <Stack spacing={2}>
          <Button
            variant="outlined"
            size="large"
            fullWidth
            startIcon={<ChatBubbleOutlineIcon />}
            onClick={() => navigate("/customer/chat")}
            sx={{ borderRadius: 3 }}
          >
            Chat with Shop
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="large"
            fullWidth
            sx={{ borderRadius: 3 }}
            onClick={handleLeaveQueue}
            disabled={leavingQueue}
          >
            {leavingQueue ? "Leaving..." : "Leave Queue"}
          </Button>
        </Stack>
      </Box>

      <BottomNav />
    </Box>
  );
}

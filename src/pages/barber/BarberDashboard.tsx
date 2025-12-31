import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Stack,
  Chip,
  alpha,
  Grid,
  Switch,
  FormControlLabel,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import AddIcon from "@mui/icons-material/Add";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import TimerIcon from "@mui/icons-material/Timer";

import { BottomNav } from "@/components/layout/BottomNav";
import { apiService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";


interface QueueCustomer {
  id: string;
  name: string;
  services: string[];
  estimatedTime: number;
  position: number;
  status: "waiting" | "in-progress" | "completed";
}


export default function BarberDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isQueueActive, setIsQueueActive] = useState(true);
  const [queue, setQueue] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shop, setShop] = useState<any>(null);
  const [isAvailable, setIsAvailable] = useState(true);

  const fetchDashboardData = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    try {
      console.log("[DEBUG BARBER] Fetching dashboard data...");
      const [queueRes, shopRes] = await Promise.all([
        apiService.getMyQueue(token),
        apiService.getMyShop(token)
      ]);
      console.log("[DEBUG BARBER] Queue response:", queueRes);
      console.log("[DEBUG BARBER] Queue items:", queueRes.data.items);
      console.log("[DEBUG BARBER] Shop response:", shopRes);
      setQueue(queueRes.data.items);
      setShop(shopRes.data);
      setIsQueueActive(!shopRes.data?.queue?.isPaused);
      setIsAvailable(shopRes.data?.barbers?.[0]?.isAvailable ?? true); // Assuming barber is in shop include
    } catch (error) {
      console.error("[ERROR BARBER] Failed to fetch dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const shopStatus = shop?.status || "DRAFT";
  const isShopComplete = shopStatus !== "DRAFT";
  const isShopActive = shopStatus === "ACTIVE";


  const handleTogglePause = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    try {
      const newStatus = !isQueueActive;
      await apiService.toggleQueuePause(token, !newStatus); // backend takes isPaused
      setIsQueueActive(newStatus);
    } catch (error) {
      console.error("Failed to toggle queue status:", error);
    }
  };

  const handleToggleAvailability = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    try {
      const newStatus = !isAvailable;
      await apiService.updateAvailability(token, newStatus);
      setIsAvailable(newStatus);
    } catch (error) {
      console.error("Failed to toggle availability:", error);
    }
  };

  const totalWaitTime = queue
    .filter((c) => c.status === "waiting")
    .reduce((acc, c) => acc + c.estimatedTime, 0);

  const handleCompleteCustomer = async (customerId: string) => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    try {
      await apiService.updateQueueStatus(token, customerId, "COMPLETED");
      fetchDashboardData();
    } catch (error) {
      console.error("Failed to complete customer:", error);
    }
  };

  const handleStartCustomer = async (customerId: string) => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    try {
      await apiService.updateQueueStatus(token, customerId, "SERVING");
      fetchDashboardData();
    } catch (error) {
      console.error("Failed to start customer:", error);
    }
  };

  const activeQueue = queue.filter((c) => c.status === "WAITING" || c.status === "SERVING");

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 12 }}>
      {/* Header */}
      <Box sx={{ px: 3, pt: 6, pb: 4, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Barber Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Manage your queue
          </Typography>
        </Box>
        <FormControlLabel
          control={
            <Switch
              checked={isAvailable}
              onChange={handleToggleAvailability}
              color="success"
            />
          }
          label={isAvailable ? "Available" : "Busy"}
          labelPlacement="bottom"
          sx={{ m: 0 }}
        />
      </Box>

      {/* Shop Completeness Guard */}
      {!isLoading && !isShopComplete && (
        <Box sx={{ px: 3, mb: 4 }}>
          <Card sx={{ bgcolor: (theme) => alpha(theme.palette.warning.main, 0.1), border: 1, borderColor: "warning.main" }}>
            <CardContent>
              <Typography variant="subtitle2" fontWeight="bold" color="warning.main" gutterBottom>
                Shop Setup Incomplete
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Your shop is not visible to customers. Please provide an address and add at least one service.
              </Typography>
              <Button
                variant="contained"
                color="warning"
                size="small"
                onClick={() => navigate("/barber/settings")} // Map to settings for setup

              >
                Complete Setup
              </Button>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Stats */}
      <Box sx={{ px: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                      color: "primary.main",
                      display: "flex",
                    }}
                  >
                    <GroupIcon />
                  </Box>
                  <Box>
                    <Typography variant="h5" fontWeight="bold">
                      {activeQueue.length}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">In Queue</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                      color: "primary.main",
                      display: "flex",
                    }}
                  >
                    <AccessTimeIcon />
                  </Box>
                  <Box>
                    <Typography variant="h5" fontWeight="bold">
                      {totalWaitTime} <Typography component="span" variant="caption">min</Typography>
                    </Typography>
                    <Typography variant="caption" color="text.secondary">Total Wait</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Queue Controls */}
      <Box sx={{ px: 3, mb: 4 }}>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color={isQueueActive ? "error" : "primary"}
            size="large"
            startIcon={isQueueActive ? <PauseIcon /> : <PlayArrowIcon />}
            fullWidth
            disabled={!isShopComplete}
            onClick={handleTogglePause}
            sx={{ borderRadius: 3, py: 1.5 }}
          >
            {shopStatus === "PAUSED" ? "Resume Queue" : isQueueActive ? "Pause Queue" : "Start Queue"}
          </Button>

          <Button
            variant="outlined"
            size="large"
            disabled={!isShopComplete}
            onClick={() => navigate("/barber/add-walkin")}

            sx={{ borderRadius: 3, minWidth: 64, borderColor: "divider" }}
          >
            <AddIcon />
          </Button>
        </Stack>
      </Box>

      {/* Queue Status Header */}
      <Box sx={{ px: 3, mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" fontWeight="bold">Live Queue</Typography>
        <Chip
          label={shopStatus}
          color={shopStatus === "ACTIVE" ? "success" : shopStatus === "PAUSED" ? "warning" : "error"}
          variant="outlined"
          size="small"
          sx={{
            fontWeight: "bold",
            bgcolor: (theme) => alpha(theme.palette[shopStatus === "ACTIVE" ? "success" : shopStatus === "PAUSED" ? "warning" : "error"].main, 0.1),
            borderColor: "transparent",
            color: (theme) => theme.palette[shopStatus === "ACTIVE" ? "success" : shopStatus === "PAUSED" ? "warning" : "error"].main,
          }}
        />

      </Box>

      {/* Queue List */}
      <Stack spacing={2} sx={{ px: 3 }}>
        {isLoading ? (
          <Typography color="text.secondary" align="center">Loading queue...</Typography>
        ) : activeQueue.map((item, index) => (
          <Card
            key={item.id}
            sx={{
              borderRadius: 3,
              border: 1,
              borderColor: item.status === "SERVING" ? "primary.main" : "divider",
              bgcolor: item.status === "SERVING" ? (theme) => alpha(theme.palette.primary.main, 0.05) : "background.paper",
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Stack direction="row" spacing={2}>
                  {/* Position */}
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      bgcolor: item.status === "SERVING" ? "primary.main" : "action.hover",
                      color: item.status === "SERVING" ? "primary.contrastText" : "text.secondary",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      flexShrink: 0,
                    }}
                  >
                    {index + 1}
                  </Box>

                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {item.customer?.name || "Customer"}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 0.5, flexWrap: "wrap", gap: 0.5 }}>
                      {item.services?.map((s: any) => (
                        <Chip
                          key={s.id}
                          label={s.service?.name || s.name}
                          size="small"
                          sx={{ height: 20, fontSize: "0.7rem" }}
                        />
                      ))}
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 1 }}>
                      <TimerIcon fontSize="small" color="action" sx={{ fontSize: 16 }} />
                      <Typography variant="caption" color="text.secondary">
                        {item.estimatedWaitTime} min
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>

                <Box>
                  {item.status === "WAITING" ? (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleStartCustomer(item.id)}
                    >
                      Start
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleCompleteCustomer(item.id)}
                    >
                      Done
                    </Button>
                  )}
                </Box>
              </Stack>

              {item.status === "SERVING" && (
                <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: "divider", display: "flex", alignItems: "center", gap: 1, color: "primary.main" }}>
                  <ContentCutIcon fontSize="small" />
                  <Typography variant="caption" fontWeight="bold" textTransform="uppercase">
                    In Progress
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        ))}

        {activeQueue.length === 0 && (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography color="text.secondary">No customers in queue</Typography>
            <Button
              startIcon={<AddIcon />}
              sx={{ mt: 2 }}
              onClick={() => navigate("/barber/add-walkin")}

            >
              Add Walk-in
            </Button>
          </Box>
        )}
      </Stack>

      <BottomNav />
    </Box>
  );
}

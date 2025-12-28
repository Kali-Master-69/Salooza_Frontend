import { useState } from "react";
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
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import AddIcon from "@mui/icons-material/Add";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import TimerIcon from "@mui/icons-material/Timer";

import { BottomNav } from "@/components/layout/BottomNav";

interface QueueCustomer {
  id: string;
  name: string;
  services: string[];
  estimatedTime: number;
  position: number;
  status: "waiting" | "in-progress" | "completed";
}

const mockQueue: QueueCustomer[] = [
  {
    id: "1",
    name: "John Smith",
    services: ["Haircut", "Beard Trim"],
    estimatedTime: 45,
    position: 1,
    status: "in-progress",
  },
  {
    id: "2",
    name: "Mike Johnson",
    services: ["Haircut"],
    estimatedTime: 30,
    position: 2,
    status: "waiting",
  },
  {
    id: "3",
    name: "David Wilson",
    services: ["Shave", "Hair Wash"],
    estimatedTime: 35,
    position: 3,
    status: "waiting",
  },
];

export default function BarberDashboard() {
  const navigate = useNavigate();
  const [isQueueActive, setIsQueueActive] = useState(true);
  const [queue, setQueue] = useState<QueueCustomer[]>(mockQueue);

  const totalWaitTime = queue
    .filter((c) => c.status === "waiting")
    .reduce((acc, c) => acc + c.estimatedTime, 0);

  const handleCompleteCustomer = (customerId: string) => {
    setQueue((prev) =>
      prev.map((c) =>
        c.id === customerId ? { ...c, status: "completed" as const } : c
      )
    );
  };

  const handleStartCustomer = (customerId: string) => {
    setQueue((prev) =>
      prev.map((c) =>
        c.id === customerId ? { ...c, status: "in-progress" as const } : c
      )
    );
  };

  const activeQueue = queue.filter((c) => c.status !== "completed");

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 12 }}>
      {/* Header */}
      <Box sx={{ px: 3, pt: 6, pb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Barber Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Manage your queue
        </Typography>
      </Box>

      {/* Stats */}
      <Box sx={{ px: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
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
          <Grid item xs={6}>
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
            onClick={() => setIsQueueActive(!isQueueActive)}
            sx={{ borderRadius: 3, py: 1.5 }}
          >
            {isQueueActive ? "Pause Queue" : "Start Queue"}
          </Button>
          <Button
            variant="outlined"
            size="large"
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
          label={isQueueActive ? "Active" : "Paused"}
          color={isQueueActive ? "success" : "error"} // Use success/error for better distinction
          variant="outlined" // Or filled with alpha bg
          size="small"
          sx={{
            fontWeight: "bold",
            bgcolor: (theme) => alpha(theme.palette[isQueueActive ? "success" : "error"].main, 0.1),
            borderColor: "transparent",
            color: isQueueActive ? "success.main" : "error.main",
          }}
        />
      </Box>

      {/* Queue List */}
      <Stack spacing={2} sx={{ px: 3 }}>
        {activeQueue.map((customer) => (
          <Card
            key={customer.id}
            sx={{
              borderRadius: 3,
              border: 1,
              borderColor: customer.status === "in-progress" ? "primary.main" : "divider",
              bgcolor: customer.status === "in-progress" ? (theme) => alpha(theme.palette.primary.main, 0.05) : "background.paper",
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
                      bgcolor: customer.status === "in-progress" ? "primary.main" : "action.hover",
                      color: customer.status === "in-progress" ? "primary.contrastText" : "text.secondary",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      flexShrink: 0,
                    }}
                  >
                    {customer.position}
                  </Box>

                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">{customer.name}</Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 0.5, flexWrap: "wrap", gap: 0.5 }}>
                      {customer.services.map((service) => (
                        <Chip
                          key={service}
                          label={service}
                          size="small"
                          sx={{ height: 20, fontSize: "0.7rem" }}
                        />
                      ))}
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 1 }}>
                      <TimerIcon fontSize="small" color="action" sx={{ fontSize: 16 }} />
                      <Typography variant="caption" color="text.secondary">
                        {customer.estimatedTime} min
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>

                <Box>
                  {customer.status === "waiting" ? (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleStartCustomer(customer.id)}
                    >
                      Start
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleCompleteCustomer(customer.id)}
                    >
                      Done
                    </Button>
                  )}
                </Box>
              </Stack>

              {customer.status === "in-progress" && (
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

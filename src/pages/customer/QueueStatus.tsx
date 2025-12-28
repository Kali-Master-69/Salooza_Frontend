import { useState, useEffect } from "react";
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
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupIcon from "@mui/icons-material/Group";
import RoomIcon from "@mui/icons-material/Room";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BottomNav } from "@/components/layout/BottomNav";
import { useNavigate } from "react-router-dom";

export default function QueueStatus() {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(45); // minutes
  const [position, setPosition] = useState(3);

  useEffect(() => {
    // Simulate queue updates
    const interval = setInterval(() => {
      setTimeRemaining((prev) => Math.max(0, prev - 1));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 12 }}>
      {/* Header */}
      <Box sx={{ px: 3, pt: 6, pb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Queue Status
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Track your position
        </Typography>
      </Box>

      {/* Token Card */}
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
            Your Token
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
            #{position}
          </Box>
          <Typography variant="h5" fontWeight="bold">
            Stylish Barber Shop
          </Typography>
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5} sx={{ mt: 1, color: "text.secondary" }}>
            <RoomIcon fontSize="small" />
            <Typography variant="body2">127 Nature Lodge</Typography>
          </Stack>
        </Card>
      </Box>

      {/* Wait Info */}
      <Box sx={{ px: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card sx={{ borderRadius: 3, textAlign: "center", p: 2 }}>
              <AccessTimeIcon fontSize="large" color="primary" sx={{ mb: 1 }} />
              <Typography variant="h5" fontWeight="bold">
                ~{timeRemaining} <Typography component="span" variant="caption">min</Typography>
              </Typography>
              <Typography variant="caption" color="text.secondary">Estimated Wait</Typography>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ borderRadius: 3, textAlign: "center", p: 2 }}>
              <GroupIcon fontSize="large" color="primary" sx={{ mb: 1 }} />
              <Typography variant="h5" fontWeight="bold">
                {position - 1}
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
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body1">Haircut</Typography>
                <Typography variant="body2" color="text.secondary">30 min • $25</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body1">Beard Trim</Typography>
                <Typography variant="body2" color="text.secondary">15 min • $15</Typography>
              </Stack>
              <Divider />
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle1" fontWeight="bold">Total</Typography>
                <Typography variant="subtitle1" fontWeight="bold" color="primary.main">
                  45 min • $40
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
          {[1, 2, 3].map((num) => (
            <Card
              key={num}
              sx={{
                borderRadius: 2,
                p: 2,
                border: 1,
                borderColor: num === position ? "primary.main" : "transparent",
                bgcolor: num === position ? (theme) => alpha(theme.palette.primary.main, 0.05) : "background.paper",
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      bgcolor: num === position ? "primary.main" : "action.selected",
                      color: num === position ? "primary.contrastText" : "text.secondary",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.875rem",
                      fontWeight: "bold",
                    }}
                  >
                    {num}
                  </Box>
                  <Typography variant="body2" fontWeight="medium">
                    {num === position ? "You" : `Customer ${num}`}
                  </Typography>
                </Stack>
                <Typography variant="caption" color="text.secondary">
                  {num === 1 ? "In Progress" : "Waiting"}
                </Typography>
              </Stack>
            </Card>
          ))}
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
          >
            Leave Queue
          </Button>
        </Stack>
      </Box>

      <BottomNav />
    </Box>
  );
}

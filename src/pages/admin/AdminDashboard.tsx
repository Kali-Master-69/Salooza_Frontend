import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Button,
  Stack,
  alpha,
  Grid,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import StoreIcon from "@mui/icons-material/Store";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import { BottomNav } from "@/components/layout/BottomNav";

const stats = [
  { label: "Total Users", value: "1,234", icon: GroupIcon, change: "+12%" },
  { label: "Active Shops", value: "45", icon: StoreIcon, change: "+5%" },
  { label: "Total Barbers", value: "89", icon: ContentCutIcon, change: "+8%" },
  { label: "Revenue", value: "$12.5K", icon: TrendingUpIcon, change: "+15%" },
];

const recentUsers = [
  { id: 1, name: "John Smith", role: "Customer", joined: "2 hours ago" },
  { id: 2, name: "Mike Johnson", role: "Barber", joined: "5 hours ago" },
  { id: 3, name: "Sarah Wilson", role: "Customer", joined: "1 day ago" },
];

const quickActions = [
  { label: "Add User", icon: PersonAddIcon, path: "/admin/users" },
  { label: "Manage Shops", icon: StoreIcon, path: "/admin/shops" },
  { label: "Settings", icon: SettingsIcon, path: "/admin/settings" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 12 }}>
      {/* Header */}
      <Box sx={{ px: 3, pt: 6, pb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Admin Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          System Overview
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Box sx={{ px: 3, mb: 4 }}>
        <Grid container spacing={2}>
          {stats.map((stat) => (
            <Grid item xs={6} key={stat.label}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 2 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 1.5,
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                        color: "primary.main",
                        display: "flex",
                      }}
                    >
                      <stat.icon fontSize="small" />
                    </Box>
                    <Typography variant="caption" color="success.main" fontWeight="bold">
                      {stat.change}
                    </Typography>
                  </Stack>
                  <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">{stat.label}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Quick Actions */}
      <Box sx={{ px: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Quick Actions
        </Typography>
        <Stack direction="row" spacing={2}>
          {quickActions.map((action) => (
            <Button
              key={action.label}
              variant="contained"
              color="secondary"
              sx={{
                flex: 1,
                py: 2,
                flexDirection: "column",
                gap: 1,
                borderRadius: 3,
                textTransform: "none",
              }}
              onClick={() => navigate(action.path)}
            >
              <action.icon />
              <Typography variant="caption" fontWeight="medium">{action.label}</Typography>
            </Button>
          ))}
        </Stack>
      </Box>

      {/* Recent Users */}
      <Box sx={{ px: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">Recent Users</Typography>
          <Button endIcon={<ChevronRightIcon />} size="small">View all</Button>
        </Box>
        <Stack spacing={2}>
          {recentUsers.map((user) => (
            <Card key={user.id} sx={{ borderRadius: 3 }}>
              <CardActionArea sx={{ p: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        bgcolor: "action.hover",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <GroupIcon color="action" />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">{user.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{user.role}</Typography>
                    </Box>
                  </Stack>
                  <Typography variant="caption" color="text.secondary">{user.joined}</Typography>
                </Stack>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      </Box>

      <BottomNav />
    </Box>
  );
}

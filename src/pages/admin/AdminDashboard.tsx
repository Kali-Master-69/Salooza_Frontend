import { motion } from "framer-motion";
import { 
  Users, 
  Store, 
  Scissors, 
  TrendingUp,
  ChevronRight,
  UserPlus,
  Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/layout/BottomNav";

const stats = [
  { label: "Total Users", value: "1,234", icon: Users, change: "+12%" },
  { label: "Active Shops", value: "45", icon: Store, change: "+5%" },
  { label: "Total Barbers", value: "89", icon: Scissors, change: "+8%" },
  { label: "Revenue", value: "$12.5K", icon: TrendingUp, change: "+15%" },
];

const recentUsers = [
  { id: 1, name: "John Smith", role: "Customer", joined: "2 hours ago" },
  { id: 2, name: "Mike Johnson", role: "Barber", joined: "5 hours ago" },
  { id: 3, name: "Sarah Wilson", role: "Customer", joined: "1 day ago" },
];

const quickActions = [
  { label: "Add User", icon: UserPlus, path: "/admin/users" },
  { label: "Manage Shops", icon: Store, path: "/admin/shops" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-4 pt-12 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-display font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">System Overview</p>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs text-green-400 font-medium">
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground mt-3">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Quick Actions
        </h2>
        <div className="flex gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.label}
              variant="dark"
              className="flex-1 flex-col h-auto py-4 gap-2"
              onClick={() => navigate(action.path)}
            >
              <action.icon className="h-6 w-6" />
              <span className="text-xs">{action.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Recent Users */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Recent Users
          </h2>
          <button
            onClick={() => navigate("/admin/users")}
            className="text-sm text-primary flex items-center gap-1"
          >
            View all <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-3">
          {recentUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card variant="interactive" className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <Users className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">
                        {user.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {user.role}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {user.joined}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

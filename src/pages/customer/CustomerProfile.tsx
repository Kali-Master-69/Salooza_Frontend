import { motion } from "framer-motion";
import { User, Mail, Phone, Settings, LogOut, ChevronRight, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BottomNav } from "@/components/layout/BottomNav";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import barberPortrait from "@/assets/barber-portrait.jpg";

const menuItems = [
  { icon: User, label: "Edit Profile", path: "/customer/profile/edit" },
  { icon: Settings, label: "Settings", path: "/customer/settings" },
  { icon: Mail, label: "Support", path: "/customer/support" },
];

export default function CustomerProfile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
            Profile
          </h1>
        </motion.div>
      </div>

      {/* Profile Card */}
      <div className="px-4 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-6 relative">
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute top-4 right-4"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/30 mb-4">
                <img
                  src={barberPortrait}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                {user?.name || "John Doe"}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {user?.email || "john@example.com"}
              </p>
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                {user?.phone || "+1 234 567 890"}
              </div>
              <div className="mt-4 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium capitalize">
                {user?.role || "Customer"}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Menu */}
      <div className="px-4 space-y-3">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card
              variant="interactive"
              className="p-4"
              onClick={() => navigate(item.path)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <span className="font-medium text-foreground">
                    {item.label}
                  </span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </Card>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card
            variant="interactive"
            className="p-4"
            onClick={handleLogout}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <LogOut className="h-5 w-5 text-destructive" />
                </div>
                <span className="font-medium text-destructive">Logout</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </Card>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}

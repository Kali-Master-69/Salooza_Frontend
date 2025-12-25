import { Link, useLocation } from "react-router-dom";
import { Home, Search, Calendar, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const customerTabs = [
  { path: "/customer", icon: Home, label: "Home" },
  { path: "/customer/explore", icon: Search, label: "Explore" },
  { path: "/customer/queue", icon: Calendar, label: "Queue" },
  { path: "/customer/chat", icon: MessageCircle, label: "Chat" },
  { path: "/customer/profile", icon: User, label: "Profile" },
];

const barberTabs = [
  { path: "/barber", icon: Home, label: "Dashboard" },
  { path: "/barber/queue", icon: Calendar, label: "Queue" },
  { path: "/barber/services", icon: Search, label: "Services" },
  { path: "/barber/chat", icon: MessageCircle, label: "Chat" },
  { path: "/barber/settings", icon: User, label: "Settings" },
];

const adminTabs = [
  { path: "/admin", icon: Home, label: "Dashboard" },
  { path: "/admin/users", icon: User, label: "Users" },
  { path: "/admin/barbers", icon: Search, label: "Barbers" },
  { path: "/admin/shops", icon: Calendar, label: "Shops" },
];

export function BottomNav() {
  const location = useLocation();
  const { user } = useAuth();

  const tabs =
    user?.role === "admin"
      ? adminTabs
      : user?.role === "barber"
      ? barberTabs
      : customerTabs;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50 safe-bottom">
      <div className="mx-auto max-w-lg">
        <div className="flex items-center justify-around py-2">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={cn(
                  "flex flex-col items-center gap-1 px-4 py-2 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <tab.icon className={cn("h-5 w-5", isActive && "fill-primary/20")} />
                <span className="text-xs font-medium">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

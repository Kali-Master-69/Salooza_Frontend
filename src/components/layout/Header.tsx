import { ArrowLeft, Bell, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  showNotifications?: boolean;
  transparent?: boolean;
  className?: string;
}

export function Header({
  title,
  showBack = false,
  showSearch = false,
  showNotifications = false,
  transparent = false,
  className,
}: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 safe-top",
        transparent ? "bg-transparent" : "glass border-b border-border/50",
        className
      )}
    >
      <div className="mx-auto max-w-lg flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-3">
          {showBack && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => navigate(-1)}
              className="text-foreground"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          {title && (
            <h1 className="text-lg font-semibold text-foreground">{title}</h1>
          )}
        </div>
        <div className="flex items-center gap-2">
          {showSearch && (
            <Button variant="ghost" size="icon-sm" className="text-foreground">
              <Search className="h-5 w-5" />
            </Button>
          )}
          {showNotifications && (
            <Button variant="ghost" size="icon-sm" className="text-foreground relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

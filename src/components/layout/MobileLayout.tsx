import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MobileLayoutProps {
  children: ReactNode;
  className?: string;
  hasNavbar?: boolean;
  hasTabBar?: boolean;
}

export function MobileLayout({
  children,
  className,
  hasNavbar = false,
  hasTabBar = false,
}: MobileLayoutProps) {
  return (
    <div
      className={cn(
        "min-h-screen w-full bg-background",
        hasNavbar && "pt-14",
        hasTabBar && "pb-20",
        className
      )}
    >
      <div className="mx-auto max-w-lg">{children}</div>
    </div>
  );
}

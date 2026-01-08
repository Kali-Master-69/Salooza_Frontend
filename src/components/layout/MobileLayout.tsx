import { ReactNode } from "react";
import { Box, Container } from "@mui/material";

interface MobileLayoutProps {
  children: ReactNode;
  className?: string; // Keep for param compat, usually useless with MUI Box sx
  hasNavbar?: boolean;
  hasTabBar?: boolean;
}

export function MobileLayout({
  children,
  hasNavbar = false,
  hasTabBar = false,
}: MobileLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        pt: hasNavbar ? "56px" : 0, // 56px matches Toolbar minHeight
        pb: hasTabBar ? "104px" : 0, // 72px nav height + 16px margin + 16px padding
      }}
    >
      <Container maxWidth="sm" disableGutters sx={{ p: 0 }}>
        {children}
      </Container>
    </Box>
  );
}

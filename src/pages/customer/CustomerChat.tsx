import React from "react";
import { Box, Typography } from "@mui/material";
import { BottomNav } from "@/components/layout/BottomNav";

export default function CustomerChat() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 12 }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Customer Chat
        </Typography>
        <Typography variant="body1" color="text.secondary">
          (Chat feature coming soon...)
        </Typography>
      </Box>
      <BottomNav />
    </Box>
  );
}

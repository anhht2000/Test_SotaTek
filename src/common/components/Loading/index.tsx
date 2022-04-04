import { Backdrop, Box, useTheme } from "@mui/material";
import React from "react";
import { BallClipRotateMultiple } from "react-pure-loaders";

export default function Loading() {
  const theme = useTheme();
  return (
    <Backdrop open={true} sx={{ zIndex: 1000 }}>
      <Box
        position='fixed'
        top='50%'
        left='50%'
        sx={{
          transform: "translate(-50%,-50%)",
        }}
      >
        <Box sx={{ transform: "scale(2.5)" }}>
          <BallClipRotateMultiple color={theme.palette.primary.main} loading={true} />
        </Box>
      </Box>
    </Backdrop>
  );
}

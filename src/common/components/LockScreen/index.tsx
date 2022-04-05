import { Backdrop, Box, useTheme } from "@mui/material";
import React from "react";
import { BallClipRotateMultiple } from "react-pure-loaders";
import useCommon from "../../../hooks/common";

export default function LookScreen() {
  const theme = useTheme();
  const { isLockScreen } = useCommon();
  return (
    <Backdrop open={isLockScreen} sx={{ zIndex: 1000 }}>
      <Box
        position='fixed'
        top='50%'
        left='50%'
        sx={{
          transform: "translate(-50%,-50%)",
        }}
      ></Box>
    </Backdrop>
  );
}

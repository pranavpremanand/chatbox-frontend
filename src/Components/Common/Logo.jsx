import { Box, Typography } from "@mui/material";
import React from "react";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";

const Logo = () => {
  return (
    <Box sx={{ display: "flex", alignSelf: "center", marginTop: "0.5rem" }}>
      <ForumRoundedIcon sx={{ fontSize: 35 }} />
      <Typography sx={{ fontWeight: "800", fontSize: 25 }}>Chatbox</Typography>
    </Box>
  );
};

export default Logo;

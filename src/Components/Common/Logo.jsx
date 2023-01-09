import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import { blue } from "@mui/material/colors";

const Logo = () => {
  return (
    <Box sx={{ display: "flex", alignSelf: "center", marginTop: "0.5rem" }}>
      <ForumRoundedIcon sx={{ fontSize: 35 }} />
      <Typography
        variant="h5"
        sx={{
          fontWeight: "800",
        }}
      >
        Chatbox
      </Typography>
    </Box>
  );
};

export default Logo;

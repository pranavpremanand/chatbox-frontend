import React from "react";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import { Box, Typography } from "@mui/material";
import "./LogoSearch.css";
import Logo from "../../../../Common/Logo";
import SearchInput from "../../../../Common/SearchInput";

function LogoSearch() {
  return (
    <Box
      className="logoSearch"
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Logo />
      {/* <SearchInput /> */}
    </Box> 
  );
}

export default LogoSearch;

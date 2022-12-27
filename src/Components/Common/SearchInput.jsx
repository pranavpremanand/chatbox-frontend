import { Box } from "@mui/material";
import {Search as SearchIcon} from '@mui/icons-material'
import React from "react";

const SearchInput = () => {
  return (
    <Box className="search" sx={{ background: "white", display: "flex" ,marginBottom:'1rem'}}>
      <input type="text" placeholder="Search" style={{ width: "100%" }}></input>
      <SearchIcon className="s-icon" />
    </Box>
  );
};

export default SearchInput;

import React, { Fragment } from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import AdminSideBar, { DrawerHeader } from "../../Components/Common/AdminSideBar";
import { UsersList } from "../../Components/Admin/UsersList/UsersList";

function UsersSide() {
  return (
    <Fragment>
      <Box sx={{ display: "flex" }}>
          <AdminSideBar/>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <UsersList/>
        </Box>
      </Box>
    </Fragment>
  );
}

export default UsersSide;

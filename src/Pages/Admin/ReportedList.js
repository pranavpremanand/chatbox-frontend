import { Box } from '@mui/material'
import React, { Fragment } from 'react'
import ReportedPosts from '../../Components/Admin/ReportedPosts'
import AdminSideBar, { DrawerHeader } from '../../Components/Common/AdminSideBar'

const ReportedList = () => {
  return (
    <Fragment>
    <Box sx={{ display: "flex" }}>
        <AdminSideBar/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <ReportedPosts/>
      </Box>
    </Box>
  </Fragment>
  )
}

export default ReportedList
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import TimeAgo from "javascript-time-ago";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { blue } from "@mui/material/colors";

const NotificationsList = ({ data }) => {
  const timeAgo = new TimeAgo("en-US");
  return (
    <Box sx={{ maxHeight: "80vh", overflow: "scroll" }}>
      <ListItem sx={{ display: "flex", justifyContent: "center" }}>
        {data?.userId ? (
          <>
            <ListItemAvatar>
              <Avatar
                alt={data?.userId?.fullName}
                src={data?.userId?.profilePic}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: "flex", gap: "0.3rem" }}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {data?.userId?.fullName}
                  </Typography>
                  <Typography>{data?.content}</Typography>
                </Box>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {timeAgo.format(new Date(data.date))}
                  </Typography>
                </React.Fragment>
              }
            />
            {/* {data.postId.image && (
          <ListItemAvatar>
            <Box
              // component="img"
              sx={{
                backgroundImage: `url(${data.postId.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "4rem",
                width: "4rem",
                //   maxHeight: { xs: 233, md: 167 },
                //   maxWidth: { xs: 350, md: 250 },
                maxHeight: "8rem",
                maxWidth: "8rem",
              }}
            />
          </ListItemAvatar>
        )} */}
          </>
        ) : (
          <>
            <ListItemAvatar>
              <Avatar sx={{ background: blue[600] }}>
                <AdminPanelSettingsIcon fontSize="large" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${data.content}`}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {timeAgo.format(new Date(data.date))}
                  </Typography>
                </React.Fragment>
              }
            />
          </>
        )}
      </ListItem>
    </Box>
  );
};

export default NotificationsList;

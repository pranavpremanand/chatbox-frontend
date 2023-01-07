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

const NotificationsList = ({ data }) => {
  const timeAgo = new TimeAgo("en-US");
  return (
    <Box sx={{ maxHeight: "80vh", overflow: "scroll" }}>
      <ListItem sx={{ display: "flex", justifyContent: "center" }}>
        <ListItemAvatar>
          <Avatar alt={data.userId.fullName} src={data.userId.profilePic} />
        </ListItemAvatar>
        <ListItemText
          primary={`${data.userId.fullName} ${data.content}`}
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
        <ListItemAvatar>
            {/* <Box
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
            /> */}
        </ListItemAvatar>
      </ListItem>
      <Divider variant="inset" component="li" />
    </Box>
  );
};

export default NotificationsList;
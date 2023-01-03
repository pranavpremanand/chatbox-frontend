import { Container, List, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { seenAllNotifications } from "../../../APIs/Notifications";
import LeftSide from "../../../Components/User/Home/LeftSide/LeftSide";
import RightSide from "../../../Components/User/Home/RightSide/RightSide";
import NotificationsList from "../../../Components/User/Notifications/NotificationsList";
import { setNotifications,seenNotifications } from "../../../Redux/NotificationsSlice";
import "./Notifications.css";

const Notifications = () => {
//   const [notifications, setNotificationsData] = useState([]);
  const dispatch = useDispatch();
  const notifications = useSelector((state)=>state.notifications.seen)
  useEffect(() => {
    getNotificationsData();
  }, []);
  const getNotificationsData = async () => {
    try {
      await seenAllNotifications().then((response) => {
        const { data } = response;
        console.log("Notifications", data);
        // setNotificationsData(data);
        dispatch(seenNotifications({notifications:data}))
        dispatch(setNotifications({ notifications: [] }));
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Home Notifications-Page">
      <div className="LeftSide">
        <LeftSide />
      </div>
      <div className="Notifications">
        <Container>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              sx={{ fontWeight: "800", fontSize: 20, marginBottom: "0.5rem" }}
            >
              Notifications
            </Typography>
          </Box>
          {notifications[0] ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 800,
                  bgcolor: "background.paper",
                  borderRadius: "10px",
                }}
              >
                {notifications.map((notification) => {
                  return <NotificationsList data={notification} />;
                })}
              </List>
            </Box>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 800,
                  bgcolor: "background.paper",
                  borderRadius: "10px", 
                }}
              >
                <Typography
                  sx={{
                    padding: "1rem",
                    alignSelf: "center",
                    fontWeight: "500",
                    fontSize: 16,
                  }}
                >
                  {/* No notifications */}
                </Typography>
              </List>
            </Box>
          )}
        </Container>
      </div>
      <div className="rightSide">
        <RightSide />
      </div>
    </div>
  );
};

export default Notifications;

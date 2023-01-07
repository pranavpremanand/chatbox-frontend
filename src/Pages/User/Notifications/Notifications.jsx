import { Container, List, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { seenAllNotifications } from "../../../APIs/Notifications";
import LeftSide from "../../../Components/User/Home/LeftSide/LeftSide";
import RightSide from "../../../Components/User/Home/RightSide/RightSide";
import NotificationsList from "../../../Components/User/Notifications/NotificationsList";
import {
  setNotifications,
  seenNotifications,
  resetNotifications,
} from "../../../Redux/NotificationsSlice";
import { user } from "../../../Redux/UserSlice";
import "./Notifications.css";
import axios from '../../../APIs/axios'

const Notifications = () => {
  const dispatch = useDispatch();
  let currentUser = JSON.parse(localStorage.getItem('user'))
  currentUser = currentUser._id
  // const notifications = useSelector((state) => state.notifications.seen);
  const [data,setData]=useState([])
  useEffect(() => {
    getNotificationsData();
  }, []);
  const getNotificationsData = async () => {
    try {
     const response = await axios.get("/user/seen-notifications");
    //  seenAllNotifications()
    console.log(response.data,'response')
    //  dispatch(user({ user: response.data }));
    //  localStorage.setItem('user',JSON.stringify(response.data))
    //  setData(response.data.seenNotifications )
      // .then((response) => {
      //   console.log("nnnnnnn")
      //   const { data } = response;
      //   dispatch(user({ user: data }));
      //   localStorage.setItem('user',JSON.stringify(data))
      //   console.log("seen",data.seenNotifications)
      //   setData(data.seenNotifications )
      //   dispatch(
      //     seenNotifications({ notifications: data.seenNotifications })
      //   );
      //   dispatch(resetNotifications({ notifications: [] }));
      // }).catch(err=>console.log("err",err))
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
          {data[0] ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 800,
                  bgcolor: "background.paper",
                  borderRadius: "10px",
                }}
              >
                {data.map((notification) => {
                  return (
                    currentUser !== notification.userId._id && (
                      <NotificationsList data={notification} />
                    )
                  );
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

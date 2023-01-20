import React from "react";
import "./FollowersCard.css";
import { Avatar, Box, Button, Typography } from "@mui/material";
import axios from "../../../../../APIs/UserAPI";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Search as SearchIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { otherUsers, followUser } from "../../../../../Redux/OtherUsers";
import { followed } from "../../../../../Redux/FollowingUsers";
import { user } from "../../../../../Redux/UserSlice";

const FollowersCard = () => {
  // const [users, setUsers] = useState([]);
  const users = useSelector((state) => state.otherUsers.users);
  const dispatch = useDispatch();

  const follow = (userId) => {
    axios
      .get(`/user/follow-user/${userId}`)
      .then((response) => {
        if (response.data.success) {
          followUser(userId)
          dispatch(user({user:response.data.user}))
          dispatch(followUser({ users: userId }));
          dispatch(followed({ users: response.data.user }));
          getUsers();
        }
      })
      .catch((err) => {
        toast("Something went wrong, try again", {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      });
  };
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get("/user/get-users")
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.data);
          const users = response.data.data;
          dispatch(otherUsers({ users: users }));
          // setUsers(response.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Box
        className="search"
        sx={{ background: "white", display: "flex", marginBottom: "1rem" }}
      >
        <input
          // onChange={(e) => findUser(e.target.value)}
          type="text"
          placeholder="Search"
          style={{ width: "100%" }}
        ></input>
        <SearchIcon className="s-icon" />
      </Box>
      <div className="followersCard">
        <Typography sx={{ fontSize: 15, fontWeight: "600" }}>
          Who to follow
        </Typography>
        {users.map((user, id) => {
          return (
            <Box className="follower">
              <div>
                {user.profilePic ? (
                  <div
                  style={{
                    backgroundImage: `url(${user.profilePic})`,
                    width: "3rem",
                    height: "3rem",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    borderRadius: "50%",
                  }}
                ></div>
                ) : (
                  <div
                    className="profile"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "10px",
                    }}
                  >
                    <Avatar
                      sx={{
                        fontSize: "3rem",
                        alignSelf: "center",
                        // background: "grey",
                        borderRadius: "50%",
                        color: "white",
                      }}
                    />
                  </div>
                )}

                <Box className="name">
                  <Typography sx={{ fontSize: "", fontWeight: "bold" }}>
                    {user.fullName}
                  </Typography>
                  <Typography sx={{ fontSize: "" }}>{user.username}</Typography>
                </Box>
              </div>
              <Button
                onClick={() => follow(user._id)}
                size="small"
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "small",
                }}
                className="button btn-sm fc-button text-capitalize"
              >
                Follow
              </Button>
            </Box>
          );
        })}
      </div>
    </>
  );
};
export default FollowersCard;

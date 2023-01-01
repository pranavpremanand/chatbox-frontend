import { Tab, Tabs, Box, Avatar, Button, Typography } from "@mui/material";
import axios from "../../../APIs/axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { purple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
// import {followingUsers,unfollowUser} from '../../../Redux/FollowingUsers'
// import {followers} from '../../../Redux/Followers'
// import {unfollowed} from '../../../Redux/Followers'
import {
  following,
  followers,
  unfollowed,
  others,
  followed,
} from "../../../Redux/UsersSlice";
import { user } from "../../../Redux/UserSlice";

const People = () => {
  const dispatch = useDispatch();
  let users = useSelector((state) => state.users.users);
  // let users = useSelector(state=>state.followingUsers.users)
  // users = useSelector(state=>state.followers.users)
  // const [users, setUsers] = useState([]);
  const [value, setValue] = useState("one");
  const [Followers, setFollowers] = useState([]);
  const [followersTrue, setFollowersTrue] = useState(false);

  useEffect(() => {
    getFollowing();
  }, []);

  //Get following users
  const getFollowing = async () => {
    await axios
      .get("/user/followings")
      .then((response) => {
        setFollowersTrue(false);
        dispatch(following({ users: response.data.users[0].result }));
        // console.log(response.data.users[0].result,"sddf");
        // dispatch(followingUsers({users:response.data.users[0].result}))
        // setUsers(response.data.users[0].result);
      })
      .catch((err) => {
        console.log(err)
        // toast("Something went wrong, try again", {
        //   icon: "❌",
        //   style: {
        //     borderRadius: "10px",
        //     background: "#333",
        //     color: "#fff",
        //   },
        // });
      });
  };

  //Get followers
  const getFollowers = async () => {
    await axios
      .get("/user/followers")
      .then((response) => {
        setFollowersTrue(true);
        setFollowers(response.data.users[0].result);
        // dispatch(followers({ users: response.data.users[0].result }));
        // console.log(response.data.users);
        // setUsers(response.data.users[0].result);
      })
      .catch((err) => {
        console.log(err)
        // toast("Something went wrong, try again", {
        //   icon: "❌",
        //   style: {
        //     borderRadius: "10px",
        //     background: "#333",
        //     color: "#fff",
        //   },
        // });
      });
  };

  //Get others
  const getWhoToFollow = () => {
    axios
      .get("/user/who-to-follow")
      .then((response) => {
        if (response.data.success) {
          setFollowersTrue(false)
          dispatch(others({users:response.data.users}))
        }
      })
      .catch((err) => {
        // toast("Something went wrong, try again", {
        //   icon: "❌",
        //   style: {
        //     borderRadius: "10px",
        //     background: "#333",
        //     color: "#fff",
        //   },
        // });
        console.log(err)
      });
  };
  //Unfollow user
  const unfollow = async (id) => {
    await axios
      .get("/user/unfollow-user/" + id)
      .then((response) => {
        if (response.data.success) {
          // getFollowing();
          // getFollowers()
          // dispatch(unfollowUser({users:id}))
          dispatch(user({user:response.data.user}))
          dispatch(unfollowed({ users: id }));
        } else {
          toast("Something went wrong, try again", {
            icon: "❌",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
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

  const follow = async (id) => {
    await axios
      .get("/user/follow-user/" + id)
      .then((response) => {
        if (response.data.success) {
          // getFollowing();
          // getWhoToFollow()
          // dispatch(unfollowUser({users:id}))
          dispatch(user({user:response.data.user}))
          dispatch(followed({ users: id }));
        } else {
          toast("Something went wrong, try again", {
            icon: "❌",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
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
        console.log(err)
      });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab
            onClick={getFollowing}
            sx={{ textTransform: "capitalize" }}
            value="one"
            label="Following"
          />
          <Tab
            onClick={getFollowers}
            sx={{ textTransform: "capitalize" }}
            value="two"
            label="Followers"
          />
          <Tab
            onClick={getWhoToFollow}
            sx={{ textTransform: "capitalize" }}
            value="three"
            label="Who to follow"
          />
        </Tabs>
        <Box>
          {followersTrue
            ? Followers.map((val) => {
                return (
                  <Box className="follower" sx={{ margin: "0.5rem" }}>
                    <div>
                      {val.profilePic ? (
                        <img
                          src={val.profilePic}
                          alt=""
                          className="followerImg"
                        />
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
                              fontSize: "30px",
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
                          {val.fullName}
                        </Typography>
                        <Typography sx={{ fontSize: "" }}>
                          {val.username}
                        </Typography>
                      </Box>
                    </div>
                    {/* {val.isFollowed ? (
                      <Button
                        onClick={() => {
                          unfollow(val._id);
                        }}
                        size="small"
                        sx={{
                          backgroundColor: "black",
                          color: "white",
                          borderRadius: "50%",
                          fontSize: "small",
                        }}
                        className="button btn-sm fc-button text-capitalize"
                      >
                        Unfollow
                      </Button>
                    ) : (
                      <Button
                        onClick={() => follow(val._id)}
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
                      </Button> */}
                    {/* )} */}
                  </Box>
                );
              })
            : users.map((val) => {
                return (
                  <Box className="follower" sx={{ margin: "0.5rem" }}>
                    <div>
                      {val.profilePic ? (
                        <img
                          src={val.profilePic}
                          alt=""
                          className="followerImg"
                        />
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
                              fontSize: "30px",
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
                          {val.fullName}
                        </Typography>
                        <Typography sx={{ fontSize: "" }}>
                          {val.username}
                        </Typography>
                      </Box>
                    </div>
                    {val.isFollowed ? (
                      <Button
                        onClick={() => {
                          unfollow(val._id);
                        }}
                        size="small"
                        sx={{
                          backgroundColor: "black",
                          color: "white",
                          borderRadius: "50%",
                          fontSize: "small",
                        }}
                        className="button btn-sm fc-button text-capitalize"
                      >
                        Unfollow
                      </Button>
                    ) : (
                      <Button
                        onClick={() => follow(val._id)}
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
                    )}
                  </Box>
                );
              })}
        </Box>
      </Box>
    </div>
  );
};

export default People;

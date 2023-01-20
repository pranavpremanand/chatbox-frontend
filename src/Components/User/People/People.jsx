import { Tab, Tabs, Box, Avatar, Button, Typography } from "@mui/material";
import axios from "../../../APIs/UserAPI";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { purple, blue } from "@mui/material/colors";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useDispatch, useSelector } from "react-redux";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  following,
  followers,
  unfollowed,
  others,
  followed,
} from "../../../Redux/UsersSlice";
import { useNavigate } from "react-router-dom";
import { loggedUserStatus, setUserProfile } from "../../../Redux/ProfileSlice";

const People = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let users = useSelector((state) => state.users.users);
  const [value, setValue] = useState("one");
  const [Followers, setFollowers] = useState([]);
  const [followersTrue, setFollowersTrue] = useState(false);
  const [searching, setSearching] = useState(false);
  const [whotofollow, setWhotofollow] = useState(false);
  const [searchFollowButtons, setSearchFollowButtons] = useState(false);

  useEffect(() => {
    getWhoToFollow();
  }, []);

  //Get following users
  const getFollowing = async () => {
    await axios
      .get("/user/followings")
      .then((response) => {
        setWhotofollow(false);
        setFollowersTrue(false);
        setSearchFollowButtons(false);
        dispatch(following({ users: response.data.users[0].result }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Get followers
  const getFollowers = async () => {
    await axios
      .get("/user/followers")
      .then((response) => {
        setWhotofollow(false);
        setFollowersTrue(true);
        setSearching(false);
        setSearchFollowButtons(false);
        setFollowers(response.data.users[0].result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Search user
  const searchUser = async (text) => {
    try {
      if (text === "") {
        getWhoToFollow();
        setSearching(false);
      } else {
        setSearching(true);
        setSearchFollowButtons(true);
        const { data } = await axios.get("/user/search-user/" + text);
        // console.log("USERS SEARCH", users)
        setFollowersTrue(true);
        setFollowers(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //Get others
  const getWhoToFollow = () => {
    axios
      .get("/user/who-to-follow")
      .then((response) => {
        if (response.data.success) {
          setSearching(false);
          setWhotofollow(true);
          setFollowersTrue(false);
          dispatch(others({ users: response.data.users }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //Unfollow user
  const unfollow = async (id) => {
    await axios
      .get("/user/unfollow-user/" + id)
      .then((response) => {
        if (response.data.success) {
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
        console.log(err);
      });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const setProfile = (userId) => {
    dispatch(loggedUserStatus(false));
    dispatch(setUserProfile(userId));
    navigate("/profile");
  };

  return (
    <div>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
        {whotofollow && (
          <Box
            className="search"
            sx={{ background: "white", display: "flex", marginBottom: "1rem" }}
          >
            <input
              onChange={(e) => searchUser(e.target.value)}
              type="text"
              placeholder="Search"
              style={{ width: "100%" }}
            ></input>
            <SearchIcon className="s-icon" />
          </Box>
        )}
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="primary tabs example"
        >
          <Tab
            onClick={getWhoToFollow}
            sx={{ textTransform: "capitalize" }}
            value="one"
            label="Who to follow"
          />
          <Tab
            onClick={getFollowing}
            sx={{ textTransform: "capitalize" }}
            value="two"
            label="Following"
          />
          <Tab
            onClick={getFollowers}
            sx={{ textTransform: "capitalize" }}
            value="three"
            label="Followers"
          />
        </Tabs>
        <Box>
          {searching | followersTrue
            ? Followers.map((val) => {
                return (
                  <Box className="follower" sx={{ margin: "0.5rem" }}>
                    <Box
                      sx={{ cursor: "pointer" }}
                      onClick={() => setProfile(val._id)}
                    >
                      <Avatar
                        sx={{ width: 45, height: 45 }}
                        src={val.profilePic}
                        alt={` ${val.fullName}`}
                      />
                      <Box className="name">
                      <Box sx={{ display: "flex", gap: "0.2rem",alignItems:'center' }}>
                          <Typography sx={{ fontSize: "", fontWeight: "bold" }}>
                            {val.fullName}
                          </Typography>
                          {val.verifiedUser && (
                            <VerifiedIcon
                              sx={{ color: blue[600] }}
                              color={blue[600]}
                              fontSize="xsmall"
                            />
                          )}
                        </Box>
                        <Typography sx={{ fontSize: "" }}>
                          {val.username}
                        </Typography>
                      </Box>
                    </Box>
                    {searching && searchFollowButtons ? (
                      val.isFollowed ? (
                        <Button
                          onClick={() => {
                            unfollow(val._id);
                          }}
                          size="small"
                          variant="contained"
                          color="info"
                          className="text-capitalize"
                        >
                          Unfollow
                        </Button>
                      ) : (
                        <Button
                          onClick={() => follow(val._id)}
                          size="small"
                          variant="contained"
                          color="info"
                          className="text-capitalize"
                        >
                          Follow
                        </Button>
                      )
                    ) : null}
                  </Box>
                );
              })
            : users.map((val) => {
                return (
                  <Box className="follower" sx={{ margin: "0.8rem" }}>
                    <Box
                      sx={{ cursor: "pointer" }}
                      onClick={() => setProfile(val._id)}
                    >
                      <Avatar
                        sx={{ width: 45, height: 45 }}
                        src={val.profilePic}
                        alt={` ${val.fullName}`}
                      />

                      <Box className="name">
                        <Box sx={{ display: "flex", gap: "0.2rem",alignItems:'center' }}>
                          <Typography sx={{ fontSize: "", fontWeight: "bold" }}>
                            {val.fullName}
                          </Typography>
                          {val.verifiedUser && (
                            <VerifiedIcon
                              sx={{ color: blue[600] }}
                              color={blue[600]}
                              fontSize="xsmall"
                            />
                          )}
                        </Box>
                        <Typography sx={{ fontSize: "" }}>
                          {val.username}
                        </Typography>
                      </Box>
                    </Box>
                    {val.isFollowed ? (
                      <Button
                        onClick={() => {
                          unfollow(val._id);
                        }}
                        size="small"
                        variant="contained"
                        color="info"
                        className="text-capitalize"
                      >
                        Unfollow
                      </Button>
                    ) : (
                      <Button
                        onClick={() => follow(val._id)}
                        size="small"
                        variant="contained"
                        color="info"
                        className="text-capitalize"
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

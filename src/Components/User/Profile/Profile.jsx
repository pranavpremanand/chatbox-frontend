import { CameraAltRounded } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import userAPI from "../../../APIs/UserAPI";
import Axios from "axios";
import React, { useState } from "react";
import { useEffect, useRef } from "react";
import "./Profile.css";
import Post from "../Home/PostSide/Posts/Post";
import { useDispatch, useSelector } from "react-redux";
import { photos } from "../../../Redux/UserPhotosSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-hot-toast";
import VerifiedIcon from "@mui/icons-material/Verified";
import { blue } from "@mui/material/colors";

function Profile() {
  const loggedUserStatus = useSelector((state) => state.profileViewUser.user);
  const userProfileId = useSelector((state) => state.profileViewUser.userId);
  const users = useSelector((state) => state.users.users);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [userData, setUserData] = useState({});
  const [profileDetails, setProfileDetails] = useState({
    fullName: userData.fullName,
    username: userData.username,
    // email: "",
    about: "",
    // about: userData.about,
    worksAt: "",
    // worksAt: userData.worksAt,
    livesIn: "",
    // livesIn: userData.livesIn,
    relationship: "",
    // relationship: userData.relationship,
  });
  const dispatch = useDispatch();
  const allPhotos = useSelector((state) => state.photos.photos);
  const [posts, setPosts] = useState([]);
  const [editOption, setEditOption] = useState(false);

  const onProfileChange = async (file) => {
    const data = new FormData();
    const profilePic = file.target.files[0];
    data.append("file", profilePic);
    data.append("upload_preset", "aiaeajln");
    const response = await Axios.post(
      "https://api.cloudinary.com/v1_1/dxlmn8skp/image/upload",
      data
    );
    if (response.data) {
      console.log(response.data.secure_url);
      await userAPI
        .post("/user/add-profile-pic", {
          profilePic: response.data.secure_url,
        })
        .then((response) => {
          if (response.data) {
            toast("Profile picture updated", {
              // icon: "✔",
              icon: "✅",
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
            });
            getPosts(currentUser._id);
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
          console.log(err, "ERROR");
        });
    }
  };
  const profilePicRef = useRef();
  const coverPicRef = useRef();

  const onCoverChange = async (file) => {
    const data = new FormData();
    const coverPic = file.target.files[0];
    data.append("file", coverPic);
    data.append("upload_preset", "aiaeajln");
    const response = await Axios.post(
      "https://api.cloudinary.com/v1_1/dxlmn8skp/image/upload",
      data
    );
    if (response.data) {
      await userAPI
        .post("/user/add-cover", { cover: response.data.secure_url })
        .then((response) => {
          if (response.data) {
            toast("Cover picture updated", {
              icon: "✅",
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
            });
            getPosts(currentUser._id);
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
    }
  };

  //Send verification request
  const verifyRequest = async (userId) => {
    try {
      const { data } = await userAPI.get(
        `/user/request-verification/${userId}`
      );
      if (data) {
        toast("Sent verification request", {
          icon: "✅",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        getPosts(userId);
      }
    } catch (err) {
      toast("Something went wrong, try again", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [states, setStates] = useState({
    posts: false,
    about: false,
    photos: false,
  });

  useEffect(() => {
    loggedUserStatus ? getPosts(currentUser._id) : getPosts(userProfileId);
  }, [userProfileId, loggedUserStatus, users]);

  //Get user posts
  const getPosts = (userId) => {
    userAPI
      .get(`/user/get-user-posts/${userId}`)
      .then((response) => {
        if (response.data.success) {
          getUserPhotos(userId);
          console.log(response.data.posts, "posts");
          setPosts(response.data.posts);
          setUserData(response.data.user);
          setStates({ posts: true, about: false, photos: false });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //Get user photos
  const getUserPhotos = (userId) => {
    userAPI
      .get(`/user/get-user-photos/${userId}`)
      .then((response) => {
        if (response.data.success) {
          dispatch(photos({ photos: response.data.photos }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateProfileDetails = () => {
    const username = document.getElementById("username").value;
    const fullName = document.getElementById("fullName").value;
    setProfileDetails({
      username: username,
      fullName: fullName,
    });
    setEditOption(false);
    console.log(profileDetails);
    userAPI
      .post("/user/update-profile", profileDetails)
      .then((response) => {
        if (response.data.success) {
          userAPI
            .get("/user/get-user-posts")
            .then((response) => {
              if (response.data.success) {
                setUserData(response.data.user);
                setStates({ posts: false, about: true, photos: false });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err, "ERROR");
      });
  };

  return (
    <>
      <div className="profileCard" style={{ marginTop: "1rem" }}>
        <div className="profileImages">
          <div className="profileCover" style={{ position: "relative" }}>
            <div
              className="coverPic"
              style={{
                backgroundImage: `url(${
                  userData.coverPic && userData.coverPic
                })`,
              }}
            ></div>
            {loggedUserStatus && (
              <Box
                onClick={() => coverPicRef.current.click()}
                sx={{
                  display: "flex",
                  alignSelf: "flex-end",
                  position: "absolute",
                  bottom: "0",
                  background: "white",
                  padding: "0.3rem",
                  borderRadius: "10px 0 0 0",
                  cursor: "pointer",
                }}
              >
                <CameraAltRounded />
                <Typography>Edit cover</Typography>
              </Box>
            )}
          </div>
          <div className="profilePic" style={{ position: "relative" }}>
            <Avatar
              className="img"
              sx={{ width: 110, height: 110 }}
              src={userData.profilePic}
              alt={userData.fullName}
            />

            {loggedUserStatus && (
              <Box
                sx={{
                  position: "absolute",
                  top: "0",
                  background: "white",
                  marginTop: "2rem",
                  marginLeft: "3rem",
                  borderRadius: "10px",
                }}
              >
                <CameraAltRounded
                  sx={{ cursor: "pointer" }}
                  onClick={() => profilePicRef.current.click()}
                />
              </Box>
            )}
          </div>
        </div>
        <div className="profileName">
          <Box sx={{ display: "flex", gap: "0.2rem" }}>
            <Typography sx={{ fontWeight: "bold", fontSize: "large" }}>
              {userData.fullName}
            </Typography>
            {userData.verifiedUser && (
              <Box
                sx={{
                  background: "white",
                  backgroundSize: "60%",
                  color: blue[600],
                  borderRadius: "50%",
                }}
              >
                <VerifiedIcon fontSize="small" />
              </Box>
            )}
          </Box>
          <Typography sx={{ fontWeight: "medium" }}>
            {userData.about ? userData.about : "Not added"}
          </Typography>
        </div>
        {userData.followers?.length >= 5 &&
          !userData.verifiedUser &&
          !userData.verificationRequest &&
          currentUser._id === userData._id && (
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "small",
                    alignSelf: "center",
                  }}
                >
                  You may request the admin to make your account verified.
                </Typography>
              </Box>
              <Button
                onClick={() => verifyRequest(userData._id)}
                className="text-capitalize"
                variant="contained"
                color="primary"
                size="small"
              >
                Verify account
              </Button>
            </Grid>
          )}
        <div className="followStatus">
          {/* <hr /> */}
          <div>
            <div className="follow">
              <Typography sx={{ fontWeight: "800" }}>
                {userData.following ? userData.following.length : 0}
              </Typography>
              <Typography sx={{ fontWeight: "500" }}>Following</Typography>
            </div>
            <div className="vl"></div>
            <div className="follow">
              <Typography sx={{ fontWeight: "800" }}>
                {userData.followers ? userData.followers.length : 0}
              </Typography>
              <Typography sx={{ fontWeight: "500" }}>Followers</Typography>
            </div>
          </div>
          {/* <hr /> */}
          <Box
            sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              // variant="scrollable"
              textColor="secondary"
              indicatorColor="secondary"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab
                onClick={() => {
                  setEditOption(false);
                  setStates({ posts: true, about: false, photos: false });
                }}
                sx={{ textTransform: "capitalize" }}
                label="Posts"
              />
              <Tab
                onClick={() => {
                  setEditOption(false);
                  setStates({ posts: false, about: true, photos: false });
                }}
                sx={{ textTransform: "capitalize" }}
                label="About"
              />
              <Tab
                onClick={() => {
                  setEditOption(false);
                  setStates({ posts: false, about: false, photos: true });
                }}
                sx={{ textTransform: "capitalize" }}
                label="Photos"
              />
            </Tabs>
          </Box>
        </div>
        <Box>
          {states.posts &&
            posts.map((post) => {
              return (
                !post.posts.isDeleted && (
                  <Box
                    sx={{
                      border: "2px solid #F0EBEB",
                      padding: "0 0.5rem",
                      margin: "0 1rem 1rem",
                      borderRadius: "10px",
                    }}
                  >
                    <Post
                      getPosts={getPosts}
                      data={post}
                      liked={post.isLiked}
                    />
                  </Box>
                )
              );
            })}
          {states.about && (
            <Box
              sx={{
                border: "2px solid #F0EBEB",
                padding: "0 0.5rem",
                margin: "0 1rem 1rem",
                borderRadius: "10px",
              }}
            >
              <Grid>
                {loggedUserStatus && !editOption && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                      padding: "1rem",
                    }}
                  >
                    <EditIcon
                      onClick={() => setEditOption(true)}
                      sx={{ alignSelf: "right", cursor: "pointer" }}
                    />
                  </Box>
                )}
                {!loggedUserStatus | !editOption ? (
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "1rem",
                      }}
                    >
                      <Typography sx={{ fontWeight: "bold" }}>
                        Full name
                      </Typography>
                      <Typography>{userData.fullName}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "1rem",
                      }}
                    >
                      <Typography sx={{ fontWeight: "bold" }}>
                        Username
                      </Typography>
                      <Typography>{userData.username}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "1rem",
                      }}
                    >
                      <Typography sx={{ fontWeight: "bold" }}>About</Typography>
                      {userData.about ? (
                        <Typography>{userData.about}</Typography>
                      ) : (
                        <Typography>Not added</Typography>
                      )}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "1rem",
                      }}
                    >
                      <Typography sx={{ fontWeight: "bold" }}>
                        Works at
                      </Typography>
                      {userData.worksAt ? (
                        <Typography>{userData.worksAt}</Typography>
                      ) : (
                        <Typography>Not added</Typography>
                      )}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "1rem",
                      }}
                    >
                      <Typography sx={{ fontWeight: "bold" }}>
                        Living in
                      </Typography>
                      {userData.livesIn ? (
                        <Typography>{userData.livesIn}</Typography>
                      ) : (
                        <Typography>Not added</Typography>
                      )}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "1rem",
                      }}
                    >
                      <Typography sx={{ fontWeight: "bold" }}>
                        Relationship status
                      </Typography>
                      {userData.relationship ? (
                        <Typography>{userData.relationship}</Typography>
                      ) : (
                        <Typography>Not added</Typography>
                      )}
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      padding: "1rem",
                    }}
                  >
                    <Box
                      component="form"
                      // onSubmit={formik.handleSubmit}
                      // onSubmit={updateProfileDetails}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "1rem",
                      }}
                    >
                      <Typography sx={{ fontWeight: "bold" }}>
                        Full name
                      </Typography>
                      <TextField
                        // onChange={formik.handleChange}
                        onChange={(e) =>
                          setProfileDetails({ fullName: e.target.value })
                        }
                        name="fullName"
                        id="fullName"
                        autoFocus
                        size="small"
                        // value={formik.values.fullName}
                        defaultValue={userData.fullName}
                      />
                      {/* {formik.touched.fullName && formik.errors.fullName ? (
                        <FormHelperText sx={{ color: "red" }}>
                          {formik.errors.fullName}
                        </FormHelperText>
                      ) : null} */}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "1rem",
                      }}
                    >
                      <Typography sx={{ fontWeight: "bold" }}>
                        Username
                      </Typography>
                      <TextField
                        // onChange={formik.handleChange}
                        onChange={(e) =>
                          setProfileDetails({ username: e.target.value })
                        }
                        name="username"
                        id="username"
                        autoFocus
                        size="small"
                        // value={formik.values.username}
                        defaultValue={userData.username}
                      />
                      {/* {formik.touched.username && formik.errors.username ? (
                        <FormHelperText sx={{ color: "red" }}>
                          {formik.errors.username}
                        </FormHelperText>
                      ) : null} */}
                    </Box>
                    {/* <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "1rem",
                      }}
                    > */}
                    {/* <Typography sx={{ fontWeight: "bold" }}>Email</Typography>
                      <TextField
                        // onChange={formik.handleChange}
                        name="email"
                        id="email"
                        autoFocus
                        size="small"
                        
                        // value={formik.values.email}
                        defaultValue={profileDetails.email}
                      /> */}
                    {/* {formik.touched.email && formik.errors.email ? (
                        <FormHelperText sx={{ color: "red" }}>
                          {formik.errors.email}
                        </FormHelperText>
                      ) : null} */}
                    {/* </Box> */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "1rem",
                      }}
                    >
                      <Typography sx={{ fontWeight: "bold" }}>About</Typography>
                      <TextField
                        // onChange={formik.handleChange}
                        onChange={(e) =>
                          setProfileDetails({ about: e.target.value })
                        }
                        name="about"
                        id="about"
                        autoFocus
                        size="small"
                        // value={formik.values.about}
                        defaultValue={userData.about}
                      />
                      {/* {formik.touched.about && formik.errors.about ? (
                        <FormHelperText sx={{ color: "red" }}>
                          {formik.errors.about}
                        </FormHelperText>
                      ) : null} */}
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "1rem",
                      }}
                    >
                      <Typography sx={{ fontWeight: "bold" }}>
                        Works at
                      </Typography>
                      <TextField
                        // onChange={formik.handleChange}
                        onChange={(e) =>
                          setProfileDetails({ worksAt: e.target.value })
                        }
                        name="worksAt"
                        id="worksAt"
                        autoFocus
                        size="small"
                        // value={formik.values.worksAt}
                        defaultValue={userData.worksAt}
                      />
                      {/* {formik.touched.worksAt && formik.errors.worksAt ? (
                        <FormHelperText sx={{ color: "red" }}>
                          {formik.errors.worksAt}
                        </FormHelperText>
                      ) : null} */}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "1rem",
                      }}
                    >
                      <Typography sx={{ fontWeight: "bold" }}>
                        Living in
                      </Typography>
                      <TextField
                        // onChange={formik.handleChange}
                        onChange={(e) =>
                          setProfileDetails({ livesIn: e.target.value })
                        }
                        name="livesIn"
                        id="livesIn"
                        autoFocus
                        size="small"
                        // value={formik.values.livesIn}
                        defaultValue={userData.livesIn}
                      />
                      {/* {formik.touched.livesIn && formik.errors.livesIn ? (
                        <FormHelperText sx={{ color: "red" }}>
                          {formik.errors.livesIn}
                        </FormHelperText>
                      ) : null} */}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "1rem",
                      }}
                    >
                      <Typography sx={{ fontWeight: "bold" }}>
                        Relationship status
                      </Typography>
                      <TextField
                        onChange={(e) =>
                          setProfileDetails({ relationship: e.target.value })
                        }
                        // onChange={formik.handleChange}
                        name="relationship"
                        id="relationship"
                        autoFocus
                        size="small"
                        // value={formik.values.relationship}
                        defaultValue={userData.relationship}
                      />
                      {/* {formik.touched.relationship &&
                      formik.errors.relationship ? (
                        <FormHelperText sx={{ color: "red" }}>
                          {formik.errors.relationship}
                        </FormHelperText>
                      ) : null} */}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        padding: "1rem",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        // type="submit"
                        onClick={updateProfileDetails}
                        sx={{ textTransform: "capitalize" }}
                        variant="contained"
                        color="primary"
                      >
                        Save
                      </Button>
                    </Box>
                  </Box>
                )}
              </Grid>
            </Box>
          )}
          {states.photos &&
            allPhotos.map((post) => {
              return !post.isDeleted && post.image ? (
                // <Grid className='col-6'>
                <Grid
                  className="col-12"
                  sx={{
                    border: "2px solid #F0EBEB",
                    height: "300px",
                    minHeight: "300px",
                    margin: "1rem 1rem 1rem",
                    borderRadius: "10px",
                    position: "relative",
                    width: "95%",
                    backgroundImage: `url(${post.image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    // display: "inline",
                  }}
                >
                  {loggedUserStatus && (
                    <DeleteIcon
                      sx={{
                        position: "absolute",
                        top: "1px",
                        right: "1px",
                        cursor: "pointer",
                        color: "white",
                      }}
                    />
                  )}
                </Grid>
              ) : // </Grid>
              null;
            })}
        </Box>
      </div>
      <div>
        <input
          style={{ display: "none" }}
          name="myImg"
          onChange={(e) => onProfileChange(e)}
          ref={profilePicRef}
          type="file"
        />
      </div>
      <div>
        <input
          style={{ display: "none" }}
          name="myImg"
          onChange={(e) => onCoverChange(e)}
          ref={coverPicRef}
          type="file"
        />
      </div>
    </>
  );
}

export default Profile;

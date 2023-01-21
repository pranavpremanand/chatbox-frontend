import React from "react";
import "./Post.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { blue, red } from "@mui/material/colors";
import ReportIcon from "@mui/icons-material/Report";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Fade,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useState } from "react";
import UserAPI from "../../../../../APIs/UserAPI";
import { toast } from "react-hot-toast";
import {
  postDelete,
  likePost,
  unlikePost,
  reportPosts,
} from "../../../../../Redux/PostSlice";
import { allComments } from "../../../../../Redux/CommentsSlice";
import { useDispatch, useSelector } from "react-redux";
import TimeAgo from "javascript-time-ago";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

// English.
import en from "javascript-time-ago/locale/en";
import { useNavigate } from "react-router-dom";
import userAPI from "../../../../../APIs/UserAPI";
import {
  loggedUserStatus,
  setUserProfile,
} from "../../../../../Redux/ProfileSlice";
import { Verified as VerifiedIcon } from "@mui/icons-material";

TimeAgo.addDefaultLocale(en);

//Modal style
const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

const Post = ({ data, getPosts }) => {
  const timeAgo = new TimeAgo("en-US");
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [liked, setLiked] = useState(data.isLiked);
  const [likesCount, setLikeCount] = useState(data.posts.likedUsers.length);
  const currentUser = useSelector((state) => state.user.user._id);
  const commentsData = useSelector((state) => state.comments.comments);
  const navigate = useNavigate();
  const [commentBox, setCommentBox] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [reportType, setReportType] = useState("");
  const reportedPosts = useSelector((state) => state.posts.reportedPosts);
  const savedPosts = useSelector((state) => state.savedPosts.savedPosts);
  const [postDeletion,setPostDeletion] = useState(false)
  const [deletePostId,setDeletePostId] = useState(null)

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Delete post
  const deletePost = () => {
    UserAPI.get(`/user/delete-post/${deletePostId}`)
      .then((response) => {
        if (response.data.success) {
          getPosts();
          dispatch(postDelete({ posts: deletePostId }));
          setDeletePostId(null)
          toast(response.data.message, {
            icon: "✅",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        } else {
          toast(response.data.message, {
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
        console.log(err);
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

  const like = (postId) => {
    liked ? setLikeCount((prev) => prev - 1) : setLikeCount((prev) => prev + 1);
    setLiked((prev) => !prev);
    UserAPI.get("/user/like-post/" + postId)
      .then((response) => {
        if (response.data.success) {
          getPosts();
          if (response.data.liked) {
            dispatch(likePost({ postId: postId, userId: currentUser }));
            data.posts.likedUsers.length++;
          } else if (response.data.unliked) {
            data.posts.likedUsers.length--;
            dispatch(unlikePost({ postId: postId, userId: currentUser }));
          }
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const submitComment = (postId) => {
    UserAPI.post("/user/add-comment/" + postId, { comment: commentInput })
      .then((response) => {
        if (response.data.success) {
          setCommentInput("");
          getPosts();
          getComments(postId);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openCommentBox = (postId) => {
    setCommentBox(!commentBox);
    return getComments(postId);
  };

  const getComments = (postId) => {
    UserAPI.get("/user/get-comments/" + postId)
      .then((response) => {
        if (response.data.success) {
          const commentsDetails = response.data.comments.comments;
          dispatch(allComments({ comments: commentsDetails }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Delete comment
  const deleteComment = (commentId, postId) => {
    try {
      UserAPI.get(`/user/delete-comment/${commentId}/${postId}`)
        .then((response) => {
          if (response.data.success) {
            getComments(postId);
            getPosts();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  //Report post
  const reportPost = async (postId) => {
    try {
      const response = await userAPI.post(`/user/report-post`, {
        postId: postId,
        userId: currentUser,
        reportType: reportType,
      });
      if (response.data.success) {
        dispatch(reportPosts(postId));
        setOpenModal(false);
        toast("You reported the post of " + data.fullName, {
          icon: "✅",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
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

  const setProfile = (userId) => {
    userId === currentUser
      ? dispatch(loggedUserStatus(true))
      : dispatch(loggedUserStatus(false));
    dispatch(setUserProfile(userId));
    navigate("/profile");
  };

  const savePost = async (postId) => {
    try {
      const { data } = await userAPI.get(`/user/save-post/${postId}`);
      if (data) {
        getPosts();
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

  return (
    <div className="post" style={{ background: "white", marginTop: "10px" }}>
      <div className="postAndReact">
        <div
          className="detail"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            gap: "0.5rem",
            marginBottom: "0.6rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              onClick={() => setProfile(data._id)}
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
                cursor: "pointer",
              }}
            >
              <Avatar
                sx={{ width: 50, height: 50 }}
                src={data.profilePic}
                alt={data.fullName}
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                  sx={{ display: "flex", gap: "0.2rem", alignItems: "center" }}
                >
                  <Typography>
                    <b>{data.fullName}</b>
                  </Typography>
                  {data.verifiedUser && (
                    <VerifiedIcon
                      sx={{ color: blue[600] }}
                      color={blue[600]}
                      fontSize="xsmall"
                    />
                  )}
                </Box>
                <Typography>{"@" + data.username}</Typography>
                <Typography sx={{ fontSize: "12px" }}>
                  {timeAgo.format(new Date(data.posts.createdAt))}
                </Typography>
              </Box>
            </Box>

            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {currentUser === data._id && (
              <MenuItem
                onClick={() => {setPostDeletion(true);setDeletePostId(data.posts._id);}}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <DeleteIcon sx={{ mr: 5 }} /> <Typography>Delete</Typography>
              </MenuItem>
            )}
            {!data.reported &&
              data._id !== currentUser &&
              !reportedPosts.includes(data.posts._id) && (
                <MenuItem
                  onClick={() => setOpenModal(true)}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <ReportIcon sx={{ mr: 5 }} /> <Typography>Report</Typography>
                </MenuItem>
              )}
            <Divider />
            {!savedPosts.some(
              (postData) => postData.post._id === data.posts._id
            ) ? (
              <MenuItem
                onClick={() => savePost(data.posts._id)}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <BookmarkBorderIcon sx={{ mr: 5 }} />{" "}
                <Typography>Save</Typography>
              </MenuItem>
            ) : (
              <MenuItem
                onClick={() => savePost(data.posts._id)}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <BookmarkIcon sx={{ mr: 5 }} /> <Typography>Unsave</Typography>
              </MenuItem>
            )}
          </Menu>
          <Box>
            <Typography sx={{ fontWeight: "500" }}>
              {data.posts.description}
            </Typography>
          </Box>
        </div>
        <img
          src={data.posts.image}
          style={{ maxHeight: "450px" }}
          width=""
          alt=""
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="postReact">
            {liked ? (
              <Box
                sx={{ display: "flex", gap: "0.3rem" }}
                onClick={() => {
                  like(data.posts._id);

                  // setLike(like ? false : true);
                }}
              >
                <FavoriteIcon sx={{ color: red[500] }} />
                <Typography>
                  {likesCount === 0
                    ? null
                    : likesCount === 1
                    ? likesCount + " Like"
                    : likesCount + " Likes"}
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{ display: "flex", gap: "0.3rem" }}
                onClick={() => {
                  like(data.posts._id);
                }}
              >
                <FavoriteBorderIcon />
                <Typography>
                  {likesCount === 0
                    ? null
                    : likesCount === 1
                    ? likesCount + " Like"
                    : likesCount + " Likes"}
                </Typography>
              </Box>
            )}
            <Box sx={{ display: "flex", gap: "0.3rem" }}>
              <CommentIcon onClick={() => openCommentBox(data.posts._id)} />
              <Typography>
                {data.posts.comments.length === 0
                  ? null
                  : data.posts.comments.length}
              </Typography>
            </Box>
            {/* <ShareIcon /> */}
          </div>
        </div>
        {commentBox && (
          <div>
            <Divider sx={{ marginTop: "1rem" }} />
            <div className="commentDiv">
              <Avatar src={data.profilePic} alt={data.fullName} />
              <input
                value={commentInput}
                className="commentBox"
                placeholder="Comment here..."
                required
                onChange={(e) => setCommentInput(e.target.value)}
              />
              {commentInput !== "" && (
                <Button
                  onClick={() => submitComment(data.posts._id)}
                  variant="contained"
                  sx={{
                    textTransform: "capitalize",
                    backgroundColor: blue[600],
                  }}
                  size="small"
                  className="btn btn-sm text-white"
                >
                  Comment
                </Button>
              )}
            </div>
            <div>
              {commentsData.map((val) => {
                return (
                  <Box
                    sx={{
                      border: "1px solid none",
                      background: "rgb(240,240,250)",
                      padding: "10px",
                      borderRadius: "10px",
                      margin: "10px",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box sx={{ display: "flex", gap: "1rem" }}>
                        <Typography
                          sx={{ fontWeight: "bold", fontSize: "14px" }}
                        >
                          @{val.userId.username}
                        </Typography>
                      </Box>
                      <Typography sx={{ fontSize: "11px" }}>
                        {timeAgo.format(new Date(val.date))}
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography sx={{ fontSize: "15px" }}>
                        {val.content}
                      </Typography>
                      {(data.posts.userId === currentUser) |
                        (val.userId._id === currentUser) && (
                        <DeleteIcon
                          onClick={() => deleteComment(val._id, data.posts._id)}
                          sx={{ fontSize: "15px", cursor: "pointer" }}
                        />
                      )}
                    </Box>
                  </Box>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <Modal aria-labelledby="" aria-describedby="" open={openModal}>
        <Fade in={openModal}>
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px",
              }}
            >
              <Typography id="" variant="h6" component="h2">
                Why are you reporting this post?
              </Typography>
              <CancelPresentationIcon
                sx={{ cursor: "pointer" }}
                onClick={() => setOpenModal(false)}
              />
            </Box>
            <Divider />
            <FormControl>
              <RadioGroup
                onChange={(e) => setReportType(e.target.value)}
                aria-labelledby=""
                defaultValue=""
                name=""
              >
                <FormControlLabel
                  value="It's spam"
                  control={<Radio />}
                  label="It's spam"
                />
                <FormControlLabel
                  value="I just don't like it"
                  control={<Radio />}
                  label="I just don't like it"
                />
                <FormControlLabel
                  value="Hate speech or symbols"
                  control={<Radio />}
                  label="Hate speech or symbols"
                />
                <FormControlLabel
                  value="Scam or fraud"
                  control={<Radio />}
                  label="Scam or fraud"
                />
                <FormControlLabel
                  value="Nudity or sexual activity"
                  control={<Radio />}
                  label="Nudity or sexual activity"
                />
                <FormControlLabel
                  value="Bullying or harassment"
                  control={<Radio />}
                  label="Bullying or harassment"
                />
              </RadioGroup>
            </FormControl>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              {reportType !== "" && (
                <Button
                  onClick={() => reportPost(data.posts._id)}
                  className="text-capitalize"
                  size="medium"
                  variant="contained"
                  color="primary"
                >
                  Submit report
                </Button>
              )}
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Dialog
        open={postDeletion}
        onClose={() => setPostDeletion(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete post"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete the post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className="text-capitalize"
            variant="contained"
            color="error"
            onClick={() => deletePost()}
          >
            Delete
          </Button>
          <Button
            className="text-capitalize"
            variant="outlined"
            color="primary"
            onClick={() => setPostDeletion(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Post;

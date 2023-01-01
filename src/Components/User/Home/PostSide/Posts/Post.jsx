import React from "react";
import "./Post.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { red } from "@mui/material/colors";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useState } from "react";
import axios from "../../../../../APIs/axios";
import { toast } from "react-hot-toast";
import { postDelete } from "../../../../../Redux/PostSlice";
import { allComments } from "../../../../../Redux/CommentsSlice";
import { useDispatch, useSelector } from "react-redux";
import TimeAgo from 'javascript-time-ago'
// import { format } from "timeago.js";

// English.
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

const Post = ({ data, liked, getPosts }) => {
  const timeAgo = new TimeAgo('en-US')
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const currentUser = useSelector((state) => state.user.user._id);
  const commentsData = useSelector((state) => state.comments.comments);

  const [commentBox, setCommentBox] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [like, setLike] = useState(liked);
  const [likeCount, setLikeCount] = useState(data.posts.likedUsers.length);
  const [commentsDeleter, setCommentsDeleter] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Delete post
  const deletePost = (id) => {
    axios
      .get(`/user/delete-post/${id}`)
      .then((response) => {
        if (response.data.success) {
          getPosts();
          dispatch(postDelete({ posts: id }));
          toast(response.data.message, {
            // icon: "✔",
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

  const likePost = (postId) => {
    axios
      .get("/user/like-post/" + postId)
      .then((response) => {
        if (response.data.success) {
          setLike(like ? false : true);
          if (response.data.liked) {
            setLikeCount(likeCount + 1);
            // dispatch(reduxLike(postId));
          } else if (response.data.unliked) {
            setLikeCount(likeCount - 1);
            // dispatch(reduxUnlike(postId));
          }
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const submitComment = (postId) => {
    axios
      .post("/user/add-comment/" + postId, { comment: commentInput })
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
    console.log("HELLLLLLLLLLL");
    axios
      .get("/user/get-comments/" + postId)
      .then((response) => {
        if (response.data.success) {
          if (response.data.comments.userId === currentUser) {
            setCommentsDeleter(true);
          } else {
            setCommentsDeleter(false);
          }
          const commentsDetails = response.data.comments.comments;
          console.log(commentsDetails, "COMMENTSDATA");
          // dispatch(nullComments())
          dispatch(allComments({ comments: commentsDetails }));
          // setComments(response.data.comments.comments);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Delete comment
  const deleteComment = (commentId, postId) => {
    try {
      axios
        .get(`/user/delete-comment/${commentId}/${postId}`)
        .then((response) => {
          if (response.data.success) {
            getComments(postId);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const [dotOptions, setDotOptions] = useState({ options: false, save: true });

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
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              {data.profilePic ? (
                <div
                  className="profile"
                  style={{
                    backgroundImage: `url(${data.profilePic})`,
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
                      borderRadius: "50%",
                      color: "white",
                    }}
                  />
                </div>
              )}
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography>
                  <b>{data.fullName}</b>
                </Typography>
                <Typography>{"@" + data.username}</Typography>
                {/* <Typography sx={{fontSize:'12px'}}>{format(data.posts.createdAt)}</Typography> */}
                <Typography sx={{fontSize:'12px'}}>{timeAgo.format(new Date( data.posts.createdAt))}</Typography>
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
            {currentUser === data._id &&
              <MenuItem
              onClick={() => deletePost(data.posts._id)} 
              sx={{ display: "flex", justifyContent: "space-between" }}
              >
              <DeleteIcon sx={{ mr: 5 }} /> <Typography>Delete</Typography>
            </MenuItem>
            }

            <Divider />
            {dotOptions.save ? (
              <MenuItem
                onClick={() => setDotOptions({ save: false })}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <BookmarkBorderIcon sx={{ mr: 5 }} />{" "}
                <Typography>Save</Typography>
              </MenuItem>
            ) : (
              <MenuItem
                onClick={() => setDotOptions({ save: true })}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <BookmarkIcon sx={{ mr: 5 }} />{" "}
                <Typography>Remove from saved</Typography>
              </MenuItem>
            )}
          </Menu>
          <Box>
            <Typography sx={{ fontWeight: "500" }}>
              {data.posts.description}
            </Typography>
          </Box>
        </div>
        <img src={data.posts.image} width="" alt="" />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="postReact">
            {like ? (
              <Box
                sx={{ display: "flex", gap: "0.3rem" }}
                onClick={() => {
                  likePost(data.posts._id);

                  // setLike(like ? false : true);
                }}
              >
                <FavoriteIcon sx={{ color: red[500] }} />
                <Typography>
                  {likeCount === 0 ? null : likeCount + " Likes"}
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{ display: "flex", gap: "0.3rem" }}
                onClick={() => {
                  likePost(data.posts._id);
                }}
              >
                <FavoriteBorderIcon />
                <Typography>
                  {likeCount === 0 ? null : likeCount + " Likes"}
                </Typography>
              </Box>
            )}
            <Box
                sx={{ display: "flex", gap: "0.3rem" }}
              >
                <CommentIcon onClick={() => openCommentBox(data.posts._id)} />
                <Typography>
                  {data.posts.comments.length === 0 ? null : data.posts.comments.length}
                </Typography>
              </Box>
            {/* <ShareIcon /> */}
          </div>
        </div>
        {commentBox && (
          <div>
            <Divider sx={{ marginTop: "1rem" }} />
            <div className="commentDiv">
              {data.profilePic ? (
                <div
                  className="commentProfile"
                  style={{
                    backgroundImage: `url(${data.profilePic})`,
                  }}
                ></div>
              ) : (
                <div
                  className="commentProfile"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "5px",
                  }}
                >
                  <Avatar
                    sx={{
                      fontSize: "small",
                      alignSelf: "center",
                      borderRadius: "50%",
                      color: "white",
                    }}
                  />
                </div>
              )}
              <input
                value={commentInput}
                className="commentBox"
                placeholder="Comment here..."
                required
                onChange={(e) => setCommentInput(e.target.value)}
              />
              <Button
                onClick={() => submitComment(data.posts._id)}
                variant="contained"
                sx={{ textTransform: "capitalize" }}
                color="secondary"
              >
                Comment
              </Button>
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
                      <Box sx={{ display: "flex",gap:'1rem' }}>
                        {/* {val.userId.profilePic ? (
                          <div
                            className="commentProfile"
                            style={{
                              backgroundImage: `url(${data.profilePic})`,
                            }}
                          ></div>
                        ) : (
                          <div
                            className="commentProfile"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              padding: "5px",
                            }}
                          >
                            <Avatar
                              sx={{
                                // fontSize: "10px",
                                alignSelf: "center",
                                borderRadius: "50%",
                                color: "white",
                              }}
                            />
                          </div>
                        )} */}
                        <Typography
                          sx={{ fontWeight: "bold", fontSize: "14px" }}
                        >
                          @{val.userId.username}
                        </Typography>
                      </Box>
                      <Typography sx={{ fontSize: "11px" }}>
                        {/* {format(val.date)} */}
                        {timeAgo.format(new Date( val.date))}
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography sx={{ fontSize: "15px" }}>
                        {val.content}
                      </Typography>
                      {!commentsDeleter && (
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
    </div>
  );
};

export default Post;

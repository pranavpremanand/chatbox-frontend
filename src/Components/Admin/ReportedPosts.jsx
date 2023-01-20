import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  ImageListItem,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import adminAPI from "../../APIs/AdminAPI";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import Paper from "@mui/material/Paper";
import { toast } from "react-hot-toast";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#ffff",
  width: "50%",
  minWidth: 100,
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

const ReportedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [reports, setReports] = useState([]);
  const [postId, setPostId] = useState("");
  const [open, setOpen] = useState(false);
  const [openConfirmation, setConfirmation] = useState(false);
  const [ignoreConfirmation, setIgnoreConfirmation] = useState(false);
  const openReportsModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  useEffect(() => {
    getReportedPosts();
  }, []);

  const getReportedPosts = async () => {
    try {
      const { data } = await adminAPI.get("/admin/reported-posts");
      setPosts(data);
      console.log(data, "DATA");
    } catch (err) {
      console.log(err);
    }
  };

  //Delete post
  const deletePost = async () => {
    try {
      await adminAPI.get(`/admin/delete-post/${postId}`);
      setPostId("");
      getReportedPosts();
      setConfirmation();
      toast("Post delete successfully", {
        icon: "✅",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (err) {
      toast("Something went wrong", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  //Ignore post
  const ignorePost = async () => {
    try {
      await adminAPI.get(`/admin/ignore-post/${postId}`);
      setPostId("");
      getReportedPosts();
      setIgnoreConfirmation();
      toast("Post ignored", {
        icon: "✅",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (err) {
      toast("Something went wrong", {
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
    <Fragment>
      {/* <Typography
        className="text-center"
        variant="h5"
        sx={{ fontWeight: "bold", marginBottom: "20px" }}
      >
        Reported Posts
      </Typography> */}
      {posts.map((post) => (
        <Box>
          <ImageListItem
            key={post.postId?.image}
            sx={{
              marginBottom: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            <Box
              style={{
                backgroundImage: `url(${post.postId?.image})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                marginBottom: "0.2rem",
                border: "1px solid purple",
                borderRadius: "20px",
                maxWidth: "50%",
                maxHeight: 500,
                minWidth: 250,
                minHeight: 250,
                overflow: "hidden",
              }}
              alt=""
              loading="lazy"
            />
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Box>
                <Button
                  onClick={() => {
                    setIgnoreConfirmation(true);
                    setPostId(post.postId._id);
                  }}
                  className="text-capitalize"
                  variant="contained"
                  color="primary"
                >
                  Ignore
                </Button>
              </Box>
              <Box>
                <Button
                  className="text-capitalize"
                  onClick={() => {
                    openReportsModal();
                    setReports(post.reports);
                  }}
                  variant="contained"
                  color="warning"
                >
                  Reports
                </Button>
              </Box>
              <Box>
                <Button
                  onClick={() => {
                    setConfirmation(true);
                    setPostId(post.postId._id);
                  }}
                  className="text-capitalize"
                  variant="contained"
                  color="error"
                >
                  Remove post
                </Button>
              </Box>
            </Box>
          </ImageListItem>
        </Box>
      ))}

      {/* Reports table */}
      <Modal aria-labelledby="" aria-describedby="" open={open}>
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <Typography
              className="text-center"
              sx={{ fontWeight: "500" }}
              id=""
              variant="h5"
              component="h2"
            >
              Report details
            </Typography>
            <CancelPresentationIcon
              sx={{ cursor: "pointer" }}
              onClick={() => closeModal(false)}
            />
          </Box>
          <Divider color="black" sx={{ height: 1 }} />
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Report type</TableCell>
                  <TableCell align="right">Reported by</TableCell>
                  <TableCell align="right">Reported on</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.map((report) => (
                  <TableRow
                    key={report.type}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {report.type}
                    </TableCell>
                    <TableCell align="right" component="th" scope="row">
                      {report.userId?.fullName}
                    </TableCell>
                    <TableCell align="right" component="th" scope="row">
                      {report.date}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>

      {/* Delete post confirmation dialog */}
      <Dialog
        open={openConfirmation}
        onClose={() => setConfirmation(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete post"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete this post?
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
            onClick={() => setConfirmation(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Ignore post confirmation dialog */}
      <Dialog
        open={ignoreConfirmation}
        onClose={() => setIgnoreConfirmation(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Ignore post"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to ignore this reported post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className="text-capitalize"
            variant="contained"
            color="primary"
            onClick={() => ignorePost()}
          >
            Ignore
          </Button>
          <Button
            className="text-capitalize"
            variant="outlined"
            color="primary"
            onClick={() => setIgnoreConfirmation(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ReportedPosts;

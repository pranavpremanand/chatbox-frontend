import React, { Fragment, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import adminAPI from "../../../APIs/AdminAPI";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { toast } from "react-hot-toast";
import { Verified } from "@mui/icons-material";
import { blue } from "@mui/material/colors";

export const UsersList = () => {
  const [open, setOpen] = useState(false);
  const [userToBlock, setUserToBlock] = useState("");
  const [users, setUsers] = useState([]);

  const handleClickOpen = (userId) => {
    setUserToBlock(userId);
    setOpen(true);
  };

  const handleClose = () => {
    setUserToBlock("");
    setOpen(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await adminAPI.get("/admin/get-users");
      setUsers(response.data.users);
      localStorage.setItem("adminData", response.data.admin);
    } catch (err) {
      console.log(err);
    }
  };
  const blockUser = async () => {
    try {
      const { data } = await adminAPI.get(`/admin/block-user/${userToBlock}`);
      if (data.blocked) {
        toast("Blocked user successfully", {
          icon: "✅",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        handleClose();
        getData();
      } else {
        toast("Unblocked user successfully", {
          icon: "✅",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        handleClose();
        getData();
      }
      handleClose();
    } catch (err) {
      toast("Something went wrong, try again.", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      handleClose();
      console.log(err);
    }
  };

  //Accept verification request
  const acceptVerificationRequest = async (userId) => {
    try {
      const { data } = await adminAPI.get(
        `/admin/accept-verification-request/${userId}`
      );
      if (data) {
        toast("User verified", {
          icon: "✅",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        getData();
      }
    } catch (err) {
      toast("Something went wrong, try again.", {
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Profile</TableCell>
              <TableCell>Full name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Block/Unblock</TableCell>
              <TableCell align="left">Verification request</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.username}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Avatar src={user.profilePic} alt="" />
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.fullName}
                  {user.verifiedUser && (
                    <Verified sx={{ color: blue[600] }} fontSize="xsmall" />
                  )}
                </TableCell>
                <TableCell align="left">{user.email}</TableCell>
                {user.isActive ? (
                  <TableCell align="left">
                    <Button
                      color="success"
                      size="small"
                      variant="contained"
                      sx={{ color: "white", fontWeight: "400" }}
                    >
                      Block
                    </Button>
                  </TableCell>
                ) : (
                  <TableCell align="left">
                    <Button
                      onClick={() => handleClickOpen(user._id)}
                      color="error"
                      size="small"
                      variant="contained"
                      sx={{ color: "white", fontWeight: "400" }}
                    >
                      Unblock
                    </Button>
                  </TableCell>
                )}
                {user.verificationRequest ? (
                  <TableCell align="left">
                    <Button
                      onClick={() => acceptVerificationRequest(user._id)}
                      size="small"
                      color="primary"
                      variant="contained"
                      sx={{ fontWeight: "400" }}
                    >
                      Accept verification request
                    </Button>
                  </TableCell>
                ) : user.verifiedUser ? (
                  <TableCell align="left">User Verified</TableCell>
                ) : (
                  <TableCell align="left">User not verified</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm action"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure about it?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={blockUser} autoFocus>
            Yes, Do it
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

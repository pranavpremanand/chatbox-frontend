import React, { useState } from "react";
import "../LoginSignup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  // Avatar,
  TextField,
  Grid,
  Link,
  Button,
  FormHelperText,
  Divider,
  Modal,
} from "@mui/material";
// import { Person } from "@mui/icons-material";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple, teal } from "@mui/material/colors";
import * as Yup from "yup";
import {
  useFormik,
  // Formik
} from "formik";
import { changePassword, user } from "../../../Redux/UserSlice";
import { useDispatch } from "react-redux";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#ffff",
  width: 300,
  // minWidth:100,
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  usernameOrEmail: "",
  password: "",
};
const validationSchema = Yup.object({
  usernameOrEmail: Yup.string()
    // .email("Invalid Format")
    .min(3, "Enter a valid email or username")
    .required("This field is required"),

  password: Yup.string()
    .required("This field is required")
    .min(6, "Enter your correct password")
    .max(16, "Enter your correct password"),
});

const forgotPasswordSchema = {
  email: "",
};
//Forgot password validation schema
const forgotPasswordValidation = Yup.object({
  email: Yup.string()
    .email("Invalid Format")
    .matches(
      /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/,
      "Enter a valid email address"
    )
    .required("This field is required"),
});

function Login() {
  const dispatch = useDispatch();
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpField, setOtpField] = useState(false);
  //Send OTP
  const forgotPassword = useFormik({
    initialValues: forgotPasswordSchema,
    onSubmit: async (values) => {
      try {
        if (otp === "") {
          const response = await axios.post("/user/otp-login", values);
          if (response.data.message === "OTP sent") {
            toast("OTP sent to your email", {
              icon: "✅",
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
            });
            setOtpField(true);
            setOtp(response.data.response.otp);
          } else {
            toast(response.data.message, {
              icon: "⚠️",
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
            });
          }
          // } else if (otp !== "") {
          //   toast("OTP already has been sent", {
          //     icon: "⚠️",
          //     style: {
          //       borderRadius: "10px",
          //       background: "#333",
          //       color: "#fff",
          //     },
          //   });
        } else if (otp === values.otp) {
          values.loginWithOtp = true;
          login(values);
        } else {
          toast("Entered OTP is incorrect", {
            icon: "❌",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }
      } catch (err) {
        console.log("forgot password error", err);
      }
    },
    validationSchema: forgotPasswordValidation,
  });

  //Login
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      login(values);
    },
    validationSchema,
  });

  const login = (values) => {
    try {
      axios({
        url: "/user/login",
        method: "post",
        data: values,
      })
      .then((response) => {
          if (response.data.success) {
            if (response.data.otpLoginSuccess) {
              dispatch(changePassword(true))
              setOtpField(false);
            }
            dispatch(user({ user: response.data.user }));
            localStorage.setItem("userToken", response.data.accessToken);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/");
          } else {
            toast(response.data.message, {
              icon: "⚠️",
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
          toast("Something went wrong. Try again.", {
            icon: "❌",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        });
    } catch (err) {
      console.log("LOGIN ERROR", err);
    }
  };
  const navigate = useNavigate();
  const theme = createTheme({
    palette: {
      // mode: "dark",
      primary: {
        main: teal[900],
        mainGradient: "linear-gradient(to right, tomato, cyan)",
      },
      secondary: {
        main: "#f44336",
      },
      background: {
        // default: "#e4f0e2"
        default:
          // '#051937',
          // '#004d7a',
          //  '#008793',
          //  '#00bf72',
          //  '#a8eb12'
          purple[100],
      },
    },
  });
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" sx={{ maxHeight: "100vh" }}>
          <CssBaseline />
          <Box
            sx={{
              // marginTop: 8,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div className="Blur" style={{ top: "-18%", right: "0" }}></div>
            <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
            <Box sx={{ display: "flex", alignSelf: "center" }}>
              <ForumRoundedIcon
                sx={{ m: 1, color: "black", alignSelf: "center", fontSize: 50 }}
              />
              <Typography
                component="h1"
                variant="h4"
                sx={{ fontWeight: 800, alignSelf: "center", color: "black" }}
              >
                Chatbox
              </Typography>
            </Box>
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontWeight: 500, alignSelf: "start" }}
            >
              Login
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
              <TextField
                name="usernameOrEmail"
                fullWidth
                id="usernameOrEmail"
                label="Email / @username"
                autoFocus
                sx={{ marginTop: 1 }}
                onChange={formik.handleChange}
                value={formik.values.usernameOrEmail}
              />
              {formik.touched.usernameOrEmail &&
              formik.errors.usernameOrEmail ? (
                <FormHelperText sx={{ color: "red" }}>
                  {formik.errors.usernameOrEmail}
                </FormHelperText>
              ) : null}

              <TextField
                fullWidth
                type="password"
                name="password"
                id="password"
                label="Password"
                autoFocus
                sx={{ marginTop: 1 }}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <FormHelperText sx={{ color: "red" }}>
                  {formik.errors.password}
                </FormHelperText>
              ) : null}

              <Button
                variant="contained"
                type="submit"
                // variant="contained"
                sx={{ mt: 2, mb: 2 }}
                fullWidth
              >
                Login
              </Button>
            </Box>
          </Box>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Link
                sx={{ cursor: "pointer" }}
                onClick={() => setForgotPasswordModal(true)}
                variant="body2"
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/signup")}
                variant="body2"
              >
                Create a new account
              </Link>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
      <Modal aria-labelledby="" aria-describedby="" open={forgotPasswordModal}>
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              // alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <Typography sx={{ fontWeight: "500" }} id="">
              Forgot password?
            </Typography>
            <CancelPresentationIcon
              sx={{ cursor: "pointer" }}
              onClick={() => setForgotPasswordModal(false)}
            />
          </Box>
          <Box component="form" onSubmit={forgotPassword.handleSubmit}>
            <TextField
              name="email"
              fullWidth
              placeholder="Enter your email here"
              id="email"
              label="Email"
              autoFocus
              sx={{ marginTop: 1 }}
              onChange={forgotPassword.handleChange}
              value={forgotPassword.values.email}
            />
            {forgotPassword.touched.email && forgotPassword.errors.email ? (
              <FormHelperText sx={{ color: "red" }}>
                {forgotPassword.errors.email}
              </FormHelperText>
            ) : null}
            {!otpField ? (
              <Button
                variant="contained"
                type="submit"
                sx={{ mt: 2, mb: 2 }}
                fullWidth
                className="text-capitalize"
              >
                Send OTP
              </Button>
            ) : (
              <>
                <TextField
                  name="otp"
                  size="small"
                  // value={OTPcheck}
                  sx={{ marginTop: 1 }}
                  required
                  // value={otp}
                  // onChange={(event) => {setOTPCheck(event.target.value)}}
                  value={forgotPassword.values.otp}
                  onChange={forgotPassword.handleChange}
                  type="text"
                  id="otp"
                  variant="outlined"
                  label="Enter OTP sent to your email"
                  fullWidth
                  placeholder="OTP"
                  // className={classes.textfield}
                />
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ mt: 2, mb: 2 }}
                  fullWidth
                  className="text-capitalize"
                >
                  Enter OTP To Login
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default Login;

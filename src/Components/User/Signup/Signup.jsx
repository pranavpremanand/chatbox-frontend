import * as React from "react";
import "../LoginSignup.css";
// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import toast from "react-hot-toast";
// import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import {
  // Formik,
  useFormik,
} from "formik";
import * as Yup from "yup";
import { FormHelperText } from "@mui/material";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import axios from "axios";

const theme = createTheme({
  palette: {
    // mode: "dark",
    primary: {
      main: purple[900],
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
const initialValues = {
  fullName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const validationSchema = Yup.object({
  fullName: Yup.string()
    .required("This field is required")
    .min(3, "Full name must need minimum 3 characters")
    .max(16, "Maximum 16 characters are permitted")
    .matches(/^[A-Za-z\s]+(\s*[A-Za-z]+)*$/, "Only alphabets are allowed"),

  username: Yup.string()
    .matches(/^\S*$/, "No spaces are allowed")
    .matches(/^[a-z0-9_-]{3,16}$/, "Valid username is required")
    .required("This field is required")
    .min(3, "Username must need minimum 3 characters")
    .max(16, "Maximum 16 characters are permitted"),

  email: Yup.string()
    .email("Invalid Format")
    .matches(
      /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/,
      "Enter a valid email address"
    )
    .required("This field is required"),

  password: Yup.string()
    .required("This field is required")
    .min(6, "Minimum 6 characters are required")
    .max(16, "Maximum 16 characters are permitted"),

  confirmPassword: Yup.string()
    .required("This field is required")
    .oneOf([Yup.ref("password"), null], "Password must be same as above"),
});

export default function SignUp() {
  const [otp, setOtp] = React.useState("");
  const navigate = useNavigate();
  const [signUp, setSignUp] = React.useState(false);
  // const [otpError, setOtpError] = React.useState(false);
  const [otpField, setOtpField] = React.useState(false);
  
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      try {
        if (otp === "") {
          console.log(values);
          axios({
            url: "/user/send-otp",
            method: "post",
            data: values,
          }).then((response) => {
            console.log(response.data);
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
              setSignUp(true)
              setOtp(response.data.response.otp);
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
          });
        } else if (otp !== "" && !signUp) {
          toast("OTP already has been sent", {
            icon: "⚠️",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        } else if (otp === values.otp) {
          axios
            .post("/user/signup", values)
            .then((response) => {
              if (response.data.message === "Account created successfully.") {
                toast(response.data.message, {
                  icon: "✅",
                  style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                  },
                });
              setOtpField(false);
                navigate("/login");
              } else if (
                response.data.message === "Username already exist" ||
                "Email already exist"
              ) {
                toast(response.data.message, {
                  // icon: "❗",
                  icon: "⚠️",
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
              console.log(err, "ERROR");
            });
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
        toast("Something went wrong. Try again.", {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    },
    validationSchema,
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
        <Container
          component="main"
          maxWidth="xs"
          sx={{ maxHeight: "100vh", mb: 4 }}
        >
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
            <div className="blur" style={{ top: "60%", left: "-8rem" }}></div>
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
              Signup
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
              <TextField
                name="fullName"
                fullWidth
                id="fullName"
                label="Full Name"
                autoFocus
                onChange={formik.handleChange}
                value={formik.values.fullName}
                sx={{ marginTop: 1 }}
              />
              {formik.touched.fullName && formik.errors.fullName ? (
                <FormHelperText sx={{ color: "red" }}>
                  {formik.errors.fullName}
                </FormHelperText>
              ) : null}

              <TextField
                name="username"
                fullWidth
                id="username"
                label="Username"
                autoFocus
                onChange={formik.handleChange}
                value={formik.values.username}
                sx={{ marginTop: 1 }}
              />
              {formik.touched.username && formik.errors.username ? (
                <FormHelperText sx={{ color: "red" }}>
                  {formik.errors.username}
                </FormHelperText>
              ) : null}

              <TextField
                name="email"
                fullWidth
                id="email"
                label="Email"
                autoFocus
                onChange={formik.handleChange}
                value={formik.values.email}
                sx={{ marginTop: 1 }}
              />
              {formik.touched.email && formik.errors.email ? (
                <FormHelperText sx={{ color: "red" }}>
                  {formik.errors.email}
                </FormHelperText>
              ) : null}

              <TextField
                name="password"
                type="password"
                fullWidth
                id="password"
                label="Password"
                autoFocus
                onChange={formik.handleChange}
                value={formik.values.password}
                sx={{ marginTop: 1 }}
              />
              {formik.touched.password && formik.errors.password ? (
                <FormHelperText sx={{ color: "red" }}>
                  {formik.errors.password}
                </FormHelperText>
              ) : null}

              <TextField
                name="confirmPassword"
                type="password"
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                autoFocus
                onChange={formik.handleChange}
                sx={{ marginTop: 1 }}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <FormHelperText sx={{ color: "red" }}>
                  {formik.errors.confirmPassword}
                </FormHelperText>
              ) : null}
              {otpField ? (
                <TextField
                  name="otp"
                  size="small"
                  // value={OTPcheck}
                  sx={{ marginTop: 1 }}
                  // value={otp}
                  // onChange={(event) => {setOTPCheck(event.target.value)}}
                  value={formik.values.otp}
                  onChange={formik.handleChange}
                  type="text"
                  id="otp"
                  variant="outlined"
                  label="Enter OTP sent to your email"
                  fullWidth
                  placeholder="OTP"
                  // className={classes.textfield}
                />
              ) : null}
              {otpField ? (
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ mt: 2, mb: 2 }}
                  fullWidth
                >
                  Enter OTP and Signup
                </Button>
              ) : (
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ mt: 2, mb: 2 }}
                  fullWidth
                >
                  Continue to Verify Email
                </Button>
              )}
            </Box>
          </Box>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" onClick={() => navigate("/login")} variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
      {/* </Formik> */}
    </div>
  );
}

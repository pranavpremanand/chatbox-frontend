import React, { useEffect } from "react";
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
import {user} from '../../../Redux/UserSlice'
import { useDispatch, useSelector } from "react-redux";


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

function Login() {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      try {
        axios({
          url: "/api/user/login",
          method: "post",
          data: values,
        })
          .then((response) => {
            console.log(response.data);
            if (response.data.success) {
              // console.log("USER",response.data.user)
              dispatch(user({user:response.data.user}))
              localStorage.setItem("userToken", response.data.accessToken);
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
        console.log("LOGIN ERROR", err)
      }
    },
    validationSchema,
  });
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
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                href="#"
                onClick={() => navigate("/signup")}
                variant="body2"
              >
                Create a new account
              </Link>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Login;
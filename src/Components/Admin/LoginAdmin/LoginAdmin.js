import React from "react";
import "./LoginAdmin.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Grid,
  Link,
  Button,
  FormHelperText,
} from "@mui/material";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import * as Yup from "yup";
import { useFormik } from "formik";
import adminBaseURL from "../../../APIs/AdminBaseAPI";

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

function LoginAdmin() {
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      try {
        adminBaseURL({
          url: "/admin/login",
          method: "post",
          data: values,
        })
          .then((response) => {
            console.log(response.data);
            if (response.data.success) {
              localStorage.setItem("adminToken", response.data.accessToken);
              navigate("/admin/users");
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
            console.log("ERROR", err);
            toast("Something went wrong. Try again.", {
              icon: "❌",
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
            });
          });
      } catch (err) {}
    },
    validationSchema,
  });
  const navigate = useNavigate();
  const theme = createTheme({
    palette: {
      // mode: "dark",
      primary: {
        main: purple[800],
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
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div className="Blr" style={{ top: "-18%", right: "0" }}></div>
            <div className="blr" style={{ top: "36%", left: "-8rem" }}></div>
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
              Admin Login
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
              <TextField
                name="usernameOrEmail"
                fullWidth
                id="usernameOrEmail"
                label="Email / Username"
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
                sx={{ mt: 2, mb: 2 }}
                fullWidth
              >
                Login
              </Button>
            </Box>
          </Box>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link onClick={() => navigate("/login")} variant="body2">
                User login here
              </Link>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default LoginAdmin;

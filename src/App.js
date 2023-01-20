import { Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import AdminLogin from "./Pages/Admin/AdminLogin";
import Home from "./Pages/User/Home/Home";
import Login from "./Pages/User/Login";
import Signup from "./Pages/User/Signup";
import { Toaster } from "react-hot-toast";
import AdminProtectedRoute from "./Components/Admin/AdminAuth/AdminProtectedRoute";
import UserProtectedRoute from "./Components/User/UserAuth/UserProtectedRoute";
import AdminPublicRoute from "./Components/Admin/AdminAuth/AdminPublicRoute";
import UserPublicRoute from "./Components/User/UserAuth/UserPublicRoute";
import { Box } from "@mui/material";
import ProfilePage from "./Pages/User/Profile/ProfilePage";
import Chat from "./Pages/User/Chat/Chat";
import Notifications from "./Pages/User/Notifications/Notifications";
import UsersSide from "./Pages/Admin/UsersSide";
import ReportedPosts from "./Pages/Admin/ReportedList";
import SavedPosts from "./Pages/User/SavedPosts/SavedPosts";
// import { io } from "socket.io-client";
//   const socket = {}
//   socket.current = io("http://localhost:8800");

function App() {
  return (
    <Fragment>
      <Box className="App">
        {/* <RouterProvider router={router} /> */}
        <Router>
          <Toaster position="top-center" reverseOrder={true} />
          <Routes>
            <Route
              path="/"
              element={
                <UserProtectedRoute>
                  {/* <CheckBlocked> */}
                  <Home />
                  {/* </CheckBlocked> */}
                </UserProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <UserProtectedRoute>
                  <ProfilePage />
                </UserProtectedRoute>
              }
            />
            <Route
              path="/messaging"
              element={
                <UserProtectedRoute>
                  <Chat />
                </UserProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <UserProtectedRoute>
                  <Notifications />
                </UserProtectedRoute>
              }
            />
            <Route
              path="/saved-posts"
              element={
                <UserProtectedRoute>
                  <SavedPosts />
                </UserProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <UserPublicRoute>
                  <Login />
                </UserPublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <UserPublicRoute>
                  <Signup />
                </UserPublicRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <AdminPublicRoute>
                  <AdminLogin />
                </AdminPublicRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminProtectedRoute>
                  <UsersSide />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/reported-posts"
              element={
                <AdminProtectedRoute>
                  <ReportedPosts />
                </AdminProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </Box>
    </Fragment>
  );
}

export default App;

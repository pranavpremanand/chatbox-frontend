import { Fragment, useEffect } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import "./App.css";
import AdminLogin from "./Pages/Admin/AdminLogin";
import Home from "./Pages/User/Home/Home";
import Login from "./Pages/User/Login";
import Signup from "./Pages/User/Signup";
import { Toaster } from "react-hot-toast";
import AdminHome from "./Pages/Admin/AdminHome";
import AdminProtectedRoute from "./Components/Admin/AdminAuth/AdminProtectedRoute";
import UserProtectedRoute from "./Components/User/UserAuth/UserProtectedRoute";
import AdminPublicRoute from "./Components/Admin/AdminAuth/AdminPublicRoute";
import UserPublicRoute from "./Components/User/UserAuth/UserPublicRoute";
import FindPeople from './Pages/User/FindPeople/FindPeople'
import { Box } from "@mui/material";
import ProfilePage from "./Pages/User/Profile/ProfilePage";

function App() {
  
  // const currentUser = false;

  // const Layout = () => {
  //   return (
  //     <div>
  //       <Navbar />
  //       <div style={{ display: "flex" }}>
  //         <Leftbar />
  //         <Outlet />
  //         <Rightbar />
  //       </div>
  //     </div>
  //   );
  // };
  // const ProtectedRoute = ({ children }) => {
  //   if (!currentUser) {
  //     return <Navigate to="/login" />;
  //   }
  //   return children;
  // };
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: (
  //       <ProtectedRoute>
  //         <Layout />
  //       </ProtectedRoute>
  //     ),
  //     children: [
  //       {
  //         path: "/",
  //         element: <Home />,
  //       },
  //       {
  //         path: "/profile/:id",
  //         element: <Profile />,
  //       },
  //     ],
  //   },
  //   {
  //     path: "/login",
  //     element: <Login />,
  //   },
  //   {
  //     path: "/signup",
  //     element: <Signup />,
  //   },
  // ]);
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
                  <Home />
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
              path="/admin/home"
              element={
                <AdminProtectedRoute>
                  <AdminHome />
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

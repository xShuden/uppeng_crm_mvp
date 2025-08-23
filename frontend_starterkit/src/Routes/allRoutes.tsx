import { Navigate } from "react-router-dom";

import Dashboard from "pages/Dashboard";



// Accounts
import Error404 from "pages/Accounts/AuthenticationInner/Error404";
import Error500 from "pages/Accounts/AuthenticationInner/Error500";

// Authentication
import Login from "pages/Authentication/Login"
import Logout from "pages/Authentication/Logout";
import Register from "pages/Authentication/Register";
import ForgotPassword from "pages/Authentication/ForgotPassword";
import UserProfile from "pages/Authentication/user-profile";

const authProtectedRoutes = [
    { path: "/dashboard", component: <Dashboard /> },

    // this route should be at the end of all other routes
    // eslint-disable-next-line react/display-name
    { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
    { path: "*", component: <Navigate to="/dashboard" /> },
    { path: "/user-profile", component: <UserProfile /> },
];

const publicRoutes = [

    // Authentication
    { path: "/login", component: <Login /> },
    { path: "/logout", component: <Logout /> },
    { path: "/register", component: <Register /> },
    { path: "/forgot-password", component: <ForgotPassword /> },

    // AuthenticationInner
    { path: "/auth-404", component: <Error404 /> },
    { path: "/auth-500", component: <Error500 /> },
];

export { authProtectedRoutes, publicRoutes };
import { Navigate } from "react-router-dom";

import Dashboard from "pages/Dashboard";

//Product
import ListView from "pages/Products/ListView";
import GridView from "pages/Products/GridView";
import Overview from "pages/Products/Overview";
import CreateProduct from "pages/Products/CreateProduct";
import Categories from "pages/Products/Categories";
import SubCategories from "pages/Products/SubCategories";

// Orders
import OrdersListView from "pages/Orders/ListView"
import OrdersOverview from "pages/Orders/Overview"

// Calender
import Calendar from "pages/Calendar"

// Sellers
import SellersListView from "pages/Sellers/ListView"
import SellersGridView from "pages/Sellers/GridView"
import SellersOverview from "pages/Sellers/Overview"



// User List
import UsersList from "pages/UsersList"







// Accounts
import MyAccount from "pages/Accounts/MyAccount";
import Settings from "pages/Accounts/Settings";
import SignIn from "pages/Accounts/AuthenticationInner/SignIn";
import BasicLogout from "pages/Accounts/AuthenticationInner/Logout";
import Error404 from "pages/Accounts/AuthenticationInner/Error404";
import Error500 from "pages/Accounts/AuthenticationInner/Error500";

// Authentication
import Login from "pages/Authentication/Login"
import Logout from "pages/Authentication/Logout";
import ForgotPassword from "pages/Authentication/ForgotPassword";
import UserProfile from "pages/Authentication/user-profile";

const authProtectedRoutes = [
    { path: "/dashboard", component: <Dashboard /> },

    //Product
    { path: "/products-list", component: <ListView /> },
    { path: "/products-grid", component: <GridView /> },
    { path: "/product-overview", component: <Overview /> },
    { path: "/product-create", component: <CreateProduct /> },
    { path: "/categories", component: <Categories /> },
    { path: "/sub-categories", component: <SubCategories /> },

    // Orders
    { path: "/orders-list-view", component: <OrdersListView /> },
    { path: "/orders-overview", component: <OrdersOverview /> },



    // User List
    { path: "/users-list", component: <UsersList /> },



    { path: "/calendar", component: <Calendar /> },

    // Sellers
    { path: "/sellers-list-view", component: <SellersListView /> },
    { path: "/seller-grid-view", component: <SellersGridView /> },
    { path: "/seller-overview", component: <SellersOverview /> },





    // Accounts
    { path: "/account", component: <MyAccount /> },
    { path: "/settings", component: <Settings /> },

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
    { path: "/forgot-password", component: <ForgotPassword /> },

    // AuthenticationInner
    { path: "/auth-signin-basic", component: <SignIn /> },
    { path: "/auth-logout-basic", component: <BasicLogout /> },
    { path: "/auth-404", component: <Error404 /> },
    { path: "/auth-500", component: <Error500 /> },
];

export { authProtectedRoutes, publicRoutes };
import { Navigate } from "react-router-dom";

import Dashboard from "pages/Dashboard";

//Product
import ListView from "pages/Products/ListView";
import CreateProduct from "pages/Products/CreateProduct";
import Categories from "pages/Products/Categories";

// Orders
import OrdersListView from "pages/Orders/ListView"

// Rezervasyon
import Rezervasyon from "pages/Rezervasyon"




// User List
import UsersList from "pages/UsersList"
import PersonnelList from "pages/PersonnelList"
import TenantList from "pages/TenantList"

// Detail Pages
import PersonnelDetail from "pages/PersonnelDetail"
import CustomerDetail from "pages/CustomerDetail"







// Accounts
import MyAccount from "pages/Accounts/MyAccount";
import Settings from "pages/Accounts/Settings";
import SignIn from "pages/Accounts/AuthenticationInner/SignIn";
import BasicLogout from "pages/Accounts/AuthenticationInner/Logout";
import Error404 from "pages/Accounts/AuthenticationInner/Error404";
import Error500 from "pages/Accounts/AuthenticationInner/Error500";

// Authentication
import ForgotPassword from "pages/Authentication/ForgotPassword";
import UserProfile from "pages/Authentication/user-profile";

const authProtectedRoutes = [
    { path: "/dashboard", component: <Dashboard /> },

    //Product
    { path: "/products-list", component: <ListView /> },
    { path: "/product-create", component: <CreateProduct /> },
    { path: "/categories", component: <Categories /> },

    // Rezervasyon
    { path: "/reservation-list", component: <OrdersListView /> },



    // User List
    { path: "/customers", component: <UsersList /> },
    { path: "/personnel-list", component: <PersonnelList /> },
    { path: "/tenant-list", component: <TenantList /> },

    // Detail Pages
    { path: "/personnel-detail/:id", component: <PersonnelDetail /> },
    { path: "/customer-detail/:id", component: <CustomerDetail /> },


    { path: "/reservation-calendar", component: <Rezervasyon /> },






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
    { path: "/forgot-password", component: <ForgotPassword /> },

    // AuthenticationInner
    { path: "/login", component: <SignIn /> },
    { path: "/logout", component: <BasicLogout /> },
    { path: "/404", component: <Error404 /> },
    { path: "/500", component: <Error500 /> },
];

export { authProtectedRoutes, publicRoutes };
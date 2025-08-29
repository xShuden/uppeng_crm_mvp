import React, { useEffect, useState } from "react";

const Navdata = () => {
    //state data
    const [isEcommerce, setIsEcommerce] = useState(false);
    const [isOrder, setIsOrder] = useState(false);
    const [isSellers, setIsSellers] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    const [iscurrentState, setIscurrentState] = useState('Dashboard');

    function updateIconSidebar(e: any) {
        if (e && e.target && e.target.getAttribute("subitems")) {
            const ul: any = document.getElementById("two-column-menu");
            const iconItems: any = ul.querySelectorAll(".nav-icon.active");
            let activeIconItems = [...iconItems];
            activeIconItems.forEach((item) => {
                item.classList.remove("active");
                // var id: any = item.getAttribute("subitems");
                // if (document.getElementById(id)){
                //     document.getElementById(id).classList.remove("show");
                // }
            });
        }
    }

    useEffect(() => {
        document.body.classList.remove('twocolumn-panel');
        if (iscurrentState !== 'Ecommerce') {
            setIsEcommerce(false);
        }
        if (iscurrentState !== 'Orders') {
            setIsOrder(false);
        }
        if (iscurrentState !== 'Sellers') {
            setIsSellers(false);
        }
        if (iscurrentState !== 'Auth') {
            setIsAuth(false);
        }
    }, [
        iscurrentState,
        isEcommerce,
        isOrder,
        isSellers,
        isAuth
    ]);

    const menuItems: any = [
        {
            label: "Menu",
            isHeader: true,
        },
        {
            id: "dashboard",
            label: "Dashboard",
            icon: "bi bi-speedometer2",
            link: "/dashboard",
            badgeName : "Hot",
            badgeColor : "danger"
        },
        {
            id: "products",
            label: "Products",
            icon: "bi bi-box-seam",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsEcommerce(!isEcommerce);
                setIscurrentState('Ecommerce');
                updateIconSidebar(e);
            },
            stateVariables: isEcommerce,
            subItems: [
                {
                    id: "listview",
                    label: "List View",
                    link: "/products-list",
                    parentId: "products",
                },
                {
                    id: "gridview",
                    label: "Grid View",
                    link: "/products-grid",
                    parentId: "products",
                },
                {
                    id: "overview",
                    label: "Overview",
                    link: "/product-overview",
                    parentId: "products",
                },
                {
                    id: "createproduct",
                    label: "Create Product",
                    link: "/product-create",
                    parentId: "products",
                },
                {
                    id: "categories",
                    label: "Categories",
                    link: "/categories",
                    parentId: "products",
                },
                {
                    id: "subcategories",
                    label: "Sub Categories",
                    link: "/sub-categories",
                    parentId: "products",
                },
            ],
        },
        {
            id: "orders",
            label: "Orders",
            icon: "bi bi-cart4",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsOrder(!isOrder);
                setIscurrentState('Orders');
                updateIconSidebar(e);
            },
            stateVariables: isOrder,
            subItems: [
                {
                    id: "listview",
                    label: "List View",
                    link: "/orders-list-view",
                    parentId: "orders",
                },
                {
                    id: "overview",
                    label: "Overview",
                    link: "/orders-overview",
                    parentId: "orders",
                },
            ],
        },
        {
            id: "calendar",
            label: "Calendar",
            icon: "bi bi-calendar-week",
            link: "/calendar",
        },
        {
            id: "seller",
            label: "Sellers",
            icon: "bi bi-binoculars",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsSellers(!isSellers);
                setIscurrentState('Sellers');
                updateIconSidebar(e);
            },
            stateVariables: isSellers,
            subItems: [
                {
                    id: "listview",
                    label: "List View",
                    link: "/sellers-list-view",
                    parentId: "seller",
                },
                {
                    id: "gridview",
                    label: "Grid View",
                    link: "/seller-grid-view",
                    parentId: "seller",
                },
                {
                    id: "overview",
                    label: "Overview",
                    link: "/seller-overview",
                    parentId: "seller",
                },
            ],
        },
        {
            id: "userslist",
            label: "Users List",
            icon: "bi bi-person-bounding-box",
            link: "/users-list",
        },
        {
            id: "components",
            label: "Components",
            icon: "bi bi-layers",
            link: "//themes.themesbrand.com/toner/react/components/index",
            isBadgeColorCustom : true,
            badgeName : "v1.3",
            badgeColor : "secondary"

        },
        {
            id: "accounts",
            label: "Accounts",
            icon: "bi bi-person-circle",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsAuth(!isAuth);
                setIscurrentState('Auth');
                updateIconSidebar(e);
            },
            stateVariables: isAuth,
            subItems: [
                {
                    id: "myAccount",
                    label: "My Accounts",
                    link: "/account",
                    parentId: "account",
                },
                {
                    id: "settings",
                    label: "Settings",
                    link: "/settings",
                    parentId: "account",
                },
                {
                    id: "signin",
                    label: "Sign In",
                    link: "/auth-signin-basic",
                    parentId: "account",
                },
                {
                    id: "logout",
                    label: "Logout",
                    link: "/auth-logout-basic",
                    parentId: "account",
                },
                {
                    id: "auth-404",
                    label: "Error 404",
                    link: "/auth-404",
                    parentId: "account",
                },
                {
                    id: "auth-500",
                    label: "Error 500",
                    link: "/auth-500",
                    parentId: "account",
                },
            ],
        },

    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
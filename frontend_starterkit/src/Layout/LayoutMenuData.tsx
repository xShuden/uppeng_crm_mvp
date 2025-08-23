import React, { useEffect, useState } from "react";

const Navdata = () => {
    //state data
    const [isEcommerce, setIsEcommerce] = useState(false);
    const [isOrder, setIsOrder] = useState(false);
    const [isSellers, setIsSellers] = useState(false);
    const [isInvoice, setIsInvoice] = useState(false);
    const [isShipping, setIsShipping] = useState(false);
    const [isLocalization, setIsLocalization] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isMultiLevel, setIsMultiLevel] = useState(false);

    // Multi Level
    const [isLevel1, setIsLevel1] = useState(false);
    const [isLevel2, setIsLevel2] = useState(false);

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
        if (iscurrentState !== 'Invoice') {
            setIsInvoice(false);
        }
        if (iscurrentState !== 'Shipping') {
            setIsShipping(false);
        }
        if (iscurrentState !== 'Localization') {
            setIsLocalization(false);
        }
        if (iscurrentState !== 'Auth') {
            setIsAuth(false);
        }
    }, [
        iscurrentState,
        isEcommerce,
        isOrder,
        isInvoice,
        isShipping,
        isLocalization,
        isAuth,
        isMultiLevel
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
                    link: "#",
                    parentId: "products",
                },
                {
                    id: "gridview",
                    label: "Grid View",
                    link: "#",
                    parentId: "products",
                },
                {
                    id: "overview",
                    label: "Overview",
                    link: "#",
                    parentId: "products",
                },
                {
                    id: "createproduct",
                    label: "Create Product",
                    link: "#",
                    parentId: "products",
                },
                {
                    id: "categories",
                    label: "Categories",
                    link: "#",
                    parentId: "products",
                },
                {
                    id: "subcategories",
                    label: "Sub Categories",
                    link: "#",
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
                    link: "#",
                    parentId: "orders",
                },
                {
                    id: "overview",
                    label: "Overview",
                    link: "#",
                    parentId: "orders",
                },
            ],
        },
        {
            id: "calendar",
            label: "Calendar",
            icon: "bi bi-calendar-week",
            link: "#",
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
                    link: "#",
                    parentId: "seller",
                },
                {
                    id: "gridview",
                    label: "Grid View",
                    link: "#",
                    parentId: "seller",
                },
                {
                    id: "overview",
                    label: "Overview",
                    link: "#",
                    parentId: "seller",
                },
            ],
        },
        {
            id: "invoice",
            label: "Invoice",
            icon: "bi bi-archive",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsInvoice(!isInvoice);
                setIscurrentState('Invoice');
                updateIconSidebar(e);
            },
            stateVariables: isInvoice,
            subItems: [
                {
                    id: "listview",
                    label: "List View",
                    link: "#",
                    parentId: "invoice",
                },
                {
                    id: "overview",
                    label: "Overview",
                    link: "#",
                    parentId: "invoice",
                },
                {
                    id: "createinvoice",
                    label: "Create Invoice",
                    link: "#",
                    parentId: "invoice",
                },
            ],
        },
        {
            id: "userslist",
            label: "Users List",
            icon: "bi bi-person-bounding-box",
            link: "#",
        },
        {
            id: "shipping",
            label: "Shipping",
            icon: "bi bi-truck",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsShipping(!isShipping);
                setIscurrentState('Shipping');
                updateIconSidebar(e);
            },
            stateVariables: isShipping,
            subItems: [
                {
                    id: "shippinglist",
                    label: "Shipping List",
                    link: "#",
                    parentId: "shipping",
                },
                {
                    id: "shipments",
                    label: "Shipments",
                    link: "#",
                    parentId: "shipping",
                },
            ],
        },
        {
            id: "coupons",
            label: "Coupons",
            icon: "bi bi-tag",
            link: "#",
        },
        {
            id: "reviews-ratings",
            label: "Reviews & Ratings",
            icon: "bi bi-star",
            link: "#",
        },
        {
            id: "brands",
            label: "Brands",
            icon: "bi bi-shop",
            link: "#",
        },
        {
            id: "statistics",
            label: "Statistics",
            icon: "bi bi-pie-chart",
            link: "#",
        },
        {
            id: "localization",
            label: "Localization",
            icon: "bi bi-coin",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsLocalization(!isLocalization);
                setIscurrentState('Localization');
                updateIconSidebar(e);
            },
            stateVariables: isLocalization,
            subItems: [
                {
                    id: "transactions",
                    label: "Transactions",
                    link: "#",
                    parentId: "localization",
                },
                {
                    id: "currency-rates",
                    label: "Currency Rates",
                    link: "#",
                    parentId: "localization",
                },
            ],
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
                    link: "#",
                    parentId: "account",
                },
                {
                    id: "settings",
                    label: "Settings",
                    link: "#",
                    parentId: "account",
                },
                {
                    id: "signup",
                    label: "Sign Up",
                    link: "#",
                    parentId: "account",
                },
                {
                    id: "signin",
                    label: "Sign In",
                    link: "#",
                    parentId: "account",
                },
                {
                    id: "password-reset",
                    label: "Password Reset",
                    link: "#",
                    parentId: "account",
                },
                {
                    id: "password-create",
                    label: "Password Create",
                    link: "#",
                    parentId: "account",
                },
                {
                    id: "success-message",
                    label: "Success Message",
                    link: "#",
                    parentId: "account",
                },
                {
                    id: "two-step-verify",
                    label: "Two Step Verify",
                    link: "#",
                    parentId: "account",
                },
                {
                    id: "logout",
                    label: "Logout",
                    link: "#",
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
                {
                    id: "coming-soon",
                    label: "Coming Soon",
                    link: "#",
                    parentId: "account",
                },
            ],
        },
        {
            id: "components",
            label: "Components",
            icon: "bi bi-layers",
            link: "#",
            isBadgeColorCustom : true,
            badgeName : "v1.3",
            badgeColor : "secondary"

        },
        {
            id: "multilevel",
            label: "Multi Level",
            icon: "bi bi-share",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsMultiLevel(!isMultiLevel);
                setIscurrentState('MuliLevel');
                updateIconSidebar(e);
            },
            stateVariables: isMultiLevel,
            subItems: [
                { id: "level1.1", label: "Level 1.1", link: "#", parentId: "multilevel" },
                {
                    id: "level1.2",
                    label: "Level 1.2",
                    link: "/#",
                    isChildItem: true,
                    click: function (e: any) {
                        e.preventDefault();
                        setIsLevel1(!isLevel1);
                    },
                    stateVariables: isLevel1,
                    childItems: [
                        { id: 1, label: "Level 2.1", link: "#" },
                        {
                            id: "level2.2",
                            label: "Level 2.2",
                            link: "/#",
                            isChildItem: true,
                            click: function (e: any) {
                                e.preventDefault();
                                setIsLevel2(!isLevel2);
                            },
                            stateVariables: isLevel2,
                            childItems: [
                                { id: 1, label: "Level 3.1", link: "#" },
                                { id: 2, label: "Level 3.2", link: "#" },
                            ]
                        },
                    ]
                },
            ],
        },

    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
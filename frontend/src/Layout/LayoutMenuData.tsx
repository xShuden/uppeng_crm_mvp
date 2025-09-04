import React, { useEffect, useState } from "react";

const Navdata = () => {
    //state data
    const [isEcommerce, setIsEcommerce] = useState(false);
    const [isOrder, setIsOrder] = useState(false);
    const [isRezervation, setIsRezervation] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isTenantSwitch, setIsTenantSwitch] = useState(false);

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
        if (iscurrentState !== 'Reservation') {
            setIsRezervation(false);
        }
        if (iscurrentState !== 'Sellers') {
        }
        if (iscurrentState !== 'Auth') {
            setIsAuth(false);
        }
        if (iscurrentState !== 'TenantSwitch') {
            setIsTenantSwitch(false);
        }
    }, [
        iscurrentState,
        isEcommerce,
        isOrder,
        isRezervation,
        isAuth,
        isTenantSwitch
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
            id: "rezervasyon",
            label: "Rezervasyon",
            icon: "bi bi-calendar-check",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsRezervation(!isRezervation);
                setIscurrentState('Reservation');
                updateIconSidebar(e);
            },
            stateVariables: isRezervation,
            subItems: [
                {
                    id: "reservation-calendar",
                    label: "Rezervasyon Çizelgesi",
                    link: "/reservation-calendar",
                    parentId: "rezervasyon",
                },
                {
                    id: "reservation-list",
                    label: "Rezervasyon Listesi",
                    link: "/reservation-list",
                    parentId: "rezervasyon",
                },
            ],
        },
        {
            id: "userslist",
            label: "Müşteriler",
            icon: "bi bi-person-bounding-box",
            link: "/customers",
        },
        {
            id: "personnellist",
            label: "Personel",
            icon: "bi bi-people-fill",
            link: "/personnel-list",
        },
        {
            id: "services",
            label: "Hizmetler",
            icon: "bi bi-briefcase",
            link: "/categories",
        },
        {
            id: "tenantlist",
            label: "Kiracılar",
            icon: "bi bi-building",
            link: "/tenant-list",
        },
        {
            id: "accounts",
            label: "Hesaplar",
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
                    label: "Hesabım",
                    link: "/account",
                    parentId: "account",
                },
                {
                    id: "settings",
                    label: "Ayarlar",
                    link: "/settings",
                    parentId: "account",
                },
                {
                    id: "signin",
                    label: "Giriş Yap",
                    link: "/login",
                    parentId: "account",
                },
                {
                    id: "logout",
                    label: "Çıkış Yap",
                    link: "/logout",
                    parentId: "account",
                },
                {
                    id: "auth-404",
                    label: "Hata 404",
                    link: "/404",
                    parentId: "account",
                },
                {
                    id: "auth-500",
                    label: "Hata 500",
                    link: "/500",
                    parentId: "account",
                },
            ],
        },

    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
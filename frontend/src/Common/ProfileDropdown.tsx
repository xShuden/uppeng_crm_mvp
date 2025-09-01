import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
//import images
import avatar1 from "assets/images/users/avatar-1.jpg";

const ProfileDropdown = () => {

    const [userName, setUserName] = useState<any>("Robert");

    const profiledropdownData = createSelector(
        (state: any) => state.Profile,
        (user) => ({ success: user.success })
    );
    const { success } = useSelector(profiledropdownData);

    useEffect(() => {
        const authUser: any = localStorage.getItem("authUser")
        if (authUser) {
            const obj = JSON.parse(authUser);
            setUserName(process.env.REACT_APP_DEFAULTAUTH === "fake" ? obj.username : process.env.REACT_APP_DEFAULTAUTH === "firebase" ? obj.email && obj.email : "Robert" );
        }
    }, [userName, success]);

    return (
        <React.Fragment>
            <Dropdown className="ms-sm-3 header-item topbar-user">
                <Dropdown.Toggle type="button" className="btn bg-transparent border-0 arrow-none" id="page-header-user-dropdown">
                    <span className="d-flex align-items-center">
                        <img className="rounded-circle header-profile-user" src={avatar1} alt="Header Avatar" />
                        <span className="text-start ms-xl-2">
                            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{userName}</span>
                            <span className="d-none d-xl-block ms-1 fs-13 text-muted user-name-sub-text">Founder</span>
                        </span>
                    </span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-end">
                    <h6 className="dropdown-header">Welcome {userName}!</h6>
                    <Dropdown.Item href="/account"><i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Profile</span></Dropdown.Item>
                    <Dropdown.Item href="/settings"><i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Settings</span></Dropdown.Item>
                    <div className="dropdown-divider"></div>
                    <Dropdown.Item href="/logout"><i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span className="align-middle" data-key="t-logout">Logout</span></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    );
}

export default ProfileDropdown;
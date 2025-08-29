import React, { useRef, useState } from 'react';

import SearchModal from '../Common/SearchModal';
import FullScreenDropdown from '../Common/FullScreenDropdown';
import ProfileDropdown from '../Common/ProfileDropdown';
import { Button, Modal, ModalHeader } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//import images
import logosm from "../assets/images/logo-sm.png";
import logodark from "../assets/images/logo-dark.png";
import logolight from "../assets/images/logo-light.png";

const toogleMenuBtn = () => {
    var windowSize = document.documentElement.clientWidth;

    if (windowSize > 767)
        document.querySelector(".hamburger-icon")?.classList.toggle('open');

    //For collapse horizontal menu
    if (document.documentElement.getAttribute('data-layout') === "horizontal") {
        document.body.classList.contains("menu") ? document.body.classList.remove("menu") : document.body.classList.add("menu");
    }

    //For collapse vertical menu
    if (document.documentElement.getAttribute('data-layout') === "vertical") {
        if (windowSize < 1025 && windowSize > 767) {
            document.body.classList.remove('vertical-sidebar-enable');
            (document.documentElement.getAttribute('data-sidebar-size') === 'sm') ? document.documentElement.setAttribute('data-sidebar-size', '') : document.documentElement.setAttribute('data-sidebar-size', 'sm');
        } else if (windowSize > 1025) {
            document.body.classList.remove('vertical-sidebar-enable');
            (document.documentElement.getAttribute('data-sidebar-size') === 'lg') ? document.documentElement.setAttribute('data-sidebar-size', 'sm') : document.documentElement.setAttribute('data-sidebar-size', 'lg');
        } else if (windowSize <= 767) {
            document.body.classList.add('vertical-sidebar-enable');
            document.documentElement.setAttribute('data-sidebar-size', 'lg');
        }
    }

    //Two column menu
    if (document.documentElement.getAttribute('data-layout') === "twocolumn") {
        document.body.classList.contains('twocolumn-panel') ? document.body.classList.remove('twocolumn-panel') : document.body.classList.add('twocolumn-panel');
    }
};

const Header = () => {
    const searchInputRef: any = useRef();
    const searchCloseOptions: any = useRef();
    const [show, setShow] = useState(false);
    const [value, setValue] = useState("");
    const handleToggleModal = () => {
        setShow(!show);
    }
    const onChangeData = (value: any) => {
        setValue(value);
    };
    return (
        <React.Fragment>
            <header id="page-topbar">
                <div className="layout-width">
                    <div className="navbar-header">
                        <div className="d-flex">
                            <div className="navbar-brand-box horizontal-logo">
                            <Link to="/" className="logo logo-dark">
                                <span className="logo-sm">
                                    <img src={logosm} alt="" height="22" />
                                </span>
                                <span className="logo-lg">
                                    <img src={logodark} alt="" height="25" />
                                </span>
                            </Link>

                            <Link to="/" className="logo logo-light">
                                <span className="logo-sm">
                                    <img src={logosm} alt="" height="22" />
                                </span>
                                <span className="logo-lg">
                                    <img src={logolight} alt="" height="25" />
                                </span>
                            </Link>
                        </div>

                            <Button variant="link" size="sm" type="button" className="px-3 fs-16 header-item vertical-menu-btn topnav-hamburger" id="topnav-hamburger-icon"
                                onClick={toogleMenuBtn}
                            >
                                <span className="hamburger-icon">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </Button>

                            {/* SearchModal */}
                            <SearchModal />
                        </div>

                        <div className="d-flex align-items-center">

                            <div className="d-md-none topbar-head-dropdown header-item">
                                <button type="button" onClick={handleToggleModal} className="btn btn-icon btn-topbar btn-ghost-dark rounded-circle" id="page-header-search-dropdown" data-bs-toggle="modal" data-bs-target="#searchModal" >
                                    <i className="bi bi-search fs-16"></i>
                                </button>
                            </div>
                            <Modal
                                show={show}
                                onHide={handleToggleModal}
                                dialogClassName="rounded"
                                size="lg"
                                id="searchModal"
                            >
                                <ModalHeader className="p-3">
                                    <div className="position-relative w-100">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg border-2"
                                            placeholder="Search for toner..."
                                            autoComplete="off"
                                            ref={searchInputRef}
                                            id="search-options"
                                            value={value}
                                            onChange={(e: any) => {
                                                onChangeData(e.target.value);
                                            }}
                                        />
                                        <span className="bi bi-search search-widget-icon fs-17"></span>
                                        <Link to="#" className="search-widget-icon fs-14 link-secondary text-decoration-underline search-widget-icon-close d-none" ref={searchCloseOptions} id="search-close-options">Clear</Link>
                                    </div>
                                </ModalHeader>
                            </Modal>

                            {/* FullScreenDropdown */}
                            <FullScreenDropdown />

                            {/* ProfileDropdown */}
                            <ProfileDropdown />
                        </div>
                    </div>
                </div>
            </header>

        </React.Fragment>
    );
}

export default Header;
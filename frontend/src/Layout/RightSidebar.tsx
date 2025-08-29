import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { createSelector } from 'reselect';

const RightSidebar = () => {
    const selectProperties = createSelector(
        (state: any) => state.Layout,
        (layout) => ({
            preloader: layout.preloader
        })
    );

    const { preloader } = useSelector(selectProperties);

    const toTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    const pathName = useLocation().pathname;

    useEffect(() => {
        const preloader = document.getElementById("preloader");
        if (preloader) {
            preloader.style.opacity = "1";
            preloader.style.visibility = "visible";
            setTimeout(function () {
                preloader.style.opacity = "0";
                preloader.style.visibility = "hidden";
            }, 1000);
        }
    }, [preloader, pathName]);

    return (
        <React.Fragment>
            <Button variant="info" className="btn-icon" id="back-to-top" onClick={() => toTop()}>
                <i className="ri-arrow-up-line"></i>
            </Button>

            {preloader === "enable" && <div id="preloader">
                <div id="status">
                    <div className="spinner-border text-primary avatar-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>}
        </React.Fragment>
    );
}

export default RightSidebar
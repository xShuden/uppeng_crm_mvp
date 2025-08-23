import React from 'react';
import {  Container } from 'react-bootstrap';
import Breadcrumb from 'Common/BreadCrumb';

const Dashboard = () => {

    document.title = "Dashboard | Toner eCommerce + Admin React Template";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                <Breadcrumb title="ECOMMERCE" pageTitle="Dashboard" />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Dashboard;
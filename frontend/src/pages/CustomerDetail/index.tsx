import React from 'react';
import { Container } from 'react-bootstrap';
import Breadcrumb from 'Common/BreadCrumb';
import CustomerProfile from './CustomerProfile';

const CustomerDetail = () => {

    document.title = "Müşteri Detayı | CRM v2 Randevu Takip";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumb title="Müşteri Detayı" pageTitle="Müşteri Yönetimi" />
                    <CustomerProfile />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default CustomerDetail;
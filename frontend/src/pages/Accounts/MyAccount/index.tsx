import React from 'react';
import { Container } from 'react-bootstrap';
import Breadcrumb from 'Common/BreadCrumb';
import Profile from './Profile';

const MyAccount = () => {

    document.title = "Hesabım | CRM v2 Randevu Takip";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumb title="Hesabım" pageTitle="Hesap Yönetimi" />
                    <Profile />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default MyAccount;
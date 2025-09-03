import React from 'react';
import { Container } from 'react-bootstrap';
import Breadcrumb from 'Common/BreadCrumb';
import PersonnelProfile from './PersonnelProfile';

const PersonnelDetail = () => {

    document.title = "Personel Detayı | CRM v2 Randevu Takip";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumb title="Personel Detayı" pageTitle="Personel Yönetimi" />
                    <PersonnelProfile />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default PersonnelDetail;
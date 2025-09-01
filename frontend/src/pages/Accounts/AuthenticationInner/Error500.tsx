import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Import Images
import logoDark from 'assets/images/logo-dark.png'
import error500 from 'assets/images/error500.png'
import logoLight from 'assets/images/logo-light.png'

const Error500 = () => {

    document.title = "500 Sunucu Hatası | CRM v2 Randevu Takip";

    return (
        <React.Fragment>
            <section className="auth-page-wrapper position-relative bg-light min-vh-100 d-flex align-items-center justify-content-between">
                <div className="auth-header position-fixed top-0 start-0 end-0 bg-body">
                    <Container fluid={true}>
                        <Row className="justify-content-between align-items-center">
                            <Col className="col-2">
                                <Link to="/">
                                    <img src={logoDark} alt="" height="24" className="card-logo card-logo-dark"/>
                                    <img src={logoLight} alt="" height="24" className="card-logo card-logo-light"/>
                                </Link>
                            </Col>
                            <Col className="col-auto">
                                <ul className="list-unstyled hstack gap-2 mb-0">
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="w-100">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={6}>
                                <div className="auth-card mx-lg-3">
                                    <Card className="border-0 mb-0">
                                        <Card.Body className="text-center p-4">

                                            <div className="text-center px-sm-5 mx-5">
                                                <img src={error500} className="img-fluid" alt="" />
                                            </div>
                                            <div className="mt-4 text-center pt-3">
                                                <div className="position-relative">
                                                    <h4 className="fs-18 error-subtitle text-uppercase mb-0">Sunucu Hatası</h4>
                                                    <p className="fs-15 text-muted mt-3">Sunucuda bir hata oluştu. Lütfen daha sonra tekrar deneyin.</p>
                                                    <div className="mt-4">
                                                        <Link to="/" className="btn btn-primary"><i className="mdi mdi-home me-1"></i>Ana Sayfaya Dön</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </Container>

                </div>
            </section>
        </React.Fragment>
    );
};

export default Error500;
import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

// Import Images
import logoDark from 'assets/images/logo-dark.png'
import logoLight from 'assets/images/logo-light.png'

import avatar1 from 'assets/images/users/avatar-1.jpg'
import img1 from 'assets/images/auth/img-1.png'
import { Link } from 'react-router-dom';

const Logout = () => {

    document.title = "Çıkış Yap | CRM v2 Randevu Takip";

    return (
        <React.Fragment>
            <section className="auth-page-wrapper position-relative bg-light min-vh-100 d-flex align-items-center justify-content-between">
                <div className="auth-header position-fixed top-0 start-0 end-0 bg-body">
                    <Container fluid={true}>
                        <Row className="justify-content-between align-items-center">
                            <Col className="col-2">
                                <Link className="navbar-brand mb-2 mb-sm-0" to="/">
                                    <img src={logoDark} className="card-logo card-logo-dark" alt="logo dark" height="22"/>
                                    <img src={logoLight} className="card-logo card-logo-light" alt="logo light" height="22"/>
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
                                        <Card.Header className="bg-primary border-0">
                                            <Row>
                                                <Col lg={4} className="col-3">
                                                    <img src={img1} alt="" className="img-fluid"/>
                                                </Col>
                                                <Col lg={8} className="col-9">
                                                    <h1 className="text-white lh-base fw-lighter">Başarıyla Çıkış Yaptınız</h1>
                                                </Col>
                                            </Row>
                                        </Card.Header>
                                        <Card.Body className="text-center">
                                            <p className="text-muted fs-15">CRM Randevu Takip sistemini kullandığınız için teşekkürler</p>
                                            <div>
                                                <Link to="/login" className="btn btn-primary w-100">Giriş Yap</Link>
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

export default Logout;
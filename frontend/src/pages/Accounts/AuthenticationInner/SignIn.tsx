import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

// Import Images
import logoDark from 'assets/images/logo-dark.png'
import logoLight from 'assets/images/logo-light.png'
import img1 from 'assets/images/auth/img-1.png'
import { Link } from 'react-router-dom';

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

const SignIn = () => {

    document.title = "Giriş Yap | CRM v2 Randevu Takip";
    const [passwordShow, setPasswordShow] = useState<any>(false);

    const validation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            email: 'admin@themesbrand.com',
            password: '123456',
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Lütfen kullanıcı adınızı girin"),
            password: Yup.string().required("Lütfen şifrenizi girin"),
        }),
        onSubmit: (values) => {
            console.log("Submitted", values)
        }
    });

    return (
        <React.Fragment>
            <section className="auth-page-wrapper position-relative bg-light min-vh-100 d-flex align-items-center justify-content-between">
                <div className="auth-header position-fixed top-0 start-0 end-0 bg-body">
                    <Container fluid={true}>
                        <Row className="justify-content-between align-items-center">
                            <Col className="col-2">
                                <Link className="navbar-brand mb-2 mb-sm-0" to="/">
                                    <img src={logoDark} className="card-logo card-logo-dark" alt="logo dark" height="22" />
                                    <img src={logoLight} className="card-logo card-logo-light" alt="logo light" height="22" />
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
                                                    <img src={img1} alt="" className="img-fluid" />
                                                </Col>
                                                <Col lg={8} className="col-9">
                                                    <h1 className="text-white lh-base fw-lighter">CRM Randevu Sistemi</h1>
                                                </Col>
                                            </Row>
                                        </Card.Header>
                                        <Card.Body>
                                            <div className="p-2">
                                                <Form action="#" onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}>

                                                    <div className="mb-3">
                                                        <Form.Label htmlFor="username">Kullanıcı Adı</Form.Label>
                                                        <Form.Control name="email" type="email" className="form-control" id="username" placeholder="Kullanıcı adınızı girin"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.email || ""}
                                                            isInvalid={
                                                                validation.touched.email && validation.errors.email ? true : false
                                                            }
                                                        />
                                                        {validation.touched.email && validation.errors.email ? (
                                                            <Form.Control.Feedback type="invalid">{validation.errors.email}</Form.Control.Feedback>
                                                        ) : null}
                                                    </div>

                                                    <div className="mb-3">
                                                        <Form.Label htmlFor="password-input">Şifre</Form.Label>
                                                        <div className="position-relative auth-pass-inputgroup mb-3">
                                                            <Form.Control className="form-control pe-5 password-input" placeholder="Şifrenizi girin" id="password-input"
                                                                name="password"
                                                                value={validation.values.password || ""}
                                                                type={passwordShow ? "text" : "password"}
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                isInvalid={
                                                                    validation.touched.password && validation.errors.password ? true : false
                                                                }
                                                            />
                                                            {validation.touched.password && validation.errors.password ? (
                                                                <Form.Control.Feedback type="invalid">{validation.errors.password}</Form.Control.Feedback>
                                                            ) : null}
                                                            <Button variant='link' className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon" onClick={() => setPasswordShow(!passwordShow)}><i className="ri-eye-fill align-middle"></i></Button>
                                                        </div>
                                                    </div>

                                                    <div className="form-check">
                                                        <Form.Check type="checkbox" value="" id="auth-remember-check" />
                                                        <Form.Label htmlFor="auth-remember-check">Beni Hatırla</Form.Label>
                                                    </div>

                                                    <div className="mt-4">
                                                        <Button variant='primary' className="w-100" type="submit">Giriş Yap</Button>
                                                    </div>

                                                </Form>

                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </Container>

                </div>
            </section>
        </React.Fragment >
    );
};

export default SignIn;
import React from 'react';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';

// Import Images
import logoDark from 'assets/images/logo-dark.png'
import logoLight from 'assets/images/logo-light.png'
import img1 from 'assets/images/auth/img-1.png'

import withRouter from 'Common/withRouter';

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { userForgetPassword } from "slices/thunk";

const ForgotPassword = (props: any) => {

    document.title = "Şifre Sıfırla | CRM v2 Randevu Takip";

    const dispatch = useDispatch<any>();

    const validation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Lütfen e-posta adresinizi girin"),
        }),
        onSubmit: (values) => {
            dispatch(userForgetPassword(values, props.history));
        }
    });

    const selectProperties = createSelector(
        (state: any) => state.ForgetPassword,
        (forgetPassword) => ({
            forgetError: forgetPassword.forgetError,
            forgetSuccessMsg: forgetPassword.forgetSuccessMsg,
        })
    );

    const { forgetError, forgetSuccessMsg } = useSelector(selectProperties);

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
                                                    <h1 className="text-white lh-base fw-lighter">Şifre Unuttum?</h1>
                                                </Col>
                                            </Row>
                                        </Card.Header>
                                        <Card.Body>
                                            <p className="text-muted fs-15">CRM sisteminiz ile şifrenizi sıfırlayın.</p>

                                            <div className="alert alert-borderless alert-warning text-center mb-2 mx-2" role="alert">
                                                E-posta adresinizi girin, talimatlar size gönderilecektir!
                                            </div>
                                            <div className="p-2">
                                                {forgetError && forgetError ? (
                                                    <Alert variant="danger" style={{ marginTop: "13px" }}>
                                                        {forgetError}
                                                    </Alert>
                                                ) : null}
                                                {forgetSuccessMsg ? (
                                                    <Alert variant="success" style={{ marginTop: "13px" }}>
                                                        {forgetSuccessMsg}
                                                    </Alert>
                                                ) : null}
                                                <Form onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}>
                                                    <div className="mb-4">
                                                        <Form.Label htmlFor="email">E-posta</Form.Label>
                                                        <Form.Control type="email" id="email" placeholder="E-posta adresinizi veya kullanıcı adınızı girin"
                                                            name="email"
                                                            className="form-control"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.email || ""}
                                                            isInvalid={
                                                                validation.touched.email && validation.errors.email ? true : false
                                                            }
                                                        />
                                                        {validation.touched.email && validation.errors.email ? (
                                                            <Form.Control.Feedback type="invalid"><div>{validation.errors.email}</div></Form.Control.Feedback>
                                                        ) : null}
                                                    </div>

                                                    <div className="text-center mt-4">
                                                        <Button variant='primary' className="w-100" type="submit">Sıfırlama Bağlantısı Gönder</Button>
                                                    </div>
                                                </Form>
                                            </div>
                                            <div className="mt-4 text-center">
                                                <p className="mb-0">Dur, şifremi hatırladım... <Link to="/login" className="fw-semibold text-primary text-decoration-underline"> Buraya tıklayın </Link> </p>
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
}

export default withRouter(ForgotPassword);
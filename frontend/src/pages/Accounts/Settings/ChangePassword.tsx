import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

const ChangePassword = () => {
    const [passwordShow, setPasswordShow] = useState<any>(false);
    const [confirmPasswordShow, setConfirmPasswordShow] = useState<any>(false);

    const validation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            password: '',
            confirm_password: '',
        },
        validationSchema: Yup.object({
            password: Yup.string().required("Şifre gerekli").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, "En az 8 karakter, bir büyük harf, bir küçük harf ve bir sayı içermeli"),
            confirm_password: Yup.string().required("Şifre tekrarı gerekli").oneOf([Yup.ref('password')], 'Şifreler eşleşmeli'),
        }),
        onSubmit: (values) => {
            console.log("Change Password", values)
        }
    });

    return (
        <React.Fragment>
            <Row>
                <Col lg={4}>
                    <h5 className="fs-16">Şifre Değiştir</h5>
                    <p className="text-muted mb-lg-0">Güvenliğiniz için şifrenizi düzenli olarak değiştirin. Yeni şifreniz en az 8 karakter olmalı ve büyük harf, küçük harf, sayı içermelidir.</p>
                </Col>
                <Col lg={8}>
                    <Card>
                        <Card.Body>
                            <Row className="g-3">
                                <Col lg={4}>
                                    <div>
                                        <Form>
                                            <Form.Label htmlFor="oldpasswordInput">Mevcut Şifre*</Form.Label>
                                            <Form.Control type="password" id="oldpasswordInput" placeholder="Mevcut şifrenizi girin" autoComplete='off' />
                                        </Form>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <Form>
                                        <Form.Label htmlFor="password-input">Yeni Şifre</Form.Label>
                                        <div className="position-relative auth-pass-inputgroup">
                                            <Form.Control
                                                type={passwordShow ? "text" : "password"} className="pe-5 password-input" placeholder="Yeni şifrenizi girin" id="password-input"
                                                name="password"
                                                autoComplete='off'
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.password || ""}
                                                isInvalid={
                                                    validation.touched.password && validation.errors.password ? true : false
                                                }
                                            />
                                            <Button variant='link' className="btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon" onClick={() => setPasswordShow(!passwordShow)}><i className="ri-eye-fill align-middle"></i></Button>
                                            {validation.touched.password && validation.errors.password ? (
                                                <Form.Control.Feedback type="invalid"><div>{validation.errors.password}</div></Form.Control.Feedback>
                                            ) : null}
                                        </div>
                                    </Form>
                                </Col>

                                <Col lg={4}>
                                    <Form>
                                        <Form.Label htmlFor="confirm-password-input">Şifre Tekrarı</Form.Label>
                                        <div className="position-relative auth-pass-inputgroup">
                                            <Form.Control type={confirmPasswordShow ? "text" : "password"} className="pe-5 password-input" placeholder="Şifrenizi tekrar girin" id="confirm-password-input"
                                                name="confirm_password"
                                                autoComplete='off'
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.confirm_password || ""}
                                                isInvalid={
                                                    validation.touched.confirm_password && validation.errors.confirm_password ? true : false
                                                }
                                            />
                                            <Button variant='link' className="btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}><i className="ri-eye-fill align-middle"></i></Button>
                                            {validation.touched.confirm_password && validation.errors.confirm_password ? (
                                                <Form.Control.Feedback type="invalid"><div>{validation.errors.confirm_password}</div></Form.Control.Feedback>
                                            ) : null}
                                        </div>
                                    </Form>
                                </Col>

                                <Col lg={12}>
                                    <div>
                                        <Link to="#" className="link-primary text-decoration-underline">Şifrenizi mi unuttunuz?</Link>
                                    </div>
                                </Col>
                                <Col lg={12}>
                                    <div className="text-end">
                                        <Button variant='success' type="submit">Şifre Değiştir</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default ChangePassword;
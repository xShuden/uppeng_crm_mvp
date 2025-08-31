import React from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';

const SocialMedia = () => {
    return (
        <React.Fragment>
            <Row>
                <Col lg={4}>
                    <h5 className="fs-16">Sosyal Medya</h5>
                    <p className="text-muted mb-lg-0">Sosyal medya hesaplarınızı ve iletişim bilgilerinizi bu bölümden güncelleyebilirsiniz.</p>
                </Col>
                <Col lg={8}>
                    <Card>
                        <Card.Body>
                            <Row className="g-3">
                                <Col lg={4}>
                                    <div>
                                        <Form.Label htmlFor="facebook">Facebook</Form.Label>
                                        <Form.Control type="text" id="facebook" placeholder="Kullanıcı adı" defaultValue="GuzellikSalonuElite"/>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div>
                                        <Form.Label htmlFor="instagram">Instagram</Form.Label>
                                        <Form.Control type="text" id="instagram" placeholder="Kullanıcı adı" defaultValue="@guzellik_salonu_elite"/>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div>
                                        <Form.Label htmlFor="whatsappInput">Whatsapp</Form.Label>
                                        <Form.Control type="text" id="whatsappInput" placeholder="+90 (532) 123 45 67" defaultValue="+90 (532) 987 65 43"/>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div>
                                        <Form.Label htmlFor="twitterInput">Twitter</Form.Label>
                                        <Form.Control type="text" id="twitterInput" placeholder="Kullanıcı adı" defaultValue="@guzellik_elite"/>
                                    </div>
                                </Col>
                                <Col lg={12}>
                                    <div className="text-end">
                                        <Button variant='primary' type="submit">Sosyal Medya Güncelle</Button>
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

export default SocialMedia;
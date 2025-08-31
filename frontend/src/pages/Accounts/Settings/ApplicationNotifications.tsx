import React from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';

const ApplicationNotifications = () => {
    return (
        <React.Fragment>
            <Row>
                <Col lg={4}>
                    <h5 className="fs-16">Uygulama Bildirimleri:</h5>
                    <p className="text-muted mb-lg-0">Uygulama bildirimlerinizi buradan yönetebilirsiniz. E-posta ve push bildirim tercihlerinizi ayarlayabilirsiniz.</p>
                </Col>
                <Col lg={8}>
                    <Card>
                        <Card.Body>
                            <h6 className="fs-16">E-posta İle</h6>
                            <p className="text-muted">En son haberler, güncellemeler ve sektör eğitimlerini alın.</p>
                            
                            <Row className="g-3">
                                <Col lg={12}>
                                    <div className="form-check">
                                        <Form.Check type="checkbox" value="" id="ExclusiveProduct" />
                                        <Form.Label htmlFor="ExclusiveProduct" className='form-check-label'>
                                            Özel ürün teklifleri
                                        </Form.Label>
                                        <p className="text-muted">Sadece sizin için hazırlanmış özel indirim ve kampanya teklifleri.</p>
                                    </div>
                                </Col>
                                <Col lg={12}>
                                    <div className="form-check">
                                        <Form.Check type="checkbox" value="" id="dailyMessages"/>
                                        <Form.Label htmlFor="dailyMessages" className='form-check-label'>
                                            Günlük Mesajlar
                                        </Form.Label>
                                        <p className="text-muted">Günlük motivasyon ve bilgilendirme mesajları alın.</p>
                                    </div>
                                </Col>
                                <Col lg={12}>
                                    <div className="form-check">
                                        <Form.Check type="checkbox" value="" id="weeklyActivity" defaultChecked/>
                                        <Form.Label htmlFor="weeklyActivity" className='form-check-label'>
                                            Haftalık faaliyet özeti
                                        </Form.Label>
                                        <p className="text-muted">Haftalık performansınız ve aktivite özetinizi e-posta ile alın.</p>
                                    </div>
                                </Col>
                            </Row>

                            <h6 className="fs-16 mt-4">Bizden Bildirimler</h6>
                            <p className="text-muted">Sistem güncellemeleri ve yeni özellikler hakkında bilgi alın.</p>

                            <Row className="g-3">
                                <Col lg={4}>
                                    <div className="form-check">
                                        <Form.Check type="checkbox" value="" id="news&Upates" defaultChecked/>
                                        <Form.Label htmlFor="news&Upates">
                                            Haberler ve Güncellemeler
                                        </Form.Label>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div className="form-check">
                                        <Form.Check type="checkbox" value="" id="bestTrips"/>
                                        <Form.Label htmlFor="bestTrips">
                                            En İyi Fırsatlar
                                        </Form.Label>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div className="form-check">
                                        <Form.Check type="checkbox" value="" id="userResearch"/>
                                        <Form.Label htmlFor="userResearch">
                                            Kullanıcı Araştırmaları
                                        </Form.Label>
                                    </div>
                                </Col>
                            </Row>

                            <h6 className="fs-16 mt-4">Yorumlar</h6>
                            <p className="text-muted">Yorum bildirimlerinizi nasıl almak istediğinizi seçin.</p>
                            
                            <Row className="g-3">
                                <Col lg={4}>
                                    <div className="form-check">
                                        <Form.Check type="radio" name="commentsList" id="donotNotifyme"/>
                                        <Form.Label htmlFor="donotNotifyme">
                                            Beni bilgilendirme
                                        </Form.Label>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div className="form-check">
                                        <Form.Check type="radio" name="commentsList" id="mentionsOnly"/>
                                        <Form.Label htmlFor="mentionsOnly">
                                            Sadece bahsedilme
                                        </Form.Label>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div className="form-check">
                                        <Form.Check type="radio" name="commentsList" id="allcomment" defaultChecked/>
                                        <Form.Label htmlFor="allcomment">
                                            Tüm yorumlar
                                        </Form.Label>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ApplicationNotifications;
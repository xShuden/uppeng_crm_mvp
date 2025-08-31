import React from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import Flatpickr from "react-flatpickr";

const PersonalInformation = () => {
    return (
        <React.Fragment>
            <Row>
                <Col lg={4}>
                    <h5 className="fs-16">Kişisel Bilgiler</h5>
                    <p className="text-muted mb-lg-0">Kişisel bilgilerinizi bu bölümden güncelleyebilirsiniz. Lütfen bilgilerinizin doğru ve güncel olduğundan emin olun.</p>
                </Col>
                <Col lg={8}>
                    <Card>
                        <Card.Body>
                            <Row className="g-3">
                                <Col lg={6}>
                                    <div>
                                        <Form.Label htmlFor="firstName">Ad <span className="text-danger">*</span></Form.Label>
                                        <Form.Control type="text" id="firstName" placeholder="Adınızı girin" defaultValue="Ahmet"/>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div>
                                        <Form.Label htmlFor="lastName">Soyad <span className="text-danger">*</span></Form.Label>
                                        <Form.Control type="text" id="lastName" placeholder="Soyadınızı girin" defaultValue="Yılmaz"/>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div>
                                        <Form.Label htmlFor="emailInput">E-posta Adresi <span className="text-danger">*</span></Form.Label>
                                        <Form.Control type="text" id="emailInput" placeholder="isim@ornek.com" defaultValue="ahmet@ornek.com"/>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div>
                                        <Form.Label htmlFor="phoneInput">Telefon Numarası</Form.Label>
                                        <Form.Control type="text" id="phoneInput" placeholder="Telefon numaranızı girin" defaultValue="+90 (532) 123 45 67"/>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div>
                                        <Form.Label htmlFor="birdthdatInput">Katılım Tarihi</Form.Label>
                                        <Flatpickr
                                            className="form-control flatpickr-input"
                                            placeholder='Tarih Seç'
                                            options={{
                                                dateFormat: "d.m.Y",
                                                defaultDate: "24.11.2021",
                                                locale: {
                                                    weekdays: {
                                                        shorthand: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
                                                        longhand: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']
                                                    },
                                                    months: {
                                                        shorthand: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
                                                        longhand: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div>
                                        <Form.Label htmlFor="designationInput">Ünvan</Form.Label>
                                        <Form.Control type="text" id="designationInput" placeholder="Ünvan" defaultValue="Satış ve Pazarlama Müdürü"/>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div>
                                        <Form.Label htmlFor="websiteInput1">Web Sitesi</Form.Label>
                                        <Form.Control type="text" id="websiteInput1" placeholder="www.ornek.com" defaultValue="www.orneksite.com"/>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div>
                                        <Form.Label htmlFor="cityInput">Şehir</Form.Label>
                                        <Form.Control type="text" id="cityInput" placeholder="Şehir" defaultValue="İstanbul"/>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div>
                                        <Form.Label htmlFor="countryInput">Ülke</Form.Label>
                                        <Form.Control type="text" id="countryInput" placeholder="Ülke" defaultValue="Türkiye"/>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div>
                                        <Form.Label htmlFor="zipcodeInput">Posta Kodu</Form.Label>
                                        <Form.Control type="text" id="zipcodeInput" placeholder="Posta kodunu girin" defaultValue="34000"/>
                                    </div>
                                </Col>
                                <Col lg={12}>
                                    <div className="text-end">
                                        <Button variant='secondary' type="submit">Profili Güncelle</Button>
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

export default PersonalInformation;
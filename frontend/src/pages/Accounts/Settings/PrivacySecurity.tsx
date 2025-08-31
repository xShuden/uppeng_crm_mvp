import React from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PrivacySecurity = () => {
    return (
        <React.Fragment>
            <Row>
                <Col lg={4}>
                    <h5 className="fs-16">Gizlilik ve Güvenlik</h5>
                    <p className="text-muted mb-lg-0">Hesabınızın güvenliği ve gizliliğiniz bizim için önemlidir. Güvenlik ayarlarınızı buradan yönetebilirsiniz.</p>
                </Col>
                <Col lg={8}>
                    <Card >
                        <Card.Body>
                            <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0">
                                <div className="flex-grow-1">
                                    <h6 className="fs-16 mb-1">İki Faktörlü Doğrulama</h6>
                                    <p className="text-muted">İki faktörlü doğrulama gelişmiş bir güvenlik ön lemidir. Etkinleştirildiğinde, giriş yaparken iki tür kimlik doğrulaması gerekir. Google Authenticator ve SMS desteklenir.</p>
                                </div>
                                <div className="flex-shrink-0 ms-sm-3">
                                    <Link to="#" className="btn btn-sm btn-primary">İki Faktörlü Doğrulamayı Etkinleştir</Link>
                                </div>
                            </div>

                            <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0 mt-2">
                                <div className="flex-grow-1">
                                    <h6 className="fs-16 mb-1">İkincil Doğrulama</h6>
                                    <p className="text-muted">İlk faktör şifrenizdir, ikincisi genellikle akıllı telefonunuza gönderilen kod veya parmak izi, yüz tanıma gibi biyometrik yöntemlerdir.</p>
                                </div>
                                <div className="flex-shrink-0 ms-sm-3">
                                    <Link to="#" className="btn btn-sm btn-primary">İkincil Yöntem Ayarla</Link>
                                </div>
                            </div>

                            <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0 mt-2">
                                <div className="flex-grow-1">
                                    <h6 className="fs-16 mb-1">Yedek Kodlar</h6>
                                    <p className="text-muted mb-sm-0">İki faktörlü doğrulamayı etkinleştirdiğinizde otomatik olarak yedek kodlar oluşturulur. Acil durumlar için bu kodları güvenli bir yerde saklayın.</p>
                                </div>
                                <div className="flex-shrink-0 ms-sm-3">
                                    <Link to="#" className="btn btn-sm btn-primary">Yedek Kod Üret</Link>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h5 className="card-title text-decoration-underline mb-3">Bu Hesabı Sil:</h5>
                                <p className="text-muted">Hesabınızı silmek için şifrenizi girin. Bu işlem geri alınamaz ve tüm verileriniz kalıcı olarak silinir:</p>
                                <div>
                                    <Form.Control type="password" id="passwordInput" placeholder="Şifrenizi girin" defaultValue="" style={{maxWidth: "265px"}}/>
                                </div>
                                <div className="hstack gap-2 mt-3">
                                    <Link to="#" className="btn btn-soft-danger">Hesabı Kapat ve Sil</Link>
                                    <Link to="#" className="btn btn-soft-dark">İptal</Link>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default PrivacySecurity;
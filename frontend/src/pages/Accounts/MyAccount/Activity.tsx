import React from 'react';
import { Card, Col, Dropdown, Row } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';


// Import Images
import img4 from 'assets/images/products/img-4.png'
import img6 from 'assets/images/products/img-6.png'
import img7 from 'assets/images/products/img-7.png'

const Acitivity = () => {
    return (
        <React.Fragment>
            <Row>
                <Col xxl={12} lg={12}>
                    <Card>
                        <Card.Header className="d-flex align-items-center">
                            <h5 className="card-title mb-0 flex-grow-1">Aktiviteler</h5>
                            <div className="flex-shrink-0">
                                <Dropdown>
                                    <Dropdown.Toggle href="#" className="arrow-none btn btn-ghost-primary btn-sm btn-icon" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="ph-dots-three-outline"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu as="ul">
                                        <li><Dropdown.Item href="/#">Tümünü Göster</Dropdown.Item></li>
                                        <li><Dropdown.Item href="/#">Filtrele</Dropdown.Item></li>
                                        <li><Dropdown.Item href="/#">Dışa Aktar</Dropdown.Item></li>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <SimpleBar data-simplebar style={{ maxHeight: "440px" }}>
                                <div className="acitivity-timeline acitivity-main">
                                    <div className="acitivity-item d-flex">
                                        <div className="flex-shrink-0 acitivity-avatar"></div>
                                        <div className="flex-grow-1 ms-3">
                                            <h6 className="mb-0 lh-base">Ayşe Demir tarafından randevu</h6>
                                            <p className="mb-2 text-muted"><small>Bugün 14:30</small></p>
                                            <p className="text-muted mb-0">Saç kesimi ve boyama hizmeti</p>
                                        </div>
                                    </div>
                                    <div className="acitivity-item py-3 d-flex">
                                        <div className="flex-shrink-0">
                                            <div className="acitivity-avatar"></div>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h6 className="mb-0 lh-base">Bugünkü kampanya <Link to="#" className="link-secondary">Güzellik Salonu</Link> tarafından</h6>
                                            <p className="mb-2 text-muted"><small>15:14 - 18 Oca, 2023</small></p>
                                            <p className="text-muted mb-0">500 TL ve üzerindeki hizmetlerde %20 indirim fırsatı.</p>
                                        </div>
                                    </div>
                                    <div className="acitivity-item py-3 d-flex">
                                        <div className="flex-shrink-0 acitivity-avatar">
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h6 className="mb-0 lh-base">Yeni <span className="fw-semibold">saç modeli koleksiyonu</span> eklendi</h6>
                                            <p className="mb-2 text-muted"><small>Dün 21:47</small></p>
                                            <p className="text-muted mb-2">Elite Güzellik Salonu tarafından</p>
                                            <div className="d-inline-flex gap-2 border border-dashed p-2">
                                                <Link to="#" className="bg-success-subtle rounded p-3 avatar-md flex-shrink-0">
                                                    <img src={img4} alt="" className="img-fluid d-block" />
                                                </Link>
                                                <Link to="#" className="bg-warning-subtle rounded p-3 avatar-md flex-shrink-0">
                                                    <img src={img6} alt="" className="img-fluid d-block" />
                                                </Link>
                                                <Link to="#" className="bg-info-subtle rounded p-3 avatar-md flex-shrink-0">
                                                    <img src={img7} alt="" className="img-fluid d-block" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="acitivity-item py-3 d-flex">
                                        <div className="flex-shrink-0">
                                            <div className="acitivity-avatar"></div>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h6 className="mb-0 lh-base">Zeynep Kaya favorilerine ekledi</h6>
                                            <p className="mb-2 text-muted"><small>04:30 - 29 Ara, 2023</small></p>
                                            <p className="text-muted mb-0">Müşteri saç boyama hizmetini favorilerine ekledi.</p>
                                        </div>
                                    </div>
                                    <div className="acitivity-item py-3 d-flex">
                                        <div className="flex-shrink-0">
                                            <div className="acitivity-avatar">
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h6 className="mb-0 lh-base">Yeni müşteri kaydı</h6>
                                            <p className="mb-2 text-muted"><small>13:14 - 24 Kas, 2023</small></p>
                                            <p className="text-muted mb-0">Mehmet Ali sisteme yeni müşteri olarak kayıt oldu.</p>
                                        </div>
                                    </div>
                                    <div className="acitivity-item py-3 d-flex">
                                        <div className="flex-shrink-0">
                                            <div className="acitivity-avatar">
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h6 className="mb-0 lh-base">Fırsat kampanyası <span className="text-primary">yarın başlıyor.</span></h6>
                                            <p className="mb-2 text-muted"><small>11:15 - 29 Eki, 2023</small></p>
                                            <p className="text-muted mb-0">Kampanya düzenleyen: <Link to="#" className="link-secondary fw-medium">Elite Güzellik Merkezi</Link></p>
                                        </div>
                                    </div>
                                    <div className="acitivity-item py-3 d-flex">
                                        <div className="flex-shrink-0">
                                            <div className="acitivity-avatar"></div>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h6 className="mb-0 lh-base">Aylık satış raporu</h6>
                                            <p className="mb-2 text-muted"><small>16:57 - 11 Eyl, 2023</small></p>
                                            <p className="text-muted mb-0"><span className="text-danger">1 gün kaldı</span> aylık satış raporunu teslim etmek için. <Link to="#" className="link-warning text-decoration-underline">Rapor Merkezi</Link></p>
                                        </div>
                                    </div>
                                    <div className="acitivity-item d-flex">
                                        <div className="flex-shrink-0 acitivity-avatar"></div>
                                        <div className="flex-grow-1 ms-3">
                                            <h6 className="mb-0 lh-base">Fatma Özkan Değerlendirmesi</h6>
                                            <p className="mb-2 text-muted"><small>16:57 - 26 Ağu, 2023</small></p>
                                            <p className="text-warning mb-2"><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i></p>
                                            <p className="text-muted mb-0 fst-italic">" Harika bir hizmet aldım, kesinlikle tavsiye ederim. "</p>
                                        </div>
                                    </div>
                                </div>
                            </SimpleBar>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Acitivity;
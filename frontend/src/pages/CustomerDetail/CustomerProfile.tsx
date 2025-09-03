import React, { useState } from 'react';
import { Button, Card, Col, Dropdown, Row, Table, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Import Images
import img2 from 'assets/images/users/avatar-2.jpg'

const CustomerProfile = () => {
    const [modal_EditCustomerModals, setmodal_EditCustomerModals] = useState<boolean>(false);
    const [modal_EditNotes, setmodal_EditNotes] = useState<boolean>(false);

    function tog_EditCustomerModals() {
        setmodal_EditCustomerModals(!modal_EditCustomerModals);
    }

    function tog_EditNotes() {
        setmodal_EditNotes(!modal_EditNotes);
    }

    return (
        <React.Fragment>
            <Row>
                <Col xxl={12}>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col lg={3}>
                                    <div className="profile-user-img position-relative">
                                        <img src={img2} alt="" className="rounded object-fit-cover" />
                                        <span className="position-absolute top-0 start-100 translate-middle badge border border-3 border-white rounded-circle bg-success p-1 mt-1 me-1"><span className="visually-hidden">unread messages</span></span>
                                    </div>
                                </Col>
                                <Col lg={9}>
                                    <div className="d-flex border-bottom border-bottom-dashed pb-3 mb-3 mt-4 mt-lg-0">
                                        <div className="flex-grow-1">
                                            <h5>Ayşe Demir</h5>
                                            <p className="text-muted mb-0">VIP Müşteri</p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <Dropdown>
                                                <Dropdown.Toggle className="btn btn-ghost-secondary btn-icon btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="bi bi-three-dots-vertical"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="dropdown-menu-end">
                                                    <li><a className="dropdown-item" href="#" onClick={tog_EditCustomerModals}><i className="bi bi-pencil align-baseline me-1"></i> Düzenle</a></li>
                                                    <li><Link className="dropdown-item" to="/reservation-list"><i className="bi bi-calendar-check align-baseline me-1"></i> Randevu Al</Link></li>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    <Row>
                                        <Col sm={6}>
                                            <p className="text-muted mb-1">Email</p>
                                            <h6 className="mb-0">ayse.demir@email.com</h6>
                                        </Col>
                                        <Col sm={6}>
                                            <p className="text-muted mb-1">Telefon</p>
                                            <h6 className="mb-0">+(90) 555 987 6543</h6>
                                        </Col>
                                        <Col sm={6}>
                                            <p className="text-muted mb-1">İlk Ziyaret</p>
                                            <h6 className="mb-0">12.01.2024</h6>
                                        </Col>
                                        <Col sm={6}>
                                            <p className="text-muted mb-1">Son Ziyaret</p>
                                            <h6 className="mb-0">25.08.2025</h6>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col xxl={6}>
                    <Card>
                        <Card.Header>
                            <h6 className="mb-0">İstatistikler</h6>
                        </Card.Header>
                        <Card.Body>
                            <Table className="table-borderless mb-0">
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="avatar-xs flex-shrink-0 me-3">
                                                    <span className="avatar-title bg-success-subtle text-success rounded-circle fs-16">
                                                        <i className="bi bi-calendar-check"></i>
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-muted mb-1">Toplam Ziyaret</p>
                                                    <h5 className="mb-0">18</h5>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="avatar-xs flex-shrink-0 me-3">
                                                    <span className="avatar-title bg-info-subtle text-info rounded-circle fs-16">
                                                        <i className="bi bi-clock-history"></i>
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-muted mb-1">Toplam Süre</p>
                                                    <h5 className="mb-0">24 saat</h5>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xxl={6}>
                    <Card>
                        <Card.Header>
                            <h6 className="mb-0">Müşteri Bilgileri</h6>
                        </Card.Header>
                        <Card.Body>
                            <div className="mb-4">
                                <h6 className="mb-3">Tercih Edilen Hizmetler</h6>
                                <div className="d-flex flex-wrap gap-2">
                                    <span className="badge bg-primary-subtle text-primary">Protez Takılması</span>
                                    <span className="badge bg-success-subtle text-success">Makyaj</span>
                                    <span className="badge bg-info-subtle text-info">Cilt Bakımı</span>
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <h6 className="mb-3">Tercih Edilen Personel</h6>
                                <p className="text-muted mb-0">Dr. Mehmet Yılmaz</p>
                            </div>

                            <div>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h6 className="mb-0">Notlar</h6>
                                    <Button variant="outline-primary" size="sm" onClick={tog_EditNotes}>
                                        <i className="bi bi-pencil me-1"></i>Düzenle
                                    </Button>
                                </div>
                                <p className="text-muted mb-0">Hassas cilde sahip. Özel ürünler kullanılmalı. Randevularda gecikmeler olabiliyor.</p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col xxl={12}>
                    <Card>
                        <Card.Header>
                            <h6 className="mb-0">Son Randevular</h6>
                        </Card.Header>
                        <Card.Body>
                            <Table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Tarih</th>
                                        <th>Hizmet</th>
                                        <th>Personel</th>
                                        <th>Süre</th>
                                        <th>Ücret</th>
                                        <th>Durum</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>25.08.2025</td>
                                        <td>Protez Takılması</td>
                                        <td>Dr. Mehmet Yılmaz</td>
                                        <td>2 saat</td>
                                        <td>₺500.00</td>
                                        <td><span className="badge bg-success-subtle text-success">Tamamlandı</span></td>
                                    </tr>
                                    <tr>
                                        <td>10.07.2025</td>
                                        <td>Makyaj</td>
                                        <td>Zeynep Şahin</td>
                                        <td>1.5 saat</td>
                                        <td>₺300.00</td>
                                        <td><span className="badge bg-success-subtle text-success">Tamamlandı</span></td>
                                    </tr>
                                    <tr>
                                        <td>28.06.2025</td>
                                        <td>Cilt Bakımı</td>
                                        <td>Fatma Kaya</td>
                                        <td>1 saat</td>
                                        <td>₺250.00</td>
                                        <td><span className="badge bg-success-subtle text-success">Tamamlandı</span></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Edit Customer Modal */}
            <Modal show={modal_EditCustomerModals} onHide={tog_EditCustomerModals} centered>
                <Modal.Header closeButton className="bg-light p-3">
                    <Modal.Title id="exampleModalLabel">Müşteri Düzenle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-muted mb-4">Müşteri bilgilerini düzenlemek için formu doldurun.</p>
                    
                    <div className="mb-3">
                        <label htmlFor="customerName" className="form-label">Ad Soyad</label>
                        <input type="text" className="form-control" id="customerName" defaultValue="Ayşe Demir" />
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="customerEmail" className="form-label">Email</label>
                        <input type="email" className="form-control" id="customerEmail" defaultValue="ayse.demir@email.com" />
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="customerPhone" className="form-label">Telefon</label>
                        <input type="text" className="form-control" id="customerPhone" defaultValue="+(90) 555 987 6543" />
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="customerType" className="form-label">Müşteri Tipi</label>
                        <select className="form-select" id="customerType">
                            <option value="regular">Normal Müşteri</option>
                            <option value="vip" selected>VIP Müşteri</option>
                            <option value="student">Öğrenci</option>
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="ghost-danger" onClick={tog_EditCustomerModals}>İptal</Button>
                    <Button variant="primary">Kaydet</Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Notes Modal */}
            <Modal show={modal_EditNotes} onHide={tog_EditNotes} centered>
                <Modal.Header closeButton className="bg-light p-3">
                    <Modal.Title id="editNotesModal">Notları Düzenle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-muted mb-4">Ayşe Demir için müşteri notlarını düzenleyin.</p>
                    
                    <div className="mb-3">
                        <label htmlFor="customerNotes" className="form-label">Müşteri Notları</label>
                        <textarea 
                            className="form-control" 
                            id="customerNotes" 
                            rows={6} 
                            defaultValue="Hassas cilde sahip. Özel ürünler kullanılmalı. Randevularda gecikmeler olabiliyor."
                            placeholder="Müşteri hakkında notlar ekleyin..."
                        ></textarea>
                        <div className="form-text">Müşteriye özel bilgiler, tercihler, alerji durumları vb. bilgileri buraya ekleyebilirsiniz.</div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="ghost-danger" onClick={tog_EditNotes}>İptal</Button>
                    <Button variant="primary">Kaydet</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
};

export default CustomerProfile;
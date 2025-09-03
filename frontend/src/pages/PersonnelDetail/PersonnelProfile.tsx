import React, { useState } from 'react';
import { Button, Card, Col, Dropdown, Row, Table, Modal, Nav, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Import Images
import img1 from 'assets/images/users/avatar-1.jpg'

const PersonnelProfile = () => {
    const [modal_EditPersonnelModals, setmodal_EditPersonnelModals] = useState<boolean>(false);
    const [modal_DeletePersonnelModals, setmodal_DeletePersonnelModals] = useState<boolean>(false);
    const [modal_EditWorkHours, setmodal_EditWorkHours] = useState<boolean>(false);
    const [modal_AddLeave, setmodal_AddLeave] = useState<boolean>(false);
    const [modal_DeleteLeave, setmodal_DeleteLeave] = useState<boolean>(false);

    function tog_EditPersonnelModals() {
        setmodal_EditPersonnelModals(!modal_EditPersonnelModals);
    }

    function tog_DeletePersonnelModals() {
        setmodal_DeletePersonnelModals(!modal_DeletePersonnelModals);
    }

    function tog_EditWorkHours() {
        setmodal_EditWorkHours(!modal_EditWorkHours);
    }

    function tog_AddLeave() {
        setmodal_AddLeave(!modal_AddLeave);
    }

    function tog_DeleteLeave() {
        setmodal_DeleteLeave(!modal_DeleteLeave);
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
                                        <img src={img1} alt="" className="rounded object-fit-cover" />
                                        <span className="position-absolute top-0 start-100 translate-middle badge border border-3 border-white rounded-circle bg-success p-1 mt-1 me-1"><span className="visually-hidden">unread messages</span></span>
                                    </div>
                                </Col>
                                <Col lg={9}>
                                    <div className="d-flex border-bottom border-bottom-dashed pb-3 mb-3 mt-4 mt-lg-0">
                                        <div className="flex-grow-1">
                                            <h5>Dr. Mehmet Yılmaz</h5>
                                            <p className="text-muted mb-0">Protez Uzmanı</p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <Dropdown>
                                                <Dropdown.Toggle className="btn btn-ghost-secondary btn-icon btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="bi bi-three-dots-vertical"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="dropdown-menu-end">
                                                    <li><a className="dropdown-item" href="#" onClick={tog_EditPersonnelModals}><i className="bi bi-pencil align-baseline me-1"></i> Düzenle</a></li>
                                                    <li><a className="dropdown-item" href="#" onClick={tog_EditWorkHours}><i className="bi bi-clock align-baseline me-1"></i> Çalışma Saatleri</a></li>
                                                    <li><a className="dropdown-item" href="#" onClick={tog_DeletePersonnelModals}><i className="bi bi-trash align-baseline me-1"></i> Sil</a></li>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    <Row>
                                        <Col sm={6}>
                                            <p className="text-muted mb-1">Email</p>
                                            <h6 className="mb-0">mehmet.yilmaz@salon.com</h6>
                                        </Col>
                                        <Col sm={6}>
                                            <p className="text-muted mb-1">Telefon</p>
                                            <h6 className="mb-0">+(90) 555 123 4567</h6>
                                        </Col>
                                        <Col sm={6}>
                                            <p className="text-muted mb-1">Başlama Tarihi</p>
                                            <h6 className="mb-0">15.03.2023</h6>
                                        </Col>
                                        <Col sm={12}>
                                            <p className="text-muted mb-1">Durum</p>
                                            <h6 className="mb-0">
                                                <span className="badge bg-success-subtle text-success">Aktif</span>
                                            </h6>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col xxl={12}>
                    <Tab.Container defaultActiveKey="general">
                        <Card>
                            <Card.Header>
                                <Nav variant="pills" className="nav-pills-custom">
                                    <Nav.Item>
                                        <Nav.Link eventKey="general">Genel Bilgiler</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="schedule">Çalışma Programı</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="leaves">İzin Çizelgesi</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="history">Çalışma Geçmişi</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body>
                                <Tab.Content>
                                    <Tab.Pane eventKey="general">
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
                                                                                    <i className="bi bi-people"></i>
                                                                                </span>
                                                                            </div>
                                                                            <div>
                                                                                <p className="text-muted mb-1">Toplam Müşteri</p>
                                                                                <h5 className="mb-0">234</h5>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="d-flex align-items-center">
                                                                            <div className="avatar-xs flex-shrink-0 me-3">
                                                                                <span className="avatar-title bg-info-subtle text-info rounded-circle fs-16">
                                                                                    <i className="bi bi-calendar-check"></i>
                                                                                </span>
                                                                            </div>
                                                                            <div>
                                                                                <p className="text-muted mb-1">Toplam Randevu</p>
                                                                                <h5 className="mb-0">456</h5>
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
                                                        <h6 className="mb-0">Uzmanlık Alanları</h6>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <div className="d-flex flex-wrap gap-2">
                                                            <span className="badge bg-primary-subtle text-primary">Protez Takılması</span>
                                                            <span className="badge bg-success-subtle text-success">Diş Beyazlatma</span>
                                                            <span className="badge bg-info-subtle text-info">İmplant</span>
                                                            <span className="badge bg-warning-subtle text-warning">Ortodonti</span>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="schedule">
                                        <Row>
                                            <Col xxl={8}>
                                                <Card>
                                                    <Card.Header className="d-flex justify-content-between align-items-center">
                                                        <h6 className="mb-0">Haftalık Çalışma Programı</h6>
                                                        <Button variant="outline-primary" size="sm" onClick={tog_EditWorkHours}>
                                                            <i className="bi bi-pencil me-1"></i>Düzenle
                                                        </Button>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <Table className="table-striped">
                                                            <thead>
                                                                <tr>
                                                                    <th>Gün</th>
                                                                    <th>Başlangıç</th>
                                                                    <th>Bitiş</th>
                                                                    <th>Durum</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td className="fw-medium">Pazartesi</td>
                                                                    <td>09:00</td>
                                                                    <td>18:00</td>
                                                                    <td><span className="badge bg-success-subtle text-success">Aktif</span></td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="fw-medium">Salı</td>
                                                                    <td>09:00</td>
                                                                    <td>18:00</td>
                                                                    <td><span className="badge bg-success-subtle text-success">Aktif</span></td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="fw-medium">Çarşamba</td>
                                                                    <td>09:00</td>
                                                                    <td>18:00</td>
                                                                    <td><span className="badge bg-success-subtle text-success">Aktif</span></td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="fw-medium">Perşembe</td>
                                                                    <td>09:00</td>
                                                                    <td>18:00</td>
                                                                    <td><span className="badge bg-success-subtle text-success">Aktif</span></td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="fw-medium">Cuma</td>
                                                                    <td>09:00</td>
                                                                    <td>18:00</td>
                                                                    <td><span className="badge bg-success-subtle text-success">Aktif</span></td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="fw-medium">Cumartesi</td>
                                                                    <td>10:00</td>
                                                                    <td>16:00</td>
                                                                    <td><span className="badge bg-success-subtle text-success">Aktif</span></td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="fw-medium">Pazar</td>
                                                                    <td>-</td>
                                                                    <td>-</td>
                                                                    <td><span className="badge bg-danger-subtle text-danger">Kapalı</span></td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            
                                            <Col xxl={4}>
                                                <Card>
                                                    <Card.Header>
                                                        <h6 className="mb-0">Bu Hafta</h6>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <div className="mb-3">
                                                            <p className="text-muted mb-1">Toplam Çalışma Saati</p>
                                                            <h5 className="mb-0">48 saat</h5>
                                                        </div>
                                                        <div className="mb-3">
                                                            <p className="text-muted mb-1">Çalışma Günü</p>
                                                            <h5 className="mb-0">6 gün</h5>
                                                        </div>
                                                        <div>
                                                            <p className="text-muted mb-1">Bugünkü Durum</p>
                                                            <h5 className="mb-0">
                                                                <span className="badge bg-warning-subtle text-warning">İzinli</span>
                                                            </h5>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="leaves">
                                        <Row>
                                            <Col xxl={12}>
                                                <Card>
                                                    <Card.Header className="d-flex justify-content-between align-items-center">
                                                        <h6 className="mb-0">İzin Geçmişi</h6>
                                                        <Button variant="outline-success" size="sm" onClick={tog_AddLeave}>
                                                            <i className="bi bi-plus me-1"></i>Yeni İzin
                                                        </Button>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <Table className="table-hover">
                                                            <thead>
                                                                <tr>
                                                                    <th>Başlangıç</th>
                                                                    <th>Bitiş</th>
                                                                    <th>Süre</th>
                                                                    <th>Tür</th>
                                                                    <th>Sebep</th>
                                                                    <th>İşlem</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>03.09.2025</td>
                                                                    <td>03.09.2025</td>
                                                                    <td>1 gün</td>
                                                                    <td><span className="badge bg-info-subtle text-info">Hastalık</span></td>
                                                                    <td>Grip</td>
                                                                    <td>
                                                                        <Button variant="ghost-danger" size="sm" onClick={tog_DeleteLeave}>
                                                                            <i className="ri-delete-bin-line"></i>
                                                                        </Button>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>20.08.2025</td>
                                                                    <td>25.08.2025</td>
                                                                    <td>5 gün</td>
                                                                    <td><span className="badge bg-primary-subtle text-primary">Yıllık</span></td>
                                                                    <td>Tatil</td>
                                                                    <td>
                                                                        <Button variant="ghost-danger" size="sm" onClick={tog_DeleteLeave}>
                                                                            <i className="ri-delete-bin-line"></i>
                                                                        </Button>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>10.07.2025</td>
                                                                    <td>12.07.2025</td>
                                                                    <td>2 gün</td>
                                                                    <td><span className="badge bg-success-subtle text-success">Resmi Tatil</span></td>
                                                                    <td>Kurban Bayramı</td>
                                                                    <td>
                                                                        <Button variant="ghost-danger" size="sm" onClick={tog_DeleteLeave}>
                                                                            <i className="ri-delete-bin-line"></i>
                                                                        </Button>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="history">
                                        <Row>
                                            <Col xxl={8}>
                                                <Card>
                                                    <Card.Header>
                                                        <h6 className="mb-0">Son Çalışma Günleri</h6>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <Table className="table-hover">
                                                            <thead>
                                                                <tr>
                                                                    <th>Tarih</th>
                                                                    <th>Giriş</th>
                                                                    <th>Çıkış</th>
                                                                    <th>Toplam Süre</th>
                                                                    <th>Müşteri Sayısı</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>02.09.2025</td>
                                                                    <td>09:00</td>
                                                                    <td>18:15</td>
                                                                    <td>8s 30dk</td>
                                                                    <td>7</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>30.08.2025</td>
                                                                    <td>09:15</td>
                                                                    <td>18:00</td>
                                                                    <td>8s 15dk</td>
                                                                    <td>5</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>29.08.2025</td>
                                                                    <td>08:45</td>
                                                                    <td>19:30</td>
                                                                    <td>9s 30dk</td>
                                                                    <td>9</td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            
                                            <Col xxl={4}>
                                                <Card>
                                                    <Card.Header>
                                                        <h6 className="mb-0">Bu Ayki Özet</h6>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <div className="mb-3">
                                                            <p className="text-muted mb-1">Çalışılan Gün</p>
                                                            <h5 className="mb-0">22 gün</h5>
                                                        </div>
                                                        <div className="mb-3">
                                                            <p className="text-muted mb-1">Toplam Süre</p>
                                                            <h5 className="mb-0">186 saat</h5>
                                                        </div>
                                                        <div>
                                                            <p className="text-muted mb-1">Toplam Müşteri</p>
                                                            <h5 className="mb-0">145</h5>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Card.Body>
                        </Card>
                    </Tab.Container>
                </Col>
            </Row>

            {/* Edit Personnel Modal */}
            <Modal show={modal_EditPersonnelModals} onHide={tog_EditPersonnelModals} centered>
                <Modal.Header closeButton className="bg-light p-3">
                    <Modal.Title id="exampleModalLabel">Personel Düzenle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-muted mb-4">Personel bilgilerini düzenlemek için formu doldurun.</p>
                    
                    <div className="mb-3">
                        <label htmlFor="personnelName" className="form-label">Ad Soyad</label>
                        <input type="text" className="form-control" id="personnelName" defaultValue="Dr. Mehmet Yılmaz" />
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="personnelEmail" className="form-label">Email</label>
                        <input type="email" className="form-control" id="personnelEmail" defaultValue="mehmet.yilmaz@salon.com" />
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="personnelPhone" className="form-label">Telefon</label>
                        <input type="text" className="form-control" id="personnelPhone" defaultValue="+(90) 555 123 4567" />
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="personnelPosition" className="form-label">Pozisyon</label>
                        <input type="text" className="form-control" id="personnelPosition" defaultValue="Protez Uzmanı" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="ghost-danger" onClick={tog_EditPersonnelModals}>İptal</Button>
                    <Button variant="primary">Kaydet</Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Personnel Modal */}
            <Modal show={modal_DeletePersonnelModals} onHide={tog_DeletePersonnelModals} centered>
                <Modal.Header closeButton className="bg-light p-3">
                    <Modal.Title id="exampleModalLabel">Personel Sil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mt-2 text-center">
                        <div className="avatar-lg mx-auto mb-4">
                            <div className="avatar-title bg-danger-subtle text-danger rounded-circle display-6">
                                <i className="bi bi-exclamation-triangle"></i>
                            </div>
                        </div>
                        <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                            <h4>Emin misiniz?</h4>
                            <p className="text-muted mx-4 mb-0">Dr. Mehmet Yılmaz adlı personeli silmek istediğinizden emin misiniz?</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="ghost-danger" onClick={tog_DeletePersonnelModals}>İptal</Button>
                    <Button variant="danger">Evet, Sil!</Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Work Hours Modal */}
            <Modal show={modal_EditWorkHours} onHide={tog_EditWorkHours} centered size="lg">
                <Modal.Header closeButton className="bg-light p-3">
                    <Modal.Title id="editWorkHoursModal">Çalışma Saatleri Düzenle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-muted mb-4">Dr. Mehmet Yılmaz için haftalık çalışma saatlerini düzenleyin.</p>
                    
                    <Table className="table-striped">
                        <thead>
                            <tr>
                                <th style={{width: '25%'}}>Gün</th>
                                <th style={{width: '20%'}}>Aktif</th>
                                <th style={{width: '25%'}}>Başlangıç</th>
                                <th style={{width: '30%'}}>Bitiş</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="fw-medium align-middle">Pazartesi</td>
                                <td>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="monday" defaultChecked />
                                        <label className="form-check-label" htmlFor="monday"></label>
                                    </div>
                                </td>
                                <td><input type="time" className="form-control" defaultValue="09:00" /></td>
                                <td><input type="time" className="form-control" defaultValue="18:00" /></td>
                            </tr>
                            <tr>
                                <td className="fw-medium align-middle">Salı</td>
                                <td>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="tuesday" defaultChecked />
                                        <label className="form-check-label" htmlFor="tuesday"></label>
                                    </div>
                                </td>
                                <td><input type="time" className="form-control" defaultValue="09:00" /></td>
                                <td><input type="time" className="form-control" defaultValue="18:00" /></td>
                            </tr>
                            <tr>
                                <td className="fw-medium align-middle">Çarşamba</td>
                                <td>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="wednesday" defaultChecked />
                                        <label className="form-check-label" htmlFor="wednesday"></label>
                                    </div>
                                </td>
                                <td><input type="time" className="form-control" defaultValue="09:00" /></td>
                                <td><input type="time" className="form-control" defaultValue="18:00" /></td>
                            </tr>
                            <tr>
                                <td className="fw-medium align-middle">Perşembe</td>
                                <td>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="thursday" defaultChecked />
                                        <label className="form-check-label" htmlFor="thursday"></label>
                                    </div>
                                </td>
                                <td><input type="time" className="form-control" defaultValue="09:00" /></td>
                                <td><input type="time" className="form-control" defaultValue="18:00" /></td>
                            </tr>
                            <tr>
                                <td className="fw-medium align-middle">Cuma</td>
                                <td>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="friday" defaultChecked />
                                        <label className="form-check-label" htmlFor="friday"></label>
                                    </div>
                                </td>
                                <td><input type="time" className="form-control" defaultValue="09:00" /></td>
                                <td><input type="time" className="form-control" defaultValue="18:00" /></td>
                            </tr>
                            <tr>
                                <td className="fw-medium align-middle">Cumartesi</td>
                                <td>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="saturday" defaultChecked />
                                        <label className="form-check-label" htmlFor="saturday"></label>
                                    </div>
                                </td>
                                <td><input type="time" className="form-control" defaultValue="10:00" /></td>
                                <td><input type="time" className="form-control" defaultValue="16:00" /></td>
                            </tr>
                            <tr>
                                <td className="fw-medium align-middle">Pazar</td>
                                <td>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="sunday" />
                                        <label className="form-check-label" htmlFor="sunday"></label>
                                    </div>
                                </td>
                                <td><input type="time" className="form-control" disabled /></td>
                                <td><input type="time" className="form-control" disabled /></td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="ghost-danger" onClick={tog_EditWorkHours}>İptal</Button>
                    <Button variant="primary">Kaydet</Button>
                </Modal.Footer>
            </Modal>

            {/* Add Leave Modal */}
            <Modal show={modal_AddLeave} onHide={tog_AddLeave} centered>
                <Modal.Header closeButton className="bg-light p-3">
                    <Modal.Title id="addLeaveModal">Yeni İzin Ekle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-muted mb-4">Dr. Mehmet Yılmaz için yeni izin kaydı oluşturun.</p>
                    
                    <div className="mb-3">
                        <label htmlFor="leaveType" className="form-label">İzin Türü</label>
                        <select className="form-select" id="leaveType">
                            <option value="">İzin türü seçin</option>
                            <option value="annual">Yıllık İzin</option>
                            <option value="sick">Hastalık İzni</option>
                            <option value="personal">Kişisel İzin</option>
                            <option value="maternity">Doğum İzni</option>
                            <option value="paternity">Babalık İzni</option>
                            <option value="emergency">Acil İzin</option>
                        </select>
                    </div>
                    
                    <Row>
                        <Col md={6}>
                            <div className="mb-3">
                                <label htmlFor="startDate" className="form-label">Başlangıç Tarihi</label>
                                <input type="date" className="form-control" id="startDate" lang="tr" />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="mb-3">
                                <label htmlFor="endDate" className="form-label">Bitiş Tarihi</label>
                                <input type="date" className="form-control" id="endDate" lang="tr" />
                            </div>
                        </Col>
                    </Row>
                    
                    <div className="mb-3">
                        <label htmlFor="leaveReason" className="form-label">Sebep</label>
                        <textarea className="form-control" id="leaveReason" rows={3} placeholder="İzin sebebini açıklayın..."></textarea>
                    </div>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="ghost-danger" onClick={tog_AddLeave}>İptal</Button>
                    <Button variant="success">İzin Ekle</Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Leave Modal */}
            <Modal show={modal_DeleteLeave} onHide={tog_DeleteLeave} centered>
                <Modal.Header closeButton className="bg-light p-3">
                    <Modal.Title id="deleteLeaveModal">İzin Sil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mt-2 text-center">
                        <div className="avatar-lg mx-auto mb-4">
                            <div className="avatar-title bg-danger-subtle text-danger rounded-circle display-6">
                                <i className="bi bi-exclamation-triangle"></i>
                            </div>
                        </div>
                        <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                            <h4>Emin misiniz?</h4>
                            <p className="text-muted mx-4 mb-0">Bu izin kaydını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="ghost-danger" onClick={tog_DeleteLeave}>İptal</Button>
                    <Button variant="danger">Evet, Sil!</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
};

export default PersonnelProfile;
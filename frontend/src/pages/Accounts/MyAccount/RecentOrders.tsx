import React from 'react';
import { Card, Form, Nav, Tab, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductTable from './ProductTable';
import RecentOrdersTable from './RecentOrdersTable';
import TransactionsTable from './TransactionsTable';

const MyAccount = () => {
    return (
        <React.Fragment>
            <Tab.Container defaultActiveKey="RecentOrders">
            <div className="d-flex align-items-center gap-3 mb-4">
                <Nav as="ul" className="nav nav-pills flex-grow-1 mb-0">
                    <Nav.Item as="li">
                        <Nav.Link eventKey="RecentOrders">
                            Son Randevular
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link eventKey="Products">
                            Hizmetler
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link eventKey="Transactions">
                            İşlemler
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link eventKey="Activity">
                            Aktiviteler
                        </Nav.Link>
                    </Nav.Item>
                </Nav>

                <div className="flex-shrink-0">
                    <Link to="/settings" className="btn btn-success">Profil Ayarları</Link>
                </div>
            </div>

                <Tab.Content className="text-muted">
                    <Tab.Pane eventKey="RecentOrders">
                        <Card>
                            <Card.Header className="d-sm-flex align-items-center gap-3">
                                <h5 className="card-title mb-0 flex-grow-1">Son Randevular</h5>
                                <div className="search-box mt-3 mt-sm-0">
                                    <Form.Control type="text" className="search w-md" placeholder="Randevu ID, müşteri, durum veya başka bir şey ara..." />
                                    <i className="ri-search-line search-icon"></i>
                                </div>
                            </Card.Header>
                            <RecentOrdersTable />
                        </Card>
                    </Tab.Pane>

                    <Tab.Pane eventKey="Products">
                        <Card>
                            <Card.Header className="d-sm-flex align-items-center gap-3">
                                <h5 className="card-title mb-0 flex-grow-1">Hizmetler</h5>
                                <div className="search-box mt-3 mt-sm-0">
                                    <Form.Control type="text" className="search w-md" placeholder="Hizmet ID, hizmet adı, randevu veya başka bir şey ara..." />
                                    <i className="ri-search-line search-icon"></i>
                                </div>
                            </Card.Header>
                            <ProductTable />
                        </Card>
                    </Tab.Pane>

                    <Tab.Pane eventKey="Transactions">
                        <Card>
                            <Card.Header className="d-sm-flex align-items-center gap-3">
                                <h5 className="card-title mb-0 flex-grow-1">İşlemler</h5>
                                <div className="search-box mt-3 mt-sm-0">
                                    <Form.Control type="text" className="search w-md" placeholder="İşlem ara veya başka bir şey..." />
                                    <i className="ri-search-line search-icon"></i>
                                </div>
                            </Card.Header>
                            <TransactionsTable />
                        </Card>
                    </Tab.Pane>

                    <Tab.Pane eventKey="Activity">
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
                                </div>
                            </Card.Body>
                        </Card>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </React.Fragment>
    );
};

export default MyAccount;
import React, { useState, useMemo, useCallback } from 'react';
import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import Breadcrumb from 'Common/BreadCrumb';
import CountUp from 'react-countup';
import TableContainer from "Common/TableContainer";
import { userList } from "Common/data";
import Flatpickr from "react-flatpickr";
import { Link } from 'react-router-dom';

const TenantList = () => {
    document.title = "Kiracı Listesi | CRM v2 Randevu Takip";
    const [modal_AddTenantModals, setmodal_AddTenantModals] = useState<boolean>(false);
    const [modal_EditTenantModals, setmodal_EditTenantModals] = useState<boolean>(false);
    const [modal_DeleteTenantModals, setmodal_DeleteTenantModals] = useState<boolean>(false);
    const [isMultiDeleteButton, setIsMultiDeleteButton] = useState<boolean>(false);
    const [selectedTenant, setSelectedTenant] = useState<any>(null);
    function tog_AddTenantModals() {
        setmodal_AddTenantModals(!modal_AddTenantModals);
    }

    function tog_EditTenantModals() {
        setmodal_EditTenantModals(!modal_EditTenantModals);
    }

    function tog_DeleteTenantModals() {
        setmodal_DeleteTenantModals(!modal_DeleteTenantModals);
    }

    function handleEditTenant(tenant: any) {
        setSelectedTenant(tenant);
        tog_EditTenantModals();
    }

    function handleDeleteTenant(tenant: any) {
        setSelectedTenant(tenant);
        tog_DeleteTenantModals();
    }

    // Checked All
    const checkedAll = useCallback(() => {
        const checkall = document.getElementById("checkAll") as HTMLInputElement;
        const ele = document.querySelectorAll(".tenantCheckBox");

        if (checkall.checked) {
            ele.forEach((ele: any) => {
                ele.checked = true;
            });
        } else {
            ele.forEach((ele: any) => {
                ele.checked = false;
            });
        }
        checkedbox();
    }, []);

    const checkedbox = () => {
        const ele = document.querySelectorAll(".tenantCheckBox:checked");
        ele.length > 0 ? setIsMultiDeleteButton(true) : setIsMultiDeleteButton(false);
    }

    const columns = useMemo(
        () => [
            {
                Header: (<div className="form-check">
                    <input className="form-check-input" type="checkbox" id="checkAll" onClick={() => checkedAll()} />
                </div>),
                Cell: (cellProps: any) => {
                    return (
                        <div className="form-check">
                            <input className="tenantCheckBox form-check-input" type="checkbox" name="chk_child" value={cellProps.row.original.id} onChange={() => checkedbox()} />
                        </div>
                    );
                },
                id: '#',
            },
            {
                Header: "Şirket Adı",
                disableFilters: true,
                filterable: true,
                accessor: "user_name"
            },
            {
                Header: "İletişim E-postası",
                accessor: "email_id",
                disableFilters: true,
                filterable: true,
            },
            {
                Header: "Kayıt Tarihi",
                disableFilters: true,
                filterable: true,
                accessor: (cellProps: any) => {
                    const dateStr = cellProps.date;
                    if (dateStr && dateStr !== 'NaN.NaN.NaN') {
                        try {
                            const date = new Date(dateStr);
                            // Geçerli tarih kontrolü
                            if (!isNaN(date.getTime())) {
                                const day = date.getDate().toString().padStart(2, '0');
                                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                const year = date.getFullYear();
                                return `${day}.${month}.${year}`;
                            }
                        } catch {
                            // Hata durumunda boş string döndür
                        }
                    }
                    return '-';
                }
            },
            {
                Header: "Abonelik Durumu",
                disableFilters: true,
                filterable: true,
                accessor: (cellProps: any) => {
                    switch (cellProps.status) {
                        case "Active":
                            return (<span className="badge bg-success-subtle text-success"> Aktif</span>)
                        case "Inactive":
                            return (<span className="badge bg-danger-subtle text-danger"> Pasif</span>)
                        default:
                            return (<span className="badge bg-success-subtle text-success"> Aktif</span>)
                    }
                },
            },
            {
                Header: "İşlem",
                disableFilters: true,
                filterable: true,
                accessor: (cellProps: any) => {
                    return (
                        <div className="d-flex gap-2">
                            <div className="edit">
                                <Button variant="ghost-info" size="sm" className="btn-ghost-info btn-icon edit-item-btn" onClick={() => handleEditTenant(cellProps)}><i className="ph-pencil-line"></i></Button>
                            </div>
                            <div className="remove">
                                <Button variant="ghost-danger" size="sm" className="btn-ghost-danger btn-icon remove-item-btn" onClick={() => handleDeleteTenant(cellProps)}><i className="ph-trash"></i></Button>
                            </div>
                        </div>
                    )
                },
            },
        ],
        [checkedAll]
    );

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumb title="Kiracı Listesi" pageTitle="Şirket Yönetimi" />

                    <Row>
                        <Col xxl={3} md={6}>
                            <Card className="card-height-100 bg-primary-subtle border-0 overflow-hidden">
                                <div className="position-absolute end-0 start-0 top-0 z-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                        width="400" height="250" preserveAspectRatio="none" viewBox="0 0 400 250">
                                        <g mask="url(&quot;#SvgjsMask1530&quot;)" fill="none">
                                            <path d="M209 112L130 191" strokeWidth="10" stroke="url(#SvgjsLinearGradient1531)" strokeLinecap="round" className="BottomLeft"></path>
                                            <path d="M324 10L149 185" strokeWidth="8" stroke="url(#SvgjsLinearGradient1532)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M333 35L508 -140" strokeWidth="10" stroke="url(#SvgjsLinearGradient1532)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M282 58L131 209" strokeWidth="10" stroke="url(#SvgjsLinearGradient1531)" strokeLinecap="round" className="BottomLeft"></path>
                                            <path d="M290 16L410 -104" strokeWidth="6" stroke="url(#SvgjsLinearGradient1532)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M216 186L328 74" strokeWidth="6" stroke="url(#SvgjsLinearGradient1531)" strokeLinecap="round" className="BottomLeft"></path>
                                            <path d="M255 53L176 132" strokeWidth="10" stroke="url(#SvgjsLinearGradient1531)" strokeLinecap="round" className="BottomLeft"></path>
                                            <path d="M339 191L519 11" strokeWidth="8" stroke="url(#SvgjsLinearGradient1531)" strokeLinecap="round" className="BottomLeft"></path>
                                            <path d="M95 151L185 61" strokeWidth="6" stroke="url(#SvgjsLinearGradient1532)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M249 16L342 -77" strokeWidth="6" stroke="url(#SvgjsLinearGradient1532)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M129 230L286 73" strokeWidth="10" stroke="url(#SvgjsLinearGradient1531)" strokeLinecap="round" className="BottomLeft"></path>
                                            <path d="M80 216L3 293" strokeWidth="6" stroke="url(#SvgjsLinearGradient1531)" strokeLinecap="round" className="BottomLeft"></path>
                                        </g>
                                        <defs>
                                            <mask id="SvgjsMask1530">
                                                <rect width="400" height="250" fill="#ffffff"></rect>
                                            </mask>
                                            <linearGradient x1="100%" y1="0%" x2="0%" y2="100%" id="SvgjsLinearGradient1531">
                                                <stop stopColor="rgba(var(--tb-primary-rgb), 0)" offset="0"></stop>
                                                <stop stopColor="rgba(var(--tb-primary-rgb), 0.2)" offset="1"></stop>
                                            </linearGradient>
                                            <linearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="SvgjsLinearGradient1532">
                                                <stop stopColor="rgba(var(--tb-primary-rgb), 0)" offset="0"></stop>
                                                <stop stopColor="rgba(var(--tb-primary-rgb), 0.2)" offset="1"></stop>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <Card.Body className="p-4 z-1 position-relative">
                                    <h4 className="fs-22 fw-semibold mb-3"><CountUp end={47} separator=','/> </h4>
                                    <p className="mb-0 fw-medium fs-14">Toplam Şirket</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xxl={3} md={6}>
                            <Card className="card-height-100 bg-success-subtle border-0 overflow-hidden">
                                <div className="position-absolute end-0 start-0 top-0 z-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                        width="400" height="250" preserveAspectRatio="none" viewBox="0 0 400 250">
                                        <g mask="url(&quot;#SvgjsMask1608&quot;)" fill="none">
                                            <path d="M390 87L269 208" strokeWidth="10" stroke="url(#SvgjsLinearGradient1609)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M358 175L273 260" strokeWidth="8" stroke="url(#SvgjsLinearGradient1610)" strokeLinecap="round" className="BottomLeft"></path>
                                            <path d="M319 84L189 214" strokeWidth="10" stroke="url(#SvgjsLinearGradient1609)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M327 218L216 329" strokeWidth="8" stroke="url(#SvgjsLinearGradient1610)" strokeLinecap="round" className="BottomLeft"></path>
                                            <path d="M126 188L8 306" strokeWidth="8" stroke="url(#SvgjsLinearGradient1610)" strokeLinecap="round" className="BottomLeft"></path>
                                            <path d="M220 241L155 306" strokeWidth="10" stroke="url(#SvgjsLinearGradient1610)" strokeLinecap="round" className="BottomLeft"></path>
                                            <path d="M361 92L427 26" strokeWidth="6" stroke="url(#SvgjsLinearGradient1609)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M391 188L275 304" strokeWidth="8" stroke="url(#SvgjsLinearGradient1609)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M178 74L248 4" strokeWidth="10" stroke="url(#SvgjsLinearGradient1610)" strokeLinecap="round" className="BottomLeft"></path>
                                            <path d="M84 52L-56 192" strokeWidth="6" stroke="url(#SvgjsLinearGradient1610)" strokeLinecap="round" className="BottomLeft"></path>
                                            <path d="M183 111L247 47" strokeWidth="10" stroke="url(#SvgjsLinearGradient1610)" strokeLinecap="round" className="BottomLeft"></path>
                                            <path d="M46 8L209 -155" strokeWidth="6" stroke="url(#SvgjsLinearGradient1609)" strokeLinecap="round" className="TopRight"></path>
                                        </g>
                                        <defs>
                                            <mask id="SvgjsMask1608">
                                                <rect width="400" height="250" fill="#ffffff"></rect>
                                            </mask>
                                            <linearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="SvgjsLinearGradient1609">
                                                <stop stopColor="rgba(var(--tb-success-rgb), 0)" offset="0"></stop>
                                                <stop stopColor="rgba(var(--tb-success-rgb), 0.2)" offset="1"></stop>
                                            </linearGradient>
                                            <linearGradient x1="100%" y1="0%" x2="0%" y2="100%" id="SvgjsLinearGradient1610">
                                                <stop stopColor="rgba(var(--tb-success-rgb), 0)" offset="0"></stop>
                                                <stop stopColor="rgba(var(--tb-success-rgb), 0.2)" offset="1"></stop>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <Card.Body className="p-4 z-1 position-relative">
                                    <h4 className="fs-22 fw-semibold mb-3"><CountUp end={42} /></h4>
                                    <p className="mb-0 fw-medium fs-14">Aktif Abonelik</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xxl={3} md={6}>
                            <Card className="card-height-100 bg-warning-subtle border-0 overflow-hidden">
                                <div className="position-absolute end-0 start-0 top-0 z-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                        width="400" height="250" preserveAspectRatio="none" viewBox="0 0 400 250">
                                        <g mask="url(&quot;#SvgjsMask1551&quot;)" fill="none">
                                            <path d="M306 65L446 -75" strokeWidth="8" stroke="url(#SvgjsLinearGradient1552)" strokeLinecap="round" className="BottomLeft"></path>
                                            <path d="M399 2L315 86" strokeWidth="10" stroke="url(#SvgjsLinearGradient1553)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M83 77L256 -96" strokeWidth="6" stroke="url(#SvgjsLinearGradient1553)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M281 212L460 33" strokeWidth="6" stroke="url(#SvgjsLinearGradient1553)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M257 62L76 243" strokeWidth="6" stroke="url(#SvgjsLinearGradient1553)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M305 123L214 214" strokeWidth="6" stroke="url(#SvgjsLinearGradient1552)" strokeLinecap="round" className="BottomLeft"></path>
                                            <path d="M327 222L440 109" strokeWidth="6" stroke="url(#SvgjsLinearGradient1552)" strokeLinecap="round" className="BottomLeft"></path>
                                            <path d="M287 109L362 34" strokeWidth="10" stroke="url(#SvgjsLinearGradient1553)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M259 194L332 121" strokeWidth="8" stroke="url(#SvgjsLinearGradient1553)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M376 186L240 322" strokeWidth="8" stroke="url(#SvgjsLinearGradient1553)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M308 153L123 338" strokeWidth="6" stroke="url(#SvgjsLinearGradient1553)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M218 62L285 -5" strokeWidth="8" stroke="url(#SvgjsLinearGradient1552)" strokeLinecap="round" className="BottomLeft"></path>
                                        </g>
                                        <defs>
                                            <mask id="SvgjsMask1551">
                                                <rect width="400" height="250" fill="#ffffff"></rect>
                                            </mask>
                                            <linearGradient x1="100%" y1="0%" x2="0%" y2="100%" id="SvgjsLinearGradient1552">
                                                <stop stopColor="rgba(var(--tb-warning-rgb), 0)" offset="0"></stop>
                                                <stop stopColor="rgba(var(--tb-warning-rgb), 0.2)" offset="1"></stop>
                                            </linearGradient>
                                            <linearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="SvgjsLinearGradient1553">
                                                <stop stopColor="rgba(var(--tb-warning-rgb), 0)" offset="0"></stop>
                                                <stop stopColor="rgba(var(--tb-warning-rgb), 0.2)" offset="1"></stop>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <Card.Body className="p-4 z-1 position-relative">
                                    <h4 className="fs-22 fw-semibold mb-3"><CountUp end={5} /></h4>
                                    <p className="mb-0 fw-medium fs-14">Bekleyen Yenileme</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xxl={3} md={6}>
                            <Card className="card-height-100 bg-danger-subtle border-0 overflow-hidden">
                                <div className="position-absolute end-0 start-0 top-0 z-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                        width="400" height="250" preserveAspectRatio="none" viewBox="0 0 400 250">
                                        <g mask="url(&quot;#SvgjsMask1701&quot;)" fill="none">
                                            <path d="M306 65L446 -75" strokeWidth="8" stroke="url(#SvgjsLinearGradient1702)" strokeLinecap="round" className="BottomLeft"></path>
                                            <path d="M399 2L315 86" strokeWidth="10" stroke="url(#SvgjsLinearGradient1703)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M83 77L256 -96" strokeWidth="6" stroke="url(#SvgjsLinearGradient1703)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M281 212L460 33" strokeWidth="6" stroke="url(#SvgjsLinearGradient1703)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M257 62L76 243" strokeWidth="6" stroke="url(#SvgjsLinearGradient1703)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M305 123L214 214" strokeWidth="6" stroke="url(#SvgjsLinearGradient1702)" strokeLinecap="round" className="BottomLeft"></path>
                                            <path d="M327 222L440 109" strokeWidth="6" stroke="url(#SvgjsLinearGradient1702)" strokeLinecap="round" className="BottomLeft"></path>
                                            <path d="M287 109L362 34" strokeWidth="10" stroke="url(#SvgjsLinearGradient1703)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M259 194L332 121" strokeWidth="8" stroke="url(#SvgjsLinearGradient1703)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M376 186L240 322" strokeWidth="8" stroke="url(#SvgjsLinearGradient1703)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M308 153L123 338" strokeWidth="6" stroke="url(#SvgjsLinearGradient1703)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M218 62L285 -5" strokeWidth="8" stroke="url(#SvgjsLinearGradient1702)" strokeLinecap="round" className="BottomLeft"></path>
                                        </g>
                                        <defs>
                                            <mask id="SvgjsMask1701">
                                                <rect width="400" height="250" fill="#ffffff"></rect>
                                            </mask>
                                            <linearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="SvgjsLinearGradient1702">
                                                <stop stopColor="rgba(var(--tb-danger-rgb), 0)" offset="0"></stop>
                                                <stop stopColor="rgba(var(--tb-danger-rgb), 0.2)" offset="1"></stop>
                                            </linearGradient>
                                            <linearGradient x1="100%" y1="0%" x2="0%" y2="100%" id="SvgjsLinearGradient1703">
                                                <stop stopColor="rgba(var(--tb-danger-rgb), 0)" offset="0"></stop>
                                                <stop stopColor="rgba(var(--tb-danger-rgb), 0.2)" offset="1"></stop>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <Card.Body className="p-4 z-1 position-relative">
                                    <h4 className="fs-22 fw-semibold mb-3"><CountUp end={7} /></h4>
                                    <p className="mb-0 fw-medium fs-14">Düşük Token</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row id="tenantList">
                        <Col lg={12}>
                            <Card>
                                <Card.Body>
                                    <Row className="g-lg-2 g-4">
                                        <Col lg={3}>
                                            <div className="search-box">
                                                <input type="text" className="form-control search" placeholder="Kiracıları ara..." />
                                                <i className="ri-search-line search-icon"></i>
                                            </div>
                                        </Col>

                                        {isMultiDeleteButton && <Button variant="danger" className="btn-icon"><i className="ri-delete-bin-2-line"></i></Button>}

                                        <Col sm={3} className="col-lg-auto ms-auto">
                                            <Button onClick={() => tog_AddTenantModals()} variant='primary' type="button" className="w-100 add-btn">
                                                Şirket Ekle
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body className='p-0'>
                                    
                                        <TableContainer
                                            columns={(columns || [])}
                                            data={(userList || [])}
                                            iscustomPageSize={false}
                                            isBordered={false}
                                            customPageSize={10}
                                            className="custom-header-css table align-middle table-nowrap"
                                            tableClass="table-centered align-middle table-nowrap mb-0"
                                            theadClass="text-muted table-light"
                                            SearchPlaceholder='Şirket Ara...'
                                        />
                                        <div className="noresult" style={{ display: "none" }}>
                                            <div className="text-center">
                                                <h5 className="mt-2">Üzgünüz! Sonuç Bulunamadı</h5>
                                                <p className="text-muted mb-0">150'den fazla şirket aradık ancak aramanız için herhangi bir şirket bulamadık.</p>
                                            </div>
                                        </div>
                                    
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Modal className="fade" show={modal_AddTenantModals} onHide={() => { tog_AddTenantModals(); }} centered>
                        <Modal.Header className="px-4 pt-4" closeButton>
                            <h5 className="modal-title" id="exampleModalLabel">Şirket Ekle</h5>
                        </Modal.Header>
                        <Form className="tablelist-form">
                            <Modal.Body className="p-4">
                                <div id="alert-error-msg" className="d-none alert alert-danger py-2"></div>
                                <input type="hidden" id="id-field" />


                                <div className="mb-3">
                                    <Form.Label htmlFor="company-name">Şirket Adı</Form.Label>
                                    <Form.Control type="text" id="company-name-field" placeholder="Şirket Adını Girin" required />
                                </div>
                                <div className="mb-3">
                                    <Form.Label htmlFor="email-field">İletişim E-postası</Form.Label>
                                    <Form.Control type="email" id="email-field" placeholder="İletişim E-postasını Girin" required />
                                </div>

                                <div className="mb-3">
                                    <Form.Label htmlFor="date-field">Kayıt Tarihi</Form.Label>
                                    <Flatpickr
                                        className="form-control flatpickr-input"
                                        placeholder='Tarih Seç'
                                        options={{
                                            dateFormat: "d.m.Y",
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

                                <div>
                                    <label htmlFor="subscription-status" className="form-label">Abonelik Durumu</label>
                                    <select className="form-select" required id="subscription-status-field">
                                        <option defaultValue="">Abonelik Durumu</option>
                                        <option value="Active">Aktif</option>
                                        <option value="Inactive">Pasif</option>
                                    </select>
                                </div>
                            </Modal.Body>
                            <div className="modal-footer">
                                <div className="hstack gap-2 justify-content-end">
                                    <Button className="btn-ghost-danger" onClick={() => { tog_AddTenantModals(); }}>Kapat</Button>
                                    <Button variant='success' id="add-btn">Şirket Ekle</Button>
                                </div>
                            </div>
                        </Form>
                    </Modal>

                    {/* Edit Tenant Modal */}
                    <Modal className="fade" show={modal_EditTenantModals} onHide={() => { tog_EditTenantModals(); }} centered>
                        <Modal.Header className="px-4 pt-4" closeButton>
                            <h5 className="modal-title" id="editModalLabel">Şirket Düzenle</h5>
                        </Modal.Header>
                        <Form className="tablelist-form">
                            <Modal.Body className="p-4">
                                <div id="alert-error-msg" className="d-none alert alert-danger py-2"></div>
                                <input type="hidden" id="edit-id-field" />

                                <div className="mb-3">
                                    <Form.Label htmlFor="edit-company-name">Şirket Adı</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        id="edit-company-name-field" 
                                        placeholder="Şirket Adını Girin" 
                                        defaultValue={selectedTenant?.user_name || ''} 
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <Form.Label htmlFor="edit-email-field">İletişim E-postası</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        id="edit-email-field" 
                                        placeholder="İletişim E-postasını Girin" 
                                        defaultValue={selectedTenant?.email_id || ''} 
                                        required 
                                    />
                                </div>

                                <div className="mb-3">
                                    <Form.Label htmlFor="edit-date-field">Kayıt Tarihi</Form.Label>
                                    <Flatpickr
                                        className="form-control flatpickr-input"
                                        placeholder='Tarih Seç'
                                        defaultValue={selectedTenant?.date || ''}
                                        options={{
                                            dateFormat: "d.m.Y",
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

                                <div>
                                    <label htmlFor="edit-subscription-status" className="form-label">Abonelik Durumu</label>
                                    <select className="form-select" required id="edit-subscription-status-field" defaultValue={selectedTenant?.status || ''}>
                                        <option value="">Abonelik Durumu</option>
                                        <option value="Active">Aktif</option>
                                        <option value="Inactive">Pasif</option>
                                    </select>
                                </div>
                            </Modal.Body>
                            <div className="modal-footer">
                                <div className="hstack gap-2 justify-content-end">
                                    <Button className="btn-ghost-danger" onClick={() => { tog_EditTenantModals(); }}>İptal</Button>
                                    <Button variant='success' id="edit-btn">Güncelle</Button>
                                </div>
                            </div>
                        </Form>
                    </Modal>

                    {/* Delete Confirmation Modal */}
                    <Modal className="fade" show={modal_DeleteTenantModals} onHide={() => { tog_DeleteTenantModals(); }} centered>
                        <Modal.Header className="px-4 pt-4" closeButton>
                            <h5 className="modal-title" id="deleteModalLabel">Şirketi Sil</h5>
                        </Modal.Header>
                        <Modal.Body className="p-4">
                            <div className="text-center">
                                <div className="avatar-md mx-auto mb-4">
                                    <div className="avatar-title bg-danger-subtle text-danger display-4 rounded-circle">
                                        <i className="bi bi-exclamation-triangle"></i>
                                    </div>
                                </div>
                                <h4 className="text-danger">Emin misiniz?</h4>
                                <p className="text-muted fs-15 mb-4">
                                    <strong>{selectedTenant?.user_name}</strong> şirketini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!
                                </p>
                            </div>
                        </Modal.Body>
                        <div className="modal-footer">
                            <div className="hstack gap-2 justify-content-center">
                                <Button className="btn-light" onClick={() => { tog_DeleteTenantModals(); }}>İptal</Button>
                                <Button variant='danger' id="delete-btn">Evet, Sil</Button>
                            </div>
                        </div>
                    </Modal>

                </Container >
            </div >
        </React.Fragment >
    );
};

export default TenantList;
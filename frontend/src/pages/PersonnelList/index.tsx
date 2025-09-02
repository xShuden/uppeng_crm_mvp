import React, { useState, useMemo, useCallback } from 'react';
import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import Breadcrumb from 'Common/BreadCrumb';
import CountUp from 'react-countup';
import TableContainer from "Common/TableContainer";
import { userList } from "Common/data";
import { Link } from 'react-router-dom';

const PersonnelList = () => {
    document.title = "Personel Listesi | CRM v2 Randevu Takip";
    const [modal_AddPersonnelModals, setmodal_AddPersonnelModals] = useState<boolean>(false);
    const [modal_EditPersonnelModals, setmodal_EditPersonnelModals] = useState<boolean>(false);
    const [modal_DeletePersonnelModals, setmodal_DeletePersonnelModals] = useState<boolean>(false);
    const [isMultiDeleteButton, setIsMultiDeleteButton] = useState<boolean>(false);
    const [selectedPersonnel, setSelectedPersonnel] = useState<any>(null);
    
    // Görev ve hizmet yönetimi (Add Modal)
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    const [availableServices, setAvailableServices] = useState<any[]>([]);
    
    // Görev ve hizmet yönetimi (Edit Modal)
    const [editSelectedRoles, setEditSelectedRoles] = useState<string[]>([]);
    const [editAvailableServices, setEditAvailableServices] = useState<any[]>([]);
    
    // Görev-hizmet mapping
    const roleServiceMapping: { [key: string]: any[] } = {
        'protez-uzmani': [
            { id: 'protez-takilmasi', name: 'Protez Takılması' },
            { id: 'protez-kontrol', name: 'Protez Kontrol' },
            { id: 'tedavi-bakimi', name: 'Tedavi Bakımı' }
        ],
        'makijoz': [
            { id: 'makyaj', name: 'Makyaj' },
            { id: 'cilt-bakimi', name: 'Cilt Bakımı' }
        ],
        'estetisyen': [
            { id: 'cilt-bakimi', name: 'Cilt Bakımı' },
            { id: 'tedavi-bakimi', name: 'Tedavi Bakımı' }
        ],
        'kuafor': [
            { id: 'sac-kesim', name: 'Saç Kesim' },
            { id: 'sac-boyama', name: 'Saç Boyama' }
        ],
        'masaj-terapisti': [
            { id: 'masaj', name: 'Masaj' },
            { id: 'tedavi-bakimi', name: 'Tedavi Bakımı' }
        ],
        'hasta-bakim': [
            { id: 'tedavi-bakimi', name: 'Tedavi Bakımı' },
            { id: 'hasta-bakim-hizmet', name: 'Hasta Bakım Hizmetleri' }
        ]
    };

    const handleRoleChange = (roleId: string) => {
        let newRoles: string[];
        if (selectedRoles.includes(roleId)) {
            newRoles = selectedRoles.filter(r => r !== roleId);
        } else {
            newRoles = [...selectedRoles, roleId];
        }
        setSelectedRoles(newRoles);
        
        // Seçili görevlere göre hizmetleri filtrele
        const services: any[] = [];
        newRoles.forEach(role => {
            if (roleServiceMapping[role]) {
                roleServiceMapping[role].forEach(service => {
                    if (!services.find(s => s.id === service.id)) {
                        services.push(service);
                    }
                });
            }
        });
        setAvailableServices(services);
    };

    const handleEditRoleChange = (roleId: string) => {
        let newRoles: string[];
        if (editSelectedRoles.includes(roleId)) {
            newRoles = editSelectedRoles.filter(r => r !== roleId);
        } else {
            newRoles = [...editSelectedRoles, roleId];
        }
        setEditSelectedRoles(newRoles);
        
        // Seçili görevlere göre hizmetleri filtrele
        const services: any[] = [];
        newRoles.forEach(role => {
            if (roleServiceMapping[role]) {
                roleServiceMapping[role].forEach(service => {
                    if (!services.find(s => s.id === service.id)) {
                        services.push(service);
                    }
                });
            }
        });
        setEditAvailableServices(services);
    };

    function tog_AddPersonnelModals() {
        setmodal_AddPersonnelModals(!modal_AddPersonnelModals);
        // Modal açıldığında state'leri sıfırla
        if (!modal_AddPersonnelModals) {
            setSelectedRoles([]);
            setAvailableServices([]);
        }
    }

    function tog_EditPersonnelModals() {
        setmodal_EditPersonnelModals(!modal_EditPersonnelModals);
        // Modal açıldığında state'leri sıfırla
        if (!modal_EditPersonnelModals) {
            setEditSelectedRoles([]);
            setEditAvailableServices([]);
        }
    }

    function tog_DeletePersonnelModals() {
        setmodal_DeletePersonnelModals(!modal_DeletePersonnelModals);
    }

    const handleEditPersonnel = useCallback((personnel: any) => {
        setSelectedPersonnel(personnel);
        tog_EditPersonnelModals();
    }, []);

    const handleDeletePersonnel = useCallback((personnel: any) => {
        setSelectedPersonnel(personnel);
        tog_DeletePersonnelModals();
    }, []);

    // Checked All
    const checkedAll = useCallback(() => {
        const checkall = document.getElementById("checkAll") as HTMLInputElement;
        const ele = document.querySelectorAll(".personnelCheckBox");

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
        const ele = document.querySelectorAll(".personnelCheckBox:checked");
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
                            <input className="personnelCheckBox form-check-input" type="checkbox" name="chk_child" value={cellProps.row.original.id} onChange={() => checkedbox()} />
                        </div>
                    );
                },
                id: '#',
            },
            {
                Header: "Personel Adı",
                disableFilters: true,
                filterable: true,
                accessor: "user_name"
            },
            {
                Header: "E-posta",
                accessor: "email_id",
                disableFilters: true,
                filterable: true,
            },
            {
                Header: "Durum",
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
                                <Button variant="ghost-info" size="sm" className="btn-ghost-info btn-icon edit-item-btn" onClick={() => handleEditPersonnel(cellProps)}><i className="ph-pencil-line"></i></Button>
                            </div>
                            <div className="remove">
                                <Button variant="ghost-danger" size="sm" className="btn-ghost-danger btn-icon remove-item-btn" onClick={() => handleDeletePersonnel(cellProps)}><i className="ph-trash"></i></Button>
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
                    <Breadcrumb title="Personel Listesi" pageTitle="Personel Yönetimi" />

                    <Row>
                        <Col xxl={3} md={6}>
                            <Card className="card-height-100 bg-warning-subtle border-0 overflow-hidden">
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
                                                <stop stopColor="rgba(var(--tb-warning-rgb), 0)" offset="0"></stop>
                                                <stop stopColor="rgba(var(--tb-warning-rgb), 0.2)" offset="1"></stop>
                                            </linearGradient>
                                            <linearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="SvgjsLinearGradient1532">
                                                <stop stopColor="rgba(var(--tb-warning-rgb), 0)" offset="0"></stop>
                                                <stop stopColor="rgba(var(--tb-warning-rgb), 0.2)" offset="1"></stop>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <Card.Body className="p-4 z-1 position-relative">
                                    <h4 className="fs-22 fw-semibold mb-3"><CountUp end={125} separator=','/> </h4>
                                    <p className="mb-0 fw-medium fs-14">Toplam Personel</p>
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
                                    <h4 className="fs-22 fw-semibold mb-3"><CountUp end={98} /></h4>
                                    <p className="mb-0 fw-medium fs-14">Aktif Personel</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xxl={3} md={6}>
                            <Card className="card-height-100 bg-info-subtle border-0 overflow-hidden">
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
                                                <stop stopColor="rgba(var(--tb-info-rgb), 0)" offset="0"></stop>
                                                <stop stopColor="rgba(var(--tb-info-rgb), 0.2)" offset="1"></stop>
                                            </linearGradient>
                                            <linearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="SvgjsLinearGradient1553">
                                                <stop stopColor="rgba(var(--tb-info-rgb), 0)" offset="0"></stop>
                                                <stop stopColor="rgba(var(--tb-info-rgb), 0.2)" offset="1"></stop>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <Card.Body className="p-4 z-1 position-relative">
                                    <h4 className="fs-22 fw-semibold mb-3"><CountUp end={27} /></h4>
                                    <p className="mb-0 fw-medium fs-14">Pasif Personel</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xxl={3} md={6}>
                            <Card className="bg-light border-0">
                                <Card.Body className="p-3">
                                    <div className="p-3 bg-white rounded">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="flex-shrink-0">
                                                <div className="avatar-sm">
                                                    <div className="avatar-title bg-primary-subtle text-primary fs-4 rounded">
                                                        <i className="ph-users"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <Link to="#" className="stretched-link"><h6 className="fs-17">Vardiya Planlama</h6></Link>
                                                <p className="text-muted mb-0">Çalışma çizelgesini düzenle</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row id="personnelList">
                        <Col lg={12}>
                            <Card>
                                <Card.Body>
                                    <Row className="g-lg-2 g-4">
                                        <Col lg={3}>
                                            <div className="search-box">
                                                <input type="text" className="form-control search" placeholder="Personel ara..." />
                                                <i className="ri-search-line search-icon"></i>
                                            </div>
                                        </Col>

                                        {isMultiDeleteButton && <Button variant="danger" className="btn-icon"><i className="ri-delete-bin-2-line"></i></Button>}

                                        <Col sm={3} className="col-lg-auto ms-auto">
                                            <Button onClick={() => tog_AddPersonnelModals()} variant='primary' type="button" className="w-100 add-btn">
                                                Personel Ekle
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
                                            SearchPlaceholder='Personel Ara...'
                                        />
                                        <div className="noresult" style={{ display: "none" }}>
                                            <div className="text-center">
                                                <h5 className="mt-2">Üzgünüz! Sonuç Bulunamadı</h5>
                                                <p className="text-muted mb-0">150'den fazla personel aradık ancak aramanız için herhangi bir personel bulamadık.</p>
                                            </div>
                                        </div>
                                    
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Modal className="fade" show={modal_AddPersonnelModals} onHide={() => { tog_AddPersonnelModals(); }} centered>
                        <Modal.Header className="px-4 pt-4" closeButton>
                            <h5 className="modal-title" id="exampleModalLabel">Personel Ekle</h5>
                        </Modal.Header>
                        <Form className="tablelist-form">
                            <Modal.Body className="p-4">
                                <div id="alert-error-msg" className="d-none alert alert-danger py-2"></div>
                                <input type="hidden" id="id-field" />


                                <div className="mb-3">
                                    <Form.Label htmlFor="personnel-name">Ad</Form.Label>
                                    <Form.Control type="text" id="personnel-name-field" placeholder="Adını Girin" required />
                                </div>
                                <div className="mb-3">
                                    <Form.Label htmlFor="personnel-surname">Soyad</Form.Label>
                                    <Form.Control type="text" id="personnel-surname-field" placeholder="Soyadını Girin" required />
                                </div>
                                <div className="mb-3">
                                    <Form.Label htmlFor="personnel-phone">Telefon</Form.Label>
                                    <Form.Control type="tel" id="personnel-phone-field" placeholder="Telefon Numarası" required />
                                </div>
                                <div className="mb-3">
                                    <Form.Label htmlFor="personnel-email">E-posta</Form.Label>
                                    <Form.Control type="email" id="personnel-email-field" placeholder="E-posta Adresi" required />
                                </div>
                                <div className="mb-3">
                                    <Form.Label className="form-label">Görevler</Form.Label>
                                    <Row>
                                        <Col md={6}>
                                            <div className="form-check form-switch form-switch-success mb-3">
                                                <Form.Check 
                                                    type="checkbox" 
                                                    role="switch" 
                                                    id="role-protez-uzmani" 
                                                    onChange={() => handleRoleChange('protez-uzmani')}
                                                    checked={selectedRoles.includes('protez-uzmani')}
                                                />
                                                <Form.Label htmlFor="role-protez-uzmani">Protez Uzmanı</Form.Label>
                                            </div>
                                            <div className="form-check form-switch form-switch-info mb-3">
                                                <Form.Check 
                                                    type="checkbox" 
                                                    role="switch" 
                                                    id="role-makijoz" 
                                                    onChange={() => handleRoleChange('makijoz')}
                                                    checked={selectedRoles.includes('makijoz')}
                                                />
                                                <Form.Label htmlFor="role-makijoz">Makijöz</Form.Label>
                                            </div>
                                            <div className="form-check form-switch form-switch-warning mb-3">
                                                <Form.Check 
                                                    type="checkbox" 
                                                    role="switch" 
                                                    id="role-estetisyen" 
                                                    onChange={() => handleRoleChange('estetisyen')}
                                                    checked={selectedRoles.includes('estetisyen')}
                                                />
                                                <Form.Label htmlFor="role-estetisyen">Estetisyen</Form.Label>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-check form-switch form-switch-danger mb-3">
                                                <Form.Check 
                                                    type="checkbox" 
                                                    role="switch" 
                                                    id="role-kuafor" 
                                                    onChange={() => handleRoleChange('kuafor')}
                                                    checked={selectedRoles.includes('kuafor')}
                                                />
                                                <Form.Label htmlFor="role-kuafor">Kuaför</Form.Label>
                                            </div>
                                            <div className="form-check form-switch form-switch-secondary mb-3">
                                                <Form.Check 
                                                    type="checkbox" 
                                                    role="switch" 
                                                    id="role-masaj-terapisti" 
                                                    onChange={() => handleRoleChange('masaj-terapisti')}
                                                    checked={selectedRoles.includes('masaj-terapisti')}
                                                />
                                                <Form.Label htmlFor="role-masaj-terapisti">Masaj Terapisti</Form.Label>
                                            </div>
                                            <div className="form-check form-switch form-switch-dark mb-3">
                                                <Form.Check 
                                                    type="checkbox" 
                                                    role="switch" 
                                                    id="role-hasta-bakim" 
                                                    onChange={() => handleRoleChange('hasta-bakim')}
                                                    checked={selectedRoles.includes('hasta-bakim')}
                                                />
                                                <Form.Label htmlFor="role-hasta-bakim">Hasta Bakım Uzmanı</Form.Label>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="mb-3">
                                    <Form.Label className="form-label">Hizmetler</Form.Label>
                                    {availableServices.length === 0 ? (
                                        <div className="text-muted p-3 border rounded">
                                            Önce görev seçiniz, hizmetler otomatik olarak gösterilecektir.
                                        </div>
                                    ) : (
                                        <div className="border rounded p-3">
                                            {availableServices.map((service, index) => (
                                                <div key={service.id} className="form-check form-switch mb-2">
                                                    <Form.Check 
                                                        type="checkbox" 
                                                        role="switch" 
                                                        id={`service-${service.id}`}
                                                    />
                                                    <Form.Label htmlFor={`service-${service.id}`}>{service.name}</Form.Label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Modal.Body>
                            <div className="modal-footer">
                                <div className="hstack gap-2 justify-content-end">
                                    <Button className="btn-ghost-danger" onClick={() => { tog_AddPersonnelModals(); }}>Kapat</Button>
                                    <Button variant='success' id="add-btn">Personel Ekle</Button>
                                </div>
                            </div>
                        </Form>
                    </Modal>

                    {/* Edit Personnel Modal */}
                    <Modal className="fade" show={modal_EditPersonnelModals} onHide={() => { tog_EditPersonnelModals(); }} centered>
                        <Modal.Header className="px-4 pt-4" closeButton>
                            <h5 className="modal-title" id="editModalLabel">Personel Düzenle</h5>
                        </Modal.Header>
                        <Form className="tablelist-form">
                            <Modal.Body className="p-4">
                                <div id="alert-error-msg" className="d-none alert alert-danger py-2"></div>
                                <input type="hidden" id="edit-id-field" />

                                <div className="mb-3">
                                    <Form.Label htmlFor="edit-personnel-name">Ad</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        id="edit-personnel-name-field" 
                                        placeholder="Adını Girin" 
                                        defaultValue={selectedPersonnel?.user_name || ''} 
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <Form.Label htmlFor="edit-personnel-surname">Soyad</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        id="edit-personnel-surname-field" 
                                        placeholder="Soyadını Girin" 
                                        defaultValue={selectedPersonnel?.surname || ''} 
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <Form.Label htmlFor="edit-personnel-phone">Telefon</Form.Label>
                                    <Form.Control 
                                        type="tel" 
                                        id="edit-personnel-phone-field" 
                                        placeholder="Telefon Numarası" 
                                        defaultValue={selectedPersonnel?.phone || ''} 
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <Form.Label htmlFor="edit-personnel-email">E-posta</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        id="edit-personnel-email-field" 
                                        placeholder="E-posta Adresi" 
                                        defaultValue={selectedPersonnel?.email_id || ''} 
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <Form.Label className="form-label">Görevler</Form.Label>
                                    <Row>
                                        <Col md={6}>
                                            <div className="form-check form-switch form-switch-success mb-3">
                                                <Form.Check 
                                                    type="checkbox" 
                                                    role="switch" 
                                                    id="edit-role-protez-uzmani" 
                                                    onChange={() => handleEditRoleChange('protez-uzmani')}
                                                    checked={editSelectedRoles.includes('protez-uzmani')}
                                                />
                                                <Form.Label htmlFor="edit-role-protez-uzmani">Protez Uzmanı</Form.Label>
                                            </div>
                                            <div className="form-check form-switch form-switch-info mb-3">
                                                <Form.Check 
                                                    type="checkbox" 
                                                    role="switch" 
                                                    id="edit-role-makijoz" 
                                                    onChange={() => handleEditRoleChange('makijoz')}
                                                    checked={editSelectedRoles.includes('makijoz')}
                                                />
                                                <Form.Label htmlFor="edit-role-makijoz">Makijöz</Form.Label>
                                            </div>
                                            <div className="form-check form-switch form-switch-warning mb-3">
                                                <Form.Check 
                                                    type="checkbox" 
                                                    role="switch" 
                                                    id="edit-role-estetisyen" 
                                                    onChange={() => handleEditRoleChange('estetisyen')}
                                                    checked={editSelectedRoles.includes('estetisyen')}
                                                />
                                                <Form.Label htmlFor="edit-role-estetisyen">Estetisyen</Form.Label>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-check form-switch form-switch-danger mb-3">
                                                <Form.Check 
                                                    type="checkbox" 
                                                    role="switch" 
                                                    id="edit-role-kuafor" 
                                                    onChange={() => handleEditRoleChange('kuafor')}
                                                    checked={editSelectedRoles.includes('kuafor')}
                                                />
                                                <Form.Label htmlFor="edit-role-kuafor">Kuaför</Form.Label>
                                            </div>
                                            <div className="form-check form-switch form-switch-secondary mb-3">
                                                <Form.Check 
                                                    type="checkbox" 
                                                    role="switch" 
                                                    id="edit-role-masaj-terapisti" 
                                                    onChange={() => handleEditRoleChange('masaj-terapisti')}
                                                    checked={editSelectedRoles.includes('masaj-terapisti')}
                                                />
                                                <Form.Label htmlFor="edit-role-masaj-terapisti">Masaj Terapisti</Form.Label>
                                            </div>
                                            <div className="form-check form-switch form-switch-dark mb-3">
                                                <Form.Check 
                                                    type="checkbox" 
                                                    role="switch" 
                                                    id="edit-role-hasta-bakim" 
                                                    onChange={() => handleEditRoleChange('hasta-bakim')}
                                                    checked={editSelectedRoles.includes('hasta-bakim')}
                                                />
                                                <Form.Label htmlFor="edit-role-hasta-bakim">Hasta Bakım Uzmanı</Form.Label>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="mb-3">
                                    <Form.Label className="form-label">Hizmetler</Form.Label>
                                    {editAvailableServices.length === 0 ? (
                                        <div className="text-muted p-3 border rounded">
                                            Önce görev seçiniz, hizmetler otomatik olarak gösterilecektir.
                                        </div>
                                    ) : (
                                        <div className="border rounded p-3">
                                            {editAvailableServices.map((service, index) => (
                                                <div key={service.id} className="form-check form-switch mb-2">
                                                    <Form.Check 
                                                        type="checkbox" 
                                                        role="switch" 
                                                        id={`edit-service-${service.id}`}
                                                    />
                                                    <Form.Label htmlFor={`edit-service-${service.id}`}>{service.name}</Form.Label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Modal.Body>
                            <div className="modal-footer">
                                <div className="hstack gap-2 justify-content-end">
                                    <Button className="btn-ghost-danger" onClick={() => { tog_EditPersonnelModals(); }}>İptal</Button>
                                    <Button variant='success' id="edit-btn">Güncelle</Button>
                                </div>
                            </div>
                        </Form>
                    </Modal>

                    {/* Delete Confirmation Modal */}
                    <Modal className="fade" show={modal_DeletePersonnelModals} onHide={() => { tog_DeletePersonnelModals(); }} centered>
                        <Modal.Header className="px-4 pt-4" closeButton>
                            <h5 className="modal-title" id="deleteModalLabel">Personeli Sil</h5>
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
                                    <strong>{selectedPersonnel?.user_name}</strong> personelini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!
                                </p>
                            </div>
                        </Modal.Body>
                        <div className="modal-footer">
                            <div className="hstack gap-2 justify-content-center">
                                <Button className="btn-light" onClick={() => { tog_DeletePersonnelModals(); }}>İptal</Button>
                                <Button variant='danger' id="delete-btn">Evet, Sil</Button>
                            </div>
                        </div>
                    </Modal>

                </Container >
            </div >
        </React.Fragment >
    );
};

export default PersonnelList;
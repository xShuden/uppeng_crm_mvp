import React , { useState } from 'react';
import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import Breadcrumb from 'Common/BreadCrumb';
import CountUp from "react-countup";
import ListViewTable from './listViewTable';
import Flatpickr from "react-flatpickr";

const OrdersListView = () => {

    document.title = "Rezervasyon Listesi | CRM v2 Randevu Takip";

    const [modal_AddOrderModals, setmodal_AddOrderModals] = useState<boolean>(false);
    function tog_AddOrderModals() {
        setmodal_AddOrderModals(!modal_AddOrderModals);
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumb title="Rezervasyon Listesi" pageTitle="Rezervasyonlar" />
                    <Row className="row-cols-xxl-5 row-cols-lg-3 row-cols-md-2 row-cols-1">
                        <Col>
                            <Card className="shadow-sm border-0 overflow-hidden card-animate">
                                <div className="position-absolute end-0 start-0 top-0 z-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                        // Xmlns:Xlink="http://www.w3.org/1999/xlink" 
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
                                                <stop stopColor="rgba(var(--tb-primary-rgb), 0.1)" offset="1"></stop>
                                            </linearGradient>
                                            <linearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="SvgjsLinearGradient1532">
                                                <stop stopColor="rgba(var(--tb-primary-rgb), 0)" offset="0"></stop>
                                                <stop stopColor="rgba(var(--tb-primary-rgb), 0.1)" offset="1"></stop>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <Card.Body className="p-4 z-1 position-relative">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="flex-shrink-0 avatar-sm">
                                            <div className="avatar-title bg-primary-subtle text-primary fs-3 rounded">
                                                <i className="bi bi-calendar-check"></i>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="fs-22 fw-semibold mb-1">
                                                <CountUp start={0} end={147} duration={3} />
                                            </h4>
                                            <p className="mb-0 fw-medium text-uppercase fs-14">Toplam Rezervasyon</p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="shadow-sm border-0 overflow-hidden card-animate">
                                <div className="position-absolute end-0 start-0 top-0 z-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                        // Xmlns:Xlink="http://www.w3.org/1999/xlink" 
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
                                                <stop stopColor="rgba(var(--tb-warning-rgb), 0)" offset="0"></stop>
                                                <stop stopColor="rgba(var(--tb-warning-rgb), 0.1)" offset="1"></stop>
                                            </linearGradient>
                                            <linearGradient x1="100%" y1="0%" x2="0%" y2="100%" id="SvgjsLinearGradient1610">
                                                <stop stopColor="rgba(var(--tb-warning-rgb), 0)" offset="0"></stop>
                                                <stop stopColor="rgba(var(--tb-warning-rgb), 0.1)" offset="1"></stop>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <Card.Body className="p-4 z-1 position-relative">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="flex-shrink-0 avatar-sm">
                                            <div className="avatar-title bg-warning-subtle text-warning fs-3 rounded">
                                                <i className="bi bi-clock-history"></i>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="fs-22 fw-semibold mb-1">
                                                <CountUp start={0} end={23} duration={3} />
                                            </h4>
                                            <p className="mb-0 fw-medium text-uppercase fs-14">Bekleyen Rezervasyon</p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="shadow-sm border-0 overflow-hidden card-animate">
                                <div className="position-absolute end-0 start-0 bottom-0 z-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                        // Xmlns:Xlink="http://www.w3.org/1999/xlink" 
                                        width="400" height="250" preserveAspectRatio="none" viewBox="0 0 400 250">
                                        <g mask="url(&quot;#SvgjsMask1561&quot;)" fill="none">
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
                                            <mask id="SvgjsMask1561">
                                                <rect width="400" height="250" fill="#ffffff"></rect>
                                            </mask>
                                            <linearGradient x1="100%" y1="0%" x2="0%" y2="100%" id="SvgjsLinearGradient1552">
                                                <stop stopColor="rgba(var(--tb-success-rgb), 0)" offset="0"></stop>
                                                <stop stopColor="rgba(var(--tb-success-rgb), 0.1)" offset="1"></stop>
                                            </linearGradient>
                                            <linearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="SvgjsLinearGradient1553">
                                                <stop stopColor="rgba(var(--tb-success-rgb), 0)" offset="0"></stop>
                                                <stop stopColor="rgba(var(--tb-success-rgb), 0.1)" offset="1"></stop>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <Card.Body className="p-4 z-1 position-relative">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="flex-shrink-0 avatar-sm">
                                            <div className="avatar-title bg-success-subtle text-success fs-3 rounded">
                                                <i className="bi bi-check-circle"></i>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="fs-22 fw-semibold mb-1">
                                                <CountUp start={0} end={89} duration={3} />
                                            </h4>
                                            <p className="mb-0 fw-medium text-uppercase fs-14">Tamamlanan Rezervasyon</p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="shadow-sm border-0 overflow-hidden card-animate">
                                <div className="position-absolute end-0 start-0 top-0 z-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1"

                                        // Xmlns:Xlink="http://www.w3.org/1999/xlink" 

                                        width="400" height="250" preserveAspectRatio="none" viewBox="0 0 400 250">
                                        <g mask="url(&quot;#SvgjsMask1571&quot;)" fill="none">
                                            <path d="M306 65L446 -75" strokeWidth="8" stroke="url(#SvgjsLinearGradient1561)" strokeLinecap="round" className="BottomLeft"></path>
                                            <path d="M399 2L315 86" strokeWidth="10" stroke="url(#SvgjsLinearGradient1562)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M83 77L256 -96" strokeWidth="6" stroke="url(#SvgjsLinearGradient1562)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M281 212L460 33" strokeWidth="6" stroke="url(#SvgjsLinearGradient1562)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M257 62L76 243" strokeWidth="6" stroke="url(#SvgjsLinearGradient1562)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M305 123L214 214" strokeWidth="6" stroke="url(#SvgjsLinearGradient1561)" strokeLinecap="round" className="BottomLeft"></path>
                                            <path d="M327 222L440 109" strokeWidth="6" stroke="url(#SvgjsLinearGradient1561)" strokeLinecap="round" className="BottomLeft"></path>
                                            <path d="M287 109L362 34" strokeWidth="10" stroke="url(#SvgjsLinearGradient1562)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M259 194L332 121" strokeWidth="8" stroke="url(#SvgjsLinearGradient1562)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M376 186L240 322" strokeWidth="8" stroke="url(#SvgjsLinearGradient1562)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M308 153L123 338" strokeWidth="6" stroke="url(#SvgjsLinearGradient1562)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M218 62L285 -5" strokeWidth="8" stroke="url(#SvgjsLinearGradient1561)" strokeLinecap="round" className="BottomLeft"></path>
                                        </g>
                                        <defs>
                                            <mask id="SvgjsMask1571">
                                                <rect width="400" height="250" fill="#ffffff"></rect>
                                            </mask>
                                            <linearGradient x1="100%" y1="0%" x2="0%" y2="100%" id="SvgjsLinearGradient1561">
                                                <stop stopColor="rgba(var(--tb-secondary-rgb), 0)" offset="0"></stop>
                                                <stop stopColor="rgba(var(--tb-secondary-rgb), 0.1)" offset="1"></stop>
                                            </linearGradient>
                                            <linearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="SvgjsLinearGradient1562">
                                                <stop stopColor="rgba(var(--tb-secondary-rgb), 0)" offset="0"></stop>
                                                <stop stopColor="rgba(var(--tb-secondary-rgb), 0.1)" offset="1"></stop>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <Card.Body className="p-4 z-1 position-relative">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="flex-shrink-0 avatar-sm">
                                            <div className="avatar-title bg-secondary-subtle text-secondary fs-3 rounded">
                                                <i className="bi bi-calendar-event"></i>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="fs-22 fw-semibold mb-1">
                                                <CountUp start={0} end={35} duration={3} />
                                            </h4>
                                            <p className="mb-0 fw-medium text-uppercase fs-14">Bugünkü Rezervasyon</p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="shadow-sm border-0 overflow-hidden card-animate">
                                <div className="position-absolute end-0 start-0 bottom-0 z-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                        // Xmlns:Xlink="http://www.w3.org/1999/xlink" 
                                        width="400" height="250" preserveAspectRatio="none" viewBox="0 0 400 250">
                                        <g mask="url(&quot;#SvgjsMask1551&quot;)" fill="none">
                                            <path d="M306 65L446 -75" strokeWidth="8" stroke="url(#SvgjsLinearGradient1558)" strokeLinecap="round" className="BottomLeft"></path>
                                            <path d="M399 2L315 86" strokeWidth="10" stroke="url(#SvgjsLinearGradient1559)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M83 77L256 -96" strokeWidth="6" stroke="url(#SvgjsLinearGradient1559)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M281 212L460 33" strokeWidth="6" stroke="url(#SvgjsLinearGradient1559)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M257 62L76 243" strokeWidth="6" stroke="url(#SvgjsLinearGradient1559)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M305 123L214 214" strokeWidth="6" stroke="url(#SvgjsLinearGradient1558)" strokeLinecap="round" className="BottomLeft"></path>
                                            <path d="M327 222L440 109" strokeWidth="6" stroke="url(#SvgjsLinearGradient1558)" strokeLinecap="round" className="BottomLeft"></path>
                                            <path d="M287 109L362 34" strokeWidth="10" stroke="url(#SvgjsLinearGradient1559)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M259 194L332 121" strokeWidth="8" stroke="url(#SvgjsLinearGradient1559)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M376 186L240 322" strokeWidth="8" stroke="url(#SvgjsLinearGradient1559)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M308 153L123 338" strokeWidth="6" stroke="url(#SvgjsLinearGradient1559)" strokeLinecap="round" className="TopRight"></path>
                                            <path d="M218 62L285 -5" strokeWidth="8" stroke="url(#SvgjsLinearGradient1558)" strokeLinecap="round" className="BottomLeft"></path>
                                        </g>
                                        <defs>
                                            <mask id="SvgjsMask1551">
                                                <rect width="400" height="250" fill="#ffffff"></rect>
                                            </mask>
                                            <linearGradient x1="100%" y1="0%" x2="0%" y2="100%" id="SvgjsLinearGradient1558">
                                                <stop stopColor="rgba(var(--tb-danger-rgb), 0)" offset="0"></stop>
                                                <stop stopColor="rgba(var(--tb-danger-rgb), 0.1)" offset="1"></stop>
                                            </linearGradient>
                                            <linearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="SvgjsLinearGradient1559">
                                                <stop stopColor="rgba(var(--tb-danger-rgb), 0)" offset="0"></stop>
                                                <stop stopColor="rgba(var(--tb-danger-rgb), 0.1)" offset="1"></stop>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <Card.Body className="p-4 z-1 position-relative">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="flex-shrink-0 avatar-sm">
                                            <div className="avatar-title bg-danger-subtle text-danger fs-3 rounded">
                                                <i className="bi bi-x-circle"></i>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="fs-22 fw-semibold mb-1">
                                                <CountUp start={0} end={12} duration={3} />
                                            </h4>
                                            <p className="mb-0 fw-medium text-uppercase fs-14">İptal Edilen Rezervasyon</p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row id="orderList">
                        <Col lg={12}>
                            <Card>
                                <Card.Body>
                                    <Row className="g-3">
                                        <Col xxl={4} sm={6}>
                                            <div className="search-box">
                                                <input type="text" className="form-control search" placeholder="Rezervasyon ID, müşteri adı, personel veya durum ara..." />
                                                <i className="ri-search-line search-icon"></i>
                                            </div>
                                        </Col>

                                        <Col xxl={2} sm={6}>
                                            <div>
                                                <Flatpickr
                                                className="form-control flatpickr-input"
                                                placeholder='Select Date'
                                                    options={{
                                                    dateFormat: "d M, Y",
                                                    }}
                                                />
                                            </div>
                                        </Col>

                                        <Col xxl={2} sm={6}>
                                            <div>
                                                <select className="form-select" name="choices-single-default" id="idStatus">
                                                    <option value="">Durum</option>
                                                    <option value="all" defaultValue="All">Tümü</option>
                                                    <option value="Confirmed">Onaylandı</option>
                                                    <option value="Pending">Beklemede</option>
                                                    <option value="In-Progress">Devam Ediyor</option>
                                                    <option value="Completed">Tamamlandı</option>
                                                    <option value="Cancelled">İptal Edildi</option>
                                                </select>
                                            </div>
                                        </Col>

                                        <Col xxl={2} sm={6}>
                                            <div>
                                                <select className="form-select" name="choices-single-default" id="idReservationType">
                                                    <option value="">Rezervasyon Tipi</option>
                                                    <option value="all" defaultValue="All">Tümü</option>
                                                    <option value="ongoing">Devam Eden</option>
                                                    <option value="past">Geçmiş</option>
                                                    <option value="today">Bugünkü</option>
                                                    <option value="upcoming">Yaklaşan</option>
                                                </select>
                                            </div>
                                        </Col>

                                        <Col xxl={2} sm={12}>
                                            <div className="hstack gap-2">
                                                <Button variant='primary' className="w-100">
                                                    <i className="bi bi-filter me-1"></i> Filter
                                                </Button>
                                                <Button variant='success' onClick={() => tog_AddOrderModals()} className="w-100 add-btn" data-bs-toggle="modal" data-bs-target="#showModal">
                                                    <i className="bi bi-plus-circle me-1"></i> Yeni Rezervasyon
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                            
                            {/* ListViewTable */}
                            <ListViewTable />

                            <div className="noresult" style={{ display: "none" }}>
                                <div className="text-center py-4">
                                    <div className="avatar-md mx-auto mb-4">
                                        <div className="avatar-title bg-primary-subtle text-primary rounded-circle fs-24">
                                            <i className="bi bi-search"></i>
                                        </div>
                                    </div>
                                    <h5 className="mt-2">Üzgünüz! Sonuç Bulunamadı</h5>
                                    <p className="text-muted mb-0">150+ rezervasyondan aramanızla eşleşen bir sonuç bulunamadı.</p>
                                </div>
                            </div>

                            <Modal show={modal_AddOrderModals} onHide={() => { tog_AddOrderModals(); }} centered>
                                <Modal.Header className="px-4 pt-4" closeButton>
                                    <h5 className="modal-title" id="exampleModalLabel">Yeni Rezervasyon Ekle</h5>
                                </Modal.Header>
                                <Form className="tablelist-form" >
                                    <Modal.Body className="p-4">
                                        <div id="alert-error-msg" className="d-none alert alert-danger py-2"></div>
                                        <input type="hidden" id="id-field"/>
                                        <div className="mb-3">
                                            <label htmlFor="customername-field" className="form-label">Müşteri Adı</label>
                                            <input type="text" id="customername-field" className="form-control" placeholder="Müşteri adını girin" required/>
                                        </div>
                            
                                        <div className="mb-3">
                                            <label htmlFor="productname-field" className="form-label">Hizmet</label>
                                            <div>
                                                <select className="form-select" id="productname-field" required>
                                                    <option value="">Hizmet Seçin</option>
                                                    <option value="Protez Takılması">Protez Takılması</option>
                                                    <option value="Protez Kontrol">Protez Kontrol</option>
                                                    <option value="Makyaj">Makyaj</option>
                                                    <option value="Saç Kesimi">Saç Kesimi</option>
                                                    <option value="Saç Boyama">Saç Boyama</option>
                                                    <option value="Cilt Bakımı">Cilt Bakımı</option>
                                                    <option value="Masaj">Masaj</option>
                                                    <option value="Tedavi Bakımı">Tedavi Bakımı</option>
                                                </select>
                                            </div>
                                        </div>
                                        <Row className="gy-4 mb-3">
                                            <Col md={6}>
                                                <div>
                                                    <Form.Label htmlFor="createdate-field">Rezervasyon Tarihi</Form.Label>
                                                    <Flatpickr
                                                        className="form-control flatpickr-input"
                                                        placeholder='Select Date'
                                                        options={{
                                                            dateFormat: "d M, Y",
                                                        }}
                                                    />
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div>
                                                    <Form.Label htmlFor="deliverydate-field">Randevu Saati</Form.Label>
                                                    <Flatpickr
                                                        className="form-control flatpickr-input"
                                                        placeholder='Select Date'
                                                        options={{
                                                            dateFormat: "d M, Y",
                                                        }}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                            
                                        <Row className="gy-4 mb-3">
                                            <Col md={6}>
                                                <div>
                                                    <Form.Label htmlFor="amount-field">Ücret</Form.Label>
                                                    <Form.Control type="number" id="amount-field" placeholder="Toplam ücret" required/>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div>
                                                    <Form.Label htmlFor="payment-field">Ödeme Yöntemi</Form.Label>
                                                    <div>
                                                        <select className="form-select"  required id="payment-field">
                                                            <option value="">Ödeme Yöntemi</option>
                                                            <option value="Kredi Kartı">Kredi Kartı</option>
                                                            <option value="Nakit">Nakit</option>
                                                            <option value="Havale">Havale</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                            
                                        <div>
                                            <Form.Label htmlFor="delivered-status">Rezervasyon Durumu</Form.Label>
                                            <div>
                                                <select className="form-select" required id="delivered-status">
                                                    <option value="">Rezervasyon Durumu</option>
                                                    <option value="Confirmed">Onaylandı</option>
                                                    <option value="Pending">Beklemede</option>
                                                    <option value="In-Progress">Devam Ediyor</option>
                                                    <option value="Completed">Tamamlandı</option>
                                                    <option value="Cancelled">İptal Edildi</option>
                                                </select>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <div className="modal-footer">
                                        <div className="hstack gap-2 justify-content-end">
                                            <Button className="btn-ghost-danger" onClick={() => { tog_AddOrderModals(); }} >Kapat</Button>
                                            <Button variant='success' id="add-btn">Rezervasyon Ekle</Button>
                                        </div>
                                    </div>
                                </Form>
                            </Modal>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment >
    );
}

export default OrdersListView;
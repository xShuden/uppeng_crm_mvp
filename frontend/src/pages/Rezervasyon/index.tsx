import React, { useState, useEffect } from 'react';
import { Card, Container, Form, Modal, Row, Col, Button, Table } from "react-bootstrap";
import Breadcrumb from 'Common/BreadCrumb';
import SimpleBar from "simplebar-react";
import Flatpickr from "react-flatpickr";

import * as Yup from "yup";
import { useFormik } from "formik";

import UpcommingEvents from './UpcommingEvents';

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';

import {
    getEvents as onGetEvents,
    getCategories as onGetCategories,
    addNewEvent as onAddNewEvent,
    deleteEvent as onDeleteEvent,
    updateEvent as onUpdateEvent,
    resetCalendar,
} from "../../slices/thunk";
import { Link } from 'react-router-dom';

const Rezervasyon = () => {
    const dispatch: any = useDispatch();
    const [event, setEvent] = useState<any>({});
    const [modal, setModal] = useState<boolean>(false);
    const [selectedDay, setSelectedDay] = useState<any>(0);
    const [selectedNewDay, setSelectedNewDay] = useState<any>(0);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isEditButton, setIsEditButton] = useState<boolean>(true);
    const [upcommingevents, setUpcommingevents] = useState<any>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [staffList, setStaffList] = useState([
        { id: 1, name: "Ayşe Demir", profession: "Protez Uzmanı" },
        { id: 2, name: "Fatma Yılmaz", profession: "Makijöz" },
        { id: 3, name: "Zeynep Kaya", profession: "Estetisyen" },
        { id: 4, name: "Merve Öztürk", profession: "Kuaför" },
    ]);

    const selectProperties = createSelector(
        (state: any) => state.Calendar,
        (calendar) => ({
            events: calendar.events,
            isEventUpdated: calendar.isEventUpdated,
        })
    );

    const { events, isEventUpdated } = useSelector(selectProperties);

    useEffect(() => {
        dispatch(onGetEvents());
        dispatch(onGetCategories());
    }, [dispatch]);

    useEffect(() => {
        if (events && Array.isArray(events)) {
            setUpcommingevents(events);
            upcommingevents.slice().sort(function (o1: any, o2: any) {
                const date1 = o1 && o1.start ? new Date(o1.start).getTime() : 0;
                const date2 = o2 && o2.start ? new Date(o2.start).getTime() : 0;
                return Math.abs(date1 - date2);
            });
        }
    }, [events, upcommingevents]);

    useEffect(() => {
        if (isEventUpdated) {
            setIsEdit(false);
            setEvent({});
            setTimeout(() => {
                dispatch(resetCalendar(false));
            }, 500);
        }
    }, [dispatch, isEventUpdated]);

    // Handling the modal state
    const toggle = () => {
        if (modal) {
            setModal(false);
            setEvent(null);
            setIsEdit(false);
            setIsEditButton(true);
        } else {
            setModal(true);
        }
    };

    // Handling date click on scheduler
    const handleDateClick = (arg: any) => {
        const date = arg.date;
        const staff = arg.staff;
        
        // Seçilen tarih ve saati ayarla
        const clickedTime = [date];
        const endTime = new Date(date);
        endTime.setMinutes(endTime.getMinutes() + 30);
        clickedTime.push(endTime);
        
        setSelectedNewDay(clickedTime);
        setSelectedDay({ date: date, staff: staff });
        
        // Form'u temizle ve yeni randevu modunu aktif et
        setEvent({
            staff: staff,
            selectedTime: date
        });
        setIsEdit(false);
        toggle();
    };

    const str_dt = function formatDate(date: any) {
        var monthNames = [
            "Ocak",
            "Şubat", 
            "Mart",
            "Nisan",
            "Mayıs",
            "Haziran",
            "Temmuz",
            "Ağustos",
            "Eylül",
            "Ekim",
            "Kasım",
            "Aralık",
        ];
        var d = new Date(date),
            month = "" + monthNames[d.getMonth()],
            day = "" + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;
        return [day + " " + month, year].join(",");
    };

    const date_r = function formatDate(date: any) {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;
        return [year, month, day].join("-");
    };

    // Handling click on event on calendar
    const handleEventClick = (arg: any) => {
        const event = arg.event;
        const st_date = event.start;
        const ed_date = event.end;
        const r_date =
            ed_date == null
                ? str_dt(st_date)
                : str_dt(st_date) + " to " + str_dt(ed_date);
        const er_date =
            ed_date == null
                ? date_r(st_date)
                : date_r(st_date) + " to " + date_r(ed_date);

        setEvent({
            id: event.id,
            title: event.title,
            start: event.start,
            end: event.end,
            className: event.classNames,
            category: event.classNames[0],
            location: event._def.extendedProps.location,
            description: event._def.extendedProps.description,
            defaultDate: er_date,
            datetag: r_date,
            payment: event._def.extendedProps.payment,
        });

        setIsEdit(true);
        setIsEditButton(false);
        toggle();
    };

    // On delete event
    const handleDeleteEvent = () => {
        dispatch(onDeleteEvent(event));
        toggle();
    };

    // events validation
    const validation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            title: (event && event.title) || "",
            category: (event && event.category) || "",
            payment: (event && event.payment) || "",
            location: (event && event.location) || "",
            description: (event && event.description) || "",
            defaultDate: (event && event.defaultDate) || "",
            datetag: (event && event.datetag) || "",
            staff: (event && event.staff && event.staff.id) || "",
        },

        validationSchema: Yup.object({
            title: Yup.string().required("Lütfen müşteri adını girin"),
            category: Yup.string().required("Lütfen kategori seçin"),
            payment: Yup.string().required("Lütfen ödeme tutarını girin"),
            location: Yup.string().required("Lütfen konum ekleyin"),
            description: Yup.string().required("Lütfen açıklama ekleyin"),
            staff: Yup.string().required("Lütfen çalışan seçin"),
        }),
        onSubmit: (values) => {
            var updatedDay: any = "";
            if (selectedNewDay) {
                updatedDay = new Date(selectedNewDay[1]);
                updatedDay.setDate(updatedDay.getDate() + 1);
            }

            if (isEdit) {
                const updateEvent = {
                    id: event.id,
                    title: values.title,
                    className: values.category,
                    start: selectedNewDay ? selectedNewDay[0] : event.start,
                    end: selectedNewDay ? updatedDay : event.end,
                    location: values.location,
                    payment: values.payment,
                    description: values.description,
                };
                // update event
                dispatch(onUpdateEvent(updateEvent));
                validation.resetForm();
            } else {
                const newEvent = {
                    id: Math.floor(Math.random() * 100),
                    title: values["title"],
                    start: selectedDay ? selectedNewDay[0] : new Date(),
                    end: selectedDay ? updatedDay : new Date(),
                    className: values.category,
                    location: values["location"],
                    payment: values["payment"],
                    description: values["description"],
                };
                // save new event
                dispatch(onAddNewEvent(newEvent));
                validation.resetForm();
                // validation.resetForm();
            }
            setSelectedDay(null);
            setSelectedNewDay(null);
            toggle();
        },
    });

    const submitOtherEvent = () => {
        document.getElementById("form-event")?.classList.remove("view-event");

        document.getElementById("event-title")?.classList.replace("d-none", "d-block");
        document.getElementById("event-category")?.classList.replace("d-none", "d-block");
        document.getElementById("event-staff")?.classList.replace("d-none", "d-block");
        (document.getElementById("event-start-date")?.parentNode as HTMLElement).classList.remove("d-none");
        document.getElementById("event-start-date")?.classList.replace("d-none", "d-block");
        document.getElementById("event-location")?.classList.replace("d-none", "d-block");
        document.getElementById("event-payment")?.classList.replace("d-none", "d-block");
        document.getElementById("event-description")?.classList.replace("d-none", "d-block");
        document.getElementById("event-start-date-tag")?.classList.replace("d-block", "d-none");
        document.getElementById("event-location-tag")?.classList.replace("d-block", "d-none");
        document.getElementById("event-payment-tag")?.classList.replace("d-block", "d-none");
        document.getElementById("event-description-tag")?.classList.replace("d-block", "d-none");

        setIsEditButton(true);
    };

    // On calendar drop event
    const onDrop = (event: any) => {
        const date = event["date"];
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        const currectDate = new Date();
        const currentHour = currectDate.getHours();
        const currentMin = currectDate.getMinutes();
        const currentSec = currectDate.getSeconds();
        const modifiedDate = new Date(
            year,
            month,
            day,
            currentHour,
            currentMin,
            currentSec
        );

        const draggedEl = event.draggedEl;
        const draggedElclass = draggedEl.className;
        if (
            draggedEl.classList.contains("external-event") &&
            draggedElclass.indexOf("fc-event-draggable") === -1
        ) {
            const modifiedData = {
                id: Math.floor(Math.random() * 1000),
                title: draggedEl.innerText,
                start: modifiedDate,
                className: draggedEl.className,
            };
            dispatch(onAddNewEvent(modifiedData));
        }
    };

    //Search Functionality for Upcomming Events
    const [UpcommingEventList, setUpcommingEventList] = useState<any[]>([]);

    useEffect(() => {
        setUpcommingEventList(events || []);
    },[events]);

    const searchCustomer = (ele: any) => {
        let search = ele.target.value;
        if (search) {
            search = search.toLowerCase();
            setUpcommingEventList((events || []).filter((data: any) => (
                data && data.title && typeof data.title === 'string' && 
                data.title.toLowerCase().includes(search)
            )));
        } else {
            setUpcommingEventList(events || []);
        }
    };
    document.title = "Rezervasyon | CRM v2 Randevu Takip";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumb title="Rezervasyon" pageTitle="Rezervasyon" />
                    <Row>
                        <Col xl={9}>
                            <Card className="card-h-100">
                                <Card.Body>
                                    {/* Randevu Çetveli Header */}
                                    <div className="appointment-scheduler">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <Button variant="outline-primary" size="sm" onClick={() => {
                                                    const prevDay = new Date(selectedDate);
                                                    prevDay.setDate(prevDay.getDate() - 1);
                                                    setSelectedDate(prevDay);
                                                }}>
                                                    <i className="bi bi-chevron-left"></i>
                                                </Button>
                                                <h5 className="mb-0">
                                                    {selectedDate.toLocaleDateString('tr-TR', { 
                                                        weekday: 'long', 
                                                        year: 'numeric', 
                                                        month: 'long', 
                                                        day: 'numeric' 
                                                    })}
                                                </h5>
                                                <Button variant="outline-primary" size="sm" onClick={() => {
                                                    const nextDay = new Date(selectedDate);
                                                    nextDay.setDate(nextDay.getDate() + 1);
                                                    setSelectedDate(nextDay);
                                                }}>
                                                    <i className="bi bi-chevron-right"></i>
                                                </Button>
                                            </div>
                                            <Button variant="primary" size="sm" onClick={() => setSelectedDate(new Date())}>
                                                Bugün
                                            </Button>
                                        </div>

                                        {/* Randevu Çetveli */}
                                        <div className="scheduler-container" style={{ overflowX: 'auto' }}>
                                            <Table className="scheduler-table" style={{ minWidth: '800px' }}>
                                                <thead>
                                                    <tr>
                                                        <th className="staff-column" style={{ width: '200px', position: 'sticky', left: 0, backgroundColor: '#fff', zIndex: 10 }}>
                                                            Çalışanlar
                                                        </th>
                                                        {/* Saat sütunları */}
                                                        {Array.from({ length: 48 }, (_, i) => {
                                                            const hour = Math.floor(i / 2);
                                                            const minute = i % 2 === 0 ? '00' : '30';
                                                            return (
                                                                <th key={i} className="time-slot" style={{ minWidth: '50px', textAlign: 'center', fontSize: '11px' }}>
                                                                    {`${hour.toString().padStart(2, '0')}:${minute}`}
                                                                </th>
                                                            );
                                                        })}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {staffList.map((staff, staffIndex) => (
                                                        <tr key={staff.id}>
                                                            <td className="staff-info" style={{ 
                                                                position: 'sticky', 
                                                                left: 0, 
                                                                backgroundColor: '#fff', 
                                                                zIndex: 9,
                                                                borderRight: '2px solid #dee2e6'
                                                            }}>
                                                                <div className="px-1 py-1">
                                                                    <div className="text-primary" style={{ fontSize: '11px', fontWeight: '600' }}>{staff.name}</div>
                                                                    <div className="text-muted" style={{ fontSize: '9px' }}>{staff.profession}</div>
                                                                </div>
                                                            </td>
                                                            {/* Saat blokları */}
                                                            {Array.from({ length: 48 }, (_, timeIndex) => {
                                                                const hour = Math.floor(timeIndex / 2);
                                                                const minute = timeIndex % 2 === 0 ? 0 : 30;
                                                                
                                                                // Sabit randevu kontrolü (demo için)
                                                                const hasAppointment = (
                                                                    (staff.id === 1 && hour === 10 && minute === 0) || // Ayşe Demir - 10:00
                                                                    (staff.id === 3 && hour === 14 && minute === 0)    // Zeynep Kaya - 14:00
                                                                );
                                                                const appointmentData = hasAppointment ? {
                                                                    customerName: staff.id === 1 ? 'Ayşe Yılmaz' : 'Mehmet Demir',
                                                                    service: staff.id === 1 ? 'Saç Kesimi + Boyama' : 'Cilt Bakımı',
                                                                    duration: 2
                                                                } : null;
                                                                
                                                                return (
                                                                    <td 
                                                                        key={timeIndex} 
                                                                        className="time-cell" 
                                                                        style={{ 
                                                                            height: '35px', 
                                                                            borderLeft: '1px solid #e9ecef',
                                                                            borderBottom: '1px solid #e9ecef',
                                                                            cursor: 'pointer',
                                                                            position: 'relative'
                                                                        }}
                                                                        onClick={() => {
                                                                            const clickTime = new Date(selectedDate);
                                                                            clickTime.setHours(hour, minute, 0, 0);
                                                                            
                                                                            // Eğer randevu varsa detayları göster, yoksa yeni randevu oluştur
                                                                            if (hasAppointment && appointmentData) {
                                                                                const mockEvent = {
                                                                                    event: {
                                                                                        id: `${staff.id}-${timeIndex}`,
                                                                                        title: appointmentData.customerName,
                                                                                        start: clickTime,
                                                                                        classNames: ['bg-primary'],
                                                                                        _def: {
                                                                                            extendedProps: {
                                                                                                location: 'Salon',
                                                                                                description: appointmentData.service,
                                                                                                payment: '250'
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                };
                                                                                handleEventClick(mockEvent);
                                                                            } else {
                                                                                handleDateClick({ date: clickTime, staff: staff });
                                                                            }
                                                                        }}
                                                                        onMouseEnter={(e) => {
                                                                            if (!hasAppointment) {
                                                                                e.currentTarget.style.backgroundColor = '#f8f9fa';
                                                                            }
                                                                        }}
                                                                        onMouseLeave={(e) => {
                                                                            if (!hasAppointment) {
                                                                                e.currentTarget.style.backgroundColor = 'transparent';
                                                                            }
                                                                        }}
                                                                    >
                                                                        {hasAppointment && (
                                                                            <div 
                                                                                className="appointment-block bg-primary" 
                                                                                style={{ 
                                                                                    width: '85%',
                                                                                    height: '70%',
                                                                                    cursor: 'pointer',
                                                                                    position: 'absolute',
                                                                                    top: '15%',
                                                                                    left: '7.5%',
                                                                                    borderRadius: '3px',
                                                                                    opacity: 0.9
                                                                                }}
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    if (appointmentData) {
                                                                                        const mockEvent = {
                                                                                            event: {
                                                                                                id: `${staff.id}-${timeIndex}`,
                                                                                                title: appointmentData.customerName,
                                                                                                start: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), hour, minute),
                                                                                                classNames: ['bg-primary'],
                                                                                                _def: {
                                                                                                    extendedProps: {
                                                                                                        location: 'Salon',
                                                                                                        description: appointmentData.service,
                                                                                                        payment: '250'
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        };
                                                                                        handleEventClick(mockEvent);
                                                                                    }
                                                                                }}
                                                                            >
                                                                            </div>
                                                                        )}
                                                                    </td>
                                                                );
                                                            })}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl={3}>
                            <Button variant="primary" className="w-100" id="btn-new-event" onClick={toggle}><i className="mdi mdi-plus"></i> Yeni Rezervasyon Oluştur</Button>
                            <div className="mt-4">
                                <h5 className="mb-1 fs-18">Son Eklenen Rezervasyonlar</h5>
                                <p className="text-muted">Planlanmış rezervasyonları kaçırmayın</p>
                                <div className="search-box mb-3">
                                    <input type="text" className="form-control" autoComplete="off" id="searchResultsList" placeholder="Müşteri ara..." onChange={(e) => searchCustomer(e)} />
                                    <i className="ri-search-line search-icon"></i>
                                </div>
                                <SimpleBar className="pe-2 me-n1 mb-3" style={{ height: "595px" }}>
                                    <div id="upcoming-event-list">
                                        {UpcommingEventList && Array.isArray(UpcommingEventList) &&
                                            UpcommingEventList.filter(event => event && event.title).map((event: any, key: number) => (
                                                <React.Fragment key={key}>
                                                    <UpcommingEvents event={event} />
                                                </React.Fragment>
                                            ))}
                                    </div>
                                </SimpleBar>
                            </div>

                        </Col>
                    </Row>
                </Container>
            </div>

            <Modal show={modal} id="event-modal" onHide={toggle} centered>
                <Modal.Header className="p-3 bg-info-subtle" closeButton>
                    <Modal.Title>
                        {!!isEdit ? (event.title || "Rezervasyon Düzenle") : "Rezervasyon Ekle"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Form className={!!isEdit ? "needs-validation view-event" : "needs-validation"} name="event-form" id="form-event"
                        onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }}>
                        {!!isEdit ? (<div className="text-end"> <Link to="#" className="btn btn-sm btn-soft-primary" id="edit-event-btn" onClick={(e) => { e.preventDefault(); submitOtherEvent(); return false; }} > Düzenle </Link></div>) : null}

                        <div className="event-details">
                            <div className="d-flex mb-2">
                                <div className="flex-grow-1 d-flex align-items-center">
                                    <div className="flex-shrink-0 me-3">
                                        <i className="ri-calendar-event-line text-muted fs-16"></i>
                                    </div>
                                    <div className="flex-grow-1">
                                        <h6 className="d-block fw-semibold mb-0" id="event-start-date-tag">
                                            {event ? event.datetag : ""}
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <div className="flex-shrink-0 me-3">
                                    <i className="ri-money-dollar-circle-line text-muted fs-16"></i>
                                </div>
                                <div className="flex-grow-1">
                                    <h6 className="d-block fw-semibold mb-0"> <span id="event-payment-tag">₺{event && event.payment !== undefined ? event.payment : " Ödeme Yok"}</span></h6>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <div className="flex-shrink-0 me-3">
                                    <i className="ri-map-pin-line text-muted fs-16"></i>
                                </div>
                                <div className="flex-grow-1">
                                    <h6 className="d-block fw-semibold mb-0">
                                        {" "}
                                        <span id="event-location-tag">
                                            {event && event.location !== undefined ? event.location : "Konum Yok"}
                                        </span>
                                    </h6>
                                </div>
                            </div>
                            <div className="d-flex mb-3">
                                <div className="flex-shrink-0 me-3">
                                    <i className="ri-discuss-line text-muted fs-16"></i>
                                </div>
                                <div className="flex-grow-1">
                                    <p
                                        className="d-block text-muted mb-0"
                                        id="event-description-tag"
                                    >
                                        {event && event.description !== undefined ? event.description : "Açıklama Yok"}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Row className="event-form">
                            <Col xs={12}>
                                <div className="mb-3">
                                    <Form.Label className="form-label">Çalışan</Form.Label>
                                    <Form.Control as="select"
                                        className={!!isEdit ? "form-select d-none" : "form-select d-block"} 
                                        name="staff" 
                                        id="event-staff" 
                                        onChange={validation.handleChange} 
                                        onBlur={validation.handleBlur} 
                                        value={validation.values.staff || ""}
                                    >
                                        <option value="">Çalışan Seçin</option>
                                        {staffList.map(staff => (
                                            <option key={staff.id} value={staff.id}>{staff.name} - {staff.profession}</option>
                                        ))}
                                    </Form.Control>
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className="mb-3">
                                    <Form.Label className="form-label">Durum</Form.Label>
                                    <Form.Control as="select"
                                        className={!!isEdit ? "form-select d-none" : "form-select d-block"} name="category" id="event-category" type="select" onChange={validation.handleChange} onBlur={validation.handleBlur} value={validation.values.category || ""}>
                                        <option value="bg-info-subtle">Yeni</option>
                                        <option value="bg-warning-subtle">Onaylandı</option>
                                        <option value="bg-success-subtle">Tamamlandı</option>
                                        <option value="bg-danger-subtle">İptal</option>
                                    </Form.Control>
                                    {validation.touched.category && validation.errors.category ? (<Form.Control.Feedback type="invalid">{validation.errors.category}</Form.Control.Feedback>) : null}
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className="mb-3">
                                    <Form.Label className="form-label">Müşteri Adı</Form.Label>
                                    <Form.Control className={!!isEdit ? "form-control d-none" : "form-control d-block"} placeholder="Müşteri adını girin" type="text" name="title" id="event-title" onChange={validation.handleChange} onBlur={validation.handleBlur} value={validation.values.title || ""}
                                        isInvalid={validation.touched.title && validation.errors.title ? true : false}
                                    />
                                    {validation.touched.title && validation.errors.title ? (<Form.Control.Feedback type="invalid">{validation.errors.title}</Form.Control.Feedback>) : null}
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className="mb-3">
                                    <Form.Label>Rezervasyon Tarihi ve Saati</Form.Label>
                                    <div className={!!isEdit ? "input-group d-none" : "input-group"}>
                                        <Flatpickr
                                            className="form-control"
                                            data-enable-time
                                            id="event-start-date"
                                            name="defaultDate"
                                            placeholder="Tarih ve Saat Seçin"
                                            value={validation.values.defaultDate || ""}
                                            options={{
                                                enableTime: true,
                                                dateFormat: "Y-m-d H:i",
                                                time_24hr: true,
                                                minuteIncrement: 30
                                            }}
                                            onChange={(date: any) => {
                                                if (date && date.length > 0) {
                                                    const endTime = new Date(date[0]);
                                                    endTime.setMinutes(endTime.getMinutes() + 30);
                                                    setSelectedNewDay([date[0], endTime]);
                                                }
                                            }}
                                        />
                                        <span className="input-group-text"> <i className="ri-calendar-event-line"></i> </span>
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-12">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="event-payment">Ödeme (₺)</label>
                                    <div>
                                        <Form.Control type="text" className={!!isEdit ? "form-control d-none" : "form-control d-block"} name="payment" id="event-payment" placeholder="Ödeme tutarı" onChange={validation.handleChange} onBlur={validation.handleBlur} value={validation.values.payment} isInvalid={validation.touched.payment && validation.errors.payment ? true : false} />
                                        {validation.touched.payment && validation.errors.payment ? (<Form.Control.Feedback type="invalid">{validation.errors.payment}</Form.Control.Feedback>) : null}
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className="mb-3">
                                    <Form.Label htmlFor="event-location">Konum</Form.Label>
                                    <div>
                                        <Form.Control type="text" className={!!isEdit ? "form-control d-none" : "form-control d-block"} name="location" id="event-location" placeholder="Konum" onChange={validation.handleChange} onBlur={validation.handleBlur} value={validation.values.location} isInvalid={validation.touched.location && validation.errors.location ? true : false} />
                                        {validation.touched.location && validation.errors.location ? (<Form.Control.Feedback type="invalid">{validation.errors.location}</Form.Control.Feedback>) : null}
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className="mb-3">
                                    <Form.Label className="form-label">Açıklama</Form.Label>
                                    <Form.Control as="textarea"
                                        className={!!isEdit ? "form-control d-none" : "form-control d-block"}
                                        id="event-description"
                                        name="description"
                                        placeholder="Açıklama girin"
                                        rows={3}
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.description}
                                        isInvalid={validation.touched.description && validation.errors.description ? true : false}
                                    ></Form.Control>
                                    {validation.touched.description && validation.errors.description ? (<Form.Control.Feedback type="invalid">{validation.errors.description}</Form.Control.Feedback>) : null}
                                </div>
                            </Col>
                        </Row>
                        <div className="hstack gap-2 justify-content-end">
                            {!!isEdit && (<Button variant="soft-danger" type="button" id="btn-delete-event" onClick={() => handleDeleteEvent()}> <i className="ri-close-line align-bottom"></i> Sil </Button>)}
                            {isEditButton && <Button variant="success" type="submit" id="btn-save-event" > {!!isEdit ? "Rezervasyonu Düzenle" : "Rezervasyon Ekle"} </Button>}
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </React.Fragment >
    );
}

export default Rezervasyon;
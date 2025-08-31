import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';

interface DayHours {
    isOpen: boolean;
    opening: string;
    closing: string;
}

interface BusinessHoursState {
    pazartesi: DayHours;
    sali: DayHours;
    carsamba: DayHours;
    persembe: DayHours;
    cuma: DayHours;
    cumartesi: DayHours;
    pazar: DayHours;
}

const BusinessHours = () => {
    const [businessHours, setBusinessHours] = useState<BusinessHoursState>({
        pazartesi: { isOpen: true, opening: '10:00', closing: '20:00' },
        sali: { isOpen: true, opening: '10:00', closing: '20:00' },
        carsamba: { isOpen: true, opening: '10:00', closing: '20:00' },
        persembe: { isOpen: true, opening: '10:00', closing: '20:00' },
        cuma: { isOpen: true, opening: '10:00', closing: '20:00' },
        cumartesi: { isOpen: true, opening: '10:00', closing: '20:00' },
        pazar: { isOpen: false, opening: '10:00', closing: '20:00' }
    });

    const handleDayToggle = (day: keyof BusinessHoursState) => {
        setBusinessHours(prev => ({
            ...prev,
            [day]: { ...prev[day], isOpen: !prev[day].isOpen }
        }));
    };

    const handleTimeChange = (day: keyof BusinessHoursState, timeType: 'opening' | 'closing', value: string) => {
        setBusinessHours(prev => ({
            ...prev,
            [day]: { ...prev[day], [timeType]: value }
        }));
    };

    const dayLabels: Record<keyof BusinessHoursState, string> = {
        pazartesi: 'Pazartesi',
        sali: 'Salı',
        carsamba: 'Çarşamba',
        persembe: 'Perşembe',
        cuma: 'Cuma',
        cumartesi: 'Cumartesi',
        pazar: 'Pazar'
    };

    return (
        <React.Fragment>
            <Row>
                <Col lg={4}>
                    <h5 className="fs-16">Çalışma Saatleri</h5>
                    <p className="text-muted mb-lg-0">İşletmenizin çalışma saatlerini belirleyin. Müşterileriniz bu saatlerde randevu alabilecektir.</p>
                </Col>
                <Col lg={8}>
                    <Card>
                        <Card.Body>
                            <div className="table-responsive">
                                <table className="table table-borderless mb-0">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '25%', fontWeight: 600 }}>Gün</th>
                                            <th style={{ width: '25%', fontWeight: 600 }}>Durum</th>
                                            <th style={{ width: '25%', fontWeight: 600 }}>Açılış</th>
                                            <th style={{ width: '25%', fontWeight: 600 }}>Kapanış</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(Object.keys(businessHours) as (keyof BusinessHoursState)[]).map((day) => {
                                            const hours = businessHours[day];
                                            return (
                                                <tr key={day}>
                                                    <td className="align-middle">
                                                        <span style={{ color: '#495057', fontSize: '14px' }}>
                                                            {dayLabels[day]}
                                                        </span>
                                                    </td>
                                                    <td className="align-middle">
                                                        <div className={`form-check form-switch ${hours.isOpen ? 'form-switch-success' : 'form-switch-secondary'}`}>
                                                            <Form.Check 
                                                                type="checkbox" 
                                                                role="switch" 
                                                                id={`switch${day}`}
                                                                checked={hours.isOpen}
                                                                onChange={() => handleDayToggle(day)}
                                                            />
                                                            <Form.Label htmlFor={`switch${day}`} className="ms-2">
                                                                <span style={{ 
                                                                    color: hours.isOpen ? '#28a745' : '#6c757d',
                                                                    fontSize: '14px',
                                                                    fontWeight: 500
                                                                }}>
                                                                    {hours.isOpen ? 'Açık' : 'Kapalı'}
                                                                </span>
                                                            </Form.Label>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle">
                                                        <Form.Control
                                                            type="time"
                                                            value={hours.opening}
                                                            onChange={(e) => handleTimeChange(day, 'opening', e.target.value)}
                                                            disabled={!hours.isOpen}
                                                            style={{ width: '130px', fontSize: '14px' }}
                                                        />
                                                    </td>
                                                    <td className="align-middle">
                                                        <div className="d-flex align-items-center">
                                                            <span className="me-2">-</span>
                                                            <Form.Control
                                                                type="time"
                                                                value={hours.closing}
                                                                onChange={(e) => handleTimeChange(day, 'closing', e.target.value)}
                                                                disabled={!hours.isOpen}
                                                                style={{ width: '130px', fontSize: '14px' }}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="text-end mt-3">
                                <Button variant='primary' type="submit">Çalışma Saatlerini Kaydet</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default BusinessHours;
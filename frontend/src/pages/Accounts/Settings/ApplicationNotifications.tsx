import React from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';

const ApplicationNotifications = () => {
    return (
        <React.Fragment>
            <Row>
                <Col lg={4}>
                    <h5 className="fs-16">Uygulama Bildirimleri:</h5>
                    <p className="text-muted mb-lg-0">Uygulama bildirimlerinizi buradan yönetebilirsiniz. E-posta ve push bildirim tercihlerinizi ayarlayabilirsiniz.</p>
                </Col>
                <Col lg={8}>
                    <Card>
                        <Card.Body>
                            <p className="text-muted">Bildirim ayarları yakında eklenecektir.</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ApplicationNotifications;
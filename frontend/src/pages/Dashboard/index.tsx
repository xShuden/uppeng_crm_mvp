import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Widgets from './Widgets';
import RecentOrders from './RecentOrders';
import Revenue from './Revenue';

const Dashboard = () => {

    document.title = "Dashboard | Toner eCommerce + Admin React Template";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col xxl={12} lg={6} className="order-first">
                            <Row className="row-cols-xxl-4 row-cols-1">
                                <Widgets />
                            </Row>
                        </Col>
                        <Revenue />
                    </Row>
                    <Row>
                        <RecentOrders />
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Dashboard;
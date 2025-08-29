import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Dropdown, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Flatpickr from "react-flatpickr";
import { RevenueCharts } from './DashboardCharts';
import CountUp from 'react-countup';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';

//import images
import CustomDropdownToggle from 'Common/CustomDropdownToggle';

import { getChartData as getChartApiData } from "../../slices/thunk";

const Revenue = () => {

    const dispatch: any = useDispatch();

    const [chartData, setchartData] = useState<any>([]);

    const [activeChart, setactiveChart] = useState<string>("yearly");

    const selectProperties = createSelector(
        (state: any) => state.Dashboard,
        (dashboard) => ({
            revenueChartData: dashboard.chartData
        })
    );

    const { revenueChartData } = useSelector(selectProperties);

    useEffect(() => {
        setchartData(revenueChartData);
    }, [revenueChartData]);

    const onChangeChartPeriod = (pType: any) => {
        dispatch(getChartApiData(pType));
        setactiveChart(pType)
    };

    useEffect(() => {
        dispatch(getChartApiData("yearly"));
        setactiveChart("yearly")
    }, [dispatch]);

    return (
        <React.Fragment>
            <Col xxl={12} className="order-last">
                <Card>
                    <Card.Header className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Revenue</h4>
                        <div>
                            <Button variant='soft-secondary' size="sm" className={activeChart === "all" ? "me-1 active" : "me-1"} onClick={() => onChangeChartPeriod("all")}>
                                ALL
                            </Button>
                            <Button variant='soft-secondary' size="sm" className={activeChart === "monthly" ? "me-1 active" : "me-1"} onClick={() => onChangeChartPeriod("monthly")}>
                                1M
                            </Button>
                            <Button variant='soft-secondary' size="sm" className={activeChart === "halfyearly" ? "me-1 active" : "me-1"} onClick={() => onChangeChartPeriod("halfyearly")}>
                                6M
                            </Button>
                            <Button variant='soft-primary' size="sm" className={activeChart === "yearly" ? "active" : ""} onClick={() => onChangeChartPeriod("yearly")}>
                                1Y
                            </Button>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col xxl={8}>
                                <RevenueCharts chartData={chartData} dataColors='["--tb-secondary", "--tb-danger", "--tb-success"]' />
                            </Col>
                            <Col xxl={4}>
                                <div className="d-flex align-items-center gap-3 mb-4 mt-3 mt-xxl-0">
                                    <div className="input-group">
                                        <Flatpickr
                                            className="form-control flatpickr-input"
                                            options={{
                                                mode: "range",
                                                dateFormat: "d M, Y",
                                                defaultDate: ["01 Jan 2023", "31 Jan 2023"]
                                            }}
                                        />
                                        <div className="input-group-text bg-primary border-primary text-white">
                                            <i className="ri-calendar-2-line"></i>
                                        </div>
                                    </div>
                                    <Dropdown className="flex-shrink-0">
                                        <Dropdown.Toggle as={CustomDropdownToggle} href="#" className="text-reset dropdown-btn d-inline-block">
                                            <span className="text-muted">Report<i className="mdi mdi-chevron-down ms-1"></i></span>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="dropdown-menu dropdown-menu-end">
                                            <Dropdown.Item className="dropdown-item" href="#">Download Report</Dropdown.Item>
                                            <Dropdown.Item className="dropdown-item" href="#">Export</Dropdown.Item>
                                            <Dropdown.Item className="dropdown-item" href="#">Import</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <Row className="g-0 text-center">
                                    <Col xs={6} sm={6}>
                                        <div className="p-3 border border-dashed border-bottom-0">
                                            <h5 className="mb-1"><span className="counter-value" data-target="65802">
                                                <CountUp start={0} end={65802} separator="," />
                                            </span></h5>
                                            <p className="text-muted mb-0">Orders</p>
                                        </div>
                                    </Col>

                                    <Col xs={6} sm={6}>
                                        <div className="p-3 border border-dashed border-start-0 border-bottom-0">
                                            <h5 className="mb-1">$<span className="counter-value" data-target="98851.35">
                                                <CountUp start={0} end={98851.35} separator="," decimals={2} />
                                            </span>k</h5>
                                            <p className="text-muted mb-0">Earnings</p>
                                        </div>
                                    </Col>

                                    <Col xs={6} sm={6}>
                                        <div className="p-3 border border-dashed">
                                            <h5 className="mb-1"><span className="counter-value" data-target="2450">
                                                <CountUp start={0} end={2450} separator="," />
                                            </span></h5>
                                            <p className="text-muted mb-0">Refunds</p>
                                        </div>
                                    </Col>

                                    <Col xs={6} sm={6}>
                                        <div className="p-3 border border-dashed border-start-0">
                                            <h5 className="mb-1 text-success"><span className="counter-value" data-target="18.92">
                                                <CountUp start={0} end={18.92} separator="," decimals={2} />
                                            </span>%</h5>
                                            <p className="text-muted mb-0">Conversation Ratio</p>
                                        </div>
                                    </Col>

                                </Row>

                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

            </Col >
        </React.Fragment >
    );
}

export default Revenue;
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
                        <h4 className="card-title mb-0 flex-grow-1">Randevu Trendleri</h4>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col xxl={12}>
                                <RevenueCharts chartData={chartData} dataColors='["--tb-secondary", "--tb-danger", "--tb-success"]' />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

            </Col >
        </React.Fragment >
    );
}

export default Revenue;
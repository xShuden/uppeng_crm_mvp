import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Dropdown, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { get } from 'lodash';

import flagus from "assets/images/flags/us.svg";

//i18n
import i18n from "Common/i18n";
import languages from "Common/data/languages";

const TopBar = () => {
    const currentTime: any = useRef(null);
    useEffect(() => {
        const interval = setInterval(() => {
            // Türkiye saati için
            const d = new Date();
            
            // Türkiye saati (UTC+3)
            const turkeyTime = new Date(d.toLocaleString("en-US", {timeZone: "Europe/Istanbul"}));
            
            // Türkçe tarih formatı
            const dateOptions: Intl.DateTimeFormatOptions = { 
                weekday: 'long', 
                year: 'numeric',
                month: 'long', 
                day: 'numeric' 
            };
            const date = turkeyTime.toLocaleDateString('tr-TR', dateOptions);
            
            // 24 saat formatı
            const timeOptions: Intl.DateTimeFormatOptions = { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
            };
            const time = turkeyTime.toLocaleTimeString('tr-TR', timeOptions);
            
            currentTime.current.innerHTML = date + " | " + time;
        }, 1000);
        return () => clearInterval(interval);
    }, [currentTime]);

    const [selectedLang, setSelectedLang] = useState<any>("");

    useEffect(() => {
        const currentLanguage = localStorage.getItem("I18N_LANGUAGE");
        setSelectedLang(currentLanguage);
    }, []);

    const changeLanguageAction = (lang: any) => {
        //set language as i18n
        i18n.changeLanguage(lang);
        localStorage.setItem("I18N_LANGUAGE", lang);
        setSelectedLang(lang);
    };

    return (
        <React.Fragment>
            <div className="top-tagbar">
                <Container fluid>
                    <Row className="justify-content-between align-items-center">
                        <Col md={4} xs={9}>
                            <div className="fs-14 fw-medium">
                                <i className="bi bi-clock align-middle me-2"></i> <span ref={currentTime} id="current-time"></span>
                            </div>
                        </Col>
                        <Col md={4} xs={3}>
                            <div className="d-flex align-items-center justify-content-end gap-3 fs-14">
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default TopBar;
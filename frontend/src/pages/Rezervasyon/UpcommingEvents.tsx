import React from "react";
import { Card } from "react-bootstrap";

const Status = ({ status }: any) => {
    switch (status) {
        case "bg-info-subtle":
            return (<span className="badge bg-info-subtle text-info">Yeni</span>)
        case "bg-success-subtle":
            return (<span className="badge bg-success-subtle text-success">Tamamlandı</span>)
        case "bg-warning-subtle":
            return (<span className="badge bg-warning-subtle text-warning">Onaylandı</span>)
        case "bg-danger-subtle":
            return (<span className="badge bg-danger-subtle text-danger">İptal</span>)
        default:
            return (<span className="badge bg-info-subtle text-info">Yeni</span>)
    }
}

function UpcommingEvents(props: any) {

    const str_dt = function formatDate(date: any) {
        const monthNames = [
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

    var endUpdatedDay: any = "";
    if (props.event.end) {
        endUpdatedDay = new Date(props.event.end);
        var updatedDay = endUpdatedDay.setDate(endUpdatedDay.getDate() - 1);
    }
    var e_dt = updatedDay ? updatedDay : undefined;
    if (e_dt === "Invalid Date" || e_dt === undefined) {
        e_dt = null;
    } else {
        const newDate = new Date(e_dt).toLocaleDateString('tr', { year: 'numeric', month: 'numeric', day: 'numeric' });
        e_dt = new Date(newDate)
            .toLocaleDateString("tr-TR", {
                day: "numeric",
                month: "short",
                year: "numeric",
            })
            .split(" ")
            .join(" ");
    }

    const st_date = props.event.start ? str_dt(props.event.start) : null;
    const ed_date = updatedDay ? str_dt(updatedDay) : null;
    if (st_date === ed_date) {
        e_dt = null;
    }
    var startDate = props.event.start;
    if (startDate === "Invalid Date" || startDate === undefined) {
        startDate = null;
    } else {
        const newDate = new Date(startDate).toLocaleDateString('tr', { year: 'numeric', month: 'numeric', day: 'numeric' });
        startDate = new Date(newDate)
            .toLocaleDateString("tr-TR", {
                day: "numeric",
                month: "short",
                year: "numeric",
            })
            .split(" ")
            .join(" ");
    }

    var end_dt = e_dt ? e_dt : startDate;

    return (
        <React.Fragment>
            <Card>
                <Card.Body>
                    <div className="d-flex align-items-center mb-4">
                        <p className="mb-0 flex-grow-1">RezervasyonID:
                            <span className="fw-medium">#RZV8{props.event.id}</span></p>
                        <div className="flex-shrink-0">
                            <Status status={props.event.className} />
                        </div>
                    </div>
                    <h5 className="fs-16">{props.event.title}</h5>
                    <div className="d-flex justify-content-between align-items-center mb-0">
                        <p className="mb-0"><i className="bi bi-calendar2-check me-1 text-muted align-middle"></i>{startDate}</p>
                        <p className="mb-0"><i className="bi bi-box-seam me-1 text-muted align-middle"></i>{end_dt}</p>
                    </div>
                </Card.Body>
            </Card>
        </React.Fragment>
    );
}

export default UpcommingEvents;
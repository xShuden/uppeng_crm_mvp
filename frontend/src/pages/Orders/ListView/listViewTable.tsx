import React, { useMemo } from 'react';
import TableContainer from "Common/TableContainer";

import { ordersList } from "Common/data";
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

const ListViewTable = () => {

    const columns = useMemo(
        () => [
            {
                Header: (<div className="form-check">
                    <input className="form-check-input" type="checkbox" id="checkAll" value="option" />
                </div>),
                Cell: (cellProps: any) => {
                    return (<div className="form-check">
                        <input className="form-check-input" type="checkbox" name="chk_child" defaultValue="option1" />
                    </div>);
                },
                id: '#',
            },
            {
                Header: "Rezervasyon ID",
                disableFilters: true,
                filterable: true,
                accessor: (cellProps: any) => {
                    return <Link to="#" className="fw-medium link-primary">{cellProps.orderId}</Link>;
                },
            },
            {
                Header: "Müşteri Adı",
                accessor: "customer_name",
                disableFilters: true,
                filterable: true,
            },
            {
                Header: "Hizmet",
                accessor: "product_name",
                disableFilters: true,
                filterable: true,
            },
            {
                Header: "Personel",
                accessor: "staff_name",
                disableFilters: true,
                filterable: true,
            },
            {
                Header: "Ücret",
                accessor: "amount",
                disableFilters: true,
                filterable: true,
            },
            {
                Header: "Rezervasyon Tarihi",
                accessor: "order_date",
                disableFilters: true,
                filterable: true,
            },
            {
                Header: "Randevu Saati",
                accessor: "appointment_time",
                disableFilters: true,
                filterable: true,
            },
            {
                Header: "Ödeme Yöntemi",
                accessor: "payment_method",
                disableFilters: true,
                filterable: true,
            },
            {
                Header: "Durum",
                disableFilters: true,
                filterable: true,
                accessor: (cellProps: any) => {
                    switch (cellProps.status) {
                        case "Completed":
                            return (<span className="badge bg-success-subtle text-success text-uppercase">Tamamlandı</span>)
                        case "Cancelled":
                            return (<span className="badge bg-danger-subtle text-danger text-uppercase">İptal Edildi</span>)
                        case "Pending":
                            return (<span className="badge bg-warning-subtle text-warning text-uppercase">Beklemede</span>)
                        case "Confirmed":
                            return (<span className="badge bg-info-subtle text-info text-uppercase">Onaylandı</span>)
                        case "In-Progress":
                            return (<span className="badge bg-secondary-subtle text-secondary text-uppercase">Devam Ediyor</span>)
                        default:
                            return (<span className="badge bg-warning-subtle text-warning text-uppercase">Beklemede</span>)
                    }
                },
            },
            {
                Header: "İşlem",
                disableFilters: true,
                filterable: true,
                accessor: (cellProps: any) => {
                    return (
                        <React.Fragment>
                            <Dropdown className="text-center">
                                <Dropdown.Toggle href="#!" className="btn btn-soft-secondary btn-sm btn-icon dropdown arrow-none">
                                    <i className="mdi mdi-dots-horizontal" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu as="ul" className="dropdown-menu-end">
                                    <li>
                                        <Dropdown.Item href="/rezervasyon">
                                            <i className="ri-eye-fill align-bottom me-2 text-muted" /> Görüntüle
                                        </Dropdown.Item>
                                    </li>
                                    <li>
                                        <Dropdown.Item href="#" className="edit-item">
                                            <i className="ri-pencil-fill align-bottom me-2 text-muted" />Düzenle
                                        </Dropdown.Item>
                                    </li>
                                    <li>
                                        <Dropdown.Item href="#" className="remove-list">
                                            <i className="ri-delete-bin-fill align-bottom me-2 text-muted" />İptal Et
                                        </Dropdown.Item>
                                    </li>
                                </Dropdown.Menu>
                            </Dropdown>
                        </React.Fragment>
                    )
                },
            },
        ],
        []
    );

    return (
        <React.Fragment>
            <TableContainer
                columns={(columns || [])}
                data={(ordersList || [])}
                // isGlobalFilter={false}
                iscustomPageSize={false}
                isBordered={false}
                customPageSize={10}
                className="custom-header-css"
                tableClass="table-centered align-middle table-nowrap mb-0"
                theadClass="text-muted table-light"
                SearchPlaceholder='Search Products...'
            />
        </React.Fragment>
    );
}

export default ListViewTable;
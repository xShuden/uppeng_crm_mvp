import React, { useMemo } from 'react';
import TableContainer from "Common/TableContainer";
import { account } from "Common/data";
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RecentOrdersTable = () => {
    const columns = useMemo(
        () => [
            {
                Header: (<div className="form-check"> <input className="form-check-input" type="checkbox" id="checkAll" value="option" /> </div>),
                Cell: (cellProps: any) => {
                    return (<div className="form-check"> <input className="form-check-input" type="checkbox" name="chk_child" defaultValue="option1" /> </div>);
                },
                id: '#',
            },
            {
                Header: "Randevu ID",
                accessor: (cellProps: any) => {
                    return (
                        <Link to="#" className="fw-medium">{cellProps.OrderID}</Link>
                    )
                },
                disableFilters: true,
                filterable: true,
            },
            {
                Header: "Hizmet Adı",
                accessor: "ProductName",
                disableFilters: true,
                filterable: true,
            },
            {
                Header: "Tutar",
                accessor: "Amount",
                disableFilters: true,
                filterable: true,
            },
            {
                Header: "Randevu Tarihi",
                accessor: "OrderDate",
                disableFilters: true,
                filterable: true,
            },
            {
                Header: "Ödeme Yöntemi",
                accessor: "PaymentMethod",
                disableFilters: true,
                filterable: true,
            },
            {
                Header: "Durum",
                disableFilters: true,
                filterable: true,
                accessor: (cellProps: any) => {
                    switch (cellProps.DeliveryStatus) {
                        case "Delivered":
                            return (<span className="badge bg-success-subtle text-success text-uppercase">Tamamlandı</span>)
                        case "Pickups":
                            return (<span className="badge bg-info-subtle text-info text-uppercase">Hazır</span>)
                        case "Pending":
                            return (<span className="badge bg-warning-subtle text-warning text-uppercase">Beklemede</span>)
                        case "Inprogress":
                            return (<span className="badge bg-secondary-subtle text-secondary text-uppercase">Devam Ediyor</span>)
                        case "Returns":
                            return (<span className="badge bg-primary-subtle text-primary text-uppercase">İade</span>)
                        case "Cancelled":
                            return (<span className="badge bg-danger-subtle text-danger text-uppercase">İptal</span>)
                        default:
                            return (<span className="badge bg-success-subtle text-success text-uppercase">Tamamlandı</span>)
                    }
                },
            },
            {
                Header: "İşlemler",
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
                                        <Dropdown.Item href="/orders-overview">
                                            <i className="ri-eye-fill align-bottom me-2 text-muted" /> Görüntüle
                                        </Dropdown.Item>
                                    </li>
                                    <li>
                                        <Dropdown.Item href="#" className="remove-list">
                                            <i className="ri-delete-bin-fill align-bottom me-2 text-muted" />Sil
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
                data={(account || [])}
                // isGlobalFilter={false}
                iscustomPageSize={false}
                isBordered={false}
                customPageSize={10}
                className="custom-header-css table align-middle table-nowrap"
                tableClass="table-centered align-middle table-nowrap mb-0"
                theadClass="text-muted table-light"
                SearchPlaceholder='Hizmet Ara...'
            />
        </React.Fragment>
    );
};

export default RecentOrdersTable;
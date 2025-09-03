import React, { useMemo, useState } from 'react';
import TableContainer from "Common/TableContainer";

import { ordersList } from "Common/data";
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

const ListViewTable = () => {
    const [orders, setOrders] = useState(ordersList);

    const handleStatusChange = (orderId: number, newStatus: string) => {
        setOrders(prevOrders => 
            prevOrders.map(order => 
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

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
                Header: "İsim",
                disableFilters: true,
                filterable: true,
                accessor: (cellProps: any) => {
                    const fullName = cellProps.customer_name || "";
                    const firstName = fullName.split(" ")[0] || "";
                    return firstName;
                },
            },
            {
                Header: "Soyisim",
                disableFilters: true,
                filterable: true,
                accessor: (cellProps: any) => {
                    const fullName = cellProps.customer_name || "";
                    const lastName = fullName.split(" ").slice(1).join(" ") || "";
                    return lastName;
                },
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
                Header: "Durum",
                disableFilters: true,
                filterable: true,
                accessor: (cellProps: any) => {
                    const getStatusDisplay = (status: string) => {
                        switch (status) {
                            case "Completed":
                                return { text: "TAMAMLANDI", class: "bg-success-subtle text-success" };
                            case "Cancelled":
                                return { text: "İPTAL", class: "bg-danger-subtle text-danger" };
                            case "Confirmed":
                                return { text: "ONAYLANDI", class: "bg-info-subtle text-info" };
                            default:
                                return { text: "ONAYLANDI", class: "bg-info-subtle text-info" };
                        }
                    };

                    const currentStatus = getStatusDisplay(cellProps.status);
                    
                    return (
                        <Dropdown>
                            <Dropdown.Toggle 
                                variant="link" 
                                className={`badge ${currentStatus.class} text-uppercase border-0 p-2`}
                                style={{ textDecoration: 'none' }}
                            >
                                {currentStatus.text}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item 
                                    onClick={() => handleStatusChange(cellProps.id, "Confirmed")}
                                >
                                    ONAYLANDI
                                </Dropdown.Item>
                                <Dropdown.Item 
                                    onClick={() => handleStatusChange(cellProps.id, "Completed")}
                                >
                                    TAMAMLANDI
                                </Dropdown.Item>
                                <Dropdown.Item 
                                    onClick={() => handleStatusChange(cellProps.id, "Cancelled")}
                                >
                                    İPTAL
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    );
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
                                </Dropdown.Menu>
                            </Dropdown>
                        </React.Fragment>
                    )
                },
            },
        ],
        [handleStatusChange]
    );

    return (
        <React.Fragment>
            <TableContainer
                columns={(columns || [])}
                data={(orders || [])}
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
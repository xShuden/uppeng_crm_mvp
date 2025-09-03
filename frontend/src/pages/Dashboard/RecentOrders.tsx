import React, { useMemo } from 'react';
import { Card, Col, Dropdown } from 'react-bootstrap';

//TableContainer
import TableContainer from "../../Common/TableContainer";
import { recentOrders } from "../../Common/data";
import { Link } from 'react-router-dom';
import CustomDropdownToggle from 'Common/CustomDropdownToggle';

const RecentOrders = () => {

  const columns = useMemo(
    () => [
      {
        Header: "Rezervasyon ID",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return <Link to="#" className="fw-medium link-primary">{cellProps.purchaseID}</Link>;
        },
      },
      {
        Header: "Ad",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          const fullName = cellProps.customerName || "";
          const firstName = fullName.split(" ")[0] || "";
          return firstName;
        },
      },
      {
        Header: "Soyad",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          const fullName = cellProps.customerName || "";
          const lastName = fullName.split(" ").slice(1).join(" ") || "";
          return lastName;
        },
      },
      {
        Header: "Hizmet",
        accessor: "productName",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Personel",
        accessor: "vendor",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Randevu Tarihi",
        accessor: "deliveryDate",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Durum",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          switch (cellProps.status) {
            case "Paid":
              return (<span className="badge bg-success-subtle text-success">Tamamlandı</span>)
            case "Unpaid":
              return (<span className="badge bg-danger-subtle text-danger">İptal Edildi</span>)
            case "Pending":
              return (<span className="badge bg-warning-subtle text-warning">Bekliyor</span>)
            default:
              return (<span className="badge bg-success-subtle text-success">Tamamlandı</span>)
          }
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <Col xxl={12}>
        <Card>
          <Card.Header className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Son Rezervasyonlar</h4>
            <div className="flex-shrink-0">
              <Dropdown className="card-header-dropdown">
                <Dropdown.Toggle as={CustomDropdownToggle} className="text-reset dropdown-btn">
                  <span className="fw-semibold text-uppercase fs-12">Sırala:
                  </span><span className="text-muted"> Bugün<i className="mdi mdi-chevron-down ms-1"></i></span>
                </Dropdown.Toggle>
                <Dropdown.Menu align="start" className="dropdown-menu-end">
                  <Dropdown.Item href="#">Bugün</Dropdown.Item>
                  <Dropdown.Item href="#">Dün</Dropdown.Item>
                  <Dropdown.Item href="#">Son 7 Gün</Dropdown.Item>
                  <Dropdown.Item href="#">Son 30 Gün</Dropdown.Item>
                  <Dropdown.Item href="#">Bu Ay</Dropdown.Item>
                  <Dropdown.Item href="#">Geçen Ay</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Card.Header>

          {/* <Card.Body> */}
          <TableContainer
            columns={(columns || [])}
            data={(recentOrders || [])}
            isGlobalFilter={false}
            iscustomPageSize={false}
            isBordered={false}
            customPageSize={6}
            className="custom-header-css table-card"
            tableClass="table-centered align-middle table-nowrap mb-0"
            theadClass="text-muted table-light"
            SearchPlaceholder='Rezervasyon Ara...'
          />
          {/* </Card.Body> */}
        </Card>
      </Col>

    </React.Fragment>
  );
};

export default RecentOrders;
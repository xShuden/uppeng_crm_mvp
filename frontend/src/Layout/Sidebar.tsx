import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
//import logo
import logoSm from "assets/images/logo-sm.png";
import logoDark from "assets/images/logo-dark.png";
import logoLight from "assets/images/logo-light.png";

//Import Components
import VerticalLayout from "./VerticalLayouts/index";
import TwoColumnLayout from "./TwoColumnLayout";
import { Button, Container, Dropdown } from "react-bootstrap";
import HorizontalLayout from "./HorizontalLayout";

const Sidebar = ({ layoutType }: any) => {
  const [currentTenant, setCurrentTenant] = useState("Dental Klinik");
  const [searchTenant, setSearchTenant] = useState("");

  const tenants = [
    { id: "dental", name: "Dental Klinik" },
    { id: "beauty", name: "Beauty Salon" },
    { id: "spa", name: "Spa Center" },
    { id: "hair", name: "Hair Studio" },
    { id: "clinic1", name: "Medical Clinic" },
    { id: "gym1", name: "Fitness Center" },
    { id: "restaurant1", name: "Restaurant Elite" },
    { id: "hotel1", name: "Hotel Paradise" }
  ];

  const filteredTenants = tenants.filter(tenant => 
    tenant.name.toLowerCase().includes(searchTenant.toLowerCase())
  );

  const handleTenantSwitch = (tenantName: string) => {
    setCurrentTenant(tenantName);
    setSearchTenant("");
    // Burada tenant değiştirme işlemleri yapılacak
  };

  useEffect(() => {
    var verticalOverlay = document.getElementsByClassName("vertical-overlay");
    if (verticalOverlay) {
      verticalOverlay[0].addEventListener("click", function () {
        document.body.classList.remove("vertical-sidebar-enable");
      });
    }
  });

  const addEventListenerOnSmHoverMenu = () => {
    // add listener Sidebar Hover icon on change layout from setting
    if (document.documentElement.getAttribute('data-sidebar-size') === 'sm-hover') {
      document.documentElement.setAttribute('data-sidebar-size', 'sm-hover-active');
    } else if (document.documentElement.getAttribute('data-sidebar-size') === 'sm-hover-active') {
      document.documentElement.setAttribute('data-sidebar-size', 'sm-hover');
    } else {
      document.documentElement.setAttribute('data-sidebar-size', 'sm-hover');
    }
  };

  return (
    <React.Fragment>
      <div className="app-menu navbar-menu">
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              <img src={logoSm} alt="" height="26" />
            </span>
            <span className="logo-lg">
              <img src={logoDark} alt="" height="26" />
            </span>
          </Link>

          <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              <img src={logoSm} alt="" height="24" />
            </span>
            <span className="logo-lg">
              <img src={logoLight} alt="" height="24" />
            </span>
          </Link>
          <Button
            variant="link"
            size="sm"
            onClick={addEventListenerOnSmHoverMenu}
            type="button"
            className="p-0 fs-20 header-item float-end btn-vertical-sm-hover"
            id="vertical-hover"
          >
            <i className="ri-record-circle-line"></i>
          </Button>
        </div>
        {layoutType === "horizontal" ? (
          <div id="scrollbar">
            <Container fluid>
              <div id="two-column-menu"></div>
              <ul className="navbar-nav" id="navbar-nav">
                <HorizontalLayout />
              </ul>
            </Container>
          </div>
        ) : layoutType === 'twocolumn' ? (
          <React.Fragment>
            <TwoColumnLayout layoutType={layoutType} />
            <div className="sidebar-background"></div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <SimpleBar id="scrollbar" className="h-100">
              <Container fluid>
                <div id="two-column-menu"></div>
                <ul className="navbar-nav" id="navbar-nav">
                  <VerticalLayout layoutType={layoutType} />
                </ul>
              </Container>
            </SimpleBar>
            
            {/* Tenant Switcher - Fixed at bottom of sidebar */}
            <div className="tenant-switcher p-3 border-top bg-white position-absolute bottom-0 start-0 end-0">
              <Dropdown>
                <Dropdown.Toggle 
                  variant="outline-secondary"
                  className="w-100 text-start d-flex align-items-center justify-content-between"
                  style={{fontSize: '14px', padding: '8px 12px'}}
                >
                  <div className="d-flex align-items-center">
                    <i className="bi bi-building me-2" style={{fontSize: '16px'}}></i>
                    <span className="text-truncate">{currentTenant}</span>
                  </div>
                  <i className="bi bi-chevron-down ms-2"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-100" style={{maxHeight: '300px', overflowY: 'auto'}}>
                  <div className="p-2 border-bottom">
                    <div className="position-relative">
                      <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-2 text-muted"></i>
                      <input
                        type="text"
                        className="form-control form-control-sm ps-4"
                        placeholder="Tenant ara..."
                        value={searchTenant}
                        onChange={(e) => setSearchTenant(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                  <Dropdown.Header>Tenant Seçin</Dropdown.Header>
                  {filteredTenants.length > 0 ? (
                    filteredTenants.map((tenant) => (
                      <Dropdown.Item 
                        key={tenant.id}
                        onClick={() => handleTenantSwitch(tenant.name)}
                        className={currentTenant === tenant.name ? "active" : ""}
                      >
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <i className="bi bi-building me-2"></i>
                            {tenant.name}
                          </div>
                          {currentTenant === tenant.name && (
                            <i className="bi bi-check-circle-fill text-success"></i>
                          )}
                        </div>
                      </Dropdown.Item>
                    ))
                  ) : (
                    <Dropdown.Item disabled>
                      <i className="bi bi-search me-2"></i>
                      Tenant bulunamadı
                    </Dropdown.Item>
                  )}
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/tenant-list">
                    <i className="bi bi-gear me-2"></i>
                    Tenant Yönetimi
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="sidebar-background"></div>
          </React.Fragment>
        )}
      </div>
      <div className="vertical-overlay"></div>
    </React.Fragment>
  );
};

export default Sidebar;
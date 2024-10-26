"use client";
import { Button } from "react-bootstrap";
import BNavLink from "./BNavLink";
import BNavAccordion from "./BNavAccordion";

export default function BSidebar({ vertical, contraer }: any) {
  return (
    <nav className={"navbar-vertical navbar-expand-lg"}>
      <div
        className={
          vertical
            ? "collapse navbar-collapse show"
            : "collapse navbar-collapse"
        }
        id="navbarVerticalCollapse"
      >
        <div className="navbar-vertical-content">
          <ul className="navbar-nav flex-column" id="navbarVerticalNav">
          <li className="nav-item">
              <h1 className="navbar-vertical-label">MENU</h1>
              <hr className="navbar-vertical-line" />
              <BNavLink
                Name="Dashboard"
                Icon="fa-solid fa-chart-line"
                Href="/pages/inicio"
                parent={true}
              />
              <BNavLink
                Name="Proyectos"
                Icon="fa-solid fa-diagram-project"
                Href="/pages/proyectos"
                parent={true}
              />
              <BNavLink
                Name="Recursos"
                Icon="fa-solid fa-user"
                Href="/pages/recursos"
                parent={true}
              />
              <BNavLink
                Name="Estados"
                Icon="fa-solid fa-signal"
                Href="/pages/estados"
                parent={true}
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-vertical-footer">
        <Button
          type="button"
          onClick={contraer}
          className="navbar-vertical-toggle border-0 fw-semi-bold w-100 white-space-nowrap d-flex align-items-center bg-transparent btn-text-small"
        >
          <span className="uil uil-left-arrow-to-left fas fa-chevron-left ms-3 me-2"></span>
          <span className="uil uil-arrow-from-right fas fa-chevron-right ms-3"></span>
          <span className="navbar-vertical-footer-text ms-2">
            menos
          </span>
        </Button>
      </div>
    </nav>
  );
}
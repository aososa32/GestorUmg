"use client";
import { useState } from "react";
import { Image } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function BOffcanvas() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="setting-toggle box-shadow-card" onClick={handleShow}>
        <div className="d-flex align-items-center">
          <div className="settings-popover fa-spin-offcanvas d-flex justify-content-center align-items-center">
            <Image src="/images/config.svg" alt="" width={20} height={20} />
          </div>
          <small className="fw-bold px-1 title-offcanvas">TOOLS</small>
        </div>
      </div>
      <Offcanvas show={show} onHide={handleClose} placement="end" name="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <i className="fa-solid fa-rectangle-list me-2"></i>Opciones
          </Offcanvas.Title>
        </Offcanvas.Header>
      </Offcanvas>
    </>
  );
}

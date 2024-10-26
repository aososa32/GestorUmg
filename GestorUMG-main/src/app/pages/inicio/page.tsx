"use client"
import React from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { useCookies } from "next-client-cookies";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import ProyectoChart from "../components/ProyectoChart";
import PorcentajeChart from "../components/PorcentajeChart";

const Dashboard = () => {
  const cookies = useCookies();
  const username = cookies.get("username") || "Administrador";

  return (
    <Container>
      <Row>
        <Col md="6">
          <h2>
            BIENVENIDO <Badge bg="secondary">{username}</Badge>
          </h2>
        </Col>
        <div className="d-flex justify-content-center"></div>
      </Row>
      <Row>
        <h3>Dashboards</h3>
        <p><br/></p>
        <PieChart />
        <p><br/></p>
        <BarChart />
        <p><br/></p>
        <ProyectoChart />
        <p><br/></p>
        <PorcentajeChart />
      </Row>
    </Container>
  );
};

export default Dashboard;


import React from "react";
import Canvas from "./components/canvas/Canvas";
import Header from "./components/header/Header";
import Dashboard from "./components/dashboard/Dashboard";
import { Container, Row, Col } from "reactstrap";
import "./App.css";

function App() {
  return (
    <Container fluid className="mh-100">
      <Row className="justify-content-center">
        <Col xs={8}>
          <Header />
          <Canvas />
          <Dashboard />
        </Col>
      </Row>
    </Container>
  );
}

export default App;

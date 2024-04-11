import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid className="py-3 d-flex h-100">
    <Row className="justify-content-center align-items-center w-100">
      <Col xs={12} md={8} className="d-flex flex-column justify-content-center align-items-center text-center">
        <h1>Welcome!</h1>
        <p>Please select an action below.</p>
      </Col>
    </Row>
  </Container>
);

export default Landing;

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid className="py-3 d-flex h-100">
    <Row className="justify-content-center align-items-center w-100">
      <Col xs={12} md={8} className="d-flex flex-column justify-content-center align-items-center text-center">
        <h1>Welcome!</h1>
        <p>Item Depot offers a centralized system for listing and reclaiming lost and found items at UH Manoa. Users can view listings for all lost and found items
          Additionally, finders can opt out of receiving messages if items are left
          in designated spaces like the Campus Center and ID Office.
        </p>
      </Col>
    </Row>
  </Container>
);

export default Landing;

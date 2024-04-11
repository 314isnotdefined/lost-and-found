import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid className="py-3 d-flex h-100">
    <Row className="justify-content-center align-items-center w-100">
      <Col xs={12} md={8} className="d-flex flex-column justify-content-center align-items-center text-center">
        <h1>Welcome!</h1>
        <p>The UH Manoa lost and found app aims to streamline the process of reclaiming lost items for
          students by offering a centralized platform to report and search for misplaced belongings like wallets and phones. Users can view lists of lost and found items, post details about lost items, and specify their locations.
          Additionally, finders can opt out of receiving messages if items are left
          in designated spaces like the Campus Center and ID Office.
        </p>
      </Col>
    </Row>
  </Container>
);

export default Landing;

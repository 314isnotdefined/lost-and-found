import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Landing = () => (
  <Container id="landing-page" fluid className="py-5 d-flex h-100">
    <Row id="center-text" className="justify-content-center align-items-start w-100" style={{ marginTop: '5.5%' }}>
      <Col xs={12} md={8} className="d-flex flex-column justify-content-center align-items-center text-center">
        <h1 style={{ marginBottom: '20px' }}>Welcome!</h1>
        <p style={{ marginBottom: '0px' }}>Item Depot offers a centralized system for listing and reclaiming lost and found items at UH Manoa.</p>
        <p style={{ marginBottom: '30px' }}>Users can browse our catalog of user-submitted items, sort items by category, contact users with items of interest, or submit a found or lost item for other UHM students to view.</p>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Link to="/listlost" style={{ textDecoration: 'none' }}>
            <Button
              className="button-custom"
              style={{
                marginRight: '20px',
              }}
            >
              Find Lost Items
            </Button>
          </Link>
          <Link to="/listfound" style={{ textDecoration: 'none' }}>
            <Button className="button-custom">
              Find Found Items
            </Button>
          </Link>
        </div>
        <div style={{ marginTop: '200px', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flex: '1', textAlign: 'left', border: '5px solid #ccc', padding: '30px', borderRadius: '0px', marginRight: '200px' }}>
            <h2 className="white-heading">Why Choose Item Depot?</h2>
            <div style={{ overflow: 'auto' }}>
              <p style={{ overflowWrap: 'break-word' }}>Item Depot provides a seamless platform for the UH Manoa community to reunite with
                lost belongings or discover found items. Our user-friendly interface and robust features make it easy
                for students to navigate and contribute to our shared
                repository of lost and found items.
              </p>
            </div>
          </div>
          <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src="/images/2.jpg" alt="SecondPhoto" style={{ maxHeight: '300px', maxWidth: '100%' }} />
          </div>
        </div>

      </Col>
    </Row>
  </Container>
);

export default Landing;


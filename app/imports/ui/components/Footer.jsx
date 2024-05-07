import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => (
  <footer className="mt-auto py-4" style={{ backgroundColor: 'rgba(52, 58, 64, 0.9)', color: 'white' }}>
    <Container>
      <Row>
        {/* Logo Section */}
        <Col md={4} className="text-center mb-3 mb-md-0" style={{ marginTop: '20px' }}>
          <img src="/images/uhm-white-seal-nameplate@2x.png" alt="ItemDepot Logo" style={{ width: '200px', height: 'auto' }} />
        </Col>
        <Col md={4} className="text-center mb-3 mb-md-0">
          <h4 style={{ marginBottom: '10px', color: 'white' }}>Item Depot Info</h4>
          <hr />
          <div style={{ fontSize: '14px' }}>
            <a href="https://item-depot.github.io/" className="d-block">Organization Page</a>
            <a href="https://github.com/item-depot/item-depot">GitHub Repository</a>
          </div>
        </Col>
        <Col md={4} className="text-center" style={{ marginTop: '20px' }}>
          <address>
            <strong>University of Hawaii at Manoa</strong><br />
            2500 Campus Road,<br />
            Honolulu, HI 96822, USA
          </address>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;

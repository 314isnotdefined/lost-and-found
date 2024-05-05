import React from 'react';
import { Col, Container } from 'react-bootstrap';

const Footer = () => (
  <footer className="mt-auto py-4" style={{ backgroundColor: 'rgba(52, 58, 64, 0.9)' }}>
    <Container>
      <Col className="text-center" style={{ fontSize: '14px' }}>
        ItemDepot is a site that connects students to their lost items through other university students
        <br />
        <a href="https://item-depot.github.io/">
          Organization Page
        </a>
        <br />
        <a href="https://github.com/item-depot/item-depot">
          Github Repository
        </a>
      </Col>
    </Container>
  </footer>
);

export default Footer;

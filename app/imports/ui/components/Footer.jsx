import React from 'react';
import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-dark">
    <Container>
      <Col className="text-center">
        ItemDepot is a site that connects students to their lost items through other university students
        {' '}
        <br />
        <a href="https://item-depot.github.io/">
          Organization Page
        </a>
        {' '}
        <br />
        <a href="https://github.com/item-depot/item-depot">
          Github Repository
        </a>
      </Col>
    </Container>
  </footer>
);

export default Footer;

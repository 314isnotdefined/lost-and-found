import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Landing = () => (
  <Container id="landing-page" fluid className="py-5 d-flex h-100 align-items-center">
    <Row className="justify-content-center align-items-start w-100">
      <Col xs={12} md={8} className="d-flex flex-column justify-content-center align-items-center text-center">
        <h1 style={{ marginBottom: '20px' }}>Welcome!</h1>
        <p style={{ marginBottom: '0px' }}>Item Depot offers a centralized system for listing and reclaiming lost and found items at UH Manoa.</p>
        <p style={{ marginBottom: '30px' }}>Users can browse our catalog of user-submitted items, sort items by category, contact users with items of interest, or submit a found or lost item for other UHM students to view.</p>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Link to="/listlost" style={{ textDecoration: 'none' }}>
            <Button className="button-custom" style={{ marginRight: '20px' }}>
              Find Lost Items
            </Button>
          </Link>
          <Link to="/listfound" style={{ textDecoration: 'none' }}>
            <Button className="button-custom">
              Find Found Items
            </Button>
          </Link>
        </div>
        <div style={{ marginTop: '300px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="text-box white-heading">
            <h2 className="large-heading">Why Use Item Depot?</h2>
            <p>
              Item Depot isn&apos;t just for reclaiming lost and found items; it&apos;s a comprehensive resource that facilitates community interaction and support.
            </p>
            <p>
              <span className="strong-highlight">Submit a Lost Item:</span> Lost something? Fill out our
              <Link to="/add" className="hyperlink"> Submit Lost Item Form</Link>.
              Provide details and contact information, and post directly to the
              <Link to="/listlost" className="hyperlink"> Lost Items Page</Link>,
              where other community members can assist in finding your item.
            </p>
            <p>
              <span className="strong-highlight">Report a Found Item:</span> Found something? Help it return to its owner.
              Use our
              <Link to="/addfound" className="hyperlink"> Found Item Form </Link>
              to list the item with details and your contact information.
              It will appear on the
              <Link to="/listfound" className="hyperlink"> Found Items Page</Link>,
              making it easy for owners to reclaim.
            </p>
            <p>
              <span className="strong-highlight">Easy Navigation and Robust Features:</span> Our platform is designed to be user-friendly,
              ensuring a smooth experience for all users, whether reporting lost items or helping others recover their belongings.
            </p>
          </div>
          <h2 className="campus-map-heading white-heading" style={{ marginTop: '200px' }}>Campus Map</h2>
          <a href="https://map.hawaii.edu/manoa/" target="_blank" rel="noopener noreferrer" className="image-link">
            <img src="/images/campusmap.jpg" alt="Campus Map" className="responsive-image" />
          </a>
        </div>
      </Col>
    </Row>
  </Container>
);

export default Landing;

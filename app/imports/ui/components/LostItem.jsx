import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';
/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const LostItem = ({ item }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={item.image} width={300} />
    </Card.Header>
    <Card.Body>
      <Card.Title>Item name: {item.itemName}</Card.Title>
      <Card.Text>Category: {item.category}</Card.Text>
      <Card.Text>Description: {item.description}</Card.Text>
      <Card.Text>Last Seen At: {item.lastSeen}</Card.Text>
      <Card.Text>Email: {item.contactEmail}</Card.Text>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
LostItem.propTypes = {
  item: PropTypes.shape({
    itemName: PropTypes.string,
    category: PropTypes.string,
    lastSeen: PropTypes.string,
    contactEmail: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default LostItem;

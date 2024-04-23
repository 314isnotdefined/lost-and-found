import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Image, Row } from 'react-bootstrap';
import { Pen, Trash } from 'react-bootstrap-icons';
import { LostItems } from '../../api/item/LostItems';
/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const LostItemAdmin = ({ item }) => {
  const removeItem = (docID) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      console.log(`Item to remove ${docID}`);
      LostItems.collection.remove(docID);
    }
  };
  return (
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
        <Row>
          <Button
            href={`/editlost/${item._id}`}
            variant="primary"
            type="submit"
          >
            <Pen /> Edit
          </Button>{' '}
          <Button
            variant="danger"
            onClick={() => removeItem(item._id)}
          >
            <Trash /> Delete
          </Button>{' '}
        </Row>
      </Card.Body>
    </Card>
  );
};

// Require a document to be passed to this component.
LostItemAdmin.propTypes = {
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

export default LostItemAdmin;

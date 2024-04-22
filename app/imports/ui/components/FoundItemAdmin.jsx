import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const FoundItemAdmin = ({ item, collection }) => {
  const removeItem = (docID) => {
    console.log(`Item to remove ${docID}`);
    collection.remove(docID);
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
        <Card.Text>Found At: {item.locationFound}</Card.Text>
        <Card.Text>Email: {item.contactEmail}</Card.Text>
        <Row>
          <Col><Link to={`/editfound/${item._id}`}>Edit</Link></Col>
          <Col>
            <Button
              className="align-content-end justify-content-end"
              variant="danger"
              onClick={() => removeItem(item._id)}
            ><Trash />
            </Button>{' '}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

// Require a document to be passed to this component.
FoundItemAdmin.propTypes = {
  item: PropTypes.shape({
    itemName: PropTypes.string,
    category: PropTypes.string,
    locationFound: PropTypes.string,
    contactEmail: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  collection: PropTypes.object.isRequired,
};

export default FoundItemAdmin;

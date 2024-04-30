import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Form } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import LostItem from '../components/LostItem';
import { LostItems } from '../../api/item/LostItems';

const ListLostItem = () => {
  const [filters, setFilters] = useState({
    category: '',
  });

  const constructQuery = () => {
    const query = {};
    if (filters.name) {
      query.name = { $regex: `^${filters.name}`, $options: 'i' };
    }
    if (filters.category) {
      query.category = filters.category;
    }
    return query;
  };

  const { ready, lostitems } = useTracker(() => {
    const subscription = Meteor.subscribe(LostItems.userPublicationName);
    const rdy = subscription.ready();
    const query = constructQuery(filters);
    const lostItems1 = LostItems.collection.find(query).fetch();
    return {
      lostitems: lostItems1,
      ready: rdy,
    };
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    ready ? (
      <Container id="list-lost-page" className="py-3">
        <Row className="justify-content-center">
          <Col>
            <Col className="text-center">
              <h2 className="white-heading">Lost Items</h2>
            </Col>
            <Form className="g-4">
              <Form.Group controlId="category">
                <Form.Label className="white-heading">Category</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  value={filters.category || ''}
                  onChange={handleFilterChange}
                  className="mb-4"
                >
                  <option value="">All Items</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Identification and Access Cards">Identification and Access Cards</option>
                  <option value="Clothing and Accessories">Clothing and Accessories</option>
                  <option value="Food and Drink Containers">Food and Drink Containers</option>
                  <option value="Textbooks and School Supplies">Textbooks and School Supplies</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                </Form.Control>
              </Form.Group>
            </Form>
            <Row xs={1} md={2} lg={3} className="g-4">
              {lostitems.map((item, index) => (<Col key={index}><LostItem item={item} /></Col>))}
            </Row>
          </Col>
        </Row>
      </Container>
    ) : <LoadingSpinner />
  );
};

export default ListLostItem;

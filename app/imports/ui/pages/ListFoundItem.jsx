import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Form } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import FoundItem from '../components/FoundItem';
import { FoundItems } from '../../api/item/FoundItems';

const ListFoundItem = () => {
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

  const { ready, founditems } = useTracker(() => {
    const subscription = Meteor.subscribe(FoundItems.userPublicationName);
    const rdy = subscription.ready();
    const query = constructQuery(filters);
    const foundItems1 = FoundItems.collection.find(query).fetch();
    return {
      founditems: foundItems1,
      ready: rdy,
    };
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    ready ? (
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col>
            <Col className="text-center">
              <h2 className="white-heading">Found Items</h2>
            </Col>
            <Form className="g-4">
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
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
              {founditems.map((item, index) => (<Col key={index}><FoundItem item={item} /></Col>))}
            </Row>
          </Col>
        </Row>
      </Container>
    ) : <LoadingSpinner />
  );
};

export default ListFoundItem;

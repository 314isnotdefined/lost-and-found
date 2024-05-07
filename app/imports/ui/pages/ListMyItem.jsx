import React, { useState, useEffect } from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Form } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { LostItems } from '../../api/item/LostItems';
import { FoundItems } from '../../api/item/FoundItems';
import FoundItem from '../components/FoundItem';
import LostItem from '../components/LostItem';

const ListMyItem = () => {
  const [filters, setFilters] = useState({
    category: '',
    owner: '',
  });

  useEffect(() => {
    const handle = Tracker.autorun(() => {
      const user = Meteor.user();
      if (user && user.emails && user.emails.length > 0) {
        // Set the filter to the logged-in user's primary email address
        setFilters(f => ({ ...f, owner: user.emails[0].address }));
      } else {
        // Optional: Clear the owner or handle users without an email
        setFilters(f => ({ ...f, owner: '' }));
      }
    });

    // Clean up the tracker when the component unmounts
    return () => handle.stop();
  }, []);

  const constructQuery = () => {
    const query = {};
    if (filters.name) {
      query.name = { $regex: `^${filters.name}`, $options: 'i' };
    }
    if (filters.owner) {
      query.owner = filters.owner;
    }
    if (filters.category) {
      query.category = filters.category;
    }
    return query;
  };

  const { ready, lostitems, founditems } = useTracker(() => {
    const subscription1 = Meteor.subscribe(LostItems.userPublicationName);
    const subscription2 = Meteor.subscribe(FoundItems.userPublicationName);
    const rdy = subscription1.ready() && subscription2.ready();
    const query = constructQuery(filters);
    const myItems1 = LostItems.collection.find(query).fetch();
    const myItems2 = FoundItems.collection.find(query).fetch();
    return {
      lostitems: myItems1,
      founditems: myItems2,
      ready: rdy,
    };
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    ready ? (
      <Container id="list-my-page" className="py-3">
        <Row className="justify-content-center">
          <Col>
            <Col className="text-center">
              <h2 className="white-heading">My Items</h2>
            </Col>
            <Form className="g-4">
              <Form.Group className="white-heading" controlId="category">
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
              {lostitems.map((item, index) => (<Col key={index}><LostItem item={item} /></Col>))}
              {founditems.map((item, index) => (<Col key={index}><FoundItem item={item} /></Col>))}
            </Row>
          </Col>
        </Row>
      </Container>
    ) : <LoadingSpinner />
  );
};

export default ListMyItem;

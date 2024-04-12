import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import Item from '../components/Item';
import { FoundItems } from '../../api/item/FoundItems';

/* Renders a table containing all the Stuff documents. Use <StuffItem> to render each row. */
const ListFoundItem = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, founditems } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(FoundItems.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const foundItems = FoundItems.collection.find({}).fetch();
    return {
      founditems: foundItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>List Found Items</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {founditems.map((item) => (<Col key={item._id}><Item item={item} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListFoundItem;

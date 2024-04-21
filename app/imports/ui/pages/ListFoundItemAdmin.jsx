import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import FoundItem from '../components/FoundItem';
import { FoundItems } from '../../api/item/FoundItems';

/* Renders a table containing all the Stuff documents. Use <StuffItem> to render each row. */
const ListFoundItemAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, founditems } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(FoundItems.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const foundItems1 = FoundItems.collection.find({}).fetch();
    return {
      founditems: foundItems1,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>List Found Items (Admin)</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {founditems.map((item, index) => (<Col key={index}><FoundItem item={item} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListFoundItemAdmin;

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col } from 'react-bootstrap';
import { ResolvedItemsArchive } from '../../api/item/ResolvedItemsArchive';
import ArchiveCard from '../components/ArchiveCard';

const ResolvedArchive = () => {
  const { ready, archiveList } = useTracker(() => {
    const archiveSubscription = Meteor.subscribe(ResolvedItemsArchive.userPublicationName);
    const isReady = archiveSubscription.ready();
    const alist = ResolvedItemsArchive.collection.find({}).fetch();
    return {
      ready: isReady,
      archiveList: alist,
    };
  });
  return (ready ? (
    <Container id="resolved-page">
      <h1 className="white-heading" style={{ textAlign: 'center', margin: '3% 0 3% 0' }}>Resolved Items Archive</h1>
      <h5 style={{ textAlign: 'center', margin: '3% 0 3% 0', color: 'lightgray' }}>Showing all items that have been lost and found in the past. No action can be taken with them.</h5>
      <Row>
        {archiveList.map(a => (
          <Col md={4}>
            <ArchiveCard data={a} />
          </Col>
        ))}
      </Row>
      <br /><br />
    </Container>
  ) : <h1>Please wait...</h1>);
};

export default ResolvedArchive;

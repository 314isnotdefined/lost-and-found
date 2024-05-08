import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Table } from 'react-bootstrap';
import { ResolvedItemsArchive } from '../../api/item/ResolvedItemsArchive';
import ArchiveRow from '../components/ArchiveRow';

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
    <Container id="resolved-page" style={{ marginBottom: '100px' }}>
      <h1 className="white-heading" style={{ textAlign: 'center', margin: '3% 0 3% 0' }}>Resolved Items Archive</h1>
      <h5 style={{ textAlign: 'center', margin: '3% 0 3% 0', color: 'lightgray' }}>All items that have been lost and found in the past.</h5>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Found/Claimed By</th>
            <th>Date reported</th>
            <th>Date resolved</th>
            <th>Resolving time</th>
          </tr>
        </thead>
        <tbody>
          {archiveList.map(a => <ArchiveRow data={a} />)}
        </tbody>
      </Table>
      <br /><br />
    </Container>
  ) : <h1>Please wait...</h1>);
};

export default ResolvedArchive;

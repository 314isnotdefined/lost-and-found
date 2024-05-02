import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import LostItem from '../components/LostItem';
import { LostItems } from '../../api/item/LostItems';
import { Profiles } from '../../api/profile/Profile';
import { ResolvedItemsArchive } from '../../api/item/ResolvedItemsArchive';

// note: the url is in the form of "<domainname>/resolvelost/<itemID>/<userIDwhofoundit>
export const ResolveLostItem = () => {
  const { _id, _userId } = useParams();
  console.log(_id);
  console.log(_userId);
  const { lostItemInfo, userInfo, ready } = useTracker(() => {
    const sub = Meteor.subscribe(LostItems.userPublicationName);
    const rdy = sub.ready();
    const item = LostItems.collection.find({ _id: _id }).fetch();
    const user = Profiles.collection.find({ _id: _userId }).fetch();
    return {
      lostItemInfo: item[0],
      userInfo: user[0],
      ready: rdy,
    };
  });

  function handleFound() {
    console.log('this item has been found');
    // eslint-disable-next-line max-len
    ResolvedItemsArchive.collection.insert({ image: 'https://i.fbcd.co/products/resized/resized-750-500/88cf1f6276057b29a27a5b93ebce4c82781839a7d3a6c577e30730ffed9cd2eb.jpg', resolvedBy: userInfo.email, dateResolved: new Date(), itemName: lostItemInfo.itemName });
  }

  return (ready ? (
    <Container>
      <Row>
        <Col md={1} />
        <Col md={6}>
          <br />
          <div style={{ width: '80%', height: '2vh', backgroundColor: 'seagreen' }} />
          <br />
          <h3 style={{ color: 'white' }}>Please confirm if the following item has been found.</h3>
          <p style={{ color: 'white' }}>This will help us clear the site of found/claimed/resolved items.</p>
          <Button variant="success" onClick={() => handleFound()}>Yes, this item has been found</Button>
          <Button variant="danger">No, this item was not found / incorrect item recieved.</Button>
        </Col>
        <Col md={4}>
          <LostItem item={lostItemInfo} canTakeAction={false} />
        </Col>
        <Col md={1} />
      </Row>
    </Container>
  ) : <h1>Please wait...</h1>);
};

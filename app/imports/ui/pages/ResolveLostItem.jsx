import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import React, { useState } from 'react';
import swal from 'sweetalert';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import LostItem from '../components/LostItem';
import { LostItems } from '../../api/item/LostItems';
import { Profiles } from '../../api/profile/Profile';
import { ResolvedItemsArchive } from '../../api/item/ResolvedItemsArchive';

// note: the url is in the form of "<domainname>/resolvelost/<itemID>/<userIDwhofoundit>
export const ResolveLostItem = () => {
  const [deletedAndArchived, setDeletedAndArchived] = useState(false);
  const { _id, _userId } = useParams();
  console.log(_id);
  console.log(_userId);
  const { lostItemInfo, userInfo, ready } = useTracker(() => {
    const sub = Meteor.subscribe(LostItems.userPublicationName);
    const sub2 = Meteor.subscribe(Profiles.userPublicationName);
    const rdy = sub.ready() && sub2.ready();
    const item = LostItems.collection.find({ _id: _id }).fetch();
    const user = Profiles.collection.find({ _id: _userId }).fetch();
    return {
      lostItemInfo: item[0],
      userInfo: user[0],
      ready: rdy,
    };
  });
  // console.log(lostItemInfo.owner);
  function handleFound() {
    console.log('this item has been found');
    const owner = Profiles.collection.find({ email: lostItemInfo.owner }).fetch()[0];
    // eslint-disable-next-line max-len
    ResolvedItemsArchive.collection.insert({ image: 'https://i.fbcd.co/products/resized/resized-750-500/88cf1f6276057b29a27a5b93ebce4c82781839a7d3a6c577e30730ffed9cd2eb.jpg', resolvedBy: userInfo.email, dateResolved: new Date(), itemName: lostItemInfo.itemName, dateReported: lostItemInfo.dateReported }, (err) => {
      if (err) {
        swal(err, 'error');
      } else {
        // Award 2 points to user who found the item
        Profiles.collection.update({ _id: _userId }, { $inc: { points: 200 } });
        // Award 1 point to the owner of the item
        Profiles.collection.update({ _id: owner._id }, { $inc: { points: 100 } });
        // eslint-disable-next-line consistent-return
        LostItems.collection.remove({ _id: _id }, (e) => {
          if (e) {
            swal(e, 'error');
          } else {
            swal('Thank you!', 'Item successfully moved to archive.', 'success');
            setDeletedAndArchived(true);
          }
        });
      }
    });
  }

  if (deletedAndArchived) {
    return <Navigate to="/listlost" />;
  }

  // eslint-disable-next-line no-nested-ternary
  return (ready ? (
    (lostItemInfo && userInfo ? (
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
            <Button variant="danger">No, this item was not found / incorrect item received.</Button>
          </Col>
          <Col md={4}>
            <LostItem item={lostItemInfo} canTakeAction={false} />
          </Col>
          <Col md={1} />
        </Row>
      </Container>
    ) : (
      <>
        <h1 style={{ color: 'white' }}>Hmm... it seems like this item has been resolved already.</h1>
        <h4 style={{ color: 'white' }}>Appreciate you checking, though!</h4>
      </>
    ))

  ) : <h1>Please wait...</h1>);
};

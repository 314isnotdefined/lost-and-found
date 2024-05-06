import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Profiles } from '../../api/profile/Profile';

const ProfileInfo = () => {
  const { _userId } = useParams();
  // eslint-disable-next-line no-unused-vars
  const { ready, user } = useTracker(() => {
    console.log(_userId);
    const sub = Meteor.subscribe(Profiles.userPublicationName);
    const isReady = sub.ready();
    const profileList = Profiles.collection.find({ _id: _userId }).fetch();
    return {
      ready: isReady,
      user: profileList[0],
    };
  });
  return (ready ? (
    <Container id="resolved-page">
      <Card>
        <Card.Header>
          <h1 className="white-heading" style={{ textAlign: 'left', margin: '3% 0 3% 0' }}>User Profiles</h1>
          <h1 style={{ textAlign: 'left', margin: '3% 0 3% 0', color: 'lightgray' }}>{user.firstName} {user.lastName}</h1>
        </Card.Header>
        <Card.Body>
          <img src={user.image} alt="user profile" style={{ width: '300px', borderRadius: '50%', border: '3px solid seagreen' }} />
        </Card.Body>
      </Card>
    </Container>
  ) : <h1>Please wait...</h1>);
};

export default ProfileInfo;

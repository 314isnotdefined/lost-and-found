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
    <Container id="profile-page">
      <Card>
        <Card.Header>
          <h1 className="black-heading" style={{ textAlign: 'center', margin: '3% 0 3% 0' }}>{user.firstName} {user.lastName}</h1>
        </Card.Header>
        <Card.Body className="justify-content-center">
          <img src={user.image} alt="user profile" style={{ width: '200px', borderRadius: '50%', border: '3px solid seagreen', textAlign: 'center' }} />
          <Card.Text style={{ padding: '25px' }}>
            Points Earned: {user.points}
          </Card.Text>
          <Card.Text> </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  ) : <h1>Please wait...</h1>);
};

export default ProfileInfo;

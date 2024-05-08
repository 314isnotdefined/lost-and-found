import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Profiles } from '../../api/profile/Profile';

const ProfileInfo = () => {
  const { _userId } = useParams();
  const { ready, user, rank } = useTracker(() => {
    const sub = Meteor.subscribe(Profiles.userPublicationName);
    const isReady = sub.ready();
    const profileList = Profiles.collection.find({ _id: _userId }).fetch();
    const profileRanks = Profiles.collection.find({}, { sort: { points: -1 } }).fetch();
    const userRank = profileRanks.findIndex(profile => profile._id === _userId) + 1;
    return {
      ready: isReady,
      user: profileList[0],
      rank: userRank,
    };
  });
  return (ready ? (
    <Container id="profile-page">
      <Card>
        <Card.Header>
          <h1 className="black-heading" style={{ textAlign: 'center', margin: '3% 0 3% 0' }}>{user.firstName} {user.lastName}</h1>
        </Card.Header>
        <Card.Img variant="top" src={user.image} alt="user profile" style={{ width: '400px', borderRadius: '50%', border: '3px solid seagreen', alignSelf: 'center' }} />
        <Card.Body className="justify-content-center">
          <Row>
            <Col className="col-4">
              <ListGroup variant="flush" style={{ padding: '25px', textAlign: 'center' }} className="align-content-start">
                <Card.Title>Position</Card.Title>
                <Card.Text>{user.position}</Card.Text>
              </ListGroup>
            </Col>
            <Col className="col-4">
              <ListGroup variant="flush" style={{ padding: '25px', textAlign: 'center' }}>
                <Card.Title>Points Earned</Card.Title>
                <Card.Text>{user.points}</Card.Text>
              </ListGroup>
            </Col>
            <Col className="col-4">
              <ListGroup variant="flush" style={{ padding: '25px', textAlign: 'center' }}>
                <Card.Title>Leaderboard Rank</Card.Title>
                <Card.Text>{rank}</Card.Text>
              </ListGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  ) : <h1>Please wait...</h1>);
};

export default ProfileInfo;

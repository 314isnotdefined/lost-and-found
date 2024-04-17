import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Profiles } from '../../api/profile/Profile';
/* import { FoundItems } from '../../api/item/FoundItems';
import { LostItems } from '../../api/item/LostItems'; */

const ArchiveCard = ({ data }) => {
  const { ready, nameData } = useTracker(() => {
    const nameSub = Meteor.subscribe(Profiles.userPublicationName);
    const isReady = nameSub.ready();
    const n = Profiles.collection.find({ email: data.resolvedBy }).fetch();
    return {
      ready: isReady,
      nameData: n[0],
    };
  });

  function convertDate(dateString) {
    // converts a string to <Month> <Day>, <Year> format.
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const curr = new Date(dateString);
    const month = months[curr.getMonth()];
    const day = curr.getDate();
    const year = curr.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  return (
    ((ready && nameData) ? (
      <Card className="h-100">
        <Card.Header>
          <img src={data.image} alt="" width="100%" />
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <h3 style={{ textAlign: 'center', color: 'black' }}>{data.itemName}</h3>
          </Card.Title>
          <Card.Subtitle>
            <p style={{ textAlign: 'center', color: 'black' }}>Found by <Link to={nameData._id}> {nameData.firstName} {nameData.lastName}</Link> on {convertDate(data.dateResolved)}</p>
          </Card.Subtitle>
        </Card.Body>
      </Card>
    ) : (<h1>Please wait</h1>)
    )
  );
};

export default ArchiveCard;

ArchiveCard.propTypes = {
  // eslint-disable-next-line react/require-default-props
  data: PropTypes.shape({
    image: PropTypes.string,
    itemName: PropTypes.string.isRequired,
    linkToProfile: PropTypes.string,
    resolvedBy: PropTypes.string,
    dateResolved: PropTypes.instanceOf(Date),
  }),
};

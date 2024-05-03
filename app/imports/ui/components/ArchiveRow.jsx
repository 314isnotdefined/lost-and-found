import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Profiles } from '../../api/profile/Profile';
/* import { FoundItems } from '../../api/item/FoundItems';
import { LostItems } from '../../api/item/LostItems'; */

const ArchiveRow = ({ data }) => {
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
      <tr>
        <td><p style={{color: 'seagreen', fontSize: '120%', fontWeight: 'bold'}}>{data.itemName}</p></td>
        <td>
          <img src={nameData.image} alt="" style={{ width: '3vw', height: '3vw', borderRadius: '50%', border: '2px solid seagreen' }} />
          &nbsp;&nbsp;&nbsp;{nameData.firstName} {nameData.lastName}
        </td>
        <td>grr</td>
        <td>{convertDate(data.dateResolved)}</td>
        <td>hi</td>
      </tr>
    ) : (<h1>Please wait</h1>)
    )
  );
};

export default ArchiveRow;

ArchiveRow.propTypes = {
  // eslint-disable-next-line react/require-default-props
  data: PropTypes.shape({
    image: PropTypes.string,
    itemName: PropTypes.string.isRequired,
    linkToProfile: PropTypes.string,
    resolvedBy: PropTypes.string,
    dateResolved: PropTypes.instanceOf(Date),
  }),
};

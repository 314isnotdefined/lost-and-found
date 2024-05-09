import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Profiles } from '../../api/profile/Profile';

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
  function convertToDays(seconds) {
    let resultantString = '';
    if (seconds >= 86400) {
      resultantString += `${Math.floor(seconds / 86400)}d `;
      resultantString += convertToDays(seconds % 86400);
    } else if (seconds >= 3600) {
      resultantString += `${Math.floor(seconds / 3600)}hr `;
      resultantString += convertToDays(seconds % 3600);
    } else if (seconds >= 60) {
      resultantString += `${Math.floor(seconds / 60)}min `;
      resultantString += convertToDays(seconds % 60);
    } else {
      resultantString += `${seconds}s`;
    }
    return resultantString;
  }

  return (
    ((ready && nameData) ? (
      <tr>
        <td><p style={{ color: 'seagreen', fontSize: '120%', fontWeight: 'bold' }}>{data.itemName}</p></td>
        <td>
          <img src={nameData.image} alt="" style={{ width: '3vw', height: '3vw', borderRadius: '50%', border: '2px solid seagreen' }} />
          &nbsp;&nbsp;&nbsp; {nameData.firstName} {nameData.lastName}
        </td>
        <td>{convertDate(data.dateReported)}</td>
        <td>{convertDate(data.dateResolved)}</td>
        <td>{convertToDays((Date.parse(data.dateResolved) - Date.parse(data.dateReported)) / 1000)}</td>
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
    dateReported: PropTypes.instanceOf(Date),
  }),
};

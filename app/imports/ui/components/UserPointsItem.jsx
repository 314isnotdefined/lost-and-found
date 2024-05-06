import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const UserPointsItem = ({ user }) => (
  <tr>
    <td><Link to={`/profile/${user._id}`}>{user.firstName} {user.lastName}</Link></td>
    <td>{user.points}</td>
  </tr>
);

// Require a document to be passed to this component.
UserPointsItem.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    points: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

export default UserPointsItem;

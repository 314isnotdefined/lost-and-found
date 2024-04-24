import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar, NavDropdown, Badge } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill, Bell } from 'react-bootstrap-icons';
import { Profiles } from '../../api/profile/Profile';

const NavBar = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  const { userFullProfile, rdy } = useTracker(() => {
    const sub = Meteor.subscribe(Profiles.userPublicationName);
    const ready = sub.ready();
    const currentUsr = Meteor.user() ? Meteor.user().username : '';
    const user = Profiles.collection.find({ email: currentUsr }).fetch();
    return {
      rdy: ready,
      userFullProfile: user[0],
    };
  });
  const notificationCount = 5; // Placeholder for the actual count of notifications
  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <h2>Item Depot</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {currentUser ? ([
              <NavDropdown title="Submit An Item" id="basic-nav-dropdown1">
                <NavDropdown.Item id="addlost" as={NavLink} to="/add" key="add">Submit Lost Item</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/addfound" key="addfound">Submit Found Item</NavDropdown.Item>
              </NavDropdown>,
              <NavDropdown title="Item Listings" id="basic-nav-dropdown2">
                <NavDropdown.Item as={NavLink} to="/listfound" key="listfound">Found Items</NavDropdown.Item>
                <NavDropdown.Item id="list-lost-nav" as={NavLink} to="/listlost" key="listlost">Lost Items</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/archive" key="listfound">Item Archive</NavDropdown.Item>
              </NavDropdown>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Nav.Link id="list-found-admin-nav" as={NavLink} to="/foundadmin" key="foundadmin">Found Items (Admin)</Nav.Link>
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Nav.Link id="list-lost-admin-nav" as={NavLink} to="/lostadmin" key="lostadmin">Lost Items (Admin)</Nav.Link>
            ) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/notifications" className="nav-notification-link">
                  <Bell size={20} className="bell-icon" />
                  {notificationCount > 0 && (
                    <Badge pill bg="danger" className="notification-badge">
                      {notificationCount}
                    </Badge>
                  )}
                </Nav.Link>
                <NavDropdown
                  id="navbar-current-user"
                  title={(
                    rdy ? (
                      <>
                        <img src={userFullProfile.image} alt="user profile" style={{ width: '3vw', height: '3vw', borderRadius: '50%' }} />
                        <span style={{ marginLeft: '10%', display: 'inline-block', fontSize: '115%' }}>{`${userFullProfile.firstName} ${userFullProfile.lastName}`}</span>
                      </>
                    ) : (
                      <h6>Fetching</h6>
                    )
                  )}
                >
                  <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                    <BoxArrowRight />
                    Sign out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

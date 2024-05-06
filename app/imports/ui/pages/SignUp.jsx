import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField, SelectField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Profiles } from '../../api/profile/Profile';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const isValidEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};
const SignUp = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);
  const [uploadedImage, setUploadedImage] = useState('');
  // eslint-disable-next-line no-buffer-constructor
  const [encodedBinaryImage, setEncodedBinaryImage] = useState('');

  const schema = new SimpleSchema({
    firstName: String,
    lastName: String,
    email: {
      type: String,
      // eslint-disable-next-line consistent-return
      custom() {
        // eslint-disable-next-line react/no-this-in-sfc
        if (!isValidEmail(this.value)) {
          return 'Invalid';
        }
      },
    },
    password: String,
    // images is not included due to it getting extremely messy. It has its own form, which changes the state upon uploading files.
    position: {
      type: String,
      allowedValues: ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate Student', 'Professor/Faculty', 'Staff', 'Other', 'Rather not say'],
      defaultValue: 'Other',
    },
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    const { firstName, lastName, email, password, position } = doc;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        /* console.log(`image getting uploaded is: ${Buffer.from(encodedBinaryImage, 'base64')}`); */

        // note that if encodedBinaryImage is blank, the inserted MongoDB document will not have an "image" attribute.

        let profileImage;
        if (encodedBinaryImage === '') {
          profileImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
        } else {
          profileImage = encodedBinaryImage;
        }

        Profiles.collection.insert({
          firstName: firstName,
          lastName: lastName,
          email: email,
          image: profileImage,
          position: position,
          points: 0,
          totalItemsFound: 0,
          totalItemsLost: 0,
          recentItemsFound: [],
        }, (e) => {
          if (e) {
            // if anything goes wrong submitting the form.
            swal(e);
          } else {
            setRedirectToRef(true);
            swal('You created an account!', `Happy searching, ${firstName} ${lastName}!`, 'success');
          }
        });
      }
    });
  };

  function previewImage(e) {
    const src = URL.createObjectURL(e.target.files[0]);
    const size = e.target.files[0].size;
    const fr = new FileReader();
    fr.addEventListener('load', (event) => {
      const text = event.target.result;
      /* const bufferResult = Buffer.from(text.split(',')[1], 'base64');
      setEncodedBinaryImage(bufferResult); */

      // check the image size.
      /* const size = new Blob([text]).size; */
      if (size >= 4194304) {
        // If more than 4mb, reject and display err message.
        swal('Please upload a smaller image!', `Max image size is 4mb; you've uploaded ${(size / 1048576).toFixed(2)}mb`, 'error');
        setUploadedImage('');
        /* setEncodedBinaryImage(''); */
      } else {
        // If under 4mb, allow.
        setEncodedBinaryImage(text.toString());
      }
    });
    fr.readAsDataURL(e.target.files[0]);

    // console.log(src);
    // const imageBuffer = Buffer.from(e.target.files[0].data, 'base64');
    setUploadedImage(src);
  }

  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location?.state || { from: { pathname: '/add' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  return (
    <Container id="signup-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center white-heading">
            <h2>Register your account</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField name="firstName" placeholder="First Name" />
                <TextField name="lastName" placeholder="Last Name" />
                <TextField name="email" placeholder="E-mail address" />
                <TextField name="password" placeholder="Password" type="password" />
                {/* <TextField name="image" placeholder="URL to image" /> */}
                <SelectField name="position" placeholder="What describes you?" />
                <div className="ImageField">
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="file-input">
                    <div>Choose your photo</div>
                    <img
                      alt=""
                      style={{ cursor: 'pointer', width: '200px', height: '200px' }}
                      src={uploadedImage || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                    />
                  </label>
                  <input
                    accept="image/*"
                    id="file-input"
                    type="file"
                    onChange={(e) => previewImage(e)}
                  />
                </div>
                <br /><br />
                <ErrorsField />
                <SubmitField />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="light" className="already-login-button">
            Already have an account? Login
            {' '}
            <Link to="/signin">here</Link>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Registration was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
SignUp.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

SignUp.defaultProps = {
  location: { state: '' },
};

export default SignUp;

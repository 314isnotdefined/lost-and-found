import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Carousel, Button, Modal } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, LongTextField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import nodemailer from 'nodemailer';
import { useTracker } from 'meteor/react-meteor-data';
import { Images } from '../../api/item/Images';
import { Profiles } from '../../api/profile/Profile';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */

const messageSchema = new SimpleSchema({
  contactInfo: String,
  message: String,
});

const bridge = new SimpleSchema2Bridge(messageSchema);

const LostItem = ({ item }) => {

  const { ready, itemImages, userInfo } = useTracker(() => {
    const subscription = Meteor.subscribe(Images.userPublicationName);
    const userSubscription = Meteor.subscribe(Profiles.userPublicationName);
    const rdy = subscription.ready() && userSubscription.ready();
    let imageArr = [];
    if (item.image[0].includes('http')) {
      // accounting for default data
      console.log('tis default');
      imageArr.push(item.image);
    } else {
      // if the card is not comprised of default data.
      console.log('tis not default');
      const logicalImages = [];
      for (let i = 0; i < item.image.length; i++) {
        logicalImages.push({ _id: item.image[i] });
      }

      const fetchedImageData = Images.collection.find({ $or: logicalImages }).fetch();
      imageArr = fetchedImageData.map(e => e.data);
    }
    const prof = Profiles.collection.find({ email: item.owner }).fetch();
    return {
      itemImages: [...imageArr],
      userInfo: prof[0],
      ready: rdy,
    };
  });

  const [messageFormDisplay, setMessageFormDisplay] = useState(false);

  function toggleContactForm() {
    setMessageFormDisplay(true);
  }

  function handleClose() {
    setMessageFormDisplay(false);
  }

  const submit = ({ data }) => {
    console.log(JSON.stringify(data));
    Meteor.call(
      'sendEmail',
      'mchlcape808@gmail.com',
      'itemdepotmsg@outlook.com',
      'Hello from Meteor!',
      'This is a test of Email.send.',
    );

    /* const transporter = nodemailer.createTransport({

      host: 'smtp-mail.outlook.com', // hostname
      secureConnection: false, // TLS requires secureConnection to be false
      port: 587, // port for secure SMTP
      auth: {
        user: 'itemdepotmsg@outlook.com',
        pass: '1t3md3p0t',
      },
    });

    const mailOptions = {
      from: 'itemdepotmsg@outlook.com', // sender address
      to: 'mchlcape808@gmail.com', // list of receivers
      subject: 'Test Email', // Subject line
      text: 'Hello world ?', // plain text body
    };

    transporter.sendMail(mailOptions, function (error, info) {

      if (error) {
        console.log(`error sending email: ${error}`);
      } else {
        console.log(`email sent: ${info.response}`);
      }
    }); */
  };

  return (
    <Card className="h-100">
      <Card.Header>
        {/* eslint-disable-next-line no-nested-ternary */}
        {(ready) ? (
          (itemImages.length === 1) ? (
            <img src={itemImages[0]} alt="" style={{ width: '100%' }} />
          ) : (
            <Carousel fade>
              {itemImages.map(img => (
                <Carousel.Item interval={2000}>
                  <Image src={img} style={{ width: '100%' }} />
                </Carousel.Item>
              ))}
            </Carousel>
          )
        ) : <h5 style={{ color: 'black', textAlign: 'center' }}>Fetching images...</h5>}
      </Card.Header>
      <Card.Body>
        <Card.Title><b>Item name:</b> {item.itemName}</Card.Title>
        <Card.Text><b>Category:</b> {item.category}</Card.Text>
        <Card.Text><b>Description:</b> {item.description}</Card.Text>
        <Card.Text><b>Last Seen At:</b> {item.lastSeen}</Card.Text>
        <Card.Text><img src={userInfo.image} alt="" style={{ height: '2.5vw', width: '2.5vw', borderRadius: '50%' }} /><span>&nbsp;&nbsp;&nbsp;Owner: {`${userInfo.firstName} ${userInfo.lastName}`}</span></Card.Text>
        <Button variant="success" style={{ width: '100%' }} onClick={() => toggleContactForm()}>I found this item</Button>

        {/* eslint-disable-next-line react/jsx-no-bind */}
        <Modal show={messageFormDisplay} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h3 style={{ textAlign: 'center', color: 'black' }}>{`Thank you for finding ${item.itemName}!`}</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Please enter a message. This information will be emailed to <b>{`${userInfo.firstName} ${userInfo.lastName}.`}</b></p>
            <AutoForm schema={bridge} onSubmit={data => submit(data)}>
              <TextField name="contactInfo" placeholder="email, phone #, instagram, etc... (optional)" label="Your Contact Info" required={false} />
              <LongTextField name="message" placeholder="Indicate details of where you found the item, etc..." required />
              <ErrorsField />
              <SubmitField />
            </AutoForm>
          </Modal.Body>
        </Modal>
        <Card.Text>Email: {item.contactEmail}</Card.Text>
      </Card.Body>
    </Card>
  );
};

// Require a document to be passed to this component.
LostItem.propTypes = {
  item: PropTypes.shape({
    itemName: PropTypes.string,
    category: PropTypes.string,
    lastSeen: PropTypes.string,
    contactEmail: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    image: PropTypes.array,
    description: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default LostItem;

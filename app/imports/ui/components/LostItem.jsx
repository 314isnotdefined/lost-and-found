import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Carousel, Button, Modal } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, LongTextField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { useTracker } from 'meteor/react-meteor-data';
import { Images } from '../../api/item/Images';
import { Profiles } from '../../api/profile/Profile';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
  // eslint-disable-next-line max-len
const messageSchema = new SimpleSchema({
  contactInfo: String,
  message: String,
});

const bridge = new SimpleSchema2Bridge(messageSchema);

const LostItem = ({ item }) => {

  const { ready, itemImages, ownerInfo, userInfo } = useTracker(() => {
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
    const usremail = Meteor.user().username;
    const usr = Profiles.collection.find({ email: usremail }).fetch();
    return {
      itemImages: [...imageArr],
      ownerInfo: prof[0],
      userInfo: usr[0],
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
    // eslint-disable-next-line max-len
    /* const htmlText = `<div style='background-color: whitesmoke; font-size: 150%; line-height: 1.3;'><br><div style='justify-content: center; display: flex;'><img src='https://manoa.hawaii.edu/speakers/wp-content/uploads/logo-1-1030x1030.png' alt='item depot logo' width="10%"/><span style='font-size: 200%; margin-top: auto; margin-bottom: auto; padding-left: 2%'>Item Depot</span></div><hr width="60%"><p><b style="color: red">⚠️ Warning: </b> If you did not lose this item, please ignore this email!</p><p>Hi ${ownerInfo.firstName} ${ownerInfo.lastName}, <br><br>${userInfo.firstName} ${userInfo.lastName} has found your item: "${item.itemName}". Here is a message from them indicating the status of the item:</p><div style="padding: 1% 2% 1% 2%; background-color: lightgrey; border-left: 6px solid green"><code>${data.message} </code></div><p>${userInfo.firstName} ${userInfo.lastName} has also provided their contact information should you need to get into contact with them after this.</p><div style="padding: 1% 2% 1% 2%; background-color: lightgrey; border-left: 6px solid green"><code>${data.contactInfo}</code></div><p>If this item has been successfully found, please resolve it and take it off the Item Depot site to prevent confusion. Thank you!</p><p>All the best,</p><p>The Item Depot team (Micaiah, Shayde, Sam, Cash, & Darrius)</p></div>`; */

    // ^^^ AHHH WHAT IS THIS HORROR 😭😭😭
    // eslint-disable-next-line max-len
    const htmlTextWithoutCSS = `<p>Hi ${ownerInfo.firstName} ${ownerInfo.lastName}, <br><br>${userInfo.firstName} ${userInfo.lastName} has found your item: "${item.itemName}. The message they sent it ${data.message}".`;
    console.log(htmlTextWithoutCSS);
    Meteor.call(
      'sendEmail',
      'mchlcape808@gmail.com',
      'itemdepotmsg@outlook.com',
      `${ownerInfo.firstName}, there has been an update on your lost item.`,
      htmlTextWithoutCSS,
    );
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
        <Card.Text><img src={ownerInfo.image} alt="" style={{ height: '2.5vw', width: '2.5vw', borderRadius: '50%' }} /><span>&nbsp;&nbsp;&nbsp;Owner: {`${ownerInfo.firstName} ${ownerInfo.lastName}`}</span></Card.Text>
        <Button variant="success" style={{ width: '100%' }} onClick={() => toggleContactForm()}>I found this item</Button>

        {/* eslint-disable-next-line react/jsx-no-bind */}
        <Modal show={messageFormDisplay} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h3 style={{ textAlign: 'center', color: 'black' }}>{`Thank you for finding ${item.itemName}!`}</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Please enter a message. This information will be emailed to <b>{`${ownerInfo.firstName} ${ownerInfo.lastName}.`}</b></p>
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

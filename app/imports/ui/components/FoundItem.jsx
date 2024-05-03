import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Carousel, Modal, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, LongTextField, SubmitField } from 'uniforms-bootstrap5';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Images } from '../../api/item/Images';
import { Profiles } from '../../api/profile/Profile';
/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */

const messageSchema = new SimpleSchema({
  contactInfo: String,
  message: String,
});

const bridge = new SimpleSchema2Bridge(messageSchema);

const FoundItem = ({ item, canTakeAction }) => {
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

  const submit = (data) => {
    console.log(JSON.stringify(data));
    const { message, contactInfo } = data;
    console.log(message);
    console.log(contactInfo);
    const httpstrimmed = window.location.href.substring(window.location.href.indexOf('://') + 3);
    let basename = httpstrimmed.substring(0, httpstrimmed.indexOf('/'));
    console.log(basename);

    // for developmental purposes.
    if (basename.includes('localhost')) {
      basename = `http://${basename}`;
    } else {
      basename = `https://${basename}`;
    }
    console.log(`${basename}/resolvelost/${item._id}/${ownerInfo._id}`);
    /* eslint-disable max-len */
    const htmlText = `
    <div style='font-size: 110%; line-height: 1.3;'>
    <br>
    <div style='justify-content: center; display: flex;'>
      <img src='https://manoa.hawaii.edu/speakers/wp-content/uploads/logo-1-1030x1030.png' alt='item depot logo' width="5%"/><span style='font-size: 200%; margin-top: auto; margin-bottom: auto; padding-left: 2%'>Item Depot</span>
     </div>
     <hr width="60%">
     <p><b style="color: red">⚠️ Warning: </b> If you did not post this item, please ignore this email!</p>
     <p>Hi ${ownerInfo.firstName} ${ownerInfo.lastName}, <br><br>${userInfo.firstName} ${userInfo.lastName} wants to claim your item: <a href='${basename}/resolvefound/${item._id}/${ownerInfo._id}' target='_blank'>"${item.itemName}"</a>. Here is a message from them about the item.</p>
     <div style="padding: 1% 2% 1% 2%; background-color: lightgrey; border-left: 6px solid green; margin: 0 5% 0 1%"><code>${message} </code></div>
     <p>${userInfo.firstName} ${userInfo.lastName} has also provided their contact information should you need to get into contact with them after this.</p>
     <div style="padding: 1% 2% 1% 2%; background-color: lightgrey; border-left: 6px solid green; margin: 0 5% 0 1%"><code>${contactInfo}</code></div>
     <p>If this item has been successfully claimed, please resolve it and take it off the Item Depot site to prevent confusion. Thank you!</p>
     <a href='${basename}/resolvefound/${item._id}/${ownerInfo._id}' style='color: white; font-size: 125%; display: block; text-align: center; padding: 1% 2.5% 1% 2.5%; background-color: orange; width: 20%'>Resolve this item</a>
     <p>If the above button does not work / gets blocked, please copy and paste the following URL into the browser:</p>
     <p style='color: seagreen'><b>${basename}/resolvefound/${item._id}/${ownerInfo._id}</b></p>
     <p>All the best,</p><p>The Item Depot team <br>(Micaiah, Shayde, Sam, Cash, & Darrius)</p></div>`;

    // ^^^ AHHH WHAT IS THIS HORROR 😭😭😭

    Meteor.call(
      'sendEmail',
      'mchlcape808@gmail.com',
      'itemdepotmsg@outlook.com',
      `${ownerInfo.firstName}, someone wants to claim the item you found.`,
      htmlText,
    );
    swal('Email successfully sent', `${ownerInfo.firstName} ${ownerInfo.lastName} has been notified.`, 'success');
    handleClose();
  };

  return (
    <Card className="h-100">
      <Card.Header>
        {(ready) ? (
          <Carousel fade>
            {itemImages.map(img => (
              <Carousel.Item interval={2000}>
                <Image src={img} style={{ width: '100%' }} />
              </Carousel.Item>
            ))}
          </Carousel>

        ) : <h5 style={{ color: 'black', textAlign: 'center' }}>Fetching images...</h5>}
      </Card.Header>
      <Card.Body>
        <Card.Title>Item name: {item.itemName}</Card.Title>
        <Card.Text>Category: {item.category}</Card.Text>
        <Card.Text>Description: {item.description}</Card.Text>
        <Card.Text>Last Seen At: {item.locationFound}</Card.Text>
        <Card.Text><img src={ownerInfo.image} alt="" style={{ height: '2.5vw', width: '2.5vw', borderRadius: '50%' }} /><span>&nbsp;&nbsp;&nbsp;Posted by: {`${ownerInfo.firstName} ${ownerInfo.lastName}`}</span></Card.Text>
        {canTakeAction && (
          <Button variant="success" style={{ width: '100%' }} onClick={() => toggleContactForm()}>I claim this item</Button>
        )}
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <Modal show={messageFormDisplay} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h3 style={{ textAlign: 'center', color: 'black' }}>{`Thank you for claiming ${item.itemName}!`}</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Please fill out the necessary info below to obtain this item.</p>
            <AutoForm schema={bridge} onSubmit={data => submit(data)}>
              <LongTextField name="message" placeholder="Indicate details of where and when you want to pick up the item, etc..." required />
              <LongTextField name="contactInfo" placeholder="email, phone #, instagram, etc... (optional)" label="Your Contact Info" required={false} />
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
FoundItem.propTypes = {
  item: PropTypes.shape({
    itemName: PropTypes.string,
    category: PropTypes.string,
    locationFound: PropTypes.string,
    contactEmail: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    image: PropTypes.array,
    description: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/require-default-props
  canTakeAction: PropTypes.bool,
};

export default FoundItem;
